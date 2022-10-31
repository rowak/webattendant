from flaskServer import app
import os

if __name__ == "__main__":
    if os.environ.get("FLASK_ENVIRONMENT", "") == "development":
        app.run()
    else:
        context = ("/etc/ssl/certs/ssl_api_cert.crt", "/etc/ssl/private/ssl_api_cert.key")
        app.run(ssl_context=context)