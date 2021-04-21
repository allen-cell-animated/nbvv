import * as widgets from "@jupyter-widgets/base";
import { ImageViewerApp } from "@aics/web-3d-viewer";
import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";
import "./style.less";

var VolumeWidgetView = widgets.DOMWidgetView.extend({
  initialize: function () {
    const view = this;

    const metadata = this.model.get("metadata");

    const volume = this.model.get("image");

    const size = this.model.get("size");

    const density = this.model.get("density");
    const brightness = this.model.get("brightness");

    const dimensions = this.model.get("dimensions");

    // console.log("C = " + volume.shape[0]);
    // console.log("Z = " + volume.shape[1]);
    // console.log("Y = " + volume.shape[2]);
    // console.log("X = " + volume.shape[3]);
    // console.log(dimensions);
    var volsize = volume.shape[1] * volume.shape[2] * volume.shape[3];
    var channels = volume.shape[0];
    var tiles = volume.shape[1]; // slices

    const app = React.createElement(
      "div",
      {
        className: "cell-viewer",
      },

      React.createElement(
        ImageViewerApp,
        {
          rawData: volume,
          rawDims: dimensions,
          appHeight: "400px",
          defaultSurfacesOn: [],
          defaultVolumesOn: [0],
          initialChannelAcc: {
            Channels: [],
          },
          keyList: ["Channels"],
          groupToChannelNameMap: {
            Channels: dimensions.channel_names,
          },
          renderConfig: {
            alphaMask: true,
            autoRotateButton: true,
            axisClipSliders: true,
            brightnessSlider: true,
            colorPicker: true,
            colorPresetsDropdown: true,
            densitySlider: true,
            fovCellSwitchControls: false,
            levelsSliders: true,
            saveSurfaceButtons: true,
            viewModeRadioButtons: true,
          },
        },
        null
      )
    );

    const $app = document.createElement("div");
    ReactDOM.render(app, $app);

    view.el.append($app);

    // force a resize event to get the 3d view to refresh with an actual size.
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 200);
  },
});

export { VolumeWidgetView };
