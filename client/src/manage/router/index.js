import Vue from 'vue';
import VueRouter from 'vue-router';
// import _ from 'lodash';

Vue.use(VueRouter);

//指定name，组织数据方便
const routes = [{
    //登陆
    path: '/login',
    component: () =>
        import('@manage/page/login'),
    meta: {
        name: '登录',
        checkAuth: false
    }
}, {
    path: '/',
    component: () => import('@manage/page/layout/Layout'),
    redirect: '/banner',
    meta: {
        name: '首页',
        checkAuth: true,
    },

    //可以component的用page属性，指定router-view的name
    //只支持一个children，不然显示不聊
    children: [{
            path: 'banner',
            component: () =>
                import('@manage/page/banner/Index'),
            meta: {
                name: '封面设置',
                icon: "clone"
            },
        },
        {
            path: 'type',
            component: () =>
                import('@manage/page/type/Index'),
            meta: {
                name: '分类管理',
                icon: "list-alt"
            }
        },
        {
            path: 'product',
            component: () =>
                import('@manage/page/product/Index'),
            meta: {
                name: '产品管理',
                icon: "store"
            }
        }
    ]
}];

function genRoute(arr, paths, prefix) {
    var menu = [],
        paths = paths || [],
        prefix = prefix || '';

    // console.log(arr);

    arr.forEach(item => {
        var url = prefix + item.path;

        //登录页面不计算
        if (url == '/login') {
            return;
        }

        if (item.children) {

            if (item.redirect) {
                menu.push(...genRoute(item.children, [], url));

            } else {
                var pitem = {
                        parent: true,
                        url: url,
                        name: item.meta.name,
                        icon: item.meta.icon,
                        // paths: [...paths, item.meta.name]
                    },
                    prePath = [
                        ...paths,
                        {
                            name: item.meta.name,
                            url: url
                        }
                    ];

                item.meta.paths = [...paths, item.meta.name]

                menu.push(pitem);
                pitem.children = genRoute(item.children, prePath, url);
            }

        } else {
            item.meta.paths = [...paths, {
                name: item.meta.name
            }]

            menu.push({
                url: url,
                name: item.meta.name,
                icon: item.meta.icon,
                // paths: [...paths, {
                //     name: item.meta.name
                // }]
            })
        }
    });

    return menu;
}

const menu = genRoute(routes);

const router = new VueRouter({
    routes
});

export {
    router,
    menu,
    // genRoute
}