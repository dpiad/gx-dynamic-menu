import { Component, Host, h, State, Method } from '@stencil/core';

@Component({
  tag: 'dynamic-menu-popup',
  styleUrl: 'dynamic-menu-popup.css',
  shadow: true,
})
export class DynamicMenuPopup {

  @State() open: boolean = false;

  @Method()
  async openItem(a: boolean = true) {
    this.open = a;
  }

  render() {
    return (
      <Host>
        <div class={'popup-data' + (!this.open ? ' hidden' : '')} part="popup-data" exportparts="popup-data">
          <slot name="data"></slot>
        </div>
      </Host>
    );
  }

}
