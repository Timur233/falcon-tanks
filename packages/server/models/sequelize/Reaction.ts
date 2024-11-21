import * as Sequelize from 'sequelize'
import { sequelize } from '../../instances/sequelize'

export type ReactionAttributes = {
  id: number
  emojiCode: string
  commentId: number
  userId: number
}

export type ReactionCreateAttributes = Sequelize.Optional<
  ReactionAttributes,
  'id'
>

export class Reaction extends Sequelize.Model<
  ReactionAttributes,
  ReactionCreateAttributes
> {
  declare id: number
  declare emojiCode: string
  declare commentId: number
  declare userId: number
}

Reaction.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    emojiCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    commentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize }
)
