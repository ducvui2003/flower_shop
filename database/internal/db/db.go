package db

import (
	"database/sql"
	"log"

	"github.com/ducvui2003/db-service/internal/config"
	_ "github.com/go-sql-driver/mysql"
)

func Connect ()*sql.DB{
	db, err := sql.Open("mysql", config.DatabaseURL)
	if err != nil {
		log.Fatal("Failed to connect to db", err)
	}
	if err := db.Ping(); err !=nil{
		log.Fatal("Can connect DB", err)
	}
	return db
}