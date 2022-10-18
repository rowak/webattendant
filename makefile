PYINT = python3

install:
	sudo apt install nginx
	# Insert install commands here

test:
	$(PYINT) -m unittest discover tests

clean:
	find . -type d -name __pycache__ -prune -exec rm -rf {} \;