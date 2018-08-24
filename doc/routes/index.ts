/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

const routes = [
    {
        path: "/",
        redirect: "/intro"
    },
    {
        path: "/intro",
        component: (resolve: any) =>
            (<any>require)(["views/intro.vue"], resolve)
    },
    {
        path: "/map",
        component: (resolve: any) => (<any>require)(["views/map"], resolve)
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
    }
];

export default routes;
