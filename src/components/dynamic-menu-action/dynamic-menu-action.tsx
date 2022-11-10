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
  @Prop() readonly activeClass: string;
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
      <Host
        role="button"
        tabindex="0"
        aria-expanded={(!!this.active).toString()}
        aria-controls={this.popupId}
        class={{
          [this.cssClass]: !!this.cssClass,
          [this.activeClass]: !!this.activeClass && this.active,
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
          <slot name="data"></slot>
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
