export const router = [
  { path: "/" },
  { path: "/about" },
  { path: "/users/:id" },
  { path: "/product" },
  { path: "/product/create" },
  { path: "/product/update/:id" },
] as const;

export type RoutePath = (typeof router)[number]["path"];
