version_info = (1, 4, 2, "final", 0)

_specifier_ = {"alpha": "a", "beta": "b", "candidate": "rc", "rc": "rc", "final": ""}

__version__ = "%s.%s.%s%s" % (
    version_info[0],
    version_info[1],
    version_info[2],
    ""
    if version_info[3] == "final"
    else _specifier_[version_info[3]] + str(version_info[4]),
)

__version_semantic__ = (
    f"{version_info[0]}.{version_info[1]}.{version_info[2]}"
    if version_info[3] == "final"
    else f"{version_info[0]}.{version_info[1]}.{version_info[2]}-{version_info[3]}.{version_info[4]}"
)
