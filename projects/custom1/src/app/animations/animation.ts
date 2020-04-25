export abstract class Animation {

    abstract start(el: HTMLElement, properties?: any):Promise<any>;
}