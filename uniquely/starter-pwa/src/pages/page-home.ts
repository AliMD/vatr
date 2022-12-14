import {AlwatrElement} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import '@alwatr/icon';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}

@customElement('page-home')
export class PageHome extends AlwatrElement {
  static override styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
      }
    `,
  ];

  override connectedCallback(): void {
    super.connectedCallback();

    l10n.resourceChangeSignal.addListener(() => {
      this.requestUpdate();
    });
  }

  override render(): TemplateResult {
    return html`
      <section>
        <h1>
          <alwatr-icon name="home-outline"></alwatr-icon>
          ${l10n.localize('page_home')}
        </h1>
      </section>
    `;
  }
}
