type Category = {
  id: number;
  name: string;
  href: string;
  thumbnail: {
    src: string;
    alt: string;
  } | null;
};

export type { Category };
