package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"image"
	"image/draw"
	"image/jpeg"
	"image/png"
	"os"
	"path/filepath"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

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

func (a *App) FlipImageHorizontally(imagePath string) string {
	data, err := os.ReadFile(imagePath)
	if err != nil {
		runtime.LogError(a.ctx, "Error opening file to flip")
	}

	reader := bytes.NewReader(data)
	img, _, err := image.Decode(reader)
	if err != nil {
		runtime.LogError(a.ctx, "Error decoding image")
	}

	bounds := img.Bounds()

	dst := image.NewRGBA(bounds)

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			srcX := bounds.Max.X - 1 - (x - bounds.Min.X)
			dst.Set(x, y, img.At(srcX, y))
		}
	}

	var buf bytes.Buffer

	ext := filepath.Ext(imagePath)
	switch ext {
	case ".jpg":
		if err := jpeg.Encode(&buf, dst, nil); err != nil {
			runtime.LogError(a.ctx, "Error reading images bytes")
		}
	case ".png":
		if err := png.Encode(&buf, dst); err != nil {
			runtime.LogError(a.ctx, "Error reading images bytes")
		}
	}

	return base64.StdEncoding.EncodeToString(buf.Bytes())
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
	draw.Draw(grayImg, grayImg.Bounds(), img, img.Bounds().Min, draw.Src)

	var buf bytes.Buffer

	ext := filepath.Ext(imagePath)
	switch ext {
	case ".jpg":
		if err := jpeg.Encode(&buf, grayImg, nil); err != nil {
			runtime.LogError(a.ctx, "Error reading images bytes")
		}
	case ".png":
		if err := png.Encode(&buf, grayImg); err != nil {
			runtime.LogError(a.ctx, "Error reading images bytes")
		}
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
