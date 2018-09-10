import Layout from '@manage/component/Layout';
import Router from 'vue-router';

const routes = [{
    //登陆
    path: '/login',
    component: () =>
        import('@manage/page/login'),
    meta: {
        checkAuth: false
    }
}, {
    path: '/',
    component: Layout,
    redirect: '/banner',
    meta: {
        name: '首页',
        checkAuth: true,
    },

    //可以component的用page属性，指定router-view的name
    children: [{
            path: 'banner',
            component: () =>
                import('@manage/page/banner/index'),
                // component: function(resolve) {
                //     require(['@manage/page/banner/index'], resolve);
                // },
            meta: {
                name: '封面设置',
            }
        },
        {
            path: 'type',
            component: () =>
                import('@manage/page/type/index'),
            meta: {
                name: '分类管理',
            }
        },
        {
            path: 'product',
            component: () =>
                import('@manage/page/product/index'),
            meta: {
                name: '产品管理',
            }
        }
    ]
}];

const router = new Router({
    routes
});

// const navList = [];
function genRoute(arr, paths, parent) {
    var navList = [],
        paths = paths || [],
        parent = parent || {
            url: ''
        };

    arr.forEach(item => {

        if (item.children) {
            var pitem = {
                parent: true,
                url: parent.url + item.path,
                name: item.name,
                paths: [...paths, item.name]
            };

            navList.push(pitem);

            genRoute(item.children, pitem.paths, pitem);
        } else {
            navList.push({
                url: parent.url + item.path,
                name: item.meta.name,
                paths: [...paths, item.name]
            })
        }
    });
}

const navList = genRoute(routes);

export {
    router,
    navList
}