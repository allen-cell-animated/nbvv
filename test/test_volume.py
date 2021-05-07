import numpy

import nbvv.volume


class TestVolume:
    def test_image(self):
        widget = nbvv.volume.VolumeWidget()

        assert widget.image.size == 0

    def test_metadata(self):
        widget = nbvv.volume.VolumeWidget()

        assert widget.metadata == {"foo": "bar"}


def test_volshow():
    image = numpy.random.random((10, 256, 256, 3))

    widget = nbvv.volume.volshow(image)

    numpy.testing.assert_array_equal(widget.image, image)
