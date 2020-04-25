import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[animatable]'
})
export class AnimatableDirective {

  @Input()
  showAnimation: any;
  
  constructor() { }

}
