export interface Comment {
  id: number
  text: string
  topicId: number
  parentId?: number | null
  author: string | null | JSON
  createdAt: string
  updatedAt: string
}

export interface Thread {
  id: number
  author: JSON
  title: string
  message: string
  views: number
  commentsCount: number
  comments?: Comment[]
  createdAt: Date
  updatedAt: Date
}
