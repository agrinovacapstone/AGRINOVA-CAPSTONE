import tensorflow as tf
from tensorflow import keras
import numpy as np
import io
from PIL import Image
from flask import Flask, request, jsonify

model = keras.models.load_model("google-deploy/model_mango.h5")

def transform_image(pillow_img):
    data = np.asarray(pillow_img)
    data = data / 255.0
    data = data[np.newaxis, ...,]
    data = tf.image.resize(data, [150, 150])
    return data

def predict(x):
    prediction = model(x)
    prediction = tf.nn.softmax(prediction)
    pred0 = prediction[0]
    label0 =  np.argmax(pred0)
    return label0


app = Flask(__name__)

@app.route("/mango", methods=["GET", "POST"])
def predict_mango():
    if request.method == "POST":
        file = request.files.get('file')
        if file is None or file.filename == "":
            return jsonify({"error": "no file img"})

        try:
            image_bytes = file.read()
            pillow_img = Image.open(io.BytesIO(image_bytes))
            tensor = transform_image(pillow_img)
            prediction = predict(tensor)
            prediction_string = ""

            if prediction == 0:
                 prediction_string = "Anthracnose"
            elif prediction == 1:
                  prediction_string = "Bacterial Canker"
            elif prediction == 2:
                  prediction_string = "Cutting Weevil"
            elif prediction == 3:
                  prediction_string = "Die Back"
            elif prediction == 4:
                  prediction_string = "Gall Midge"
            elif prediction == 5:
                  prediction_string = "Healthy"
            elif prediction == 6:
                  prediction_string = "Powdery Mildew"
            elif prediction == 7:
                  prediction_string = "Sooty Mould"

            data = {"prediction": prediction_string}
            return jsonify(data)
        
        except Exception as e:
            return jsonify({"error": str(e)})
    return "OK"

if __name__ == "__main__":
    app.run(debug=True)
