import { z, ZodType } from "zod";
import { LocalStorage } from "../local-storage";
import { EStorageKey } from "../types/e-storage-key";

class TokenApi<T> extends LocalStorage<T> {
  public setToken(accessToken: T, refreshToken: T): void {
    this.setValue(accessToken, EStorageKey.AUTH_TOKEN);
    this.setValue(refreshToken, EStorageKey.REFRESH_TOKEN);
  }

  public getToken(): { accessToken: T | null; refreshToken: T | null } {
    return {
      accessToken: this.getValue(EStorageKey.AUTH_TOKEN),
      refreshToken: this.getValue(EStorageKey.REFRESH_TOKEN),
    };
  }

  public removeToken(): void {
    this.deleteValue(EStorageKey.AUTH_TOKEN);
  }
}
export const tokenApi = <T extends ZodType>(schema: z.infer<T>) =>
  new TokenApi(schema);
