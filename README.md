# Smart AI-Powered Email Reply Assistant

### An intelligent productivity tool that auto-generates high-quality email responses using AI. Built with a robust tech stack — React, Java Spring Boot, Material UI, and a Gmail-integrated Chrome Extension — this assistant enables users to draft, personalize, and send contextually appropriate email replies with just one click.

---

## Project Overview

The Smart Email Reply Assistant consists of two main components:

**1. 💻 React Web Application**
An interactive web application built with **React.js**, designed to help the users to generate smart, AI-powered replies to email content within seconds.
-Built using **React** and **Material UI**
-Connected to a **Spring Boot backend API**
-Option to select reply tone: *Professional, Casual, Friendly, Formal*
-Includes UI enhancements using **Framer Motion**

**2. 🧩 Chrome Extension for Gmail**
A lightweight Chrome extension that integrates AI powered reply generation directly into the Gmail interface, enhancing email productivity with a single click.
-Detects when a Gmail compose window opens and dynamically injects an “AI Reply” button next to the default Send button.
-Automatically reads the content of the current email thread to pass relevant context to the AI model.
-Uses the same **Spring Boot backend** as the React app.

---

## Tech Stack 
-**Frontend** - React, Material UI, Framer Motion
-**Backend** - Java SpringBoot, RESTful APIs
-**AI Integration** - Gemini AI API
-**Extension** - JavaScript

---

## Setup Instructions
### 1.Backend - Java SpringBoot

NOTE:
1.Some prerequisite installations are - IDE like **IntelliJ or Eclipse**, **Java17+**, **Maven**
2.Make sure the backend is running on http://localhost:8080, which the React app and Chrome extension use.
3.Configure your Gemini API key and url inside the project as environment variables or else it won't work.

Steps to run the backend locally :
**1. Clone the Project**

git clone https://github.com/your-username/your-repo.git
cd backend-folder

**2. Build the Project**
If using Maven: ./mvnw clean install
Or if using Windows: mvn clean install

**3. Run the Server**
./mvnw spring-boot:run
Or run directly in your IDE by launching EmailWriterSbApplication.java

### 2. React Application

Steps:
**1. Run Locally**
cd frontend
npm install
npm start

**2. Dependencies**
npm install @mui/material @emotion/react @emotion/styled axios framer-motion @mui/icons-material

*App will run on http://localhost:3000*

### 3. Chrome Extension 
Steps:
**1. Load Extension Locally**
Open Chrome → chrome://extensions
Enable *Developer Mode*
Click *Load unpacked*
Select the folder with manifest.json
Now open Gmail → start composing → click the AI Reply button.

---

## Contributing
Have ideas for improvement? Feel free to fork the repository, make changes, and submit a pull request!

---

## Contact
For any queries or suggestions, reach out via sarraftanishk4@gmail.com or open an issue on GitHub.
