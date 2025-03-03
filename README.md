# G Quiz App 🎓

## Please refer to ScreenShots folder for demo

G Quiz is an interactive web application designed to test your Python programming knowledge through an engaging quiz format. It is a full-stack project with a client-server architecture.

---

## Features 🌟

- **Interactive Quiz**: 15 engaging Python-related questions.
- **Client-Server Architecture**: Built with React for the frontend and Node.js/Express for the backend.
- **Responsive Design**: Tailored to look great on any device.
- **Gradient Background**: Styled with a sleek purple gradient for a modern look.
- **Sidebar Navigation**:
  - Quiz
  - Inbox
  - Logout
- **Authentication**: Token-based authentication using RSA key pairs.

---

## Technologies Used 🛠️

### Frontend
- **React.js**
- **Flowbite-React (Tailwind CSS Components)**
- **Tailwind CSS**
- **React Icons**

### Backend
- **Node.js**
- **Express.js**
- **JWT Authentication** using RSA keys
- **MongoDB**

---

## Installation and Setup 🚀

### Prerequisites
- Node.js installed on your system.
- MongoDB (if a database is configured).

### Clone the Repository
```bash
git clone https://github.com/yourusername/g-quiz.git
cd g-quiz
```

## Backend Setup
#### 1- Navigate to the server directory:
```bash
cd server
```

#### 2- Install dependencies:
```bash
npm install
```

#### 3- Configure environment variables:
```bash
DB_CONNECT = 
PORT = 6005
SESSION_SECRET = your-session-secret
GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET =
GOOGLE_CALLBACK_URL = 
FRONTEND_URL = 
FRONTEND_LOGIN_URL = 
```

#### 4 - Generate RSA keys for JWT:
```bash
node generateKeypair.js
```

#### 5- Start the server:
```bash
npm run dev
```
## Frontend Setup
1- Navigate to the client directory:
```bash
cd client
```
2- Install dependencies:
```bash
npm install
```

3- Start the development server:
```bash
npm start
```

4- Open the app in your browser:
```bash
http://localhost:3000
```

## Folder Structure 🗂️
```bash
g-quiz/
├── client/                # Frontend code
│   ├── build/             # Production build
│   ├── public/            # Static assets
│   ├── src/               # React source code
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── package.json       # Client dependencies
├── server/                # Backend code
│   ├── config/            # Configuration files
│   ├── lib/               # Utility functions and libraries
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── id_rsa_priv.pem    # RSA private key for JWT
│   ├── id_rsa_pub.pem     # RSA public key for JWT
│   ├── app.js             # Main server file
│   ├── generateKeypair.js # Script to generate RSA keys
│   └── package.json       # Backend dependencies
├── .env                   # Environment variables
├── README.md              # Project documentation
```

<img width="1680" alt="dashboard" src="https://github.com/user-attachments/assets/c8aa3055-4b8a-4f67-89dd-d5a1a05de353" />
<img width="1409" alt="landing_page" src="https://github.com/user-attachments/assets/efc53078-7f1c-4a23-8297-05e03d043c81" />
<img width="1053" alt="login" src="https://github.com/user-attachments/assets/ec7b3b18-64e3-496a-8a67-07c62427d379" />
<img width="1211" alt="quiz" src="https://github.com/user-attachments/assets/024cb78c-014f-43da-8787-01f91c821714" />
<img width="927" alt="signup" src="https://github.com/user-attachments/assets/dde569ef-d23f-4f85-ad5b-83148bfc7780" />


















