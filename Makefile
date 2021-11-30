exec_test:
	docker-compose down
	sudo rm -rf ../sql
	sudo rm -rf ../nosql
	sudo rm -rf ../files
	docker-compose up -d
	npm run seed
	npm test
	docker-compose down
exec_clear:
	sudo rm -rf ../sql
	sudo rm -rf ../nosql
	sudo rm -rf ../files
	rm -rf dist
	npm run build
	docker-compose up -d
	npm run seed
	docker-compose down