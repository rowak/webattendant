PYINT = python3

docker-build:
	docker-compose build

run-docker:
	docker-compose up

run:
	./scripts/run.sh

install:
	./scripts/install.sh

lint:
	npx eslint "src/**/*.js" && PYTHONPATH=backend pylint backend

lint-ci:
	docker build --file dockerfile.react -t cis3760-react-lint --target lint .
	docker run --rm cis3760-react-lint npx eslint "src/**/*.js"
	docker run --rm --env PYTHONPATH=. cis3760-api pylint /app

test:
	npx jest

test-api:
	(cd backend && PYTHONPATH=. $(PYINT) -m unittest discover test)

test-ci:
	docker build --file dockerfile.react -t cis3760-react-test --target test .
	docker run --rm cis3760-react-test npx jest
	docker run --rm --env PYTHONPATH=. cis3760-api $(PYINT) -m unittest discover .

# Removes all __pycache__ files recursively
clean:
	find . -type d -name __pycache__ -prune -exec rm -rf {} \;

# Removes all docker images, containers, cache, etc
clean-ci:
	docker system prune -a