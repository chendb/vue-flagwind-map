import { component, View } from "flagwind-web";
import * as codes from "doc/codes";

@component({ template: require("./index.html") })
export default class MapView extends View {
    protected code: any = codes.maps;

}
