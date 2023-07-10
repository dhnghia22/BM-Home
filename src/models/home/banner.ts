import { get } from 'lodash'

interface Banner {
  type: string
  title: string
  imageUrl: string
  link: string
  id: string
  name?: string
}

export function mapToBannerArray(data: any[]): Banner[] {
  return data.map((banner: any) => ({
    type: get(banner, 'type', ''),
    title: get(banner, 'title', ''),
    imageUrl: get(banner, 'imageUrl', ''),
    link: get(banner, 'link', ''),
    id: get(banner, 'id', '')
  }))
}

export default Banner;
