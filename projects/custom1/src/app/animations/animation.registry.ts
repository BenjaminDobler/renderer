

import { FadeInAnimation } from './fade.in';
import { FadeOutAnimation } from './fade.out';
import { Animation } from './animation';



export class AnimationRegistry {
    animations: Map<string, Animation> = new Map<string, Animation>();

    constructor() {
        this.animations.set('fade-in', new FadeInAnimation());
        this.animations.set('fade-out', new FadeOutAnimation());

    }
}
