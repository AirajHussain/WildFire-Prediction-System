# Wildfire Prediction System (Work In Progress)
The Wildfire Prediction Application is designed to monitor and predict fire-prone conditions in real-time. Using environmental sensors (temperature, humidity, and soil moisture), the application continuously collects data via an STM32 microcontroller. This data is analyzed through a fire risk algorithm built in Python to assess potential fire risks. The results are stored in a MongoDB database, and a React.js-powered web dashboard visualizes the data, providing real-time alerts and analytics. This tool helps manage and mitigate wildfire risks by offering insights into environmental conditions that influence fire behavior.


# 💻Technologies
- Java
- React.js
- Python
- MongoDB
- STM32

# 📷Pictures

### Environmental Data Change Over Time 
<div style="display: flex; justify-content: space-around;">
<img src="https://github.com/AirajHussain/WildFire-Prediction-System/blob/main/images/batch1.png" alt="login_page" width="600"/>
<img src="https://github.com/AirajHussain/WildFire-Prediction-System/blob/main/images/batch2.png" alt="login_page" width="600"/>
</div>

The images show how environmental data, such as temperature, humidity, and soil moisture, changes over time, highlighting the dynamic conditions that influence wildfire prediction.


# Setup Instructions
Follow these steps to run the **Wildfire Prediction System** locally:

1. Clone the repository.
2. Navigate to the `server` folder and run `npm start`.
3. Navigate to the `client` folder and run `npm start`.
4. Go to the WildFire site and proceed.
