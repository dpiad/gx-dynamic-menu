/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { MenuActionActiveEvent } from "./components/dynamic-menu-action/dynamic-menu-action";
export namespace Components {
    interface DynamicMenu {
    }
    interface DynamicMenuAction {
        "activeItem": (a?: boolean) => Promise<void>;
        "itemSubtitle": string;
        "itemTitle": string;
        "popupId": string;
    }
    interface DynamicMenuPopup {
        "openItem": (a?: boolean) => Promise<void>;
    }
}
export interface DynamicMenuActionCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDynamicMenuActionElement;
}
declare global {
    interface HTMLDynamicMenuElement extends Components.DynamicMenu, HTMLStencilElement {
    }
    var HTMLDynamicMenuElement: {
        prototype: HTMLDynamicMenuElement;
        new (): HTMLDynamicMenuElement;
    };
    interface HTMLDynamicMenuActionElement extends Components.DynamicMenuAction, HTMLStencilElement {
    }
    var HTMLDynamicMenuActionElement: {
        prototype: HTMLDynamicMenuActionElement;
        new (): HTMLDynamicMenuActionElement;
    };
    interface HTMLDynamicMenuPopupElement extends Components.DynamicMenuPopup, HTMLStencilElement {
    }
    var HTMLDynamicMenuPopupElement: {
        prototype: HTMLDynamicMenuPopupElement;
        new (): HTMLDynamicMenuPopupElement;
    };
    interface HTMLElementTagNameMap {
        "dynamic-menu": HTMLDynamicMenuElement;
        "dynamic-menu-action": HTMLDynamicMenuActionElement;
        "dynamic-menu-popup": HTMLDynamicMenuPopupElement;
    }
}
declare namespace LocalJSX {
    interface DynamicMenu {
    }
    interface DynamicMenuAction {
        "itemSubtitle"?: string;
        "itemTitle"?: string;
        "onActiveEmit"?: (event: DynamicMenuActionCustomEvent<MenuActionActiveEvent>) => void;
        "popupId"?: string;
    }
    interface DynamicMenuPopup {
    }
    interface IntrinsicElements {
        "dynamic-menu": DynamicMenu;
        "dynamic-menu-action": DynamicMenuAction;
        "dynamic-menu-popup": DynamicMenuPopup;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dynamic-menu": LocalJSX.DynamicMenu & JSXBase.HTMLAttributes<HTMLDynamicMenuElement>;
            "dynamic-menu-action": LocalJSX.DynamicMenuAction & JSXBase.HTMLAttributes<HTMLDynamicMenuActionElement>;
            "dynamic-menu-popup": LocalJSX.DynamicMenuPopup & JSXBase.HTMLAttributes<HTMLDynamicMenuPopupElement>;
        }
    }
}