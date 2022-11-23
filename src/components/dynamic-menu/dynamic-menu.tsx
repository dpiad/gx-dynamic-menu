import { Component, Host, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'dynamic-menu',
  styleUrl: 'dynamic-menu.css',
  shadow: true,
})
export class DynamicMenu {

  @Element() el: HTMLElement;
  @Prop() readonly cssClass: string;

  topLevelNodes = [];
  controlledNodes = [];
  openIndex = null;

  componentWillLoad(){

    this.topLevelNodes = [
      ...this.el.querySelectorAll(
        'dynamic-menu-action'
      ),
    ];

    this.el.addEventListener('focusout', this.onBlur.bind(this));
  }

  componentDidLoad(){

    this.topLevelNodes.forEach((node) => {
      // handle action + popup
      if (
        node.hasAttribute('aria-controls')
      ) {
        const popup = this.el.querySelector(`dynamic-menu-popup#${node.getAttribute('aria-controls')}`);
        if (popup) {
          // save ref controlled popup
          this.controlledNodes.push(popup);

          // collapse popup
          this.activateMenuAction(node, false);
          this.activateMenuPopup(popup, false);

          // attach event listeners
          node.addEventListener('click', this.onActionClick.bind(this));
          node.addEventListener('keydown', this.onActionKeyDown.bind(this));
        }
      }
      node.addEventListener('click', this.onActionClick.bind(this));
    });
  }

  onActionClick(event) {
    let action = event.target;
    console.log( action.hasAttribute('aria-controls'))
    let actionIndex = this.topLevelNodes.indexOf(action);
    let actionExpanded = action.getAttribute('aria-expanded') === 'true';
    this.toggleExpand(actionIndex, !actionExpanded);
  }

  onActionKeyDown(event) {
    let targetActionIndex = this.topLevelNodes.indexOf(document.activeElement);

    // close on escape
    if (event.code === 'Escape') {
      this.toggleExpand(this.openIndex, false);
    }
    else if (event.code === 'Space' || event.code === 'Enter') {
      this.toggleExpand(targetActionIndex, this.openIndex !== targetActionIndex);
    }
    else {
      this.controlFocusByKey(event, this.topLevelNodes, targetActionIndex);
    }
  }

  toggleExpand(index, expanded) {
    // close open menu, if applicable
    if (this.openIndex !== index) {
      this.toggleExpand(this.openIndex, false);
    }

    // handle menu at called index
    if (this.topLevelNodes[index]) {
      this.openIndex = expanded ? index : null;
      this.activateMenuAction(this.topLevelNodes[index], expanded);
      this.activateMenuPopup(this.controlledNodes[index], expanded);
    }
  }

  controlFocusByKey(keyboardEvent, nodeList, currentIndex) {
    switch (keyboardEvent.code) {
      case 'ArrowUp':
      case 'ArrowLeft':
        keyboardEvent.preventDefault();
        if (currentIndex > -1) {
          var prevIndex = Math.max(0, currentIndex - 1);
          nodeList[prevIndex].focus();
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        keyboardEvent.preventDefault();
        if (currentIndex > -1) {
          var nextIndex = Math.min(nodeList.length - 1, currentIndex + 1);
          nodeList[nextIndex].focus();
        }
        break;
      case 'Home':
        keyboardEvent.preventDefault();
        nodeList[0].focus();
        break;
      case 'End':
        keyboardEvent.preventDefault();
        nodeList[nodeList.length - 1].focus();
        break;
    }
  }

  async activateMenuAction(aElement: any, active){
    if(aElement){
      await aElement.activeItem(active);
    }
  }

  async activateMenuPopup(popupItem: any, open){
    if(popupItem){
      await popupItem.openItem(open);
    }
  }

  onBlur(event) {
    var menuContainsFocus = this.el.contains(event.relatedTarget);
    if (!menuContainsFocus && this.openIndex !== null) {
      this.toggleExpand(this.openIndex, false);
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
