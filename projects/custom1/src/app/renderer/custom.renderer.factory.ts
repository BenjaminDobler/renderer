
import { RendererFactory2, RendererType2, Renderer2 } from '@angular/core';
import { CustomRenderer } from './custom.renderer';
import {ɵgetLContext} from '@angular/core';
import { AnimationRegistry } from '../animations/animation.registry';


export class CustomRendererFactory implements RendererFactory2 {

    constructor(private delegate: RendererFactory2, private animationRegistry: AnimationRegistry) {

    }

    createRenderer(hostElement: any, type: RendererType2): Renderer2 {
        console.log('createRenderer - hostElement', hostElement);
        console.log("createRenderer - Type ", type);
        const delegate = this.delegate.createRenderer(hostElement, type);
        console.log("createRenderer - Delegate ", delegate);
        const renderer = new CustomRenderer(delegate, this.animationRegistry);
        
        return renderer;

    }
    begin?(): void {
        this.delegate.begin();
    }
    end?(): void {
        this.delegate.end();
    }
    whenRenderingDone?(): Promise<any> {
        return this.delegate.whenRenderingDone();
    }


    
}