import { Thread, Comment } from '../src/types/forum'

export const mockThread: Thread = {
  id: 1,
  title: 'Моковая тема',
  views: 0,
  commentsCount: 0,
  comments: [
    {
      id: 1,
      avatarUrl: '',
      author: 'Моковый пользователь',
      date: new Date().toLocaleDateString(),
      message: 'Это пример комментария.',
    },
  ],
}

export const mockComments: Comment[] = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  avatarUrl: '',
  author: `Моковый пользователь ${i + 1}`,
  date: new Date().toLocaleDateString(),
  message: `Пример комментария №${i + 1}.`,
}))
