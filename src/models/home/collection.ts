

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
  isPartner?: boolean;
  provideDiscount?: boolean;
  provideCoupon?: boolean;
  isAvailable?: boolean;
  checkAvailability?: number;
  rating?: Rating;
  distance?: number;
  promoTagUrl?: string;
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
  };
}

export interface CollectionSection {
  id?: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
  items?: CollectionItem[];
}

