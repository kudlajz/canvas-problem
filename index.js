const fs = require('fs')
const Konva = require('konva')
const Canvas = require('canvas')

const CANVAS_WIDTH = 1200
const CANVAS_HEIGHT = 628

const imageContent = fs.readFileSync('./static-image.png')

// Create canvas
const canvas = new Canvas(CANVAS_WIDTH, CANVAS_HEIGHT)
const ctx = canvas.getContext('2d')

// Create layer
const layer = new Konva.Layer()
layer.hitGraphEnabled(false)
layer._setCanvasSize(CANVAS_WIDTH, CANVAS_HEIGHT)

// Draw onto canvas
const ratio = layer.getCanvas().getPixelRatio()
const width = layer.getCanvas().getWidth() / ratio
const height = layer.getCanvas().getHeight() / ratio
const layerCanvas = layer.getCanvas()._canvas

const imageObject = new Canvas.Image()
imageObject.src = imageContent

const image = new Konva.Image({
    x: 0,
    y: 0,
    image: imageObject,
    width: 320,
    height: 390,
})

layer.add(image)
layer.draw()
ctx.drawImage(layerCanvas, 0, 0, width, height)
layer.destroy()

fs.writeFileSync(
    'output.png',
    canvas.toBuffer(undefined, 3, canvas.PNG_FILTER_NONE)
)