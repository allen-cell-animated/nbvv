import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import * as base from '@jupyter-widgets/base';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const semver_range = require('../package.json').version;

import * as jupyter_volume from './view.js';

/**
 * Initialization data for the nbvv extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'nbvv:plugin',
  description: 'A JupyterLab extension for volume viewing',
  autoStart: true,
  requires: [base.IJupyterWidgetRegistry],
  activate: (app: JupyterFrontEnd, widgetRegistry) => {
    console.log('JupyterLab extension nbvv is activated!');
    widgetRegistry.registerWidget({
      name: 'nbvv',
      version: semver_range,
      exports: jupyter_volume
    });

    // requestAPI<any>('get-example')
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(reason => {
    //     console.error(
    //       `The nbvv server extension appears to be missing.\n${reason}`
    //     );
    //   });
  }
};

export default plugin;
