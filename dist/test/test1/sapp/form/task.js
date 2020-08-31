"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mounted = exports.methods = exports.data = void 0;
exports.data = {
    'left': 0,
    'top': 0,
    'width': 100,
    'list': []
};
exports.methods = {
    resizeTaskBar: function () {
        let pos = clickgo.getPosition();
        this.top = pos.height;
        this.width = pos.width;
    }
};
exports.mounted = function () {
    this.resizeTaskBar();
    this.setSystemEventListener('screenResize', () => {
        this.resizeTaskBar();
    });
    this.setSystemEventListener('formCreated', (taskId, formId, title) => {
        if (taskId === 1) {
            return;
        }
        this.list.push({ 'taskId': taskId, 'formId': formId, 'title': title });
    });
    this.setSystemEventListener('formRemoved', (taskId, formId, title) => {
        for (let i = 0; i < this.list.length; ++i) {
            if (this.list[i].formId === formId) {
                this.list.splice(i, 1);
                break;
            }
        }
    });
    this.setTopMost(true);
};
