import { UserProps } from './User';

export class Attributes<T> {
  constructor(private data: T) {}

  // the type of K can only be one of the keys of T, and it will return the type that is located at T[K]
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set = (update: T): void => {
    this.data = {
      ...this.data,
      ...update,
    };
  };

  getAll(): T {
    return this.data;
  }
}
