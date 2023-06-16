import tensorflow as tf
from tensorflow import keras
import numpy as np
import io
from PIL import Image
from flask import Flask, request, jsonify

mango_model = keras.models.load_model("src/model/mango/output_files/model_mango.h5")
tomato_model = keras.models.load_model("src/model/tomato/output_files/model_tomato.h5")

def transform_image(pillow_img):
    data = np.asarray(pillow_img)
    data = data / 255.0
    data = data[np.newaxis, ...,]
    data = tf.image.resize(data, [150, 150])
    return data

def mango_predict(x):
    prediction = mango_model(x)
    prediction = tf.nn.softmax(prediction)
    pred0 = prediction[0]
    label0 =  np.argmax(pred0)
    return label0

def tomato_predict(x):
    prediction = tomato_model(x)
    prediction = tf.nn.softmax(prediction)
    pred0 = prediction[0]
    label0 =  np.argmax(pred0)
    return label0

app = Flask(__name__)

# Post mango image
@app.route("/mango", methods=["POST"])
def predict_mango():
      file = request.files.get('file')
      if file is None or file.filename == "":
           return jsonify({"error": "no file img"})

      try:
            image_bytes = file.read()
            pillow_img = Image.open(io.BytesIO(image_bytes))
            tensor = transform_image(pillow_img)
            prediction = mango_predict(tensor)
            prediction_string = ""

            if prediction == 0:
                 prediction_string = "Antraknosa"
            elif prediction == 1:
                  prediction_string = "Canker Bakteri"
            elif prediction == 2:
                  prediction_string = "Cutting Weevil"
            elif prediction == 3:
                  prediction_string = "Die Back"
            elif prediction == 4:
                  prediction_string = "Ganjur"
            elif prediction == 5:
                  prediction_string = "Tanaman Kamu Sehat"
            elif prediction == 6:
                  prediction_string = "Embun Tepung"
            elif prediction == 7:
                  prediction_string = "Embun Jelaga"
      
            global prediction_result_mango
            prediction_result_mango = prediction_string

            data = {"prediction": prediction_string}
            return jsonify(data)
        
      except Exception as e:
           return jsonify({"error": str(e)})

# Get mango prediction
@app.route("/mango", methods=["GET"])
def get_mango_prediction():
      try:
            data = {"prediction": prediction_result_mango}
            return jsonify(data)
      
      except Exception as e:
            return jsonify({"error": str(e)})
            

# Post tomato image
@app.route("/tomato", methods=["POST"])
def predict_tomato():
      file = request.files.get('file')
      if file is None or file.filename == "":
            return jsonify({"error": "no file img"})

      try:
            image_bytes = file.read()
            pillow_img = Image.open(io.BytesIO(image_bytes))
            tensor = transform_image(pillow_img)
            prediction = tomato_predict(tensor)
            prediction_string = ""

            if prediction == 0:
                 prediction_string = "Tomato mosaic virus"
            elif prediction == 1:
                  prediction_string = "Target Spot"
            elif prediction == 2:
                  prediction_string = "Bacterial spot"
            elif prediction == 3:
                  prediction_string = "Tomato Yellow Leaf Curl Virus"
            elif prediction == 4:
                  prediction_string = "Late blight"
            elif prediction == 5:
                  prediction_string = "Leaf Mold"
            elif prediction == 6:
                  prediction_string = "Early blight"
            elif prediction == 7:
                  prediction_string = "Spider mites Two spotted spider mite"
            elif prediction == 8:
                  prediction_string = "Tomato healthy"
            elif prediction == 9:
                  prediction_string = "Septoria leaf spot"

            global prediction_result_tomato
            prediction_result_tomato = prediction_string

            data = {"prediction": prediction_string}
            return jsonify(data)
        
      except Exception as e:
            return jsonify({"error": str(e)})

# Get tomato prediciton      
@app.route("/tomato", methods=["GET"])
def get_tomato_prediction():
      try:
            data = {"prediction": prediction_result_tomato}
            return jsonify(data)
      
      except Exception as e:
            return jsonify({"error": str(e)})
            

if __name__ == "__main__":
    app.run(debug=True)
