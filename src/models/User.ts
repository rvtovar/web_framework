import { Sync } from './Sync';
import { Eventing } from './Eventing';
import { Attributes } from './Attributes';
import { AxiosResponse } from 'axios';
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}
const rootUrl = 'http://localhost:3000/users';

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
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
