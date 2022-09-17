PYINT = python3

test:
	$(PYINT) -m unittest discover tests

clean:
	find . -type d -name __pycache__ -prune -exec rm -rf {} \;