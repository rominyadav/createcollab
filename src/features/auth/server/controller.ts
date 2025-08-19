import { Hono } from "hono";

const authController = new Hono().get("/", (c) => {
  return c.json({ message: "Not logged in" });
});

export default authController;
