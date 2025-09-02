// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function notFound(_req, res) {
    res.status(404).json({ message: 'Not Found' });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err, _req, res, _next) {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message });
}
//# sourceMappingURL=errorHandler.js.map