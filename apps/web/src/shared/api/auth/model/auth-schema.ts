import { z } from "zod";

export const authSchema = z.string() // пока на беке нет refresh-tokena оно будет так чтобы не было ошибки ts, 