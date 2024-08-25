import supertest from "supertest";

import { Server } from "~/server";
import { EModule } from "~/types/types";

describe("server", () => {
  const server = new Server(true);

  it("Check routes available", async () => {
    const api = await server.start();

    for (const module of Object.values(EModule)) {
      await supertest(api.server)
        .get(`/${module}/test`)
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then((res) => {
          expect(res.body).toBe(true);
        });
    }

    await server.stop();
  });
});
