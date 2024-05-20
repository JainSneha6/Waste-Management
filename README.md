# Waste-Management

Welcome to Waste-Management! This project leverages machine learning, deep learning and artificial inteligence models to address various aspects of waste management, including waste prediction, classification, disposal techniques and addresses various FAQs.

## About the Project

Waste-Management uses sensors and custom datasets to develop models for predicting and classifying different types of waste, managing waste disposal techniques, and integrating voice control features. The backend is written in Flask, and the frontend is created using Next.js.

## Features

1. **Leak Status Prediction**
   - **Model:** Random Forest
   - **Dataset:** [Custom dataset using MQ-2, MQ-135, and MQ-7 gas sensors.](https://github.com/JainSneha6/Waste-Management/blob/main/backend/Dataset/leak_anomaly.csv)
   - **Functionality:** Predicts gas leaks if gas value is above 60.

2. **High Temperature Alert Prediction**
   - **Model:** Random Forest
   - **Dataset:** [Custom dataset using DHT11 sensor.](https://github.com/JainSneha6/Waste-Management/blob/main/backend/Dataset/temp_anomaly.csv)
   - **Functionality:** Predicts high temperature if the temperature is above 50°C.

3. **Waste Type Classification Based on Weight and Volume**
   - **Model:** Random Forest
   - **Dataset:** [Custom dataset with weight and volume of waste.](https://github.com/JainSneha6/Waste-Management/blob/main/backend/Dataset/Waste_Sorting.csv)
   - **Functionality:** Classifies waste into paper, plastic, glass, metal or organic.

4. **Waste Disposal Technique Recommendation**
   - **Model:** Random Forest
   - **Dataset:** [Custom dataset using moisture sensor readings.](https://github.com/JainSneha6/Waste-Management/blob/main/backend/Dataset/Disposal_Method.csv)
   - **Functionality:** Recommends disposal technique (0-25: Recycling, 26-60: Composting, 61+: Landfill).

5. **Waste Type Classification Based on Moisture Readings**
   - **Model:** Random Forest
   - **Dataset:** [Custom dataset with moisture readings.](https://github.com/JainSneha6/Waste-Management/blob/main/backend/Dataset/Moisture.csv)
   - **Functionality:** Classifies waste as dry (0-9), mixed (10-30), or wet (30+).

6. **Waste Generation Prediction**
   - **Model:** Random Forest
   - **Dataset:** [Custom dataset based on data collected from society waste generation in March.](https://github.com/JainSneha6/Waste-Management/blob/main/backend/Dataset/Waste_Generation.csv)
   - **Functionality:** Predicts average waste generation, with higher predictions for weekends.

7. **Overflow Prediction**
   - **Model:** Random Forest
   - **Dataset:** [Custom dataset using values from an ultrasonic sensor.](https://github.com/JainSneha6/Waste-Management/blob/main/backend/Dataset/Ultrasonic.csv)
   - **Functionality:** Predicts overflow if value is above 22.

8. **Recyclable and Non-Recyclable Waste Classification**
   - **Model:** CNN
   - **Dataset:** [Kaggle dataset](https://www.kaggle.com/datasets/farzadnekouei/trash-type-image-dataset)
   - **Functionality:** Classifies waste items in images as recyclable or non-recyclable.

9. **Waste Classification**
    - **Model:** CNN
    - **Dataset:** [Kaggle dataset](https://www.kaggle.com/datasets/farzadnekouei/trash-type-image-dataset)
    - **Functionality:** Classifies waste items in images into categories like battery, biological, glass, cardboard, clothes, etc.

10. **Bag Type Classification**
    - **Model:** CNN
    - **Dataset:** [Kaggle dataset]([https://www.kaggle.com/datasets/farzadnekouei/trash-type-image-dataset](https://www.kaggle.com/datasets/vencerlanz09/plastic-paper-garbage-bag-synthetic-images))
    - **Functionality:** Classifies bags in images into garbage bag, paper bag, or plastic bag.

11. **Frequently Asked Questions (FAQs WasteBot)**
    - **Model:** NLP with SVM
    - **Dataset:** Custom dataset with over 1000 Q&A on waste management.
    - **Functionality:** Answers questions based on waste management.

## Project Structure

- 📁 `backend/`
  - 📁 `Dataset/`
  - 📁 `models/`
  - 📄 `app.py`
- 📁 `pages/`
  - 📁 `api/`
- 📁 `styles/`

## Getting Started

To get started with WasteManagementAI, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JainSneha6/Waste-Management.git
