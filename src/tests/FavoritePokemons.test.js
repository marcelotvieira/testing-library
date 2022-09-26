import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('Teste a página de pokémons favoritos;', () => {
  test('Teste se No favorite pokemon found, caso não haja', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const noFoundText = screen.getByText(/no favorite pokemon found/i);
    expect(noFoundText).toBeInTheDocument();
  });
  test('Teste se No favorite pokemon found, caso não haja', () => {
    renderWithRouter(<App />);
    const detailButton1 = screen.getByRole('link', { name: /more details/i });
    expect(detailButton1).toBeInTheDocument();
    const homeButton = screen.getByRole('link', { name: /home/i });
    expect(homeButton).toBeInTheDocument();

    userEvent.click(detailButton1);
    const checkFavorite = screen.getByRole('checkbox');
    expect(checkFavorite).toBeInTheDocument();
    userEvent.click(checkFavorite);
    userEvent.click(homeButton);

    const nextPokeButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokeButton).toBeInTheDocument();
    userEvent.click(nextPokeButton);
    const detailButton2 = screen.getByRole('link', { name: /more details/i });
    expect(detailButton2).toBeInTheDocument();

    userEvent.click(detailButton2);
    const checkFavorite2 = screen.getByRole('checkbox');
    expect(checkFavorite2).toBeInTheDocument();
    userEvent.click(checkFavorite2);

    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritesLink).toBeInTheDocument();
    userEvent.click(favoritesLink);

    const favoritePokes = [
      screen.getByText(/charmander/i),
      screen.getByText(/pikachu/i),
    ];
    expect(favoritePokes[0]).toBeInTheDocument();
  });
});
