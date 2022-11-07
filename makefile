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
	docker build --file dockerfile.react -t cis3760-react-lint --target lint .
	docker run --rm cis3760-react-lint
	docker run --rm cis3760-api pylint /app

test-api:
	$(PYINT) -m unittest discover tests

#clean:
#	find . -type d -name __pycache__ -prune -exec rm -rf {} \;
