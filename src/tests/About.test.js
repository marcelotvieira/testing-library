import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testando se o conteúdo é mostrado correntamente na página About', () => {
  test('Testando se a página exibe o título', () => {
    renderWithRouter(<About />);
    const subTitle = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(subTitle).toBeInTheDocument();
  });
  test('Testando se a página exibe as informações sobre a aplicação', () => {
    renderWithRouter(<About />);
    const firstTextContains = /This application/i;
    const secondTextContains = /One can/i;
    const aboutText1 = screen.getByText(firstTextContains);
    const aboutText2 = screen.getByText(secondTextContains);
    expect(aboutText1).toBeInTheDocument();
    expect(aboutText2).toBeInTheDocument();
  });
  test('Testando se a imagem é exibida corretamente', () => {
    renderWithRouter(<About />);
    const srcURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(srcURL);
  });
});
