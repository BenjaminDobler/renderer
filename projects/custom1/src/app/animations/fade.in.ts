
import { gsap, Power2, Elastic } from 'gsap/all';
import { Animation } from './animation';

export class FadeInAnimation extends Animation {

    start(el, properties?: any) {



        return new Promise((resolve) => {
            let p = {
                duration: 0.3, 
                opacity: 0, 
                onComplete: () => {
                    resolve();
                },
                ...properties
            }
            gsap.from(el, p);

        });

    }

}