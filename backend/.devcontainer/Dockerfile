ARG VARIANT=3.11-bookworm
FROM mcr.microsoft.com/devcontainers/python:1-${VARIANT}

ENV PYTHONUNBUFFERED 1

# Uninstalling packages to make docker image smaller
RUN for util in "pylint" "flake8" "autopep8" "black" "yapf" "mypy" "pydocstyle" "pycodestyle" "bandit" "virtualenv"; do \
        pipx uninstall "${util}"; \
    done

# Install python tools globally
RUN for util in "poetry" "poethepoet" "ruff" "mypy"; do \
        pipx install --pip-args '--no-cache-dir --force-reinstall' "${util}"; \
    done

# Create poetry cache dir
RUN mkdir -p /home/vscode/.cache/pypoetry && chown vscode:vscode /home/vscode/.cache/pypoetry

# [Optional] If your requirements rarely change, uncomment this section to add them to the image.
# COPY requirements.txt /tmp/pip-tmp/
# RUN pip3 --disable-pip-version-check --no-cache-dir install -r /tmp/pip-tmp/requirements.txt \
#    && rm -rf /tmp/pip-tmp

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>



