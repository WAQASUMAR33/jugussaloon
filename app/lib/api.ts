const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://software.jugnussaloon.com/api';

export interface ProductItem {
  id: number;
  title: string;
  price: number;
  discount?: number;
  discounted_price?: number;
  stock?: number;
  image_url?: string | null;
  created_at?: string;
}

export interface ServiceCategoryItem {
  id: number;
  title: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description?: string;
  price: number;
  discount?: number;
  discounted_price?: number;
  category?: {
    id: number;
    title: string;
  };
  image_url?: string | null;
  created_at?: string;
}

export interface AppointmentPayload {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  appointment_date: string; // YYYY-MM-DD
  start_time: string; // HH:mm
  service_ids: number[];
  notes?: string;
}

export interface AppointmentResponseData {
  booking_no: string;
  appointment_date: string;
  start_time: string;
  net_amount?: number;
  status: string;
}

export interface AppointmentResponse {
  success: boolean;
  message?: string;
  data?: AppointmentResponseData;
  error?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  data?: {
    id?: number;
    created_at?: string;
  };
  error?: string;
}

/**
 * Fetch Product Catalog from Backend API
 */
export async function getProducts(search?: string): Promise<ProductItem[]> {
  try {
    const url = new URL(`${API_BASE_URL}/products`);
    if (search) url.searchParams.append('search', search);

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 60 }, // Revalidate cache every 60 seconds
    });

    if (!res.ok) {
      console.warn(`[API] getProducts returned status ${res.status}`);
      return [];
    }

    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error('[API] Error in getProducts:', error);
    return [];
  }
}

/**
 * Fetch Services Catalog from Backend API
 */
export async function getServices(categoryId?: number, search?: string): Promise<ServiceItem[]> {
  try {
    const url = new URL(`${API_BASE_URL}/services`);
    if (categoryId) url.searchParams.append('category_id', String(categoryId));
    if (search) url.searchParams.append('search', search);

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`[API] getServices returned status ${res.status}`);
      return [];
    }

    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error('[API] Error in getServices:', error);
    return [];
  }
}

/**
 * Fetch Service Categories from Backend API
 */
export async function getServiceCategories(): Promise<ServiceCategoryItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/service-categories`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`[API] getServiceCategories returned status ${res.status}`);
      return [];
    }

    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error('[API] Error in getServiceCategories:', error);
    return [];
  }
}

/**
 * Submit Appointment Booking to Backend API
 */
export async function bookAppointment(payload: AppointmentPayload): Promise<AppointmentResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: json.message || `Server returned HTTP ${res.status}`,
      };
    }

    return json;
  } catch (error: any) {
    console.error('[API] Error in bookAppointment:', error);
    return {
      success: false,
      error: error?.message || 'Failed to connect to backend server',
    };
  }
}

/**
 * Submit Contact Form Inquiry to Backend API
 */
export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: json.message || `Server returned HTTP ${res.status}`,
      };
    }

    return json;
  } catch (error: any) {
    console.error('[API] Error in submitContact:', error);
    return {
      success: false,
      error: error?.message || 'Failed to submit contact request',
    };
  }
}
