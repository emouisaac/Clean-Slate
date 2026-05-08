const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const INDEX_FILE = path.join(ROOT_DIR, 'index.html');

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
            'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
        });
        response.end(content);
    });
}

function resolvePath(urlPath) {
    const safePath = path.normalize(urlPath).replace(/^(\.\.[\\/])+/, '');
    const requestedPath = safePath === '/' ? '/index.html' : safePath;
    return path.join(ROOT_DIR, requestedPath);
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
                sendFile(filePath, response);
                return;
            }

            // Fallback for client-side navigation and unmatched routes.
            sendFile(INDEX_FILE, response);
        });
    });
});

server.listen(PORT, () => {
    console.log(`Clean Slate server running on port ${PORT}`);
});
