import type { NextApiRequest, NextApiResponse } from 'next';

import instance from '../../../utils/axiosInstance';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { movieId } = req.query;

  try {
    const { data } = await instance.get(
      `/movie/${movieId}?api_key=${process.env.API_KEY}`
    );

    res.status(200).send({ data });
  } catch (error) {
    res.status(400).send({ error });
  }
}
