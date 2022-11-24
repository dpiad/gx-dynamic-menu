import { Component, Host, h, Prop, Event, Element } from '@stencil/core';
import { EventEmitter } from '@stencil/core/internal';

@Component({
  tag: 'dynamic-menu-action',
  styleUrl: 'dynamic-menu-action.css',
  shadow: true,
})
export class DynamicMenuAction {
  @Element() el: HTMLDynamicMenuActionElement;

  @Prop() readonly cssClass: string;
  @Prop() readonly activeClass: string;
  @Prop() itemTitle: string;
  @Prop() itemSubtitle: string;
  @Prop() popupId: string;
  @Prop({ mutable: true }) active = false;

  @Event() menuActionActivated: EventEmitter<MenuActionActiveEvent>;
  @Event() menuActionKeyDown: EventEmitter<KeyboardEvent>;

  componentWillLoad() {
    this.el.addEventListener('click', this.handleActionClick);
    this.el.addEventListener('keydown', this.handleActionKeyDown);
  }

  private handleActionClick = () => {
    const actionExpanded = this.el.getAttribute('aria-expanded') === 'true';
    this.active = !actionExpanded;
    this.menuActionActivated.emit({ active: !actionExpanded, item: this.el as HTMLDynamicMenuActionElement });
  };

  private handleActionKeyDown = (event: KeyboardEvent) => {
    this.menuActionKeyDown.emit(event);
  };

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
  item: HTMLDynamicMenuActionElement;
}
