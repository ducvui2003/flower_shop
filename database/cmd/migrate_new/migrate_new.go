package main

import (
	"bufio"
	"fmt"
	"os"
	"time"

	"github.com/ducvui2003/db-service/internal/config"
	"github.com/ducvui2003/db-service/pkg/file"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	fmt.Print("Enter migration name: ")
	name, _ := reader.ReadString('\n')
	name = name[:len(name)-1]
	if len(os.Args) < 1 {
		fmt.Println("Usage: go run new_migration.go <migration_name>")
		os.Exit(1)
	}

	timestamp := time.Now().Format("20060102150405") // YYYYMMDDHHMMSS
	upFile := fmt.Sprintf("%s/%s_%s.up.sql", config.MigrationPath, timestamp, name)
	downFile := fmt.Sprintf("%s/%s_%s.down.sql", config.MigrationPath, timestamp, name)

	files := []string{upFile, downFile}
	for _, f := range files {
		file.CreateFile(f)
	}

	fmt.Println("Created migration files:")
	fmt.Println("  ", upFile)
	fmt.Println("  ", downFile)
}
