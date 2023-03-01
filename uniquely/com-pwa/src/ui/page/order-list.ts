import {
  customElement,
  css,
  html,
  LocalizeMixin,
  mapObject,
  SignalMixin,
  AlwatrBaseElement,
  UnresolvedMixin,
  StateMachineMixin,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/icon-box.js';

import {pageOrderListFsm} from '../../manager/controller/order-list.js';
import '../stuff/order-item-box.js';


declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-list': AlwatrPageOrderList;
  }
}

/**
 * List of all orders
 */
@customElement('alwatr-page-order-list')
export class AlwatrPageOrderList extends StateMachineMixin(
    pageOrderListFsm,
    UnresolvedMixin(LocalizeMixin(SignalMixin(AlwatrBaseElement))),
) {
  static override styles = css`
    :host {
      display: block;
      padding: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }

    :host > * {
      margin-bottom: var(--sys-spacing-track);
    }
  `;

  override render(): unknown {
    this._logger.logMethod('render');
    return this[`render_${this.stateMachine.state.to}`]?.();
  }

  render_loading(): unknown {
    this._logger.logMethod('render_loading');
    return message('loading');
  }

  render_reloading(): unknown {
    this._logger.logMethod('render_reloading');
    return this.render_list();
  }

  render_list(): unknown {
    this._logger.logMethod('render_list');
    const gotState = this.stateMachine.state.to;
    // prettier-ignore
    return [
      mapObject(this, this.stateMachine.context.orderStorage?.data, (order) => {
        return html`<alwatr-order-item-box .order=${order}></alwatr-order-item-box>`;
      }),
      html`
        <div>
          <alwatr-button
            .icon=${'reload-outline'}
            signal-id="page_order_list_reload_click_event"
            elevated
            ?disabled=${gotState === 'reloading'}
          >${message(gotState === 'reloading' ? 'loading' : 'reload')}</alwatr-button>
          <alwatr-button
            .icon=${'add-outline'}
            signal-id="new_order_click_event"
            elevated
          >${message('new_order_button')}</alwatr-button>
        </div>
      `,
    ];
  }
}
