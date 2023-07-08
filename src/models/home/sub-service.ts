import { get } from 'lodash'

interface SubService {
  type: string
  title: string
  imageUrl: string
  link: string
  id: string
}

export function mapToSubServiceArray(data: any[]): SubService[] {
  return data.map((item: any) => ({
    type: get(item, 'type', ''),
    title: get(item, 'title', ''),
    imageUrl: get(item, 'imageUrl', ''),
    link: get(item, 'link', ''),
    id: get(item, 'id', '')
  }))
}

export default SubService
