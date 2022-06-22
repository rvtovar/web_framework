import axios, { AxiosResponse } from 'axios';
interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  events: {
    [key: string]: Callback[];
  } = {};
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

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];

    handlers.push(callback);

    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length == 0) return;

    handlers.forEach((callback) => callback());
  }

  async fetch(): Promise<void> {
    try {
      const res: AxiosResponse = await axios.get(
        `http://localhost:3000/users/${this.get('id')}`
      );

      this.set(res.data);
    } catch (e) {
      throw new Error('User not Found');
    }
  }
}
