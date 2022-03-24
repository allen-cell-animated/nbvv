from ._version import version_info, __version__

from .volume import *


def _prefix():
    import sys
    from pathlib import Path

    prefix = sys.prefix
    here = Path(__file__).parent
    # for when in dev mode
    if (here.parent / "share/jupyter/nbextensions/nbvv").exists():
        prefix = here.parent
    return prefix


def _jupyter_labextension_paths():
    return [{"src": f"{_prefix()}/share/jupyter/labextensions/nbvv/", "dest": "nbvv",}]


def _jupyter_nbextension_paths():
    return [
        {
            "section": "notebook",
            "src": f"{_prefix()}/share/jupyter/nbextensions/nbvv/",
            "dest": "nbvv",
            "require": "nbvv/extension",
        }
    ]

