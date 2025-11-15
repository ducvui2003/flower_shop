.PHONY: container up
up: 
	( \
		cd ~ && \
		make mysql_up \
	)
container:
	( \
		docker build -t ducvui2003/flower-server:latest . \
	)