# Volume Viewer Jupyter Notebook Extension

Embeds the Allen Institute web-based 3d viewer in Jupyter notebooks

---

## Description

Most 3D viewers are far too heavyweight to use for quick visualization tasks when experimenting with tractably-sized (analyzing, checking, ...) 3D volumetric datasets. nbvv is a multichannel volume viewer for interactive data exploration in jupyter. This is a jupyter widget that provides volumetric rendering given a multiple channel zstack as a numpy array.

Envisioned user group is anyone who wants a robust and quick way to interactively interrogate volumetric data as part of their workflows; domain which motivated development is multi-channel volumetric light/fluorescence microscopy datasets. The viewer is optimized for volume data that has finer xy resolution than z resolution.

## Installation

To install from source:
You will need to make sure nodejs and npm are installed on your system.
One way to do this is using `nvm`, for example:
```
nvm install 14.17.0
nvm use 14.17.0
```

Make sure you have jupyterlab, jupyter notebook and nbextensions installed (not necessary in every environment):
```
pip install jupyter_contrib_nbextensions && jupyter contrib nbextension install --user
```

Install nbvv in one of these ways:
* Option 1: Install from PyPi
    ```
    pip install nbvv
    jupyter nbextension install --py nbvv --sys-prefix
    jupyter nbextension enable nbvv --py --sys-prefix
    ```
* Option 2: Run `build.sh` from this repo
* Option 3: Step-by-step, from source:
    ```
    pip install -e .
    jupyter nbextension install --py --overwrite --symlink --sys-prefix nbvv
    jupyter nbextension enable --py --sys-prefix nbvv
    jupyter labextension develop . --overwrite
    ```

## Documentation

Extended documentation is not available yet. When completed it will be made available at: [allen-cell-animated.github.io/nbvv](https://allen-cell-animated.github.io/nbvv/index.html).

## Quick Start

try the demo notebook:
```
jupyter notebook examples/demo.ipynb
```
or likewise with jupyterlab:
```
jupyter lab examples/demo.ipynb
```

In a Jupyter notebook, load or create volume data in a numpy array.
The data should be of shape (Z,Y,X) or (C,Z,Y,X) for multi-channel data.
Display the numpy data using
```
import nbvv
nbvv.volshow(mynumpydata, spacing=(1.0, 1.0, 4.0), channel_names=my_list_of_channel_name_strings)
```

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for information related to developing the code.
