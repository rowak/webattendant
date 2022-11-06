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

lint:
	npm run lint && pylint backend

# TODO: test all python code instead of specific files
# TODO: add CI linting for frontend
lint-ci:
	docker run --rm pylint courseparser.py wsgi.py flaskServer.py

test-api:
	$(PYINT) -m unittest discover tests

clean:
	find . -type d -name __pycache__ -prune -exec rm -rf {} \;