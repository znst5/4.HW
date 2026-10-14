import './css/style.css';
import { CardValidatorWidget } from './js/widget';


document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#widget-container') || document.body;
  const widget = new CardValidatorWidget(container);
  widget.init();
});
