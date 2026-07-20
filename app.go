package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"image"
	"image/png"
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

func (a *App) OpenMessageDialog(title string, message string, dialogType string) {
	_, err := runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
		Title:   title,
		Message: message,
		Type:    runtime.InfoDialog,
	})
	if err != nil {
		runtime.LogError(a.ctx, err.Error())
	}
}

func (a *App) HandleQuit() {
	runtime.Quit(a.ctx)
}

func (a *App) ConvertImageToGrayscale(imagePath string) string {
	data, err := os.ReadFile(imagePath)
	if err != nil {
		runtime.LogError(a.ctx, "Error opening the image to convert")
	}
	reader := bytes.NewReader(data)
	img, _, err := image.Decode(reader)
	if err != nil {
		runtime.LogError(a.ctx, "Error decoding image")
	}

	grayImg := image.NewGray(img.Bounds())
	for y := img.Bounds().Min.Y; y < img.Bounds().Max.Y; y++ {
		for x := img.Bounds().Min.X; x < img.Bounds().Max.X; x++ {
			grayImg.Set(x, y, img.At(x, y))
		}
	}

	var buf bytes.Buffer
	if err := png.Encode(&buf, grayImg); err != nil {
		runtime.LogError(a.ctx, "Error reading images bytes")
	}

	return base64.StdEncoding.EncodeToString(buf.Bytes())
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
