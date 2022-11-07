PYINT = python3

build:
	docker-compose build

run-docker:
	docker-compose up

run:
	./scripts/run.sh

install:
	./scripts/install.sh

# deploy:
	

lint:
	npm run lint && pylint backend

lint-ci:
	docker run --rm -v $(shell pwd):/data cytopia/eslint "src/**/*.js"
#docker run --rm cis3760-api pylint /app

test-api:
	$(PYINT) -m unittest discover tests

#clean:
#	find . -type d -name __pycache__ -prune -exec rm -rf {} \;
