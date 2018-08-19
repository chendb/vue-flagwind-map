// declare module "vue/types/vue" {
//     import Vuex from "vuex";
//     interface Vue {
//         $store: any;
//         $route: any;
//     }
// }

declare module "flagwind-web/dist/typings/common/component" {
     import { Component, View } from "flagwind-web";
    // import Vuex from "vuex";
    interface Component extends Component {
        $store: any;
    }
}
declare module "*.vue" {
    import Vue from "vue";
    // import Vuex from "vuex";
    export default Vue;
}
