<p align="center">
  <img width="250" src="./docs/cliptor-logo.svg">
</p>

# Cliptor

Cliptor is a browser based application, which makes heavily use of the latest WebAudioAPI features. The basic idea is, to have a light-weight sampler application containing a clip-matrix in the manner of ableton live.
This app is supposed to start samples via buttons synchronized to a given BPM. For example you could add, start and stop a sample "hooray" and a sample "applause" or even start whole tracks. However, start the app, add your clips, drag and drop your files to the clips and you can start mixing and looping.

Note: You better install the app on your OS to have all features available.

## Features

- Easy extending your clip matrix: Add tracks or add clips to tracks
- Drag and Drop your sample file easily to your clips for every track
- Cliptor reads all common sound files like mp3, wav, ogg or flac
- Start, Stop and Pause your clips synchronized to the given BPM
- Latency-Compensation included, so every sample is synchronized and scheduled to the given BPM
- Have different Audio-Driver Output for every clip available
- Change volume for each clip
- Seek forward or backward during playback ( yes you can do kind of DJing with Cliptor)
- Start scenes, similar to ableton live
- Load from or save your current settings to a preset file

## Operation System Support

- Desktop Installer: Win, MacOSX and RaspberryPi4 (https://github.com/TimSusa/cliptor/releases)
- Web-Demo: Win, MacOSX, RaspberryPi4 and Android Mobile Devices (https://cliptor.timsusa.vercel.app/)

NOTE: Due to a lack of support from Apple, Safari and every Browser on iOS Devices is NOT supported.

Furthermore, consider downloading and installing the actual release on your machine, because features like drag and drop of audiofiles and saving to a preset are supported here. The Webdemo is just only supposed to be a light show case.

## Download and Install

Go to https://github.com/TimSusa/cliptor/releases and find the latest or beta release. There is a caret with "assets". Please click the caret to have the download links available.

- Mac OSX: Please, download the \*.dmg File (can be seen on "assets" at the bottom here) and double click
- Windows 7 and above: Please, download the \*.exe File (can be seen on "assets" at the bottom here) and double click
- Raspberry-pi 4 and above: Please, download the AppImage File, chmod +x the file to make it executable and then start it

## Live-Web-Demo

Note: This is just for demo purposes. Better download and install (https://github.com/TimSusa/cliptor/releases ) the electron app to enjoy all the features.

https://cliptor.timsusa.vercel.app/

<p align="center">
  <img width="100%" src="./docs/screenshot.png">
</p>

## Installation

At first copy the .env.sample to .env, if you have none.

```
yarn
```

# Webapp

The webapp will not work properly with dragging and dropping files. This is only supported int eh elctron app.

## Start Development

```
yarn start
```

## Build for Production

```
yarn build
```

# Electron App

The app can be installed from packages for MacOSX, Rasperry Pi and Win. If you like to develop or build for yourself, please follow the instructions.

## Start Development

```
yarn dev
```

## Build for MacOSX, Rasperry Pi and Win

```
yarn build-ci
```

# Contributing

Please consider to create a PR with or without any issue.
I will get back to you, asap.

# Versioning

https://github.com/conventional-changelog/standard-version
