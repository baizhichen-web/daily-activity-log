export type PosterWallItem = {
  no: string;
  title: string;
  date: string;
  accent: string;
  slug?: string;
  desc: { zh: string; en: string };
  body: { zh: string[]; en: string[] };
};

export const POSTER_WALL: PosterWallItem[];
