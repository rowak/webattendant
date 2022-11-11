
To run you need to first have venv and flask installed.

Once done, create a new venv folder:
```bash
python3 -m venv venv
```

After that, activate the venv environment
```bash
. venv/bin/activate
```

Once in, install Flask
```bash
pip install Flask
```

Finally, you can run a localhost server
```bash
flask --app api.py run
```

Keep in mind these things:
	To exit the venv environment, type "deactivate"
	Need to be in the venv environment to run the server
	Must install flask WHILE IN the venv environment