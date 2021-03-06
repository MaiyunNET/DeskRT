export declare let props: {
    disabled: {
        default: boolean;
    };
    direction: {
        default: string;
    };
    padding: {
        default: undefined;
    };
    value: {
        default: string;
    };
};
export declare let data: {
    popOpen: boolean;
    subPop: undefined;
    popOptions: {
        left: string;
        top: string;
        zIndex: string;
    };
};
export declare let methods: {
    click: (this: IVueControl, event: MouseEvent) => void;
    controlClick: (this: IVueControl, e: MouseEvent) => void;
    showPop: (this: IVueControl, e: MouseEvent) => void;
    hidePop: (this: IVueControl) => void;
};
export declare let unmounted: (this: IVueControl) => void;
