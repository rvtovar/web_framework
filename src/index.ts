import { UserEdit } from './views/UserEdit';
import { User } from './models/User';

const root = document.getElementById('root');
if (root) {
  const userEdit = new UserEdit(
    root,
    User.buildUser({ name: 'Celty', age: 5 })
  );

  userEdit.render();

  console.log(userEdit);
} else {
  throw new Error('Root Element Not found');
}
