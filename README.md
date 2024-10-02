# Waste-Management

Welcome to Waste-Management! This project leverages machine learning, deep learning, artificial inteligence models and blockchain to address various aspects of waste management, including waste prediction, classification, disposal techniques, addresses various FAQs and promoting transparency in waste collection and motivating societies to reduce carbon footprints.

| **Section**                            | **Description**                                               |
|----------------------------------------|---------------------------------------------------------------|
| [About the Project](#about-the-project) | Overview of the project's goals, technologies, and approach    |
| [Preview of the Website](#preview-of-the-website) | Visual preview of the website interface                        |
| [Features](#features)                  | Details of waste management features and prediction models     |
| [Smart Contracts](#smart-contracts)    | Overview of smart contracts used for waste management and carbon footprint tracking |
| [Overview of CNN Based Models](#overview-of-cnn-based-models-for-waste--bags-classification) | CNN models used for waste and bag classification               |
| [Overview of NLP & SVC Models](#overview-of-nlp--svc-based-models) | NLP and SVC models used for FAQs on waste management           |
| [Overview of Sensor Readings Models](#overview-of-sensor-readings-based-prediction-models) | Sensor-based models for predicting anomalies and waste status   |
| [Overview of ML Models](#overview-of-ml-models-for-waste-management-classification-and-prediction) | Machine learning models for waste classification and prediction |
| [Project Structure](#project-structure) | Folder and file structure of the project                       |
| [Getting Started](#getting-started)    | Steps to clone and run the project on your local machine       |
| [Demo Video](#demo-video)              | Video demonstration of the project                             |
| [Contributing](#contributing)          | Guidelines for contributing to the project                     |
| [Contact](#contact)                    | Contact information for project maintainers                    |


## About the Project

Waste-Management uses sensors and custom datasets to develop models for predicting and classifying different types of waste, managing waste disposal techniques, and integrating voice control features. The backend is written in Flask, and the frontend is created using Next.js.
It also uses solidity to write smart contracts.

## Preview of the Website
![WhatsApp Image 2024-05-20 at 8 11 39 PM](https://github.com/JainSneha6/Waste-Management/assets/126079866/51c45fd8-1ab2-46e6-a8b8-8a656212c35e)
![WhatsApp Image 2024-05-20 at 8 16 50 PM](https://github.com/JainSneha6/Waste-Management/assets/126079866/09a45886-6ebd-4ad9-9074-fe8fa775824c)










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
    - **Dataset:** [Kaggle dataset](https://www.kaggle.com/datasets/vencerlanz09/plastic-paper-garbage-bag-synthetic-images)
    - **Functionality:** Classifies bags in images into garbage bag, paper bag, or plastic bag.

11. **Frequently Asked Questions (FAQs WasteBot)**
    - **Model:** NLP with SVM
    - **Dataset:** [Custom dataset with over 700 Q&A on waste management.](https://github.com/JainSneha6/Waste-Management/blob/main/backend/Dataset/WasteBot.csv)
    - **Functionality:** Answers questions based on waste management.

## Data Collection From Sensors

![WhatsApp Image 2024-05-24 at 14 48 27_e1f36751](https://github.com/user-attachments/assets/e78bcdfb-09a4-4d4e-820f-c16e5cadcf61)
![WhatsApp Image 2024-05-24 at 14 50 17_22cb880c](https://github.com/user-attachments/assets/31ff06e1-2eda-4b52-b902-425219e37b76)
![WhatsApp Image 2024-05-24 at 14 51 13_8e1a8718](https://github.com/user-attachments/assets/059997a8-9a44-41d8-9a42-9705e202ab1a)
![WhatsApp Image 2024-05-24 at 15 02 53_74eb6392](https://github.com/user-attachments/assets/5165c463-c864-490d-8fe9-0970fae5602c)
![WhatsApp Image 2024-05-24 at 15 06 04_73f0a9b8](https://github.com/user-attachments/assets/be984295-ce51-40a8-8675-e494df91a451)
![WhatsApp Image 2024-05-24 at 15 06 44_9599d97a](https://github.com/user-attachments/assets/a9360f44-be12-4727-a5f7-c090efc7ef4e)
![WhatsApp Image 2024-05-24 at 15 07 27_d4b51eb6](https://github.com/user-attachments/assets/14e6ecdc-6512-4e07-8e88-e27c9144c690)
![WhatsApp Image 2024-05-24 at 15 09 43_8307b8fc](https://github.com/user-attachments/assets/23769614-4e62-465a-970f-8c65ff5e6ee4)









## Smart Contracts 

   ![smartcontracts drawio 1](https://github.com/user-attachments/assets/64fa6f96-ff3a-4e95-a461-d6338784da0c)


1. **Supply Chain**
    
     ![SupplyChain](https://github.com/JainSneha6/Waste-Management/assets/126079866/d895e6d2-ca81-495a-afc4-d5315530dea8)

2. **Carbon Footprints**

    ![WhatsApp Image 2024-05-16 at 11 00 56 PM](https://github.com/JainSneha6/Waste-Management/assets/126079866/3771005e-66a1-4776-ae5f-3528a04a8ce6)

## Overview of CNN Based Models For Waste & Bags Classification

   ![CNN drawio 1](https://github.com/user-attachments/assets/a7d5f33c-a385-4ede-a666-24bd19bb25cc)

## Overview of NLP & SVC Based Models

   ![NLP drawio 1](https://github.com/user-attachments/assets/2869503d-92ac-4fa1-b43e-42d29fcc6f90)

## Overview of Sensor Readings Based Prediction Models
   ![SensorModels 1](https://github.com/user-attachments/assets/25efc00c-dd0c-4ffb-be3d-a115aae271f7)

## Overview of ML Models for Waste Management Classification and Prediction

   ![Waste drawio 1](https://github.com/user-attachments/assets/a5857b1f-c092-49fa-a525-8458e6712a06)



## Circuit Diagram of Hardware

![image](https://github.com/user-attachments/assets/a364f4f6-e639-4980-b3f8-8f06f045fc60)

## Hardware Part of Project

![image](https://github.com/user-attachments/assets/95c74469-ae71-493c-a3b9-fe2ec6717e91)

## Predicted Classes on Test Images of type of bags

![image](https://github.com/user-attachments/assets/838eed83-c21e-42d7-8e92-a815c1a57869)


## Graph of testing and validation on Garbage bags

![image](https://github.com/user-attachments/assets/38fdc390-ca7f-4cd8-99bd-e1246482443c)


## ROC and Precision-Recall Curve for Garbage Bag

![image](https://github.com/user-attachments/assets/a85c53e4-0a98-422b-bac4-d655df011b38)
![image](https://github.com/user-attachments/assets/a2550ccc-8770-4798-a638-e6702d5edb05)



## Predicted Classes on Test Images on recyclable and non-recyclable waste

![image](https://github.com/user-attachments/assets/022e06f9-edf0-4d30-be08-a84fa2225b3b)

## Predicted Classes on Test Images of type of waste

![image](https://github.com/user-attachments/assets/f44b52a5-4fb1-4055-83fa-a5e66ff04ed0)


## ROC and Precision-Recall Curve for Waste Types

![image](https://github.com/user-attachments/assets/8ad7499c-a117-42a7-a1b1-0cceec310201)
![image](https://github.com/user-attachments/assets/122ac710-e589-4ac5-8bcc-129c0d68db22)

## Graph of testing and validation on Waste types

![image](https://github.com/user-attachments/assets/5a4563e7-1f25-4fe1-a793-f7f280b6e7ba)




## Project Structure

- 📁 `backend/`
  - 📁 `Dataset/`
  - 📁 `models/`
  - 📄 `app.py`
- 📁 `pages/`
  - 📁 `api/`
- 📁 `styles/`

## Getting Started

To get started with Waste-Management, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JainSneha6/Waste-Management.git

2. **Navigate to the project directory**:
   ```bash
   cd Waste-Management

3. **Install backend dependencies**:
   ```bash
   cd backend
   python3 -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS and Linux
   source venv/bin/activate
   pip install flask, flask-cors, sklearn, tensorflow, cv2, pil, joblib, matplotlib, pandas, numpy

4. **Run the backend server (runs on port 5000 by default)**:
   ```bash
   python app.py

5. **Install frontend dependencies**:
   ```bash
   cd ../frontend
   npm install

6. **Run the frontend server (runs on port 3000 by default)**:
   ```bash
   npm run dev

7. **Open your web browser and navigate to `http://localhost:3000`**:

## Demo Video


https://github.com/user-attachments/assets/ce03e94e-3264-4479-8d41-f0bd5c8164f0

## Contributing

Contributions to this project are welcome! If you have suggestions for improvements or would like to contribute new features or analyses, feel free to submit a pull request

## Contact

For any questions or feedback, feel free to reach out:

- Sneha Jain - [GitHub](https://github.com/JainSneha6) | [LinkedIn](https://www.linkedin.com/in/sneha-jain-473357261/)
- Siddhartha Chakrabarty - [GitHub](https://github.com/SiddharthaChakrabarty) | [LinkedIn](https://www.linkedin.com/in/siddharthachakrabarty)
- [Project Repository](https://github.com/JainSneha6/Waste-Management)

