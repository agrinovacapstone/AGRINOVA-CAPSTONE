const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

async function run() {
  const MODEL_URL = 'file://./src/model/mango/output_files/model.json';
  const IMAGE_PATH = '/home/el/Documents/AGRINOVA-CAPSTONE/20211231_123258 (Custom).jpg'; // path untuk lokasi gambar

  const model = await tf.loadLayersModel(MODEL_URL);

  // Read the image file as a buffer
  const imageBuffer = fs.readFileSync(IMAGE_PATH);

  // Convert the image buffer to a TensorFlow tensor
  const imageTensor = tf.node.decodeImage(imageBuffer);

  // Preprocess the image tensor by resizing it to 150 x 150
  const resizedImage = tf.image.resizeBilinear(imageTensor, [150, 150]);

  // Normalize the pixel values if needed
  const normalizedImage = resizedImage.div(tf.scalar(255));

  // Expand the dimensions of the image tensor to match the expected shape of the model
  const expandedImage = normalizedImage.expandDims();

  // Perform inference on the preprocessed image tensor
  const prediction = model.predict(expandedImage);

  // Get the prediction results as an array
  const predictionArray = prediction.dataSync();

  // Print the prediction array
  console.log('Prediction array:', predictionArray);

  // Get the index of the maximum value in the prediction tensor
  const maxIndex = prediction.argMax().dataSync()[0];

  // Print the index of the maximum value
  console.log('Predicted class index:', maxIndex);

  // Clean up any resources if needed
  tf.dispose([imageTensor, resizedImage, normalizedImage, expandedImage]);
}

run().catch(console.error);
