import { User } from './models/User';

const user = new User({ name: 'Rose', age: 31 });

console.log(user.get('name'));
console.log(user.get('age'));

user.set({
  name: 'skye',
});

console.log(user.get('name'));
console.log(user.get('age'));
