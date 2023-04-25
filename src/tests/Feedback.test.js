import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Feedback from '../pages/Feedback';

const obj = {
  player: {
    name: 'asdasd',
    assertions: 2,
    score: 164,
    gravatarEmail: 'ls0885377@gmail.com',
  },
};
const obj2 = {
  player: {
    name: 'asdasd',
    assertions: 4,
    score: 164,
    gravatarEmail: 'ls0885377@gmail.com',
  },
};

describe('Testando página de FeedBack', () => {
  test('Testando se os elementos estão presentes em tela.', async () => {
    const { history } = renderWithRouterAndRedux(<App />, obj, '/feedback');

    const h1Element = screen.getByTestId('feedback-text');
    const scoreElement = screen.getByTestId('feedback-total-score');
    const assertions = screen.getByTestId('feedback-total-question');
    const rakingBtn = screen.getByRole('button', { name: /ranking/i });
    const playAgainBtn = screen.getByRole('button', { name: /play again/i });
    expect(h1Element).toBeInTheDocument();
    expect(h1Element).toHaveTextContent(/Could be better/i);
    expect(scoreElement).toBeInTheDocument();
    expect(assertions).toBeInTheDocument();
    expect(rakingBtn).toBeInTheDocument();
    expect(playAgainBtn).toBeInTheDocument();

    userEvent.click(playAgainBtn);
    expect(history.location.pathname).toBe('/');
  });

  test('Testando a funcionalidade do botao ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App />, obj, '/feedback');

    const rankingBtn = screen.getByRole('button', { name: /ranking/i });
    expect(rankingBtn).toBeInTheDocument();

    userEvent.click(rankingBtn);
    expect(history.location.pathname).toBe('/ranking');
  });

  test('Testando a funcionalidade do botao ranking', () => {
    renderWithRouterAndRedux(<Feedback />, obj2);

    const h2Element = screen.getByRole('heading', { name: /well done!/i });

    expect(h2Element).toBeInTheDocument();
  });
});
