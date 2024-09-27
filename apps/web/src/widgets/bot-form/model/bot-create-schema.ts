import { z } from "zod";

export const botCreateSchema = z.object({
  callbacks: z.object({
    key: z.object({
      keyBoard: z.array(
        z.array(
          z.object({
            callback: z.string(),
            text: z.string(),
          })
        )
      ),
      message: z.string(),
    }),
  }),
});
