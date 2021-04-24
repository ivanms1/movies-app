import type { NextApiRequest, NextApiResponse } from 'next';

import instance from '../../../utils/axiosInstance';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, query } = req.query;

  if (page && query) {
    const { data } = await instance.get(
      `/search/movie?query=${query}&page=${page}&include_adult=false&api_key=${process.env.API_KEY}`
    );

    res.status(200).send({ data });
  } else {
    res.status(200).send({ data: null });
  }
};
