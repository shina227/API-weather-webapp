# Weather App

## Overview
This is a simple **Weather Web App** that allows users to search for real-time weather data for any city. It fetches data from **WeatherAPI.com** and displays:
- **Current weather** (temperature, humidity, conditions, etc.)
- **7-day weather forecast**
- **City search functionality**

This project was built using **HTML, CSS, JavaScript, and Express.js**, and is deployed across multiple servers with a load balancer for improved scalability.

---
## Features
- Search by city name to get current weather details  
- 7-day forecast with weather icons  
- Modern UI with responsive design  
- Error handling for invalid city names  
- Deployed with **Node.js & Express** on multiple web servers  

---
## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **API:** WeatherAPI.com
- **Deployment:** Ubuntu, Nginx, Load Balancer

---
## Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/shina227/API-weather-webapp.git
cd API-weather-webapp
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the project root and add your WeatherAPI key:
```sh
API_KEY=your_weatherapi_key_here
```

### **4️⃣ Run the Server**
```sh
node server.js
```

Your app should now be running on `http://localhost:3000`! 🎉

---
## Deployment Steps
This app is deployed on **two web servers** with a **load balancer** (NGINX).
### **1️⃣ Setup Node.js & Dependencies on Both Web Servers (Web01 & Web02)**
```sh
sudo apt update && sudo apt install -y nodejs npm
mkdir weather-app && cd weather-app
git clone https://github.com/shina227/API-weather-webapp.git
cd API-weather-webapp
npm install
```

### **2️⃣ Start the Server on Both Web Servers**
```sh
node server.js
```

### **3️⃣ Configure the Load Balancer (Lb01)**
Install Nginx and set up load balancing:
```sh
sudo apt install nginx
sudo nano /etc/nginx/sites-available/weatherapp
```

Add this configuration:
```nginx
upstream weather_servers {
    server Web01_IP:3000;
    server Web02_IP:3000;
}
server {
    listen 80;
    server_name YOUR_LB_IP; # Replace with Lb01's public IP

    location / {
        proxy_pass http://weather_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable the config and restart Nginx:
```sh
sudo ln -s /etc/nginx/sites-available/weatherapp /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

### **4️⃣ Testing the Load Balancer**
✅ Open a browser and go to **`http://YOUR_LB_IP`** to test the load balancer.  
✅ Refresh multiple times to verify traffic is alternating between Web01 and Web02  
✅ Run this command on Lb01 to monitor NGINX logs:
```sh
sudo tail -f /var/log/nginx/access.log
```
✅ If errors occur, check the error log:
```sh
sudo tail -f /var/log/nginx/error.log
```

Your app should now be accessible at `http://Lb01_IP`! 🎉

---
## 📝 Notes
- The `.env` file is **ignored by Git** to keep the API key secure.
- If the app doesn’t work, restart the server with `node server.js`.
- Ensure all servers are running correctly and the load balancer is distributing traffic evenly.

---
## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

---
### 🎯 Author: **Atete Mpeta Shina**
Happy Coding! 🚀

