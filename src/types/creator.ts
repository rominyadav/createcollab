export interface CreatorVideo {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: string;
  uploadedAt: string;
}

export interface CreatorPricing {
  "15sec": {
    type: "fixed" | "range";
    amount?: number;
    min?: number;
    max?: number;
  };
  "30sec": {
    type: "fixed" | "range";
    amount?: number;
    min?: number;
    max?: number;
  };
  "60sec": {
    type: "fixed" | "range";
    amount?: number;
    min?: number;
    max?: number;
  };
  "1-5min": {
    type: "fixed" | "range";
    amount?: number;
    min?: number;
    max?: number;
  };
  "5min+": {
    type: "fixed" | "range";
    amount?: number;
    min?: number;
    max?: number;
  };
}

export interface Creator {
  id: number;
  name: string;
  avatar: string;
  followers: string;
  following: string;
  niche: string;
  email: string;
  bio: string;
  socialLinks: string[];
  pricing: CreatorPricing;
  shippingAddress: string;
  profileCompletion: string;
  status: "pending" | "approved" | "rejected" | "blocked";
  verified: boolean;
  location: {
    city: string;
    state: string;
    country: string;
    district?: string;
    province?: string;
    coordinates?: { lat: number; lng: number };
  };
  engagement: string;
  videos: CreatorVideo[];
}
