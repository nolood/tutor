declare module "fastify-cors" {
  import { FastifyPluginCallback } from "fastify";

  interface FastifyCorsOptions {
    origin?: string | string[] | boolean;
    methods?: string | string[];
    allowedHeaders?: string | string[];
    exposedHeaders?: string | string[];
    credentials?: boolean;
    maxAge?: number;
    preflightContinue?: boolean;
    optionsSuccessStatus?: number;
  }

  const fastifyCors: FastifyPluginCallback<FastifyCorsOptions>;
  export default fastifyCors;
}
