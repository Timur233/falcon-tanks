const magic = '🪄'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cast = (spell: string, item: any) => {
  if (spell.startsWith(magic)) {
    return '🐷'
  }

  return item
}

test('spell casting', () => {
  const result = cast(magic, '🐸')
  expect(result).toBe('🐷')
})
