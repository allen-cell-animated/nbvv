import * as base from "@jupyter-widgets/base";
import * as jupyter_volume from "./index";

const semver_range = require("../package.json").version;

const plugin = {
  id: "nbvv",
  requires: [base.IJupyterWidgetRegistry],
  activate(app, widgets) {
    widgets.registerWidget({
      name: "nbvv",
      version: semver_range,
      exports: jupyter_volume,
    });
  },
  autoStart: true,
};

module.exports = plugin;
