import * as Sequelize from 'sequelize'
import { sequelize } from '../../instances/sequelize'

export type TopicAttributes = {
  id: number
  title: string
}

export type TopicCreationAttributes = Sequelize.Optional<TopicAttributes, 'id'>

export class Topic extends Sequelize.Model<
  TopicAttributes,
  TopicCreationAttributes
> {
  declare id: number
  declare title: string
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
  },
  { sequelize }
)
