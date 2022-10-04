import { Component, Host, h, Listen } from '@stencil/core';
import { MenuActionActiveEvent } from '../dynamic-menu-action/dynamic-menu-action';

@Component({
  tag: 'dynamic-menu',
  styleUrl: 'dynamic-menu.css',
  shadow: true,
})
export class DynamicMenu {

  componentWillLoad(){
    document.addEventListener("mousedown", async (e: any) => {
      let activeActionMenuBig = false;
      let inactiveMenuItems = true;
      let hidePopups = true;
      for (const path of e.path.reverse()){
        if(path.className === 'menu-big-data')
          inactiveMenuItems = false;
        if(path.nodeName === 'DYNAMIC-MENU-ACTION')
          activeActionMenuBig = path;
        if(path.nodeName === 'DYNAMIC-MENU-POPUP'){
          inactiveMenuItems = false;
          hidePopups = false;
        }
      }


      if(hidePopups){
        await this.hidePopup();
      }
      if(inactiveMenuItems){
        await this.inactiveMenuItems();
      }

      if(activeActionMenuBig){
        // if(activeActionMenuBig == e.target){
          await this.inactiveMenuItems();
          await this.activateMenuAction(activeActionMenuBig);
        // }
      }
    });
  }

  @Listen('activeEmit')
  activeEmitHandler(event: CustomEvent<MenuActionActiveEvent>) {
    this.actionClick(event.detail);
  }

  async actionClick(_cmpEv: MenuActionActiveEvent){
    // await this.inactiveMenuItems();

    // if(cmpEv && !cmpEv.active){
    //   const popupItem: any = document.querySelector(`#${cmpEv.item.popupId}`);
    //   await cmpEv.item.activeItem();
    //   await popupItem.openItem();
    // }
  }

  async activateMenuAction(aElement: any){
    if(aElement){
      const popupItem: any = document.querySelector(`#${aElement.popupId}`);
      await aElement.activeItem();
      await popupItem.openItem();
    }
  }

  async inactiveMenuItems(){
    await customElements.whenDefined('dynamic-menu-action');
    const actionListElements = document.querySelectorAll('dynamic-menu-action');
    for(let aElement of actionListElements){
      await aElement.activeItem(false);
    }
  }

  async hidePopup(){
    await customElements.whenDefined('dynamic-menu-popup');
    const popupListElements = document.querySelectorAll('dynamic-menu-popup');
    for(let pElement of popupListElements){
      await pElement.openItem(false);
    }
  }

  render() {
    return (
      <Host>
        <div class="menu-container">
          <div class="menu-data">
            <slot name="menu-items"></slot>
            <div class="menu-popup">
              <slot name="menu-popup"></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
