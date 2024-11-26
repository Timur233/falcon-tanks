import { Comment } from './Comment'
import * as Sequelize from 'sequelize'
import { sequelize } from '../../instances/sequelize'

export interface TopicAttributes {
  id: number
  title: string
  author?: JSON
  createdAt?: Date
  updatedAt?: Date
  comments?: Comment[]
}

export type TopicCreationAttributes = Sequelize.Optional<TopicAttributes, 'id'>

export class Topic extends Sequelize.Model<
  TopicAttributes,
  TopicCreationAttributes
> {
  declare id: number
  declare title: string
  declare author: JSON
  declare comments: Comment[]
  declare createdAt: Date
  declare updatedAt: Date
}

Topic.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'topics',
    modelName: 'Topic',
  }
)
