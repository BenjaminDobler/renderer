
import { RendererFactory2, RendererType2, Renderer2, RendererStyleFlags2 } from '@angular/core';

import {ɵgetLContext} from '@angular/core';
import { AnimationRegistry } from '../animations/animation.registry';


export class CustomRenderer implements Renderer2 {

    constructor(private delegate: Renderer2, private animationRegistry: AnimationRegistry) {
        console.log("Rend ", this.delegate);
        this.destroyNode = this.delegate.destroyNode ? (n) => delegate.destroyNode!(n) : null;

    }

    get data(): { [key: string]: any; } {
        throw new Error("Method not implemented.");
    }

    destroy(): void {
        this.delegate.destroy();
    }

    createElement(name: string, namespace?: string) {
        console.log("createElement: ", name);
        
        return this.delegate.createElement(name, namespace);
    }
    createComment(value: string) {
        return this.delegate.createText(value);
    }
    createText(value: string) {
        return this.delegate.createText(value);
    }
    destroyNode: (node: any) => void;
    appendChild(parent: any, newChild: any): void {
        this.delegate.appendChild(parent, newChild);
        console.log('appendChild: append new child ', newChild);
        if (newChild.hasAttribute && newChild.hasAttribute('animation-enter')) {
            const enterAnimationKey = newChild.getAttribute('animation-enter');
            console.log('appendChild: We have a animation ', enterAnimationKey);
            const animation = this.animationRegistry.animations.get(enterAnimationKey);
            animation.start(newChild)
        }


    }
    insertBefore(parent: any, newChild: any, refChild: any): void {
        console.log("insertBefore ", newChild);
        this.delegate.insertBefore(parent, newChild, refChild);
        if (newChild.hasAttribute && newChild.hasAttribute('animation-enter')) {
            const parts = newChild.getAttribute('animation-enter').split(':');
            const enterAnimationKey = parts[0];
            let props = {};
            if (parts.length > 1) {
                props = parts[1].split(';').reduce((props, val)=>{
                    const p = val.split('=');
                    props[p[0]] = p[1];
                    return props;
                }, {});
            }

            const animation = this.animationRegistry.animations.get(enterAnimationKey);
            animation.start(newChild, props);
        }
    }
    removeChild(parent: any, oldChild: any, isHostElement?: boolean): void {
        if (oldChild.hasAttribute('animation-leave')) {
            const leaveAnimationKey = oldChild.getAttribute('animation-leave');
            const animation = this.animationRegistry.animations.get(leaveAnimationKey);
            animation.start(oldChild).then(()=>{
                this.delegate.removeChild(parent, oldChild, isHostElement);
            });
        } else {
            this.delegate.removeChild(parent, oldChild, isHostElement);
        }
    }
    selectRootElement(selectorOrNode: any, preserveContent?: boolean) {
        return this.delegate.selectRootElement(selectorOrNode, preserveContent);
    }
    parentNode(node: any) {
        return this.delegate.parentNode(node);
    }
    nextSibling(node: any) {
        return this.delegate.nextSibling(node);
    }
    setAttribute(el: any, name: string, value: string, namespace?: string): void {
        console.log("Set Attr ", el, name, value);
        const con = ɵgetLContext(el);
        console.log(con);
        this.delegate.setAttribute(el, name, value, namespace);
    }
    removeAttribute(el: any, name: string, namespace?: string): void {
        this.delegate.removeAttribute(el, name, namespace);
    }
    addClass(el: any, name: string): void {
        this.delegate.addClass(el, name);
    }
    removeClass(el: any, name: string): void {
        this.delegate.removeClass(el, name);
    }
    setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void {
        this.delegate.setStyle(el, style, value, flags);
    }
    removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {
        this.delegate.removeStyle(el, style, flags);
    }
    setProperty(el: any, name: string, value: any): void {
        this.delegate.setProperty(el, name, value);
    }
    setValue(node: any, value: string): void {
        console.log("Set value ", node, value);
        this.delegate.setValue(node, value);
    }
    listen(target: any, eventName: string, callback: (event: any) => boolean | void): () => void {
        if (eventName === '$onEnter-moveIn') {
            setTimeout(()=>{
                console.log(callback);
                callback('yoooooo');

            }, 200);
        }
        console.log("Listen ", eventName, target, callback);
        
        return this.delegate.listen(target, eventName, callback)
    }


}




