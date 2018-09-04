/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import flagwind from "flagwind-core";
import ApplicationContext from "./application/context";
import { setting, MapLoader } from "src/index";

// 获取应用上下文
let context = ApplicationContext.current;
setting.arcgis = {
    ...setting.arcgis,
    ...{
        center: [118.573, 37.446],
        wkid: 4326,
        wkidFromApp: 4326,
        zoom: 9,
        slider: false,
        basemap: "dark-gray",
        logo: false,
        sliderPosition: "bottom-left"
    }
};
setting.mapType = "arcgis";
MapLoader.loadCss(setting.arcgis);
MapLoader.loadScript(setting.arcgis).then(() => {
    // 启动应用程序
    flagwind.Application.start(context);
});
