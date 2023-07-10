import Banner from "./banner";


export  interface LongDescription {
  en?: string;
  vi?: string;
}

export interface Rating {
  score?: string;
  reasons?: any[];
  totalRatings?: string;
  totalOrders?: string;
  totalLikes?: string;
  totalDislikes?: string;
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
}

interface OpeningHours {
  [key: string]: OpeningHoursItem[];
}

export interface OpeningHoursItem {
  openAt?: number;
  closeAt?: number;
}

export interface Metadata {
  display?: {
    displayInHome?: string;
  };
  availableOnly?: boolean;
  time?: {
    start?: number;
    end?: number;
  }[];
  promoTagUrl?: string;
  cities?: {
    name?: string;
    districts?: null;
  }[];
}

export interface CollectionItem {
  type?: string;
  item?: {
    name?: string;
    imageUrl?: string;
    backgroundImageUrl?: string;
    description?: string;
    longDescription?: LongDescription;
    merchants?: Merchant[];
    dishes?: any[];
    type?: string;
    metadata?: Metadata;
    startedAt?: string;
    expiredAt?: string;
    updatedAt?: string;
    createdAt?: string;
    link?: string;
    id?: string;
    isInPromoTime?: boolean;
    collections?: Banner[]
  };
}

export interface CollectionSection {
  id?: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
  items?: CollectionItem[];
}

