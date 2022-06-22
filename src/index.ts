import { User } from './models/User';

const user = new User({ name: 'Rose', age: 31 });

user.on('change', (): void => {
  console.log('hello');
});
user.on('change', (): void => {
  console.log('hello again');
});
user.on('click', (): void => {
  console.log('you clicked sweet');
});

user.trigger('save');
