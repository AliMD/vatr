import {css, customElement} from '@alwatr/element';

import {AlwatrCard} from './card.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-outlined-card': AlwatrOutlinedCard;
  }
}

/**
 * Alwatr outlined card element.
 */
@customElement('alwatr-outlined-card')
export class AlwatrOutlinedCard extends AlwatrCard {
  static override styles = [
    ...AlwatrCard.styles,
    css`
      :host {
        color: var(--md-sys-color-on-background);
        background-color: var(--md-sys-color-background);
        border: 1px solid var(--md-sys-color-outline);
      }
    `,
  ];
}
