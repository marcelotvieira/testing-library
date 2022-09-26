import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testando a página notFound', () => {
  test('Testando se a página exibe o título', () => {
    renderWithRouter(<App />);
    const head = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(head).toBeInTheDocument();
  });
  test('Testando se a página exibe corretamente os pokemons', () => {
    renderWithRouter(<App />);
    pokemons.forEach((poke) => {
      const { name } = poke;
      expect(screen.getByText(name)).toBeInTheDocument();
      const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(nextButton).toBeInTheDocument();
      userEvent.click(nextButton);
    });
  });
  test('Testando se a página exibe os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterOptions = [
      'All',
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    filterOptions.forEach((opt) => {
      const filterBtn = screen.getByRole('button', { name: opt });
      expect(filterBtn).toBeInTheDocument();
    });
    const typeBtns = screen.getAllByTestId('pokemon-type-button');
    const filterButtonsLength = 7;
    expect(typeBtns).toHaveLength(filterButtonsLength);
    typeBtns.forEach((button) => {
      userEvent.click(button);
      const currPokeType = screen.getByTestId('pokemon-type');
      expect(currPokeType.innerHTML).toBe(button.innerHTML);
    });
    const allBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(allBtn);
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
  });
});
