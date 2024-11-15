export interface Comment {
  id: number
  author: string
  date: string
  message: string
  avatarUrl?: string
}

export interface Thread {
  id: number
  title: string
  views: number
  commentsCount: number
  comments?: Comment[]
}
