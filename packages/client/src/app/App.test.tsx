// import App from './App'
// import { render, screen } from '@testing-library/react'

// const appContent = 'Вот тут будет жить ваше приложение :)'

// @ts-ignore @typescript-eslint/ban-ts-comment
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  // render(<App />)
  // expect(screen.getByText(appContent)).toBeDefined()
  // const { getByAltText } = await render(<App />);
  // const image = getByAltText('promoImage');
  // expect(image.src).toContain('FT-promo');
})
