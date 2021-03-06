/**
 * Copyright 2021 Han Guoshuai <zohegs@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** --- clickgo 已经加载的文件列表 --- */
export let clickgoFiles: Record<string, Blob> = {};

/** --- 全局响应事件 --- */
export let globalEvents: ICGGlobalEvents = {
    errorHandler: null,
    screenResizeHandler: null,
    formCreatedHandler: null,
    formRemovedHandler: null,
    formTitleChangedHandler: null,
    formIconChangedHandler: null,
    formStateMinChangedHandler: null,
    formStateMaxChangedHandler: null,
    formFocusedHandler: null,
    formBlurredHandler: null,
    formFlashHandler: null,
    taskStartedHandler: null,
    taskEndedHandler: null
};

/**
 * --- 主动触发系统级事件 ---
 */
export function trigger(name: TCGGlobalEvent, taskId: number = 0, formId: number = 0, opt: { 'title'?: string; 'state'?: boolean; 'icon'?: string; } = {}): void {
    switch (name) {
        case 'screenResize': {
            const rtn = globalEvents.screenResizeHandler?.();
            if (rtn instanceof Promise) {
                rtn.catch((e) => {
                    throw e;
                });
            }
            for (let tid in clickgo.task.list) {
                let task = clickgo.task.list[tid];
                for (let fid in task.forms) {
                    const rtn = task.forms[fid].events[name]?.();
                    if (rtn instanceof Promise) {
                        rtn.catch((e) => {
                            throw e;
                        });
                    }
                }
            }
            break;
        }
        case 'formCreated':
        case 'formRemoved': {
            if ((globalEvents as any)[name + 'Handler']) {
                (globalEvents as any)[name + 'Handler'](taskId, formId, opt.title, opt.icon);
            }
            for (let tid in clickgo.task.list) {
                let task = clickgo.task.list[tid];
                for (let fid in task.forms) {
                    const rtn = task.forms[fid].events[name]?.(taskId, formId, opt.title, opt.icon);
                    if (rtn instanceof Promise) {
                        rtn.catch((e) => {
                            throw e;
                        });
                    }
                }
            }
            break;
        }
        case 'formTitleChanged': {
            const rtn = globalEvents.formTitleChangedHandler?.(taskId, formId, opt.title ?? '');
            if (rtn instanceof Promise) {
                rtn.catch((e) => {
                    throw e;
                });
            }
            for (let tid in clickgo.task.list) {
                let task = clickgo.task.list[tid];
                for (let fid in task.forms) {
                    const rtn = task.forms[fid].events[name]?.(taskId, formId, opt.title);
                    if (rtn instanceof Promise) {
                        rtn.catch((e) => {
                            throw e;
                        });
                    }
                }
            }
            break;
        }
        case 'formIconChanged': {
            const rtn = globalEvents.formIconChangedHandler?.(taskId, formId, opt.icon ?? '');
            if (rtn instanceof Promise) {
                rtn.catch((e) => {
                    throw e;
                });
            }
            for (let tid in clickgo.task.list) {
                let task = clickgo.task.list[tid];
                for (let fid in task.forms) {
                    const rtn = task.forms[fid].events[name]?.(taskId, formId, opt.icon);
                    if (rtn instanceof Promise) {
                        rtn.catch((e) => {
                            throw e;
                        });
                    }
                }
            }
            break;
        }
        case 'formStateMinChanged':
        case 'formStateMaxChanged': {
            (globalEvents as any)[name + 'Handler']?.(taskId, formId, opt.state);
            for (let tid in clickgo.task.list) {
                let task = clickgo.task.list[tid];
                for (let fid in task.forms) {
                    const rtn = task.forms[fid].events[name]?.(taskId, formId, opt.state);
                    if (rtn instanceof Promise) {
                        rtn.catch((e) => {
                            throw e;
                        });
                    }
                }
            }
            break;
        }
        case 'formFocused':
        case 'formBlurred':
        case 'formFlash': {
            (globalEvents as any)[name + 'Handler']?.(taskId, formId);
            for (let tid in clickgo.task.list) {
                let task = clickgo.task.list[tid];
                for (let fid in task.forms) {
                    const rtn = task.forms[fid].events[name]?.(taskId, formId);
                    if (rtn instanceof Promise) {
                        rtn.catch((e) => {
                            throw e;
                        });
                    }
                }
            }
            break;
        }
        case 'taskStarted':
        case 'taskEnded': {
            if ((globalEvents as any)[name + 'Handler']) {
                (globalEvents as any)[name + 'Handler'](taskId, formId);
            }
            for (let tid in clickgo.task.list) {
                let task = clickgo.task.list[tid];
                for (let fid in task.forms) {
                    const rtn = task.forms[fid].events[name]?.(taskId);
                    if (rtn instanceof Promise) {
                        rtn.catch((e) => {
                            throw e;
                        });
                    }
                }
            }
            break;
        }
    }
}

