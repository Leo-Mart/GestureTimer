# GestureTimer

GestureTimer is an app for practicing gesture drawing using local reference images.

## Motivation

While learning to draw, gesture drawing is an important step in the overall process, the idea is to try to capture the energy or flow of a pose in a set timer.
There are numerous online tools available for this type of practice but I specifically wanted to use images on my local machine to practice with. This allows me to control a bit more what type of images I get, say for practicing something specific, while also using all the images I've collected over the years.
Thus, this app was born. This app will allow you to use local images as reference for your gesture drawing practice while giving full control over timers and other settings.

## Quick Start

To run the app locally there are a couple of requirements.

- Go
- NPM
- The Wails CLI

Install Go via [Go downloads](https://go.dev/dl/) and check their documentation for instructons.

Node/NPM can be installed via [Node downloads](https://nodejs.org/en/download/)

Both Go and NPM are requirements of Wails. Once both are installed
install Wails via

```
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

Make sure to check their [documentation](https://wails.io/docs/gettingstarted/installation)
for more detailed instructions.

Once everything is installed using the app is quite simple, all you need to do is clone the repo and then:

```
wails build
```

If you get an error about missing webkit2_4.0(this will probably be the case on newer versions of distros), make sure you have the correct packages installed via Wails docs
and try running:

```
wails build -tags webkit2_41
```

which will ensure the correct version of webkit is used.

The above command will build the app into an executable, based on your OS.
Then move into the build/bin directory

```
cd build/bin
```

and run the app

```
./GestureTimer
```

## Usage
https://github.com/user-attachments/assets/bcc73fae-9401-43b9-8c05-91a3b996fce2

Image in demo is from Max Max Fury Road promotional material.

Currently the app accepts .png and .jpegs. Use the various buttons on the drawing page to jump to previous/next image, pause/start the timer, convert the image to grayscale and flip the image horizontally.

## Technologies

The app was built using [Wails](https://wails.io/) which lets me build a desktop app using Go and a frontend framework of my choice, in this case React.

## Future Improvements

While the app functions, there is always room for improvements.

- [ ] Performance. Currently images are converted to base64 before being rendered in the frontend. Because of this, large images can be slow to load, and especially to convert to grayscale or flip horizontally. This is a limitation since Vite 5.0.0. See [Wails docs](https://wails.io/docs/guides/dynamic-assets) for details. But there might be some workarounds that can be implemented.
- [ ] Some styling updates, it break a bit on smaller screens, but it is made for larger screens.
- [ ] Possibly accepting additional file formats and traversing sub-directories when loading in images.

## Contributing

If you'd like to contribute, please fork the repo and open a pull request.
