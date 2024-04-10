# nbvv : Volume Viewer JupyterLab Extension

[![Github Actions Status](https://github.com/allen-cell-animated/nbvv/actions/workflows/build.yml/badge.svg)](https://github.com/allen-cell-animated/nbvv/actions/workflows/build.yml/badge.svg)
A JupyterLab extension for volume viewing

Embeds the Allen Institute for Cell Science's 3d volume viewer into JupyterLab.

This extension is composed of a Python package named `nbvv`
for the server extension and a NPM package named `nbvv`
for the frontend extension.

## Requirements

- JupyterLab >= 4.0.0

## Install

To install the extension, execute:

```bash
pip install nbvv
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall nbvv
```

## Troubleshoot

If you are seeing the frontend extension, but it is not working, check
that the server extension is enabled:

```bash
jupyter server extension list
```

If the server extension is installed and enabled, but you are not seeing
the frontend extension, check the frontend extension is installed:

```bash
jupyter labextension list
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the nbvv directory

# make sure you are in a Python environment with jupyterlab==4 installed.
# for example:
#   conda create -n jupyterlab-ext --override-channels --strict-channel-priority -c conda-forge -c nodefaults jupyterlab=4 nodejs=20 git copier=7 jinja2-time


# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite

# At this point you should be able to run "jupyter lab", and load the examples/demo.ipynb
# Note that the example requires numpy and aicsimageio

# During development, rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
# Server extension must be manually disabled in develop mode
jupyter server extension disable nbvv
pip uninstall nbvv
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `nbvv` within that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)
