# Contributing to Allen Institute for Cell Science Open Source

Thank you for your interest in contributing to this Allen Institute for Cell Science open source project! This document is
a set of guidelines to help you contribute to this project.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of
Conduct][code_of_conduct].

[code_of_conduct]: CODE_OF_CONDUCT.md

## Project Documentation

The `README` in the root of the repository should contain or link to
project documentation. If you cannot find the documentation you're
looking for, please file a GitHub issue with details of what
you'd like to see documented.

### To release a new version of nbvv on PyPI:

See [RELEASE.md] for more details.

GitHub Actions will take care of publishing the tagged commit to PyPI.

## How to Contribute

Typical steps to contribute:

1. Fork the repo on GitHub.

2. Create a branch and make your edits on your branch, pushing back to your fork.

3. Ensure that your changes are working, pass any linting and tests in the project. Add tests and documentation as needed.

4. Submit a pull request to merge your fork's branch into this repository, via GitHub.

Here is a recipe to create a conda environment geared for jupyterlab builds:

```
conda activate base
conda env remove -n nbvv
conda create -n nbvv python=3.10
conda activate nbvv
conda install black flake8
conda install jupyterlab
conda install scikit-image scipy numpy jupyter
conda install ipywidgets jupyter-packaging
conda install -c conda-forge aicsimageio
```

## Questions or Thoughts?

Talk to us on [one of our community forums][community].

[community]: https://forum.allencell.org/
