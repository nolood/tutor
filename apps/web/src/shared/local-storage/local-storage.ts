import { ZodSchema } from "zod";
import { EStorageKey } from "./types/e-storage-key";

export class LocalStorage<T> {
  private schema: ZodSchema<T>;

  constructor(schema: ZodSchema<T>) {
    this.schema = schema;
  }

  public setValue(value: T, key: EStorageKey): void {
    const parseResult = this.schema.safeParse(value);
    if (!parseResult.success) {
      throw new Error(`Invalid key ${key}: ${parseResult.error.message}`);
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getValue(key: EStorageKey): T | null {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }

    try {
      const parsedValue = JSON.parse(item);
      const parseResult = this.schema.safeParse(parsedValue);
      if (!parseResult.success) {
        throw new Error(`Invalid  key ${key}: ${parseResult.error.message}`);
      }
      return parsedValue;
    } catch (error) {
      console.error(`Error in key ${key}:`, error);
      return null;
    }
  }

  public deleteValue(key: EStorageKey): void {
    localStorage.removeItem(key);
  }
}
