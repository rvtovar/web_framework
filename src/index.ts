import { UserForm } from './views/UserForm';
import { User } from './models/User';

const root = document.getElementById('root');
if (root) {
  const userForm = new UserForm(
    root,
    User.buildUser({ name: 'Celty', age: 5 })
  );

  userForm.render();
} else {
  throw new Error('Root Element Not found');
}
