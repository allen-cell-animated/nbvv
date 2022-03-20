pip install -e .
jupyter nbextension install --py --overwrite --symlink --sys-prefix nbvv
jupyter nbextension enable --py --sys-prefix nbvv
jupyter labextension develop . --overwrite
