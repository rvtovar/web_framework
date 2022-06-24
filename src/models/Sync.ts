import axios, { AxiosPromise } from 'axios';
interface HasId {
  id?: number;
}
export class Sync<T extends HasId> {
  constructor(public rootUrl: string) {}
  async fetch(id: number): Promise<AxiosPromise> {
    try {
      return await axios.get(`${this.rootUrl}/${id}`);
    } catch (e) {
      throw new Error('User not Found');
    }
  }

  async save(data: T): Promise<AxiosPromise> {
    try {
      const { id } = data;
      if (id) {
        return await axios.put(`${this.rootUrl}/${id}`, data);
      } else {
        return await axios.post(this.rootUrl, data);
      }
    } catch (e) {
      throw new Error('Connection Failed');
    }
  }
}
