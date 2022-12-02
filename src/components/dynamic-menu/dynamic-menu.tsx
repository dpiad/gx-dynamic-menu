import { Component, Host, h, Prop, Element, Listen } from '@stencil/core';
import { MenuActionActiveEvent } from '../dynamic-menu-action/dynamic-menu-action';

const ENTER_KEY_CODE = 'Enter';
const ESCAPE_KEY_CODE = 'Escape';
const SPACE_KEY_CODE = 'Space';
const ARROWUP_KEY_CODE = 'ArrowUp';
const ARROWLEFT_KEY_CODE = 'ArrowLeft';
const ARROWDOWN_KEY_CODE = 'ArrowDown';
const ARROWRIGHT_KEY_CODE = 'ArrowRight';
const HOME_KEY_CODE = 'Home';
const END_KEY_CODE = 'End';

/**
 * @part menu-content - The container of dynamic-menu.
 *
 * @slot menu-items - The slot where live the menu actions.
 * @slot menu-popup - The slot where live the menu popups.
 */
@Component({
  tag: 'dynamic-menu',
  styleUrl: 'dynamic-menu.css',
  shadow: true,
})
export class DynamicMenu {
  private menuActions: HTMLDynamicMenuActionElement[] = [];
  private menuPopups: HTMLDynamicMenuPopupElement[] = [];
  private openIndex = null;

  @Element() el: HTMLDynamicMenuElement;

  /**
   * A CSS class to set as the `dynamic-menu` element class.
   */
  @Prop() readonly cssClass: string;

  componentWillLoad() {
    this.menuActions = [...this.el.querySelectorAll('dynamic-menu-action')];
    this.el.addEventListener('focusout', this.onBlur);
  }

  componentDidLoad() {
    this.menuActions.forEach(action => {
      // handle action + popup
      if (action.hasAttribute('aria-controls')) {
        const popup: HTMLDynamicMenuPopupElement = this.el.querySelector(`dynamic-menu-popup#${action.getAttribute('aria-controls')}`);
        if (popup !== null && popup !== undefined) {
          // save ref controlled popup
          this.menuPopups.push(popup);

          // collapse popup
          this.activateMenuPopup(popup, false);
        }
      }
    });
  }

  @Listen('menuActionActivated')
  handleActionActivated(event: CustomEvent<MenuActionActiveEvent>) {
    const actionIndex = this.menuActions.indexOf(event.detail.item);
    this.toggleExpand(actionIndex, event.detail.active);
  }

  /**
   * Listen when a KeyboardEvent is captured for some menu action, and manage what doing for some keys.
   * Space, Enter: Activates the menu action.
   * Esc: Inactivated menu action if is active and close the popup open if correspond.
   * ArrowUp, ArrowDown, ArrowLeft, ArrowRight: Navigate for the menu actions, putting them focused.
   * Home, End: Navigate to the first or last menu action.
   */
  @Listen('menuActionKeyDown')
  handleActionKeyDown(event: CustomEvent<KeyboardEvent>) {
    const keyboardEvent = event.detail;
    const targetActionIndex = this.menuActions.indexOf(document.activeElement as HTMLDynamicMenuActionElement);

    // close on escape
    if (keyboardEvent.code === ESCAPE_KEY_CODE) {
      keyboardEvent.preventDefault();
      this.menuActions[targetActionIndex].active = false;
      this.toggleExpand(this.openIndex, false);
    } else if (keyboardEvent.code === SPACE_KEY_CODE || keyboardEvent.code === ENTER_KEY_CODE) {
      keyboardEvent.preventDefault();
      this.menuActions[targetActionIndex].active = this.openIndex !== targetActionIndex;
      this.toggleExpand(targetActionIndex, this.openIndex !== targetActionIndex);
    } else {
      this.controlFocusByKey(keyboardEvent, targetActionIndex);
    }
  }

  private onBlur = (event: FocusEvent) => {
    const menuContainsFocus = this.el.contains(event.relatedTarget as HTMLElement);
    if (!menuContainsFocus && this.openIndex !== null) {
      this.closeOpenAction();
      this.toggleExpand(this.openIndex, false);
    }
  };

  toggleExpand(index: number, expanded: boolean) {
    // close open menu, if applicable
    if (this.openIndex !== index) {
      this.closeOpenAction();
      this.toggleExpand(this.openIndex, false);
    }

    // handle menu at called index
    if (this.menuActions[index] !== null && this.menuActions[index] !== undefined) {
      this.openIndex = expanded ? index : null;
      this.activateMenuPopup(this.menuPopups[index], expanded);
    }
  }

  closeOpenAction() {
    if (this.openIndex !== null) this.menuActions[this.openIndex].active = false;
  }

  activateMenuPopup(popupItem: HTMLDynamicMenuPopupElement, open: boolean) {
    if (popupItem !== null && popupItem !== undefined) {
      popupItem.opened = open;
    }
  }

  controlFocusByKey(keyboardEvent: KeyboardEvent, currentIndex: number) {
    switch (keyboardEvent.code) {
      case ARROWUP_KEY_CODE:
      case ARROWLEFT_KEY_CODE:
        keyboardEvent.preventDefault();
        if (currentIndex > -1) {
          const prevIndex = Math.max(0, currentIndex - 1);
          this.menuActions[prevIndex].focus();
        }
        break;
      case ARROWDOWN_KEY_CODE:
      case ARROWRIGHT_KEY_CODE:
        keyboardEvent.preventDefault();
        if (currentIndex > -1) {
          const nextIndex = Math.min(this.menuActions.length - 1, currentIndex + 1);
          this.menuActions[nextIndex].focus();
        }
        break;
      case HOME_KEY_CODE:
        keyboardEvent.preventDefault();
        this.menuActions[0].focus();
        break;
      case END_KEY_CODE:
        keyboardEvent.preventDefault();
        this.menuActions[this.menuActions.length - 1].focus();
        break;
    }
  }

  render() {
    return (
      <Host
        class={{
          [this.cssClass]: !!this.cssClass,
        }}
      >
        <div class="menu-content" part="menu-content" exportparts="menu-content">
          <slot name="menu-items"></slot>
          <div class="menu-popup">
            <slot name="menu-popup"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
