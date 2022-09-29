import ipydatawidgets
import ipywidgets
import nbvv.img_prep
import numpy
import traitlets
from typing import List, Tuple

semver_range_frontend = "~" + nbvv._version.__version_semantic__


@ipywidgets.register
class VolumeWidget(ipywidgets.DOMWidget):
    _view_name = traitlets.Unicode("VolumeWidgetView").tag(sync=True)

    _view_module = traitlets.Unicode("nbvv").tag(sync=True)

    _view_module_version = traitlets.Unicode(semver_range_frontend).tag(sync=True)

    image = ipydatawidgets.NDArray(numpy.zeros(0, dtype=numpy.uint8)).tag(
        sync=True, **ipydatawidgets.array_serialization
    )

    size = traitlets.Tuple().tag(sync=True)

    dimensions = traitlets.Dict().tag(sync=True)

    metadata = traitlets.Dict({"foo": "bar"}).tag(sync=True)

    density = traitlets.Float(0.1).tag(sync=True)
    brightness = traitlets.Float(0.1).tag(sync=True)


# expect CZYX
def volshow(
    image: numpy.ndarray,
    spacing: Tuple[float, float, float] = (1.0, 1.0, 1.0),
    density: float = 0.1,
    brightness: float = 1.0,
    channel_names: List[str] = None,
):
    """
    Display a 4D image volume in a Jupyter notebook.

    Parameters
    ----------
    image : numpy.ndarray
        The image volume to display. Must be 4D with dimensions in the order CZYX
    spacing : tuple of float
        The spacing between pixels in each spatial dimension X, Y, Z.
    density : float
        The initial density setting for the viewer
    brightness : float
        The initial brightness setting for the viewer
    channel_names : list of str
        The names of the channels in the image volume. If not provided, the channel names will be simple integers
    """

    # assume CZYX if 4d and ZYX if 3d.
    if len(image.shape) > 4:
        return "Image must be 3 or 4 dimensional"
    if len(image.shape) < 3:
        return "Image must be 3 or 4 dimensional"

    if not isinstance(channel_names, list):
        return "channel_names must be a list of strings"

    # add a channel dimension if needed
    if len(image.shape) == 3:
        image = numpy.expand_dims(image, axis=0)

    volume_widget = VolumeWidget()

    dims_object = nbvv.img_prep.atlas_dimensions(
        image, physical_pixel_size=spacing, channel_names=channel_names
    )
    # image MUST have a name
    dims_object["name"] = "Image0"
    volume_widget.dimensions = dims_object

    # downsample and normalize for browser rendering
    image = nbvv.img_prep.img_prep(
        image,  # CZYX
        shape=(
            volume_widget.dimensions["tile_width"],
            volume_widget.dimensions["tile_height"],
        ),
    )

    # pass to javascript as array of ZYX volumes, one per channel
    volume_widget.image = [image[index] for index in range(image.shape[0])]
    return volume_widget
