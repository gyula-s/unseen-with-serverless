import fetch from 'node-fetch';

type Gender = 'male' | 'female';

export interface UserData {
  name: string;
  dob: string;
  age: number;
  gender: Gender;
}

interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  dob: {
    date: string;
    age: number;
  };
  gender: Gender;
}

interface Info {
  seed: string;
  results: number;
}
interface RandomUserResponse {
  results: RandomUser[];
  info: Info;
}
/**
 * return a random user from https://randomuser.me/api/
 */
export const getRandomUserData = async (): Promise<UserData> => {
  /**
   * fetch data.
   * only fetch relevant fields
   * return json
   */
  const requiredFields: string[] = ['name', 'gender, dob'];
  const response = await fetch(
    `https://randomuser.me/api/?inc=${requiredFields.join(',')}`,
  );
  const data: RandomUserResponse =
    (await response.json()) as RandomUserResponse;

  const randomUser: RandomUser = data.results[0] as RandomUser;
  const name = `${randomUser.name.first} ${randomUser.name.last}`;
  const dob = randomUser.dob.date;
  const { age } = randomUser.dob;
  const { gender } = randomUser;

  return { name, dob, age, gender };
};

/**
 * return a random user from https://randomuser.me/api/
 * optional params might be specified, to get a specific user
 * out of scope for now.
 */
export const getUserData = async (_params?: unknown): Promise<UserData> => {
  // we might want to use some params to get a specific user
  return getRandomUserData();
};

/**
 * based on gender, age, and superhero score calculate the invisibility score
 * return a normalised score between 0 and 100
 */
export const getInvisibilityScore = (
  _superheroScore: number,
  _age: number,
  _gender: Gender,
): number => {
  // const maleGenderWeighting = 5;
  // const femaleGenderWeighting = 8;
  /**
   * calculate score
   * normalise score
   * return score
   */
  return 1;
};

export const normaliseScore = (_score: number): number => {
  // figure out how to normalise the score
  // figure out min and max scores
  return 1;
};
