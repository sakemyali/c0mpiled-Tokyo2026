.PHONY: dev install build start clean

dev:
	npm run dev --prefix frontend

install:
	npm install --prefix frontend

build:
	npm run build --prefix frontend

start:
	npm run start --prefix frontend

clean:
	rm -rf frontend/.next frontend/node_modules node_modules
