import { NextApiRequest, NextApiResponse } from "next";
import { Project } from "../../interfaces";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cursor = parseInt(req.query.cursor as string) || 0;
  const pageSize = 5;

  const data: Project[] = Array.from({ length: pageSize }, (_, i) => {
    const id = i + cursor;
    return {
      id,
      name: `Project ${id}`,
    };
  });

  const nextId = cursor < 100 ? data[data.length - 1].id + 1 : null;
  const previousId = cursor > -100 ? data[0].id - pageSize : null;

  setTimeout(() => res.json({ data, nextId, previousId }), 1000);
}
