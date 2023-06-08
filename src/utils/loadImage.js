const tf = require('@tensorflow/tfjs-node');
const Jimp = require('jimp');

const preProcess = (image) => {
    // const values = imageByteArray(image);
    image.resize(150, 150);
    const values = image.bitmap.data;
    const outShape = [1, image.bitmap.width, image.bitmap.height, 4];
    let input = tf.tensor4d(values, outShape, 'float32');

    // Slice away alpha
    input = input.slice([0, 0, 0, 0], [1, image.bitmap.width, image.bitmap.height, 3]);

    return input;
};