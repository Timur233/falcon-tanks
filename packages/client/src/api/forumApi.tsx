import localApi from './localApi'
import { Thread, Comment } from '@/types/forum'

export const fetchThreads = async (
  page: number,
  limit: number
): Promise<{ threads: Thread[]; totalPages: number }> => {
  const response = await localApi.get('/api/topics/')
  return response.data
}

export const fetchThreadById = async (id: number): Promise<Thread> => {
  const response = await localApi.get(`/api/topics/${id}`)
  return response.data
}

export const createThread = async (data: {
  title: string
  message: string
}): Promise<Thread> => {
  const response = await localApi.post('/api/topics/', data)
  return response.data
}

export const createComment = async (
  threadId: number,
  message: string
): Promise<Comment> => {
  const response = await localApi.post(`/api/topics/${threadId}/comments`, {
    message,
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
