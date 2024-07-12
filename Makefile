# Define variables
VITE_CMD = vite
NPM_CMD = npm
NPX_CMD = npx
PROJECT_DIR = .

# Define targets
.PHONY: install dev build clean

install:
	$(NPM_CMD) install

dev:
	$(VITE_CMD)

build:
	$(VITE_CMD) build

clean:
	rm -rf $(PROJECT_DIR)/dist

# If you use TypeScript
lint:
	$(NPX_CMD) eslint --ext .js,.jsx,.ts,.tsx src

# Run tests
test:
	$(NPM_CMD) test

# Docker commands (if applicable)
docker-build:
	docker build -t my-vite-react-app .

docker-run:
	docker run -p 3000:3000 my-vite-react-app
