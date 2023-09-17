import fetch from 'node-fetch';

type Gender = 'male' | 'female';

export interface UserData {
  name: string;
  dob: string;
  age: number;
  gender: Gender;
  seed: string;
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
  const { seed } = data.info;

  return { name, dob, age, gender, seed };
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

export const getNormalisedScore = (score: number, gender: Gender): number => {
  /**
   * approximation for min/max
   * let's assume that the max age of a hero is 66 before they retire
   * and the minimum age is 18
   * the absolute minimum score a female hero can get is 0 while her age can be 66
   * so the minimum score can be 8 * (0 - 66) = -528
   * the absolute maximum score that a female hero can get is 100 while her age can be 18
   * so the maximum score can be 8 * (100 - 18) = 704
   * //the min/max scores could be better approximated, after looking at more data, age distribution, etc.
   * ----------------
   * female min score is 8 * (0 - 66) = -528
   * female max score is 8 * (100 - 18) = 704
   *
   * male min score is 5 * (0 - 66) = -330
   * male max score is 5 * (100 - 18) = 410
   */
  const minMaxScores = {
    female: {
      min: -528,
      max: 704,
    },
    male: {
      min: -330,
      max: 410,
    },
  };

  const normalisedScore =
    ((score - minMaxScores[gender].min) /
      (minMaxScores[gender].max - minMaxScores[gender].min)) *
    100;
  return Math.floor(normalisedScore);
};

/**
 * based on gender, age, and superhero score calculate the invisibility score
 * return a normalised score between 0 and 100
 */
export const getInvisibilityScore = ({
  superheroScore,
  age,
  gender,
}: {
  superheroScore: number;
  age: number;
  gender: Gender;
}): number => {
  const genderWeighting = {
    male: 5,
    female: 8,
  };
  const weight = genderWeighting[gender];
  const score = weight * (superheroScore - age);
  return getNormalisedScore(score, gender);
};

/**
 * return the invisibility status based on the score
 * 0 - 19 : Not invisible
 * 20 - 39 : Camouflage
 * 40 - 59 : Translucent
 * 60 - 79 : Transparent
 * 80 - 100 : Invisible
 */
export const getInvisibilityStatus = (score: number): string => {
  switch (true) {
    case score < 20:
      return 'Not invisible';
    case score < 40:
      return 'Camouflage';
    case score < 60:
      return 'Translucent';
    case score < 80:
      return 'Transparent';
    default:
      return 'Invisible';
  }
};
