import Layout from '@manage/component/Layout';
import Router from 'vue-router';
// import _ from 'lodash';

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
            meta: {
                name: '封面设置',
                icon: "clone"
            },

            // children: [{
            //     path: '/test',
            //     component: () =>
            //         import('@manage/page/login'),
            //     meta: {
            //         name: '测试',
            //     }
            // }, ]
        },
        {
            path: 'type',
            component: () =>
                import('@manage/page/type/index'),
            meta: {
                name: '分类管理',
                icon: "list-alt"
            }
        },
        {
            path: 'product',
            component: () =>
                import('@manage/page/product/index'),
            meta: {
                name: '产品管理',
                icon: "store"
            }
        }
    ]
}];

function genRoute(arr, paths, prefix) {
    var navList = [],
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
                navList.push(...genRoute(item.children, [], url));

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

                navList.push(pitem);
                pitem.children = genRoute(item.children, prePath, url);
            }

        } else {
            item.meta.paths = [...paths, {
                name: item.meta.name
            }]

            navList.push({
                url: url,
                name: item.meta.name,
                icon: item.meta.icon,
                // paths: [...paths, {
                //     name: item.meta.name
                // }]
            })
        }
    });

    return navList;
}

const navList = genRoute(routes);

// //生成2级目录，因为router-view只有两级, 多层使用的可以忽略，针对后台系统
// function genSecondRoutes(arr, second, prefix) {
//     var routes = [],
//         prefix = prefix || '';

//     arr.forEach(item => {
//         var url = prefix + item.path;

//         item.path = url;

//         if (item.children) {

//             if (!second) {
//                 routes.push(item);
//             }

//             // console.log('*******************');
//             // console.log(item);

//             genRoute(item.children, item.children || [], url);

//         } else {
//             second ? second.push(item) : routes.push(item);
//         }
//     });

//     return routes;
// }


const router = new Router({
    routes
});

export {
    router,
    navList,
    // genRoute
}