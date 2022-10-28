PYINT = python3

build:
	docker-compose build

run-docker:
	docker-compose up

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