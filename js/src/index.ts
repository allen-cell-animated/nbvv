import * as widgets from "@jupyter-widgets/base";
import React from "react";
import ReactDOM from "react-dom";

import { ImageViewerApp, ViewMode } from "@aics/web-3d-viewer";

// Styles are copied into lib, then compiled by webpack less-loader
import "./style.less";

export class VolumeWidgetView extends widgets.DOMWidgetView {
  initialize() {
    const view = this;

    const metadata = this.model.get("metadata");
    const volume = this.model.get("image");
    const size = this.model.get("size");
    const density = this.model.get("density");
    const brightness = this.model.get("brightness");
    const dimensions = this.model.get("dimensions");

    const height = this.model.get("layout")?.get("height") || "500px";

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
                channels: dimensions.channel_names.map(
                  (name: string, index: number) => ({
                    match: name,
                    enabled: index < 3,
                  })
                ),
              },
            ],
          },
          appHeight: height,
          cellId: "",
          cellPath: "",
          fovPath: "",
          showControls: {
            alphaMaskSlider: true,
            autoRotateButton: true,
            axisClipSliders: true,
            brightnessSlider: true,
            boundingBoxColorPicker: true,
            backgroundColorPicker: true,
            colorPresetsDropdown: true,
            densitySlider: true,
            fovCellSwitchControls: false,
            interpolationControl: true,
            levelsSliders: true,
            saveSurfaceButtons: true,
            viewModeRadioButtons: true,
            resetCameraButton: true,
            showAxesButton: true,
            showBoundingBoxButton: true,
            metadataViewer: true,
          },
          viewerSettings: {
            showAxes: true,
            showBoundingBox: true,
            boundingBoxColor: [255, 255, 255],
            backgroundColor: [0, 0, 0],
            autorotate: false,
            viewMode: ViewMode.threeD,
            maskAlpha: 0.0,
            brightness: 75.0,
            density: 10.0,
            levels: [0, 128, 255],
          },
          baseUrl: "",
          cellDownloadHref: "",
          fovDownloadHref: "",
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
