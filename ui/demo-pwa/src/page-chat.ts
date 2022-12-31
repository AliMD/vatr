import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

import '@alwatr/ui-kit/chat/chat.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-chat': AlwatrPageHome;
  }
}

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-chat')
export class AlwatrPageHome extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: block;
      padding: 0 var(--alwatr-sys-spacing-side-padding);
      box-sizing: border-box;
    }
    :host,
    alwatr-chat {
      height: 100%;
    }

    alwatr-elevated-card,
    alwatr-filled-card,
    alwatr-outlined-card {
      margin-bottom: 1em;
    }
  `;

  override render(): unknown {
    super.render();
    return html`
      <alwatr-chat></alwatr-chat>
    `;
  }
}
