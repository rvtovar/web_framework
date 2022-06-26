import { User } from '../models/User';
interface EventMap {
  [key: string]: () => void;
}

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  bindModel = (): void => {
    this.model.on('change', () => this.render());
  };

  eventsMap(): EventMap {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
    };
  }

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
            <h1>User Form</h1>
            <div>
                name:${this.model.get('name')}
            </div>
            <div>
                age:${this.model.get('age')}
            </div>
            <input type='text'>
            <button class="set-name">Change Name</button>
            <button class="set-age">Set Random Age</button>
        </div>
    `;
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach((elem) => {
        elem.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  render(): void {
    this.parent.innerHTML = '';
    const tmeplateElement = document.createElement('template');
    tmeplateElement.innerHTML = this.template();

    this.bindEvents(tmeplateElement.content);
    this.parent.append(tmeplateElement.content);
  }
}
