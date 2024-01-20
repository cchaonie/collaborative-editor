import { middleware } from "sharedb";

export const applyMiddleware = (
  context: middleware.ApplyContext,
  next: () => void
) => {
  // implementation to be added
  next();
};
