import { User, UserProps } from '../models/User';
import { EventMap, View } from './View';

// loadedin user model and properties with user
export class UserForm extends View<User, UserProps> {
  eventsMap(): EventMap {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    };
  }

  onSaveClick = (): void => {
    console.log('hello');
    this.model.save();
  };
  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  template(): string {
    return `
        <div>
            <input placeholder="${this.model.get('name')}" type='text'>
            <button class="set-name">Change Name</button>
            <button class="set-age">Set Random Age</button>
            <button class="save-model">Save User</button>
        </div>
    `;
  }
}
