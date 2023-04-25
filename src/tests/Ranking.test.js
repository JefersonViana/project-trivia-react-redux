import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const playersNumber = 4;
const testeArray = [
  {
    name: 'Name Example',
    score: 100,
    gravatarEmail: 'example@example.com',
  },
  {
    name: 'Jose da Silva',
    score: 150,
    gravatarEmail: 'josedasilva@gmail.com',
  },
  {
    name: 'Maria das Dores',
    score: 125,
    gravatarEmail: 'mariadores@gmail.com',
  },
  {
    name: 'Jeffin',
    score: 150,
    gravatarEmail: 'jeffinviana@gmail.com',
  },
];
const obj = {
  player: {
    name: 'asdasd',
    assertions: 2,
    score: 164,
    gravatarEmail: 'ls0885377@gmail.com',
  },
};
describe('', () => {
  beforeEach(() => {
    localStorage.setItem('players', JSON.stringify(testeArray));
  });
  test('".', async () => {
    const { history } = renderWithRouterAndRedux(<App />, obj, '/ranking');
    const test = JSON.parse(localStorage.getItem('players'));
    expect(test.length).toBe(playersNumber);
    expect(test[0].name).toBe(testeArray[0].name);
    const score = screen.getByTestId('player-score-0');
    expect(score).toBeInTheDocument();
    const rankingTitle = screen.getByRole('heading', { name: /ranking/i });
    expect(rankingTitle).toBeInTheDocument();
    const headerName = screen.getByText(/Name Example/i);
    expect(headerName).toBeInTheDocument();
    const buttonPlayAgain = screen.getByRole('button', {
      name: /play again/i,
    });
    expect(buttonPlayAgain).toBeInTheDocument();
    const gravatarImg = screen.getByAltText(testeArray[0].name);
    expect(gravatarImg).toBeInTheDocument();
    userEvent.click(buttonPlayAgain);
    expect(history.location.pathname).toBe('/');
    // const playerNames = screen.getAllByTestId(/player-name/i);
  });
});
