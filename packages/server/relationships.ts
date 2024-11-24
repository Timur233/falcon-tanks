import { Comment } from './models/sequelize/Comment'
import { Reaction } from './models/sequelize/Reaction'
import { Topic } from './models/sequelize/Topic'

Topic.hasMany(Comment, {
  foreignKey: 'topicId',
  as: 'comments',
})
Comment.belongsTo(Topic, {
  foreignKey: 'topicId',
  as: 'topic',
})

Comment.hasMany(Comment, {
  foreignKey: 'parentId',
  as: 'replies',
})
Comment.belongsTo(Comment, {
  foreignKey: 'parentId',
  as: 'parent',
})

Comment.hasMany(Reaction, { foreignKey: 'commentId' })
Reaction.belongsTo(Comment, { foreignKey: 'commentId' })
