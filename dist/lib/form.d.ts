export declare let popShowing: null | IVueControl;
export declare let lastFormId: number;
export declare let lastZIndex: number;
export declare let lastTopZIndex: number;
export declare let lastPopZIndex: number;
export declare function changeFocus(formId?: number, vm?: IVue): void;
export declare function getRectByDir(dir: TBorderDir): {
    'width': number;
    'height': number;
    'left': number;
    'top': number;
};
export declare function showCircular(x: number, y: number): void;
export declare function moveRectangle(dir: TBorderDir): void;
export declare function showRectangle(x: number, y: number, pos: TBorderDir): void;
export declare function hideRectangle(): void;
export declare function appendToPop(el: HTMLElement): void;
export declare function removeFromPop(el: HTMLElement): void;
export declare function showPop(pop: IVueControl, x: number | 'h' | 'v', y?: number): {
    'left': string;
    'top': string;
    'zIndex': string;
};
export declare function hidePop(pop?: IVue | null): void;
export declare function doFocusAndPopEvent(e: MouseEvent | TouchEvent): void;
export declare function remove(formId: number): boolean;
export declare function create(opt: ICreateFormOptions): Promise<number | IForm>;
