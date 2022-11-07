"""This is a bootstrap for the Flask server."""

import os
from flaskServer import app

if __name__ == "__main__":
    if os.environ.get("FLASK_ENVIRONMENT", "") == "development":
        app.run()
    else:
        context = ("/etc/ssl/certs/ssl_api_cert.crt", "/etc/ssl/private/ssl_api_cert.key")
        app.run(ssl_context=context)
