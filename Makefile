.PHONY: dev install build start lint clean

dev:
	cd frontend && npm run dev

install:
	cd frontend && npm install

build:
	cd frontend && npm run build

start:
	cd frontend && npm run start

lint:
	cd frontend && npm run lint

clean:
	rm -rf frontend/.next frontend/node_modules
