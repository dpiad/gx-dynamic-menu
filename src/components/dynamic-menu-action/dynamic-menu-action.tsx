import { Component, Host, h, Prop, State, Method, Event } from '@stencil/core';
import { EventEmitter } from '@stencil/core/internal';

@Component({
  tag: 'dynamic-menu-action',
  styleUrl: 'dynamic-menu-action.css',
  shadow: true,
})
export class DynamicMenuAction {

  @Event() activeEmit: EventEmitter<MenuActionActiveEvent>;

  @Prop() readonly cssClass: string;
  @Prop() itemTitle: string;
  @Prop() itemSubtitle: string;
  @Prop() popupId: string;
  @State() active: boolean = false;

  activeHandler() {
    console.log('hola')
    this.activeEmit.emit({active: this.active, item: this});
  }

  @Method()
  async activeItem(a: boolean = true) {
    this.active = a;
  }

  render() {
    return (
      <Host
        class={{
          [this.cssClass]: !!this.cssClass,
          active: this.active,
        }}
        onClick={_ => this.activeHandler()}
        >
        <div class="item-data">
          <div class="title" part="title" exportparts="title">
            {this.itemTitle}
          </div>
          <div class="subtitle" part="subtitle" exportparts="subtitle">
            {this.itemSubtitle}
          </div>
          <slot></slot>
        </div>
        <div class="item-right" part="item-right" exportparts="item-right">
          <slot name="right"></slot>
        </div>
      </Host>
    );
  }

}

export interface MenuActionActiveEvent {
  active: boolean;
  item: DynamicMenuAction;
}
