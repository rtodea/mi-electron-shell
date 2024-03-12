# Electron Shell for URLs

## Goal

Create a simple Electron shell that can be used to open URLs.

## Steps

:warning: **To create Windows build you need to be on Windows**

### Install Node/NPM

First, you need to have Node.js and NPM installed. You can download it from [here](https://nodejs.org/).

### Install Electron Dependencies

```bash
npm ci
```

### Create Distributable Package

```bash
npm run package
```

### Create .exe Installable

```bash
npm run make
```