import * as Sequelize from 'sequelize'
import { sequelize } from '../../instances/sequelize'

export type CommentCreationAttributes = Sequelize.Optional<
  CommentAttributes,
  'id'
>

export type CommentAttributes = {
  id: number
  text: string
  topicId: number | null
  parentCommentId: number | null
}

export class Comment extends Sequelize.Model<
  CommentAttributes,
  CommentCreationAttributes
> {
  declare id: number
  declare text: string
  declare topicId: number | null
  declare parentCommentId: number | null
}

Comment.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    topicId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    parentCommentId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  { sequelize }
)
