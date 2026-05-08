const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const INDEX_FILE = path.join(ROOT_DIR, 'index.html');
const STYLES_FILE = path.join(ROOT_DIR, 'styles.css');
const SCRIPT_FILE = path.join(ROOT_DIR, 'script.js');

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=UTF-8'
};

function getLocalUrls(port) {
    const interfaces = os.networkInterfaces();
    const urls = ['http://localhost:' + port];

    Object.values(interfaces).forEach(entries => {
        (entries || []).forEach(entry => {
            if (entry.family === 'IPv4' && !entry.internal) {
                urls.push(`http://${entry.address}:${port}`);
            }
        });
    });

    return [...new Set(urls)];
}

function sendFile(filePath, response) {
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                response.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
                response.end('404 Not Found');
                return;
            }

            response.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
            response.end('500 Internal Server Error');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        response.writeHead(200, {
            'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
            'Cache-Control': ['.html', '.css', '.js'].includes(ext) ? 'no-cache' : 'public, max-age=3600'
        });
        response.end(content);
    });
}

function inlinePageAssets(html, styles, script) {
    const styleTagPattern = /<link rel="stylesheet" href="\/styles\.css(?:\?[^"]*)?">\s*/i;
    const scriptTagPattern = /<script src="\/script\.js(?:\?[^"]*)?"><\/script>\s*/i;

    return html
        .replace(styleTagPattern, `<style>\n${styles}\n</style>\n`)
        .replace(scriptTagPattern, `<script>\n${script}\n</script>\n`);
}

function sendIndex(response) {
    fs.readFile(INDEX_FILE, 'utf8', (htmlError, html) => {
        if (htmlError) {
            response.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
            response.end('500 Internal Server Error');
            return;
        }

        fs.readFile(STYLES_FILE, 'utf8', (stylesError, styles) => {
            if (stylesError) {
                response.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
                response.end('500 Internal Server Error');
                return;
            }

            fs.readFile(SCRIPT_FILE, 'utf8', (scriptError, script) => {
                if (scriptError) {
                    response.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
                    response.end('500 Internal Server Error');
                    return;
                }

                response.writeHead(200, {
                    'Content-Type': 'text/html; charset=UTF-8',
                    'Cache-Control': 'no-cache'
                });
                response.end(inlinePageAssets(html, styles, script));
            });
        });
    });
}

function resolvePath(urlPath) {
    const decodedPath = decodeURIComponent(urlPath);
    const safePath = path.normalize(decodedPath).replace(/^(\.\.[\\/])+/, '');
    const requestedPath = safePath === '/' ? '/index.html' : safePath;
    return path.join(ROOT_DIR, requestedPath);
}

function isAssetRequest(urlPath) {
    return path.extname(urlPath) !== '';
}

const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, `http://${request.headers.host}`);
    let filePath = resolvePath(requestUrl.pathname);

    fs.stat(filePath, (error, stats) => {
        if (!error && stats.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }

        fs.access(filePath, fs.constants.F_OK, accessError => {
            if (!accessError) {
                if (path.resolve(filePath) === path.resolve(INDEX_FILE)) {
                    sendIndex(response);
                    return;
                }

                sendFile(filePath, response);
                return;
            }

            if (isAssetRequest(requestUrl.pathname)) {
                response.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
                response.end('404 Not Found');
                return;
            }

            // Fallback for client-side navigation and unmatched routes.
            sendIndex(response);
        });
    });
});

server.listen(PORT, () => {
    const urls = getLocalUrls(PORT);
    console.log('Clean Slate server running at:');
    urls.forEach(url => {
        console.log(`  ${url}`);
    });
});
