package file

import (
	"fmt"
	"os"
)

// CreateFile creates a file at filePath.
// If content is provided, it appends it; otherwise creates an empty file.
func CreateFile(filePath string, content ...string) error {
	// Open file in append mode, create if not exists
	f, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return fmt.Errorf("failed to open file: %v", err)
	}
	defer f.Close()

	// If content is provided, append each line
	for _, line := range content {
		if _, err := f.WriteString(line + "\n"); err != nil {
			return fmt.Errorf("failed to write to file: %v", err)
		}
	}

	return nil
}
