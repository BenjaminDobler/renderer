import { BrowserModule, ɵDomRendererFactory2 } from '@angular/platform-browser';
import { NgModule, RendererFactory2 } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomRendererFactory } from './renderer/custom.renderer.factory';
import { FooComponent } from './components/foo/foo.component';
import { AnimatableDirective } from './directives/animatable.directive';


export function instantiateRendererFactory(renderer: ɵDomRendererFactory2, animationRegistry: AnimationRegistry) {
  return new CustomRendererFactory(renderer, animationRegistry);
}
import { CSSPlugin } from 'gsap/CSSPlugin'
import { gsap, Power2, Elastic } from 'gsap/all';
import { AnimationRegistry } from './animations/animation.registry';


// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin)

@NgModule({
  declarations: [
    AppComponent,
    FooComponent,
    AnimatableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AnimationRegistry,
    {
      provide: RendererFactory2,
      useFactory: instantiateRendererFactory,
      deps: [ɵDomRendererFactory2, AnimationRegistry]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
