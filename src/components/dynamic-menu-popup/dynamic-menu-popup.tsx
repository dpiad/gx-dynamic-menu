import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dynamic-menu-popup',
  styleUrl: 'dynamic-menu-popup.css',
  shadow: true,
})
export class DynamicMenuPopup {
  @Prop() readonly cssClass: string;
  @Prop() opened = false;

  render() {
    return (
      <Host
        tabindex="0"
        class={{
          [this.cssClass]: !!this.cssClass,
          hidden: !this.opened,
        }}
      >
        <slot name="data"></slot>
      </Host>
    );
  }
}
