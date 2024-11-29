import localApi from './localApi'
import { Thread, Comment } from '@/types/forum'
import { UserType } from '@/store/reducers/auth-reducer'

export const fetchThreads = async (
  page: number,
  limit: number
): Promise<{ threads: Thread[]; totalPages: number }> => {
  const response = await localApi.get('/api/topics', {
    params: { page, limit },
  })
  return response.data
}

export const fetchThreadById = async (id: number): Promise<Thread> => {
  const response = await localApi.get(`/api/topics/${id}`)
  return { ...response.data, comments: response.data.comments || [] }
}

export const createThread = async (data: {
  title: string
  message: string
  author: JSON | UserType | null
}): Promise<Thread> => {
  const response = await localApi.post(
    `/api/topics?author=${data.author}`,
    data
  )
  return response.data
}

export const createComment = async (
  threadId: number,
  author: JSON | UserType | null,
  text: string,
  parentCommentId: number | null
): Promise<Comment> => {
  const response = await localApi.post(`/api/topics/${threadId}/comments`, {
    author,
    text,
    parentCommentId,
  })
  return response.data
}

export const fetchComments = async (
  threadId: number,
  page: number,
  limit: number
) => {
  const response = await localApi.get(`/api/topics/${threadId}/comments`, {
    params: { page, limit },
  })
  return {
    comments: response.data.comments,
    total: response.data.total,
  }
}

export const uploadFile = async (data: FormData) => {
  return localApi.post('/files/upload', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
