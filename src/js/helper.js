/** @format */

export function qs(selector) {
    return document.querySelector(selector);
}

export function qsAll(selector) {
    return document.querySelectorAll(selector);
}

export function $on(target, type, callback) {
    target.addEventListener(type, callback);
}
