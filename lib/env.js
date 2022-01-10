export function isDevelopment() {
    const env = process.env.NODE_ENV;

    if (env === 'development') {
        return true;
    }

    return false;
}
