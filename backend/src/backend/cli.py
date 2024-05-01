"""When you install this package, you will have executable "backend" command."""

import click

fastapi_app_str = "backend.main:app"


@click.group()
def cli() -> None:
    pass


@cli.command()
def prod() -> None:
    """Running uvicorn for production."""
    # https://stackoverflow.com/questions/70396641/how-to-run-gunicorn-inside-python-not-as-a-command-line
    # import multiprocessing
    import gunicorn.app.base

    from .main import app

    # def number_of_workers():
    #     return (multiprocessing.cpu_count() * 2) + 1

    class StandaloneApplication(gunicorn.app.base.BaseApplication):
        def __init__(self, app, options=None):
            self.options = options or {}
            self.application = app
            super().__init__()

        def load_config(self):
            config = {
                key: value for key, value in self.options.items() if key in self.cfg.settings and value is not None
            }
            for key, value in config.items():
                self.cfg.set(key.lower(), value)

        def load(self):
            return self.application

    options = {
        # "bind": "%s:%s" % ("127.0.0.1", "8080"),
        "workers": 4,  # number_of_workers(),
        "worker_class": "uvicorn.workers.UvicornWorker",
    }
    StandaloneApplication(app, options).run()


@cli.command()
def dev():
    """Running uvicorn for development."""
    import uvicorn

    uvicorn.run(app=fastapi_app_str, reload=True)


cli.add_command(prod)
cli.add_command(dev)


if __name__ == "__main__":
    cli()
