export interface EmojiData {
  code: string
  unicode: string
  name: string
}

export const DEFAULT_EMOJIS: EmojiData[] = [
  {
    code: 'thumbs_up',
    unicode: '👍',
    name: 'Thumbs Up',
  },
  {
    code: 'thumbs_down',
    unicode: '👎',
    name: 'Thumbs Down',
  },
  {
    code: 'fire',
    unicode: '🔥',
    name: 'Fire',
  },
  {
    code: 'heart',
    unicode: '❤️',
    name: 'Heart',
  },
  {
    code: 'rocket',
    unicode: '🚀',
    name: 'Rocket',
  },
]
