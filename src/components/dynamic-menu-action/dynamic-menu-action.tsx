import { Component, Host, h, Prop, Event, Element } from '@stencil/core';
import { EventEmitter } from '@stencil/core/internal';

/**
 * @part title - The title of menu action.
 * @part subtitle - The subtitle of menu action.
 * @part item-right - The right part of menu action, where you can put other components.
 *
 * @slot data - The slot where you can put the main data of the action.
 * @slot right - The slot where you can put additional components aligned to the right of the menu action.
 */
@Component({
  tag: 'dynamic-menu-action',
  styleUrl: 'dynamic-menu-action.css',
  shadow: true,
})
export class DynamicMenuAction {
  @Element() el: HTMLDynamicMenuActionElement;

  /**
   * A CSS class to set as the `dynamic-menu-action` element class.
   */
  @Prop() readonly cssClass: string;

  /**
   * A CSS class to set as the `dynamic-menu-action` element class when `active = true`.
   */
  @Prop() readonly activeClass: string;

  /**
   * The title of menu action.
   */
  @Prop() itemTitle: string;

  /**
   * The subtitle of menu action.
   */
  @Prop() itemSubtitle: string;

  /**
   * This attribute specifies which popup of the dynamic-menu must be open.
   */
  @Prop() popupId: string;

  /**
   * This attribute lets you specify if the menu action is activated
   */
  @Prop({ mutable: true }) active = false;

  /**
   * Fired when the menu action is activated.
   */
  @Event() menuActionActivated: EventEmitter<MenuActionActiveEvent>;

  /**
   * Fired when a KeyboardEvent is captured for the menu action.
   */
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
