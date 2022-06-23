import { Sync } from './Sync';
import { Eventing } from './Eventing';
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}
const rootUrl = 'http://localhost:3000/users';

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps): void {
    this.data = {
      ...this.data,
      ...update,
    };
  }
}
