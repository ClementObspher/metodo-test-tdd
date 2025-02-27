import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()

  .use(swagger())
  .get("/", "hi")
  .listen(3001);

export default app;
