import { LocalStorage } from "../local-storage";

export class TokenApi extends LocalStorage {
  private readonly tokenKey: string = "access-token";
  public setToken(token: string): void {
    this.setValue(this.tokenKey, token);
  }

  public getToken(): string | null {
    return this.getValue(this.tokenKey);
  }

  public removeToken(): void {
    this.deleteValue(this.tokenKey);
  }
}
