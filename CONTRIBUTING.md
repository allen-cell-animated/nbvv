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

- Update nbvv/\_version.py
- And update js/package.json to have the same version number.
- Then npm install to update js/package-lock.json with current dependencies and version.
- git add the updated files and git commit
- `git tag -a vX.X.X -m 'comment'`
- `git push`
- `git push --tags`

GitHub Actions will take care of publishing the tagged commit to PyPI.

You may alternatively use `npm version` to increment `version` in package.json
and package-lock.json and add a tagged commit all in one step. If so, update
nbvv/\_version.py first and **ensure that the version numbers in \_version.py
and package.json match** before pushing your changes.

### To release a new version of nbvv on NPM:

- clean out the `dist` and `node_modules` directories: `git clean -fdx`
- `npm install`
- `npm publish`

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
