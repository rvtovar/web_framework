import { User } from './models/User';

const user = new User({ id: 1 });

user.events.on('click', () => console.log('clicked'));
user.events.trigger('click');
