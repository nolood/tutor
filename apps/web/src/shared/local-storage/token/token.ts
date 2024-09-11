import { z, ZodType } from "zod";
import { LocalStorage } from "../local-storage";
import { EStorageKey } from "../types/e-storage-key";

class TokenApi<T> extends LocalStorage<T> {

  public setToken(token: T): void {
    this.setValue(token, EStorageKey.AUTH_TOKEN);
  }

  public getToken(): T | null {
    return this.getValue(EStorageKey.AUTH_TOKEN);
  }

  public removeToken(): void {
    this.deleteValue(EStorageKey.AUTH_TOKEN);
  }
}
export const tokenApi = <T extends ZodType>(schema: z.infer<T>) => new TokenApi(schema)
