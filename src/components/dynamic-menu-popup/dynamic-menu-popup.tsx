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
      <Host class={!this.open ? ' hidden' : ''}>
        <slot></slot>
      </Host>
    );
  }

}
