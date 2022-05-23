import {
    onRequestGet as originalOnRequestGet
} from '../[id]';

export function onRequestGet(data) {
    return originalOnRequestGet({
        ...data,
        assetName: '/table'
    });
}
