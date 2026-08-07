import { NextResponse } from "next/server";

export interface GoogleReview {
  id?: string;
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time?: number;
}

export interface GoogleReviewsData {
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
  place_url: string;
  name: string;
  is_live: boolean;
}

const FALLBACK_REVIEWS: GoogleReview[] = [
  {
    id: "g1",
    author_name: "Victoria Sterling",
    profile_photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    relative_time_description: "a week ago",
    text: "Jugnu's Saloon is unmatched in luxury and precision! The HD airbrush bridal makeup created for my wedding day held up flawlessly for 14+ hours. The private VIP suite and warm hospitality made me feel like royalty.",
  },
  {
    id: "g2",
    author_name: "Alexander Hayes",
    profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    relative_time_description: "2 weeks ago",
    text: "The attention to detail during the 24K Gold HydraFacial and organic head spa rinse was incredible. Easily the premier beauty and relaxation sanctuary in the city. Will definitely be returning regularly!",
  },
  {
    id: "g3",
    author_name: "Sophia Lauren",
    profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    relative_time_description: "3 weeks ago",
    text: "My keratin smoothing treatment and party glam look surpassed all expectations. The stylists take the time to analyze your hair texture and skin tone. Truly a 5-star experience from start to finish.",
  },
  {
    id: "g4",
    author_name: "Elena Rostova",
    profile_photo_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    relative_time_description: "a month ago",
    text: "The aesthetic of Jugnu's Saloon is immaculate — clean off-white luxury with sleek black accents. Their hair balayage coloring techniques are top-tier. 10/10 recommendation!",
  },
  {
    id: "g5",
    author_name: "Marcus Vance",
    profile_photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    relative_time_description: "a month ago",
    text: "Brought my wife here for an anniversary beauty treatment package. The staff went above and beyond with personal touches and gold-class hospitality. Worth every penny.",
  },
  {
    id: "g6",
    author_name: "Amina Khan",
    profile_photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "Hands down the best bridal makeover lounge in the region. The makeup remained natural yet striking in photography. Thank you to the whole master styling team!",
  }
];

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (apiKey && placeId) {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,url&key=${apiKey}`;
      const response = await fetch(url, {
        next: { revalidate: 3600 }, // Revalidate cache every hour
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === "OK" && data.result) {
          const result = data.result;
          return NextResponse.json(
            {
              rating: result.rating || 4.9,
              user_ratings_total: result.user_ratings_total || 128,
              reviews: (result.reviews || []).map((r: {
                author_name?: string;
                profile_photo_url?: string;
                rating?: number;
                relative_time_description?: string;
                text?: string;
                time?: number;
              }, idx: number) => ({
                id: `live-${idx}`,
                author_name: r.author_name || "Google Reviewer",
                profile_photo_url: r.profile_photo_url || "",
                rating: r.rating || 5,
                relative_time_description: r.relative_time_description || "Recently",
                text: r.text || "",
                time: r.time,
              })),
              place_url: result.url || `https://www.google.com/maps/place/?q=place_id:${placeId}`,
              name: result.name || "Jugnu's Saloon",
              is_live: true,
            },
            {
              headers: {
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
              },
            }
          );
        }
      }
    } catch (err) {
      console.error("Error fetching Google Reviews from Places API:", err);
    }
  }

  // Fallback if API key/Place ID not provided or API call fails
  return NextResponse.json({
    rating: 4.9,
    user_ratings_total: 148,
    reviews: FALLBACK_REVIEWS,
    place_url: "https://maps.google.com/?q=Jugnu+Saloon",
    name: "Jugnu's Saloon",
    is_live: false,
  });
}
