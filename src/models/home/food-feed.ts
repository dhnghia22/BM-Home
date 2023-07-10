export interface Articles {
  title?: string
  tag?: string
  thumbnail?: string
  description?: string
  link?: string
}

export interface FoodFeed {
  link?: string
  articles?: Articles[]
}
