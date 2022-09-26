import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se a aplicação contém um conjunto fixo de links de navegação', () => {
  test('Teste se o topo da aplicação contém um link para Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favorites = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });
});
