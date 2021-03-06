install:
	docker-compose build --no-cache
	cp .githooks/* .git/hooks/

run:
	docker-compose up

clean:
	docker-compose stop
	docker-compose down --rmi local --volumes --remove-orphans

eslint: node-eslint react-eslint

node-eslint:
	docker-compose run --rm api npm run eslint

react-eslint:
	docker-compose run --rm front npm run eslint

clear-db:
	docker-compose run --rm api npm run clear-db