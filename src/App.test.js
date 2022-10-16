import { render, screen } from '@testing-library/react';
import App from './App';
import {makeMove} from './Game.js'

test("'renders the starting application screen's title", () => {
  render(<App />);
  const title = screen.getByText('Simon Says');
  expect(title).toBeInTheDocument();
});

test("renders the starting application screen's button", () => {
  render(<App />);
  const button = screen.getByText('Start Game');
  expect(button).toBeInTheDocument();
})

test("renders application, sees if difficulty is set to normal", () => {
  render(<App />);
  const difficulty = screen.getByText('Current Difficulty: Normal (Click to Change)')
  expect(difficulty).toBeInTheDocument();
})

test("Sees if move increments by 1 if the answer is correct.", () => {
  let result = makeMove(0, 0, 0, [0,1,2,3], false)
  expect(result[0]).toBe(1);
  expect(result[1]).toBe(0);
})

test("Sees if output is correct is wrong guess is made.", () => {
  let result = makeMove(0, 0, 2, [0,1,2,3], false)
  expect(result[0]).toBe(0);
  expect(result[1]).toBe(-1);
})
