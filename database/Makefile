# Makefile

.PHONY: migrate-up migrate-down migrate-new

migrate-up:
	go run cmd/migrate/migrate.go -action=up

migrate-down:
	go run cmd/migrate/migrate.go -action=down

migrate-new:
	go run cmd/migrate_new/migrate_new.go 