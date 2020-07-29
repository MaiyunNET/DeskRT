export let props = {
    "height": {
        "default": undefined
    },

    "same": {
        "default": false
    },

    "data": {
        "default": []
    }
};

export let data = {
    "widthData": undefined,
    "open": false
};

export let methods = {
    onHide: function(this: IVue): void {
        // --- 检测是否有打开的子 pop 统一关掉 ---
        for (let item of this.$children) {
            if (!item.popOpen) {
                continue;
            }
            ClickGo.hidePop(item.$children[0]);
        }
    }
};

export let mounted = function(this: IVue): void {
    ClickGo.appendToPop(this.$el);
};

export let destroyed = function(this: IVue): void {
    ClickGo.removeFromPop(this.$el);
};
