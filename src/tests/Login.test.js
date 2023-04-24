
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando página de Login', () => {
  test('Testando os inputs e a rota "/game".', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputsEl = screen.getAllByRole('textbox');
    const btnsEl = screen.getAllByRole('button');

    expect(inputsEl[0]).toBeInTheDocument();
    expect(inputsEl[1]).toBeInTheDocument();
    expect(btnsEl[0]).toBeDisabled();
    expect(btnsEl[1]).toBeInTheDocument();
    
    userEvent.type(inputsEl[0], 'teste@teste.com');
    userEvent.type(inputsEl[1], 'user-trybe');
    userEvent.click(btnsEl[0]);

    const inputEmail = await screen.findByText(/game/i);
    await waitFor(() => {
      expect(inputEmail).toBeInTheDocument();
    })
    expect(history.location.pathname).toBe('/game');
    expect(history.entries).toHaveLength(2);
  });
  test('Testando a rota "/setting".', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnsEl = screen.getAllByRole('button');

    userEvent.click(btnsEl[1]);

    const titleEl = screen.getByTestId('settings-title');

    expect(titleEl).toBeInTheDocument();
    expect(history.entries).toHaveLength(2);
  });
});
