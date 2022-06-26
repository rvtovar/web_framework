// import { UserEdit } from './views/UserEdit';
// import { User } from './models/User';

// const root = document.getElementById('root');
// if (root) {
//   const userEdit = new UserEdit(
//     root,
//     User.buildUser({ name: 'Celty', age: 5 })
//   );

//   userEdit.render();

//   console.log(userEdit);
// } else {
//   throw new Error('Root Element Not found');
// }

import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { User, UserProps } from './models/User';

const users = new Collection('http://localhost:3000/users', (json: UserProps) =>
  User.buildUser(json)
);

users.on('change', () => {
  const root = document.getElementById('root');
  if (root) {
    new UserList(root, users).render();
  } else {
    throw new Error('No Root Found');
  }
});

users.fetch();
