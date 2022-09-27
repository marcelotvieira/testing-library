import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testando a página notFound', () => {
  test('Testando se a página exibe o título', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const image = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(image).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    pokemons.forEach((poke) => {
      const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
      const currName = screen.getByText(poke.name);
      const currType = screen.getByTestId('pokemon-type');
      const weight2 = screen.getByTestId('pokemon-weight');
      const currImage = screen.getByRole('img');
      const { averageWeight: { value, measurementUnit } } = poke;

      expect(currName).toBeInTheDocument();
      expect(currType.innerHTML).toBe(poke.type);
      expect(weight2.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
      expect(currImage.src).toContain(poke.image);
      userEvent.click(nextBtn);
    });
  });
  test('Teste se o card do pokémon contém um link para detalhes ', () => {
    renderWithRouter(<App />);
    pokemons.forEach((poke) => {
      const link = screen.getByRole('link', { name: /more details/i });
      expect(link).toBeInTheDocument();
      expect((link.href).match(/\d/g).join(''))
        .toContain(`${poke.id}`);

      const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(nextBtn);
    });
  });
  test('Teste se o card do pokémon contém um link para detalhes ', () => {
    renderWithRouter(<App />);
    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    expect(detailsBtn).toBeInTheDocument();
    userEvent.click(detailsBtn);
    const favoriteCheck = screen.getByRole('checkbox');
    expect(favoriteCheck).toBeInTheDocument();
    userEvent.click(favoriteCheck);

    const homeButton = screen.getByRole('link', { name: /home/i });
    expect(homeButton).toBeInTheDocument();
    userEvent.click(homeButton);

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();
    userEvent.click(nextBtn);
    const detailsBtn2 = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsBtn2);
    const favoriteCheck2 = screen.getByRole('checkbox');

    userEvent.click(favoriteCheck2);
    const homeButton2 = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeButton2);

    const favoriteStar = screen.getAllByRole('img');
    expect(favoriteStar).toHaveLength(2);
    expect(favoriteStar[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteStar[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');

    const nextBtn3 = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextBtn3);

    const favoriteStar2 = screen.getAllByRole('img');
    expect(favoriteStar2).toHaveLength(2);
    expect(favoriteStar2[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteStar2[1]).toHaveAttribute('alt', 'Charmander is marked as favorite');
  });
});
