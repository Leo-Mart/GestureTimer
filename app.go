package main

import (
	"context"
	"os"
	"path/filepath"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetFilePaths() {
	imagePaths := []string{}
	directory, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{})
	if err != nil {
		runtime.LogError(a.ctx, err.Error())
		return
	}
	// TODO: Walk through subdirectories and get all files?
	files, err := os.ReadDir(directory)
	if err != nil {
		runtime.LogError(a.ctx, err.Error())
	}

	for _, file := range files {
		ext := filepath.Ext(file.Name())
		if ext == ".jpg" || ext == ".png" {
			imageFilePath := filepath.Join(directory, file.Name())
			imagePaths = append(imagePaths, imageFilePath)
		}
	}

	for _, filePath := range imagePaths {
		runtime.LogInfo(a.ctx, filePath)
	}
}
