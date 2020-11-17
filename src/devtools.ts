
type toolType = 'console' | 'elements' | 'network' | 'resource' | 'info' | 'snippets' | 'sources' | 'code' | 'dom' | 'fps' | 'features';

const defaultTools = ['console', 'elements', 'network', 'resource', 'info', 'snippets', 'sources'] as Array<toolType>;
const allTools = [...defaultTools, 'code', 'dom', 'fps', 'features'] as Array<toolType>;

interface IConfig {
    container?: any;
    smart?: boolean;
    tool?: Array<toolType> | 'all';
}

function debug(config?: IConfig) {
    const eruda = require('eruda');
    const erudaDom = require('eruda-dom');
    const erudaCode = require('eruda-code');
    const erudaFeatures = require('eruda-features');
    const erudaFps = require('eruda-fps');

    let opts = config || { tool: defaultTools, smart: false };
    if (!opts.tool || (!Array.isArray(opts.tool) && opts.tool !== 'all')) {
        opts.tool = defaultTools;
    }
    if (opts.tool === 'all') {
        opts.tool = allTools;
    }

    if (/__debug__=0/.test(window.location.href)) {
        localStorage.setItem('__debug__', '');
    }

    if (!opts.smart || (opts.smart && (
        /__debug__=1/.test(window.location.href) ||
        localStorage.getItem('__debug__') === '1'))) {
        localStorage.setItem('__debug__', '1');

        if (!eruda) {
            console.log('eruda not found.');
            return;
        }
        console.log('devtools opts:', opts);
        eruda.init(opts);
        // load more plugins
        if (opts.tool!.includes('fps')) {
            eruda.add(erudaFps);
        }
        if (opts.tool!.includes('features')) {
            eruda.add(erudaFeatures);
        }
        if (opts.tool!.includes('code')) {
            eruda.add(erudaCode);
        }
        if (opts.tool!.includes('dom')) {
            eruda.add(erudaDom);
        }
    }

}

export default function init (config?: IConfig) {
    if (process.env.NODE_ENV === 'development') {
        debug(config);
    }
}