import { getNormalisedScore, getInvisibilityScore } from './utils';

describe('getInvisibilityScore', () => {
  it.todo('should return 0 if no invisibility is found');

  it.todo(
    'calculates correct invisibility score for a 39 year old male with a score of 0',
  );

  it.todo(
    'calculates correct invisibility score for a 39 year old male with a score of 50',
  );

  it.todo(
    'calculates correct invisibility score for a 39 year old male with a score of 100',
  );

  it.todo('handles invalid score');

  it.todo('handles invalid age');

  it.todo('handles invalid gender');
});

describe('getNormalisedScore', () => {
  it.todo('should return 0 if no invisibility is found');

  it.todo('should return a normalised score');
});

describe('getRandomUserData', () => {
  it.todo('fetches data from the random user api');

  it.todo('returns a user object with the correct properties');

  it.todo('handles invalid responses from api');
});

describe('getUserData', () => {
  it.todo('calls the getRandomUserData function');
});
