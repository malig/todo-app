import isFunction from 'lodash/isFunction';

export function trigger(name, data) {
    const callback = this.props[name];

    isFunction(callback) && callback.call(this, data);
}