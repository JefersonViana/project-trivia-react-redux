
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
const data = {
  results: [
    {
      category: "Geography",
      correct_answer: "Canberra",
      difficulty: "medium",
      incorrect_answers: ["Sydney", "Melbourne", "Brisbane"],
      question: "What is the capital of Australia?",
      type: "multiple",
    },
    {
      category: "Vehicles",
      correct_answer: "Renault Avantime",
      difficulty: "medium",
      incorrect_answers: ["Chevy Volt", "Mercedes-Benz A-Class", "Honda Odyssey"],
      question: "Which of the following vehicles featured a full glass roof at base model?",
      type: "multiple",
    },
    {
      category: "Entertainment: Music",
      correct_answer: "Being For The Benefit Of Mr. Kite!",
      difficulty: "medium",
      incorrect_answers: ["Why Don&#039;t We Do It in the Road?", "Everybody&#039;s Got Something to Hide Except Me and My Monkey", "The Continuing Story of Bungalow Bill"],
      question: "Which of these is NOT a song on The Beatles&#039; 1968 self titled album, also known as the White album?",
      type: "multiple",
    },
    {
      category: "Entertainment: Video Games",
      correct_answer: "18",
      difficulty: "easy",
      incorrect_answers: ["13", "16", "15"],
      question: "In the 2002 video game &quot;Kingdom Hearts&quot;, how many Keyblades are usable?",
      type: "multiple",
    },
    {
      category: "Entertainment: Board Games",
      correct_answer: "Tsumo",
      difficulty: "hard",
      incorrect_answers: ["Ron", "Rīchi", "Kan"],
      question: "What do you declare in Rīchi Mahjong when you&#039;ve drawn your winning tile?",
      type: "multiple",
    },
  ]
}

describe('', () => {
  beforeEach(() => {
    localStorage.setItem('players', JSON.stringify([
      {
        assertions: 0,
        gravatarEmail: "teste@teste.com",
        gravatarImg: "https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473",
        name: "51swcdb",
        score: 0,
      }
    ]))
  });
  test('', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (data)
    }).mockResolvedValueOnce({
      json: async () => ('17237e55258d31883fe45eefb64f8f65b4287005d05927c0548ffcc0ed05ccde')
    })
    const { history } = renderWithRouterAndRedux(<App />)
    const inputsEl = screen.getAllByRole('textbox');
    const btnEl = screen.getByRole('button', { name: 'Play' });
    userEvent.type(inputsEl[0], 'player1@gmail.com')
    userEvent.type(inputsEl[1], 'player-1')
    userEvent.click(btnEl)

    const question1 = await screen.findByText(/What is the capital of Australia?/i);
    expect(question1).toBeInTheDocument();

    data.results.forEach(async (element) => {
      const btnCorrect = await screen.findByRole('button', { name: element.correct_answer});
      userEvent.click(btnCorrect);
      const btnNext = screen.getByRole('button', { name: 'Next' });
      userEvent.click(btnNext);
    });

    waitFor(() => {
      expect(history.location.pathname).toBe('/feedback');
      expect(localStorage.getItem('players')).toHaveLength(1);
    })

  
  });
});
describe('', () => {
  test('', () => {
    const dataFake = {
      data: { results: [] }
    }
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (dataFake.data)
    })
    const { history } = renderWithRouterAndRedux(<App />, { player: { name: 'teste'}}, '/game')
    waitFor(() => {
      expect(history.location.pathname).toBe('/')
    });
  }); 

});
describe('', () => {
  beforeEach(() => {
    localStorage.setItem('players', JSON.stringify([]));
  });
  test('', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (data)
    }).mockResolvedValueOnce({
      json: async () => ('17237e55258d31883fe45eefb64f8f65b4287005d05927c0548ffcc0ed05ccde')
    })
    const { history } = renderWithRouterAndRedux(<App />)
    const inputsEl = screen.getAllByRole('textbox');
    const btnEl = screen.getByRole('button', { name: 'Play' });
    userEvent.type(inputsEl[0], 'player1@gmail.com')
    userEvent.type(inputsEl[1], 'player-1')
    userEvent.click(btnEl)

    const question1 = await screen.findByText(/What is the capital of Australia?/i);
    expect(question1).toBeInTheDocument();

    data.results.forEach(async (element) => {
      const btnCorrect = await screen.findByRole('button', { name: element.correct_answer});
      userEvent.click(btnCorrect);
      const btnNext = screen.getByRole('button', { name: 'Next' });
      userEvent.click(btnNext);
    });

    waitFor(() => {
      expect(history.location.pathname).toBe('/feedback');
      expect(localStorage.getItem('players')).toHaveLength(1);
    })

  
  });
});