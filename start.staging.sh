docker compose -f docker-compose.yml -f docker-compose.prod.yml down -v --remove-orphans
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --scale node-app=3