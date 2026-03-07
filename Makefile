.PHONY: up down server container client admin
up: 
	( \
		cd ~ && \
		make postgres_up \
		make redis_up \
	)

down:
	( \
		cd ~ && \
		make postgres_stop \
		make redis_stop \
	)

client:
	( \
		cd client && \
		npm run dev \
	)

server:
	( \
		cd server && \
		npm run dev \
	)

admin:
	( \
		cd admin && \
		npm run dev \
	)


container:
	( \
		cd server && \
		docker build -t ducvui2003/flower-server:latest . \
	)