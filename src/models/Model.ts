import { AxiosPromise, AxiosResponse } from 'axios';
interface ModelAttributes<T> {
  set(update: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): Promise<AxiosPromise>;
  save(data: T): Promise<AxiosPromise>;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HadId {
  id?: number;
}

export class Model<T extends HadId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;

  trigger = this.events.trigger;

  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  async fetch(): Promise<void> {
    const id = this.attributes.get('id');
    if (typeof id !== 'number') throw new Error('Cant fetch without an id');

    try {
      const res: AxiosResponse = await this.sync.fetch(id);
      this.set(res.data);
    } catch (e) {
      throw new Error('Could not connect to json');
    }
  }

  async save(): Promise<void> {
    try {
      const res: AxiosResponse = await this.sync.save(this.attributes.getAll());
      this.trigger('save');
    } catch (e) {
      this.trigger('error');
    }
  }
}
