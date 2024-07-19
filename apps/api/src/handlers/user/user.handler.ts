import { Handler } from "../handler.class";

export class UserHandlers extends Handler {
  prefix = "/users";

  getAll = () =>
    this.api.get("/all", (req, reply) => {
      reply.send("hello");
    });

  getOne = () =>
    this.api.get("/", (req, reply) => {
      reply.send({ kek: "lol" });
    });
}
