import { component, View } from "flagwind-web";
import maps from "flagwind-map";
import { InfoWindowComponent } from "src/components/widgets";
import * as codes from "doc/codes";

import "./index.less";

@component({ template: require("./index.html") })
export default class OverlayView extends View {
    protected code: object = codes.widgets;
    protected point = {
        longitude: 118.7135,
        latitude: 37.1468,
        data: { id: "5", name: "李妈", longitude: 118.7135, latitude: 37.1468 }
    };
}
