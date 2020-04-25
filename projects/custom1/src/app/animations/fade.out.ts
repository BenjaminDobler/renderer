import { gsap, Power2, Elastic } from 'gsap/all';
import { Animation } from './animation';


export class FadeOutAnimation extends Animation {

    start(el) {
        return new Promise((resolve) => {
            gsap.to(el, {
                duration: 0.3, opacity: 0, onComplete: () => {
                    resolve();
                }
            });
        });

    }

}