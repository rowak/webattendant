PYINT = python3

run-parser:
	$(PYINT) src/parser/courseparser.py $(ARGS)

run-search:
	$(PYINT) src/searching/searching.py

test:
	$(PYINT) -m unittest discover tests

clean:
	find . -type d -name __pycache__ -prune -exec rm -rf {} \;