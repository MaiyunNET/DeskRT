interface ICGCoreLib {
    'clickgoFiles': Record<string, Blob>;
    'globalEvents': ICGGlobalEvents;
    trigger(name: TCGGlobalEvent, taskId?: number, formId?: number, opt?: {
        'title'?: string;
        'state'?: boolean;
        'icon'?: string;
    }): void;
    fetchClickGoFile(path: string): Promise<null | Blob>;
    readApp(blob: Blob): Promise<false | ICGAppPkg>;
    fetchApp(url: string): Promise<null | ICGAppPkg>;
}

/** --- 全局事件 --- */
interface ICGGlobalEvents {
    /** --- 配置捕获 Vue 错误 --- */
    errorHandler: null | ((taskId: number, formId: number, error: any, info: string) => void);
    /** --- 当屏幕大小改变时触发的事件 --- */
    screenResizeHandler: null | (() => void | Promise<void>);
    /** --- 窗体被创建后触发 --- */
    formCreatedHandler: null | ((taskId: number, formId: number, title: string, icon: string) => void | Promise<void>);
    /** --- 窗体被移除后触发 --- */
    formRemovedHandler: null | ((taskId: number, formId: number, title: string, icno: string) => void | Promise<void>);
    /** --- 窗体标题被改变后触发 --- */
    formTitleChangedHandler: null | ((taskId: number, formId: number, title: string) => void | Promise<void>);
    /** --- 窗体图标被改变后触发 --- */
    formIconChangedHandler: null | ((taskId: number, formId: number, icon: string) => void | Promise<void>);
    /** --- 窗体最小化状态改变后触发 --- */
    formStateMinChangedHandler: null | ((taskId: number, formId: number, state: boolean) => void | Promise<void>);
    /** --- 窗体最大化状态改变后触发 --- */
    formStateMaxChangedHandler: null | ((taskId: number, formId: number, state: boolean) => void | Promise<void>);
    /** --- 窗体获得焦点后触发 --- */
    formFocusedHandler: null | ((taskId: number, formId: number) => void | Promise<void>);
    /** --- 窗体丢失焦点后触发 --- */
    formBlurredHandler: null | ((taskId: number, formId: number) => void | Promise<void>);
    /** --- 窗体闪烁时触发 --- */
    formFlashHandler: null | ((taskId: number, formId: number) => void | Promise<void>);
    /** --- 任务开始后触发 --- */
    taskStartedHandler: null | ((taskId: number) => void | Promise<void>);
    /** --- 任务结束后触发 --- */
    taskEndedHandler: null | ((taskId: number) => void | Promise<void>);
}

/** --- 全局事件类型 --- */
type TCGGlobalEvent = 'screenResize' | 'formCreated' | 'formRemoved' | 'formTitleChanged' | 'formIconChanged' | 'formStateMinChanged' | 'formStateMaxChanged' | 'formFocused' | 'formBlurred' | 'formFlash' | 'taskStarted' | 'taskEnded';

/** --- 应用文件包 --- */
interface ICGAppPkg {
    'type': 'app';
    /** --- 应用对象配置文件 --- */
    'config': ICGAppConfig;
    /** --- 所有已加载的文件内容 --- */
    'files': Record<string, Blob>;
}

/** --- 应用文件包 config --- */
interface ICGAppConfig {
    'name': string;
    'ver': number;
    'version': string;
    'author': string;

    /** --- 将要加载的控件 --- */
    'controls': string[];
    /** --- 将自动加载的主题 --- */
    'themes'?: string[];
    /** --- 不带扩展名，系统会在末尾添加 .css --- */
    'style'?: string;
    /** --- 不带扩展名，系统会在末尾添加 .xml --- */
    'main': string;

    /** --- 将要加载的文件列表 --- */
    'files': string[];
}
