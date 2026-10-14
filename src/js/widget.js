import { validateLuhn, getCardPaySystem } from './validators';

export class CardValidatorWidget {
  constructor(container) {
    this.container = container;
  }

  init() {
    this.form = this.container.querySelector('#card-validator-form');
    this.input = this.container.querySelector('#card-number-input');
    this.cardsList = this.container.querySelector('.cards-list');

    if (!this.form || !this.input || !this.cardsList) {
      console.error("Не удалось найти необходимые элементы виджета в DOM");
      return;
    }

    this.input.addEventListener('input', () => this.onInput());

    this.form.addEventListener('submit', (e) => this.onSubmit(e));

  }

  onInput() {
    const value = this.input.value.trim();

    this.cardsList.className = 'cards-list';
    const paySystem = getCardPaySystem(value);

    if (paySystem) {
      this.cardsList.classList.add(`${paySystem}-active`);
    } 

    this.input.classList.remove('valid', 'invalid');
    }
 

  onSubmit(e) {
    e.preventDefault();
    const value = this.input.value.trim();
    this.input.classList.remove('valid', 'invalid');

    if (validateLuhn(value)) {
      this.input.classList.add('valid');
    } else {
      this.input.classList.add('invalid');
    }
  }
}
