import * as users from './users'
import * as type from './type'
import * as product from './product'
import * as banner from './banner'

const apis = {
    users,
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