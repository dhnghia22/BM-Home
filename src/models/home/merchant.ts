export interface Location {
  coordinates?: [number, number];
  type?: string;
}

export interface Merchant {
  id?: string;
  name?: string;
  imageUrl?: string;
  thumbnailImageUrl?: string;
  cuisine?: string;
  location?: Location;
  city?: string;
  featuredMenuTitle?: {
    en?: string;
    vi?: string;
  };
  recommendMenu?: string;
  isAvailable?: boolean;
  state?: string;
  canOrder?: boolean;
  isPartner?: boolean;
  canAcceptOrder?: boolean;
  allowCashlessTransaction?: boolean;
  provideDiscount?: boolean;
  provideCoupon?: boolean;
  openingHours?: OpeningHours;
  openingHoursOverride?: any[]; // Update the type if you have more information about this field
  isBlockedFromPromotions?: boolean;
  isCampaignLimitsVisible?: boolean;
  checkAvailability?: number;
  type?: string;
  deliveryType?: string;
  rating?: Rating;
  lastOrderedAt?: string;
  promoTagUrl?: string;
  distance?: number; 
}

export interface OpeningHours {
  [key: string]: OpeningHoursItem[];
}

export interface OpeningHoursItem {
  openAt?: number;
  closeAt?: number;
}

export interface Rating {
  score?: string;
  reasons?: any[];
  totalRatings?: string;
  totalOrders?: string;
  totalLikes?: string;
  totalDislikes?: string;
}