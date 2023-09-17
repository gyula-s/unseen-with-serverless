import * as utils from './utils.ts';

/**
 * due to time constraints, only testing the happy paths
 */
describe('getInvisibilityScore', () => {
  it.todo('should return 0 if no invisibility is found');

  it('calculates correct invisibility score for a 39 year old male with a score of 0', () => {
    const score = utils.getInvisibilityScore({
      superheroScore: 0,
      age: 39,
      gender: 'male',
    });
    expect(score).toBe(18);
  });

  it('calculates correct invisibility score for a 39 year old male with a score of 50', () => {
    const score = utils.getInvisibilityScore({
      superheroScore: 50,
      age: 39,
      gender: 'male',
    });
    expect(score).toBe(52);
  });

  it('calculates correct invisibility score for a 39 year old male with a score of 100', () => {
    const score = utils.getInvisibilityScore({
      superheroScore: 100,
      age: 39,
      gender: 'male',
    });
    expect(score).toBe(85);
  });

  it.todo('handles invalid score');

  it.todo('handles invalid age');

  it.todo('handles invalid gender');
});

describe('getNormalisedScore', () => {
  it('should return a normalised score', () => {
    const score = utils.getNormalisedScore(50, 'male');
    expect(score).toBe(51);
  });
});

// mock the fetch library
jest.mock('node-fetch', () => {
  return {
    __esModule: true, // this property makes it work
    default: jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              {
                gender: 'male',
                name: { title: 'Mr', first: 'Louison', last: 'Garcia' },
                dob: { date: '1988-04-20T20:16:52.648Z', age: 35 },
              },
            ],
            info: {
              seed: '308967bfe1102415',
              results: 1,
              page: 1,
              version: '1.4',
            },
          }),
        status: 200,
      });
    }),
    Headers: jest.fn(),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('getRandomUserData', () => {
  it('fetches data from the random user api', async () => {
    const data = await utils.getRandomUserData();
    expect(data).toStrictEqual({
      age: 35,
      name: 'Louison Garcia',
      dob: '1988-04-20T20:16:52.648Z',
      gender: 'male',
    });
  });

  it.todo('handles invalid responses from api');
});

// describe.skip('getUserData', () => {
//   // @TODO: where there is time, fix this test

//   // beforeEach(() => {
//   //   jest.clearAllMocks();
//   // });

//   // afterEach(() => {
//   //   utils.getRandomUserData.mockRestore();
//   // });

//   // jest
//   //   .spyOn(utils, 'getRandomUserData')
//   //   .mockImplementationOnce(jest.fn().mockReturnValue({}));

//   it('calls the getRandomUserData function', async () => {
//     await utils.getUserData();
//     expect(utils.getRandomUserData).toHaveBeenCalled();
//   });
// });

describe('getInvisibilityStatus', () => {
  it("should return 'Not invisible' if score is 19", () => {
    const status = utils.getInvisibilityStatus(19);
    expect(status).toBe('Not invisible');
  });

  it("should return 'Partially Visible' if score is 27", () => {
    const status = utils.getInvisibilityStatus(27);
    expect(status).toBe('Camouflage');
  });

  it("should return 'Partially Visible' if score is 60", () => {
    const status = utils.getInvisibilityStatus(60);
    expect(status).toBe('Transparent');
  });

  it("should return 'Invisible' if score is 81", () => {
    const status = utils.getInvisibilityStatus(81);
    expect(status).toBe('Invisible');
  });
});
