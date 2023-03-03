import type { NextApiRequest, NextApiResponse } from 'next';

import instance from '../../../utils/axiosInstance';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page } = req.query;

  try {
    const { data } = await instance.get(
      `/movie/popular?page=${page}&api_key=${process.env.API_KEY}`
    );

    res.status(200).send({ data });
  } catch (error) {
    res.status(400).send({ error });
  }
}
