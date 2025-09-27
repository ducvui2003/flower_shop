package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log"
	"os"

	db "github.com/ducvui2003/db-service/internal/db"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}
	action := flag.String("action", "up", "Migration action: up or down")
	flag.Parse()

	database := db.Connect()
	defer database.Close()

	runMigration(database, *action)
}

func runMigration(database *sql.DB, action string) {
	// Create driver instance
	driver, err := mysql.WithInstance(database, &mysql.Config{})
	if err != nil {
		log.Fatal(err)
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file://./migrations",
		"mysql",
		driver,
	)
	if err != nil {
		log.Fatal(err)
	}

	switch action {
	case "up":
		if err := m.Up(); err != nil && err != migrate.ErrNoChange {
			log.Fatal(err)
		}
		fmt.Println("Migrations applied successfully!")
	case "down":
		if err := m.Down(); err != nil && err != migrate.ErrNoChange {
			log.Fatal(err)
		}
		fmt.Println("Last migration rolled back successfully!")

	default:
		fmt.Println("Unknown action. Use 'up' or 'down'.")
		os.Exit(1)
	}
}
