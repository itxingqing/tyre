import * as user from './user'
import * as type from './type'
import * as product from './product'
import * as banner from './banner'

const apis = {
    user,
    type,
    product,
    banner
}

const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    Object.defineProperties(Vue.prototype, {
        $api: {
            get() {
                return apis
            }
        }
    })
};

export default {
    install
}