/**
 * --- 从 cg 目录加载文件（若是已经加载的文件不会再次加载） ---
 * @param path clickgo 文件路径
 */
export async function fetchClickGoFile(path: string): Promise<null | Blob> {
    // --- 判断是否加载过 ---
    if (clickgoFiles[path]) {
        return clickgoFiles[path];
    }
    // --- 加载 clickgo 文件 ---
    try {
        let blob = await (await fetch(clickgo.cgRootPath + path.slice(1) + '?' + Math.random())).blob();
        let lio = path.lastIndexOf('.');
        let ext = lio === -1 ? '' : path.slice(lio + 1).toLowerCase();
        switch (ext) {
            case 'cgc': {
                // --- 控件文件 ---
                let pkg = await clickgo.control.read(blob);
                if (!pkg) {
                    return null;
                }
                clickgo.control.clickgoControlPkgs[path] = pkg;
                break;
            }
            case 'cgt': {
                // --- 主题文件 ---
                let theme = await clickgo.theme.read(blob);
                if (!theme) {
                    return null;
                }
                clickgo.theme.clickgoThemePkgs[path] = theme;
                break;
            }
        }
        clickgoFiles[path] = blob;
        return clickgoFiles[path];
    }
    catch {
        return null;
    }
}

/**
 * --- cga 文件 blob 转 IAppPkg 对象 ---
 * @param blob blob 对象
 */
export async function readApp(blob: Blob): Promise<false | ICGAppPkg> {
    let zip = await clickgo.zip.getZip(blob);
    if (!zip) {
        return false;
    }
    // --- 开始读取文件 ---
    let files: Record<string, Blob> = {};
    /** --- 配置文件 --- */
    let configContent = await zip.getContent('/config.json');
    if (!configContent) {
        return false;
    }
    let config: ICGAppConfig = JSON.parse(configContent);
    for (let file of config.files) {
        let fab = await zip.getContent(file, 'arraybuffer');
        if (!fab) {
            continue;
        }
        let mimeo = clickgo.tool.getMimeByPath(file);
        files[file] = new Blob([fab], {
            'type': mimeo.mime
        });
    }
    if (!config) {
        return false;
    }
    return {
        'type': 'app',
        'config': config,
        'files': files
    };
}

/**
 * --- 从网址下载应用，相应的 clickgo 依赖 control 和 theme 会被下载和初始化 ---
 * @param url 相对、绝对或 cg 路径，以 / 结尾的目录 ---
 */
export async function fetchApp(url: string): Promise<null | ICGAppPkg> {
    // --- 判断是通过目录加载，还是 cga 文件 ---
    let isCga: boolean = false;
    if (!url.endsWith('/')) {
        let lio = url.lastIndexOf('.');
        let ext = lio === -1 ? '' : url.slice(lio + 1).toLowerCase();
        if (ext !== 'cga') {
            return null;
        }
        isCga = true;
    }

    // --- 获取绝对路径 ---
    let realUrl;
    if (url.startsWith('clickgo/')) {
        realUrl = clickgo.tool.urlResolve(clickgo.cgRootPath, url.slice(8));
    }
    else {
        realUrl = clickgo.tool.urlResolve(clickgo.rootPath, url);
    }

    // --- 如果是 cga 文件，直接下载并交给 readApp 函数处理 ---
    if (isCga) {
        try {
            let blob = await (await fetch(realUrl + '?' + Math.random())).blob();
            return await readApp(blob) || null;
        }
        catch {
            return null;
        }
    }

    // --- 加载目录 ---
    // --- 加载 json 文件，并创建 control 信息对象 ---
    let config: ICGAppConfig;
    // --- 已加载的 files ---
    let files: Record<string, Blob> = {};
    try {
        config = await (await fetch(realUrl + 'config.json?' + Math.random())).json();
        // --- 将预加载文件进行加载 ---
        for (let file of config.files) {
            if (file.startsWith('/clickgo/')) {
                continue;
            }
            files[file] = await (await fetch(realUrl + file.slice(1) + '?' + Math.random())).blob();
        }
    }
    catch {
        return null;
    }
    return {
        'type': 'app',
        'config': config,
        'files': files
    };
}
