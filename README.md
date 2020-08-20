# Volume Viewer Jupyter Notebook Extension

Embeds the Allen Institute web-based 3d viewer in Jupyter notebooks

---

## Description

Most 3D viewers are far too heavyweight to use for quick visualization tasks when experimenting with tractably-sized (analyzing, checking, ...) 3D volumetric datasets. ivvv is a multichannel volume viewer for interactive data exploration in jupyter. This is a jupyter widget that provides volumetric rendering given a multiple channel zstack as a numpy array.

Envisioned user group is anyone who wants a robust and quick way to interactively interrogate volumetric data as part of their workflows; domain which motivated development is multi-channel volumetric light/fluorescence microscopy datasets. The viewer is optimized for volume data that has finer xy resolution than z resolution.

## Installation

install the package:
`pip install ivvv`

make sure you have jupyter notebook and nbextensions installed (not necessary in every environment):
`pip install jupyter_contrib_nbextensions && jupyter contrib nbextension install --user`

enable the extension in jupyter:
`jupyter nbextension install --py ivvv`
`jupyter nbextension enable ivvv --py`

## Documentation

If you have more extensive technical documentation (whether generated or not), ensure they are published to the following address:
For full package documentation please visit
[allen-cell-animated.github.io/ivvv](https://allen-cell-animated.github.io/ivvv/index.html).

## Quick Start

try the demo notebook:
`jupyter notebook examples/demo.ipynb`

In a Jupyter notebook, load or create volume data in a numpy array.
The data should be of shape (Z,Y,X) or (C,Z,Y,X) for multi-channel data.
Display the numpy data using
`import ivvv`
`ivvv.volshow(mynumpydata, spacing=(1.0, 1.0, 4.0))`

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for information related to developing the code.
