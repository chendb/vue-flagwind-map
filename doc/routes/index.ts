/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

const routes =
[
    {
        path: "/",
        redirect: "/intro"
    },
    {
        path: "/intro",
        component: (resolve: any) => (<any>require)(["views/intro.vue"], resolve)
    },
    {
        path: "/point-layer",
        component: (resolve: any) => (<any>require)(["views/point-layer.vue"], resolve)
    },
    {
        path: "/edit-layer",
        component: (resolve: any) => (<any>require)(["views/edit-layer.vue"], resolve)
    },
    {
        path: "/select-box",
        component: (resolve: any) => (<any>require)(["views/select-box.vue"], resolve)
    },
    {
        path: "/track-layer",
        component: (resolve: any) => (<any>require)(["views/track-layer.vue"], resolve)
    },
    {
        path: "/heatmap-layer",
        component: (resolve: any) => (<any>require)(["views/heatmap-layer.vue"], resolve)
    }
];

export default routes;
