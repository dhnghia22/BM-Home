import Banner from "./banner";
import { Merchant } from "./merchant";


export  interface LongDescription {
  en?: string;
  vi?: string;
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

