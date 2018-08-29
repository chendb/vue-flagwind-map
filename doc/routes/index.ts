/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

const routes = [
    {
        name: "main",
        path: "/",
        redirect: "/intro",
        title: "首页",
        component: (resolve: any) => (<any>require)(["views/dashboard"], resolve),
        children: [
            {
                path: "/intro",
                component: (resolve: any) =>
                    (<any>require)(["views/intro"], resolve)
            },
            {
                path: "/map",
                component: (resolve: any) =>
                    (<any>require)(["views/map"], resolve)
            },
            {
                path: "/point-layer",
                component: (resolve: any) =>
                    (<any>require)(["views/point-layer"], resolve)
            },
            {
                path: "/edit-layer",
                component: (resolve: any) =>
                    (<any>require)(["views/edit-layer"], resolve)
            },
            {
                path: "/select-box",
                component: (resolve: any) =>
                    (<any>require)(["views/select-box"], resolve)
            },
            {
                path: "/track-layer",
                component: (resolve: any) =>
                    (<any>require)(["views/track-layer"], resolve)
            },
            {
                path: "/heatmap-layer",
                component: (resolve: any) =>
                    (<any>require)(["views/heatmap-layer"], resolve)
            },
            {
                path: "/info-window",
                component: (resolve: any) =>
                    (<any>require)(["views/info-window"], resolve)
            },
            {
                path: "/overlay",
                component: (resolve: any) =>
                    (<any>require)(["views/overlay"], resolve)
            }
        ]
    }
];

export default routes;
