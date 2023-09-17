type Gender = 'male' | 'female';
export interface UserData {
  name: string;
  dob: string;
  age: number;
  gender: Gender;
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
  return { name: '', dob: '', age: 1, gender: 'male' };
};

/**
 * return a random user from https://randomuser.me/api/
 * optional params might be specified, to get a specific user
 * out of scope for now.
 */
export const getUserData = async (_params: unknown): Promise<UserData> => {
  // we might want to use some params to get a specific user
  return getRandomUserData();
};

/**
 * based on gender, age, and superhero score calculate the invisibility score
 * return a normalised score between 0 and 100
 */
export const getInvisibilityScore = (
  superheroScore: number,
  age: number,
  gender: Gender,
): number => {
  const maleGenderWeighting = 5;
  const femaleGenderWeighting = 8;
  /**
   * calculate score
   * normalise score
   * return score
   */
  return 1;
};

export const normaliseScore = (score: number): number => {
  // figure out how to normalise the score
  // figure out min and max scores
  return 1;
};
