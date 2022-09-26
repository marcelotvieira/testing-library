import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testando a página notFound', () => {
  test('Testando se a página exibe o título', () => {
    renderWithRouter(<NotFound />);
    const expectedHeading = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2 });
    expect(expectedHeading).toBeInTheDocument();
  });
  test('Testando se a imagem está sendo exibida', () => {
    renderWithRouter(<NotFound />);
    const expectedImage = screen.getByRole('img');
    const expectedURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(expectedImage.src).toContain(expectedURL);
  });
});
