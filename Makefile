.PHONY: up down server container
up: 
	( \
		cd ~ && \
		make mysql_up \
		make redis_up \
	)

down:
	( \
		cd ~ && \
		make mysql_stop \
		make redis_stop \
	)

server:
	( \
		cd server && \
		npm run dev \
	)

container:
	( \
		cd server && \
		docker build -t ducvui2003/flower-server:latest . \
	)