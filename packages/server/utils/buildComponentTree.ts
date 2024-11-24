import { Comment } from '../models/sequelize/Comment'

export const buildCommentTree = (
  comments: Comment[],
  parentId: number | null = null
): any[] => {
  return comments
    .filter(comment => comment.parentCommentId === parentId)
    .map(comment => ({
      ...comment.dataValues,
      replies: buildCommentTree(comments, comment.id),
    }))
}
