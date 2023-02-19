import {html, customElement} from '@alwatr/element';
import '@alwatr/font/vazirmatn.css';
import {AlwatrPwaElement} from '@alwatr/pwa-helper/pwa-element.js';
import '@alwatr/ui-kit/style/mobile-only.css';
import '@alwatr/ui-kit/style/theme/color.css';
import '@alwatr/ui-kit/style/theme/palette-85.css';

import './app-footer.js';
import './director/index.js';

import type {RoutesConfig} from '@alwatr/router';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa': AlwatrPwa;
  }
}

/**
 * Alwatr PWA Root Element
 */
@customElement('alwatr-pwa')
class AlwatrPwa extends AlwatrPwaElement {
  protected override _routesConfig: RoutesConfig = {
    routeId: (routeContext) => routeContext.sectionList[0]?.toString(),
    templates: {
      'home': () => {
        import('./page-home.js');
        return html`<alwatr-page-home>...</alwatr-page-home>`;
      },
      '_404': () => {
        import('./page-404.js');
        return html`<alwatr-page-404>...</alwatr-page-404>`;
      },
      'order': () => {
        import('./page-order/page-order.js');
        return html`<alwatr-page-order></alwatr-page-order>`;
      },
    },
  };

  protected override _navigationBarTemplate(): unknown {
    return html`<alwatr-app-footer></alwatr-app-footer>`;
  }
}
