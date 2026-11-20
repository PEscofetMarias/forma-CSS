/*
 * Minimal static server for CodeSandbox previews.
 *
 * CodeSandbox detects package.json when importing from GitHub and boots the
 * repository as a Node sandbox, running "npm start". Without this file the
 * sandbox has no server and the preview stays blank.
 *
 * Not part of the npm package (see "files" in package.json).
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent((req.url || "/").split("?")[0]);

    // The root of the repository hosts no index.html: land on the kitchen sink.
    if (url === "/") {
      res.writeHead(302, { Location: "/examples/examples.html" });
      return res.end();
    }

    let file = path.join(ROOT, path.normalize(url));
    if (!file.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end();
    }
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404, { "Content-Type": MIME[".html"] });
      return res.end("<!doctype html><meta charset='utf-8'><h1>404</h1>");
    }

    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => console.log("Serving the repository on :" + PORT));
