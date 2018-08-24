import { component, View } from "flagwind-web";
import * as code from "doc/codes/map";

@component({ template: require("./index.html")  })
export default class Intro extends View {
    protected code: object = code;

}
