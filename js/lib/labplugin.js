var plugin = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'nbvv:plugin',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'nbvv',
          version: plugin.version,
          exports: plugin
      });
  },
  autoStart: true
};
