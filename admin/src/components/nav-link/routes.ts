export const router = [
  { path: "/" },
  { path: "/about" },
  { path: "/users/:id" },
  { path: "/product" },
  { path: "/product/create" },
] as const;

export type RoutePath = (typeof router)[number]["path"];
