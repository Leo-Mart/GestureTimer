package main

import (
	"context"
	"encoding/base64"
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

func (a *App) GetFilePaths() []string {
	imagePaths := []string{}
	directory, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{})
	if err != nil {
		runtime.LogError(a.ctx, err.Error())
		return []string{}
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

	return imagePaths
}

func (a *App) ReadImages() []string {
	base64Images := []string{}
	directory, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{})
	if err != nil {
		runtime.LogError(a.ctx, err.Error())
		return []string{}
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
			data, err := os.ReadFile(imageFilePath)
			if err != nil {
				runtime.LogError(a.ctx, err.Error())
				return []string{}
			}
			base64Images = append(base64Images, base64.StdEncoding.EncodeToString(data))
		}
	}

	return base64Images
}

func (a *App) ReadImageToBase64(imagePath string) string {
	data, err := os.ReadFile(imagePath)
	if err != nil {
		runtime.LogError(a.ctx, "Error reading image")
	}

	return base64.StdEncoding.EncodeToString(data)
}
