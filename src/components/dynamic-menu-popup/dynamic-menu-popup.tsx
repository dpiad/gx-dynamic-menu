import { Component, Host, h, State, Method, Prop } from '@stencil/core';

@Component({
  tag: 'dynamic-menu-popup',
  styleUrl: 'dynamic-menu-popup.css',
  shadow: true,
})
export class DynamicMenuPopup {

  @Prop() readonly cssClass: string;
  @State() open: boolean = false;

  @Method()
  async openItem(a: boolean = true) {
    this.open = a;
  }

  render() {
    return (
      <Host
        class={{
          [this.cssClass]: !!this.cssClass,
          hidden: !this.open,
        }}
      >
        <slot></slot>
      </Host>
    );
  }

}
