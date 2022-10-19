PYINT = python3

run:
	./scripts/run.sh

install:
	./scripts/install.sh

deploy:
	./scripts/deploy.sh

test:
	$(PYINT) -m unittest discover tests

clean:
	find . -type d -name __pycache__ -prune -exec rm -rf {} \;