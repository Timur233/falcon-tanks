"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionController = void 0;
const reaction_1 = require("../models/reaction");
class ReactionController {
    static async getReactions(req, res) {
        try {
            const topicId = parseInt(req.params.topicId);
            if (isNaN(topicId)) {
                return res.status(400).json({ error: 'Invalid topic ID' });
            }
            const reactions = await reaction_1.ReactionModel.getReactions(topicId);
            return res.json({ success: true, data: { reactions } });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
    static async toggleReaction(req, res) {
        try {
            const topicId = parseInt(req.params.topicId);
            const userId = 1; // TODO: Заменить на реального пользователя
            const { emojiCode } = req.body;
            if (isNaN(topicId)) {
                return res.status(400).json({ error: 'Invalid topic ID' });
            }
            if (!emojiCode) {
                return res.status(400).json({ error: 'Emoji code is required' });
            }
            const result = await reaction_1.ReactionModel.toggleReaction(topicId, userId, emojiCode);
            return res.json(result);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
    static async getAvailableEmojis(_req, res) {
        try {
            const emojis = await reaction_1.ReactionModel.getAvailableEmojis();
            return res.json({
                success: true,
                data: { emojis }
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
}
exports.ReactionController = ReactionController;
