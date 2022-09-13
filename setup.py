from __future__ import print_function
from setuptools import setup, find_packages, Command
from setuptools.command.sdist import sdist
from setuptools.command.build_py import build_py
from setuptools.command.egg_info import egg_info
from subprocess import check_call
import os
from os.path import join as pjoin
from pathlib import Path
import sys
import platform
from distutils import log
from jupyter_packaging import (
    create_cmdclass,
    install_npm,
    ensure_targets,
    combine_commands,
    get_version,
)

here = os.path.dirname(os.path.abspath(__file__))

log.set_verbosity(log.DEBUG)


def skip_if_exists(paths, CommandClass):
    """Skip a command if list of paths exists."""

    def should_skip():
        return any(not Path(path).exist() for path in paths)

    class SkipIfExistCommand(Command):
        def initialize_options(self):
            if not should_skip:
                self.command = CommandClass(self.distribution)
                self.command.initialize_options()
            else:
                self.command = None

        def finalize_options(self):
            if self.command is not None:
                self.command.finalize_options()

        def run(self):
            if self.command is not None:
                self.command.run()

    return SkipIfExistCommand


def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()


name = "nbvv"
LONG_DESCRIPTION = read("README.md")
version = get_version(pjoin(name, "_version.py"))
js_dir = pjoin(here, "js")
jstargets = [
    pjoin(js_dir, "lib", "index.js"),
    pjoin("share", "jupyter", "nbextensions", "nbvv", "index.js"),
]
data_files_spec = [
    ("share/jupyter/nbextensions/nbvv", "share/jupyter/nbextensions/nbvv", "*.js"),
    ("share/jupyter/labextensions/nbvv", "share/jupyter/labextensions/nbvv", "*"),
    (
        "share/jupyter/labextensions/nbvv/static",
        "share/jupyter/labextensions/nbvv/static",
        "*",
    ),
    ("etc/jupyter/nbconfig/notebook.d", "etc/jupyter/nbconfig/notebook.d", "nbvv.json"),
]

js_command = combine_commands(
    install_npm(js_dir, build_cmd="build"), ensure_targets(jstargets),
)

cmdclass = create_cmdclass("jsdeps", data_files_spec=data_files_spec)
is_repo = os.path.exists(os.path.join(here, ".git"))
if is_repo:
    cmdclass["jsdeps"] = js_command
else:
    cmdclass["jsdeps"] = skip_if_exists(jstargets, js_command)


setup(
    name=name,
    version=version,
    description="Interactive volumetric voxel viewing",
    long_description=LONG_DESCRIPTION,
    long_description_content_type="text/markdown",
    include_package_data=True,
    cmdclass=cmdclass,
    install_requires=[
        "ipydatawidgets>=4.3.2",
        "ipywidgets>=8.0.0",
        "jupyter>=1.0.0",
        "jupyterlab>=3.4.6",
        "jupyter-packaging>=0.12.3",
        "numpy>=1.14.3",
        "scikit-image>=0.13.0",
        "scipy>=1.0.0",
    ],
    license="MIT",
    packages=find_packages(),
    zip_safe=False,
    author="AICS",
    author_email="danielt@alleninstitute.org",
    url="https://github.com/allen-cell-animated/nbvv",
    keywords=["ipython", "jupyter", "widgets", "volume rendering"],
    classifiers=[
        "Development Status :: 4 - Beta",
        "Framework :: IPython",
        "Intended Audience :: Developers",
        "Intended Audience :: Science/Research",
        "Topic :: Multimedia :: Graphics",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
    ],
)
