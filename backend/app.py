from flask import Flask, request, jsonify
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
import joblib
import cv2
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
import io
from tensorflow.keras.models import Sequential
from flask_cors import CORS
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC

app = Flask(__name__)
CORS(app)

leak_model = joblib.load("models/Leak_Status.pkl")
moisture_model = joblib.load("models/moisture.pkl")
model_disposal = joblib.load("models/Disposal_Method.pkl")
rf_model = joblib.load("models/Waste_Gen.pkl")
rf_classifier = joblib.load('models/overflow.pkl')
model = joblib.load("models/Classification.pkl")
temp_model = joblib.load("models/temperature.pkl")
type_of_waste=joblib.load("models/Type_of_Waste.pkl")
type_of_bags=joblib.load("models/Type_of_Bags.pkl")
chatbot_model = joblib.load("models/chatbot.pkl")
vectorizer = joblib.load("models/vectorizer.pkl")

day_of_week_dict = {"Friday":0, "Monday":1, "Sunday":3, "Saturday":2, "Thursday":4, "Tuesday":5, "Wednesday":6}

data = pd.read_csv('Dataset/Waste_Sorting.csv')
selected_columns = ['material_type', 'weight', 'volume']
X = data[selected_columns]
X = pd.get_dummies(X, columns=['material_type'])
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
num_clusters = 5
kmeans = KMeans(n_clusters=num_clusters, random_state=42)
kmeans.fit(X_scaled)
data['cluster'] = kmeans.labels_

@app.route("/predict/leak", methods=["POST"])
def predict_leak():
    if request.method == "POST":
        data = request.get_json()
        sensor_reading = float(data["sensor_reading"])
        try:
            prediction = leak_model.predict([[sensor_reading]])
            return jsonify({"leak_status": prediction[0]})
        except Exception as e:
            return jsonify({"error": str(e)}), 500  

@app.route("/predict/moisture", methods=["POST"])
def predict_moisture():
    if request.method == "POST":
        data = request.get_json()
        moisture_reading = float(data["moisture_reading"])
        try:
            prediction = moisture_model.predict([[moisture_reading]])
            return jsonify({"prediction": prediction[0]})
        except Exception as e:
            return jsonify({"error": str(e)}), 500  

@app.route("/predict/material", methods=["POST"])
def predict_material():
    if request.method == "POST":
        data = request.get_json()
        user_weight = float(data["weight"])
        user_volume = float(data["volume"])
        try:
            predicted_material_type = predict_material_type(user_weight, user_volume)
            return jsonify({"predicted_material_type": predicted_material_type})
        except Exception as e:
            return jsonify({"error": str(e)}), 500  
        
@app.route("/predict/waste-generation", methods=["POST"])
def predict_waste_generation():
    if request.method == "POST":
        data = request.get_json()
        day = data["day"]
        day_of_week = day_of_week_dict.get(day)
        print(data)
        if day_of_week is None:
            return jsonify({"error": "Invalid day"}), 400
        else:
            try:
                predicted_generation = rf_model.predict([[day_of_week]])
                return jsonify({"predicted_waste_generation": "{:.2f}".format(predicted_generation[0])})
            except Exception as e:
                return jsonify({"error": str(e)}), 500
            

@app.route("/predict/disposal", methods=["POST"])
def predict_disposal():
    if request.method == "POST":
        data = request.get_json()
        moisture_input = float(data["moisture"])  
        try:
            disposal_prediction = model_disposal.predict([[moisture_input]])  
            return jsonify({"predicted_disposal_method": disposal_prediction[0]})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
            

@app.route("/predict/overflow", methods=["POST"])
def predict_overflow():
    if request.method == "POST":
        data = request.get_json()
        ultrasonic_reading = float(data["ultrasonic_reading"])
        try:
            prediction = rf_classifier.predict([[ultrasonic_reading]])
            return jsonify({"overflow_prediction": prediction[0]})
        except Exception as e:
            return jsonify({"error": str(e)}), 500

@app.route("/predict/temperature", methods=["POST"])
def predict_temperature():
    if request.method == "POST":
        data = request.get_json()
        temperature_reading = float(data["temperature_reading"])
        try:
            prediction = temp_model.predict([[temperature_reading]])
            return jsonify({"temp_alert": prediction[0]})
        except Exception as e:
            return jsonify({"error": str(e)}), 500



@app.route("/predict/classifier", methods=["POST"])
def predict_classifier():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'})

    image_file = request.files['image']
    image_bytes = image_file.read()

    image = Image.open(io.BytesIO(image_bytes))
    image_cv2 = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)  
    prediction = predict_func(image_cv2)

    return jsonify({'prediction': prediction})


@app.route("/predict/typeofwaste", methods=["POST"])
def predict_typeofwaste():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'})

    image_file = request.files['image']
    image_bytes = image_file.read()

    image = Image.open(io.BytesIO(image_bytes))
    image_cv2 = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)  
    prediction = predict_func_waste(image_cv2)

    return jsonify({'prediction': prediction})


@app.route("/predict/bags", methods=["POST"])
def predict_typeofbags():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'})

    image_file = request.files['image']
    image_bytes = image_file.read()

    image = Image.open(io.BytesIO(image_bytes))
    image_cv2 = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)  
    prediction = predict_func_bags(image_cv2)

    return jsonify({'prediction': prediction})

def predict_func(img):
    img_resized = cv2.resize(img, (224, 224)) 
    img_resized = np.reshape(img_resized, [-1, 224, 224, 3]) 
    result = np.argmax(type_of_waste.predict(img_resized))
    if result == 1:
        return "Non Recyclable"
    else:
        return "Recyclable"
    

def predict_func_waste(img):
    img_resized = cv2.resize(img, (224, 224))
    img_resized = np.reshape(img_resized, [-1, 224, 224, 3])
    result = np.argmax(type_of_waste.predict(img_resized))
    if result == 0:
        return "Battery"
    elif result == 1:
        return "Biological"
    elif result == 2:
        return "Brown-Glass"
    elif result == 3:
        return "Cardboard"
    elif result == 4:
        return "Clothes"
    elif result == 5:
        return "Green-Glass"
    elif result == 6:
        return "Metal"
    elif result == 7:
        return "Paper"
    elif result == 8:
        return "Plastic"
    elif result == 9:
        return "Shoes"
    elif result == 10:
        return "Trash"
    elif result == 11:
        return "White-Glass"
    
    
def predict_func_bags(img):
    img_resized = cv2.resize(img, (224, 224))
    img_resized = np.reshape(img_resized, [-1, 224, 224, 3])
    result = np.argmax(type_of_bags.predict(img_resized))
    if result == 0:
        return "Garbage Bag"
    elif result == 1:
        return "Paper Bag"
    elif result == 2:
        return "Plastic Bag"
    
    
@app.route("/predict/chatbot", methods=["POST"])
def predict_chatbot():
    if request.method == "POST":
        data = request.get_json()
        user_question = data["question"]

        user_question_vectorized = vectorizer.transform([user_question])

        predicted_answer = chatbot_model.predict(user_question_vectorized)

        return jsonify({"predicted_answer": predicted_answer[0]})


def predict_material_type(weight, volume):
    user_input_scaled = scaler.transform([[weight, volume] + [0] * (X_scaled.shape[1] - 2)])
    predicted_cluster = kmeans.predict(user_input_scaled)
    cluster_data = data[data['cluster'] == predicted_cluster[0]]
    predicted_material_type = cluster_data['material_type'].mode()[0]
    return predicted_material_type

if __name__ == "__main__":
    app.run(debug=True)
