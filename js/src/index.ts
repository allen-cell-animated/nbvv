import * as widgets from "@jupyter-widgets/base";
import { ImageViewerApp } from "@aics/web-3d-viewer";
import React from "react";
import ReactDOM from "react-dom";

// Imported after tsc transpile - links out of lib, back into src
import "../src/style.less";

export class VolumeWidgetView extends widgets.DOMWidgetView {
  initialize() {
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
          viewerChannelSettings: {
            groups: [
              {
                name: "Channels",
                channels: dimensions.channel_names.map((name, index) => {
                  return { match: name, enabled: index < 3 };
                }),
              },
            ],
          },
          maskChannelName: "",
          appHeight: "400px",
          cellId: "",
          cellPath: "",
          fovPath: "",
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

            resetCameraButton: true,
            showAxesButton: true,
            showBoundingBoxButton: true,
          },
          viewerConfig: {
            showAxes: true,
            showBoundingBox: true,
            boundingBoxColor: [1, 1, 1],
            backgroundColor: [0, 0, 0],
            autorotate: false,
            view: "3D",
            mode: "3D",
            maskAlpha: 0.0,
            brightness: 75.0,
            density: 10.0,
            levels: [0, 128, 255],
          },
          baseUrl: "",
          nextImgPath: "",
          prevImgPath: "",
          cellDownloadHref: "",
          fovDownloadHref: "",
          preLoad: false,
          canvasMargin: "",
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
  }
}
