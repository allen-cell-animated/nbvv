import ipydatawidgets
import ipywidgets
import nbvv.img_prep
import numpy
import traitlets

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
    image, spacing=(1.0, 1.0, 1.0), density=0.1, brightness=1.0, channel_names=None
):
    # assume CZYX if 4d and ZYX if 3d.
    if len(image.shape) > 4:
        return "Image must be 3 or 4 dimensional"
    if len(image.shape) < 3:
        return "Image must be 3 or 4 dimensional"
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
