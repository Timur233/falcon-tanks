import { Request, Response } from 'express'
export declare class ReactionController {
  static getReactions(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>>
  static toggleReaction(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>>
  static getAvailableEmojis(
    _req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>>
}
