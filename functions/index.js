import {
    NotFound
} from '../lib/response';

export function onRequestGet({env, request}) {
    return NotFound(env, request);
}
