## Setup
### Prerequisites
- Python 3.10
- pipx

> 📝 NOTE
> If you want to use **devcontainer**, you also need **Docker**.
> After installing Docker, please use `docker volume create poetry-cache-dir` to create a volume so that docker compose can find this external volume.


### Install Python Tools globally
Run the following command to install binaries into isolated virtual environments through pipx.
- poetry: dependency management and packaging
- poethepoet: task runner
- ruff: linter
- mypy: static type checker

```shell
pipx install poetry
pipx install poethepoet
pipx install ruff
pipx install mypy
```

### Installs the Project Dependencies
Run the following command to install the project dependencies and current project.
```shell
poe init-dev
```
or
```shell
poetry install  --no-interaction
```

Run the following command to install the project dependencies.
```shell
poe init
```
or
```shell
poetry install  --without=dev --no-interaction
```
