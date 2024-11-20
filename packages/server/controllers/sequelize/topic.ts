import { Request, Response } from 'express'
import { Topic } from '../../models/sequelize/Topic'

export const getTopics = async (req: Request, res: Response) => {
  try {
    const topics = await Topic.findAll()
    res.status(200).json(topics)
  } catch (e) {
    res.status(500).json(e)
  }
}

export const getTopicById = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.findByPk(parseInt(req.params.id))
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' })
    }
    res.status(200).json(topic)
  } catch (e) {
    res.status(500).json(e)
  }
}

export const createTopic = async (req: Request, res: Response) => {
  const { title } = req.body
  try {
    const newTopic = await Topic.create({ title })
    res.status(201).json(newTopic)
  } catch (e) {
    res.status(500).json(e)
  }
}
