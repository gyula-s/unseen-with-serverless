import type { NextFunction, Request, Response } from 'express';

import {
  getInvisibilityScore,
  getInvisibilityStatus,
  getUserData,
} from '@/utils';

export const scoreController = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  /**
   * 1. using fetch get a user from: https://randomuser.me/api/
   * 2. calculate the invisibility score:
   * Male genderWeighting: 5, Female genderWeighting: 8
   * Invisibility Score = genderWeighting * (superHeroTestScore - age)
   * normalise score between 0 and 100
   * 3. calculate invisibility status based on the score:
   * 0 - 20 : Not invisible
   * 20 - 40 : Camouflage
   * 40 - 60 : Translucent
   * 60 - 80 : Transparent
   * 80 - 100 : Invisible
   * 4. generate CVS file with the following columns:
   * user data(gender, name, dob, age,), superhero test score, invisibility score and status.
   * return the csv file as a response
   * 5. consider API GW, Cognito, or custom code in the handler to authenticate the request
   * 6. consider large traffic and how to handle it
   * 7. consider logging, monitoring, and alerting
   */

  const { superheroScore } = req.body;
  if (typeof superheroScore !== 'number') {
    res.status(400).json({
      error: 'INVALID INPUT. superheroScore is not a number',
      body: req.body,
    });
    return;
  }
  if (superheroScore < 0 || superheroScore > 100) {
    res.status(400).json({
      error: 'INVALID INPUT. superheroScore is out of range. 0-100',
      body: req.body,
    });
    return;
  }

  const userData = await getUserData();
  const { age, gender } = userData;
  const invisibilityScore = getInvisibilityScore({
    superheroScore,
    age,
    gender,
  });

  const invisibilityStatus = getInvisibilityStatus(invisibilityScore);

  const compiledData = {
    superheroScore,
    invisibilityScore,
    invisibilityStatus,
    ...userData,
  };
  /**
   * generate CSV file
   * save the file to s3 (key should be the seed id)
   * and return the json
   */

  res.json(compiledData);
};
