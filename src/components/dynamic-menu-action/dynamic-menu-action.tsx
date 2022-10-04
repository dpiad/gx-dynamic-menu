import { Component, Host, h, Prop, State, Method, Event } from '@stencil/core';
import { EventEmitter } from '@stencil/core/internal';

@Component({
  tag: 'dynamic-menu-action',
  styleUrl: 'dynamic-menu-action.css',
  shadow: true,
})
export class DynamicMenuAction {

  @Event() activeEmit: EventEmitter<MenuActionActiveEvent>;

  @Prop() itemTitle: string;
  @Prop() itemSubtitle: string;
  @Prop() popupId: string;
  @State() active: boolean = false;

  activeHandler() {
    this.activeEmit.emit({active: this.active, item: this});
  }

  @Method()
  async activeItem(a: boolean = true) {
    this.active = a;
  }

  render() {
    return (
      <Host>
        <div class={`item ${this.active ? 'active' : ''}`} onClick={_ => this.activeHandler()}>
          <div class="item-data">
            <div class="title">
              {this.itemTitle}
            </div>
            <div class="subtitle">
              {this.itemSubtitle}
            </div>
            <slot></slot>
          </div>
          <div class="item-right">
            <slot name="right"></slot>
          </div>
        </div>
      </Host>
    );
  }

}

export interface MenuActionActiveEvent {
  active: boolean;
  item: DynamicMenuAction;
}
