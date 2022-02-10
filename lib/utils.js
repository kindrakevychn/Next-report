export function isAbsoluteURL(url) {
    if (url.indexOf('://') > 0 || url.indexOf('//') === 0) {
        return true;
    }

    return false;
}
