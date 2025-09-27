package config

import (
	"log"
	"path/filepath"
	"runtime"
)

var (
	RootPath      string
	MigrationPath string
)

func init() {
	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		log.Fatal("Cannot get current file path")
	}
	dir := filepath.Dir(filename)

	// Go up 3 levels from current working directory
	RootPath = filepath.Join(dir, "..", "..")
	RootPath, err := filepath.Abs(RootPath)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Project root path:", RootPath)
	MigrationPath = filepath.Join(RootPath, "migrations")
}
