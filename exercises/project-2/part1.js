const path = './my_model/'
const startButton = document.getElementById('start')

startButton.onClick = () => init()

let model, webcam

const init = async () => {
  const modelPath = path + 'model.json'
  const metadataPath = path + 'metadata.json'

  model = await tmImage.load(modelPath, metadataPath)

  let maxPredictions = model.getTotalClasses()

  webcam = new tmImage.Webcam(200, 200, true)
  await webcam.setup()
  await webcam.play()

  window.requestAnimationFrame(loop)

  document.getElementById('webcam-container').appendChild(webcam.canvas)
}

const loop = async () => {
  webcam.update()
  await predict()
  window.requestAnimationFrame(loop)
}

const predict = async () => {
  const predictions = await model.predict(webcam.canvas)
  console.log(predictions)
}
