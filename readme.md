# SathiShare

SathiShare is a simple platform built with Node.js, MongoDB, and EJS where users can share text, files, photos, and videos, or start chatting with friends without the need for a login. The platform supports dark mode and provides easy access to social media profiles.

## Features

- **Text Sharing**: Share textual content with others quickly and easily.
- **File Sharing**: Upload and share files. Users can download files or view them directly.
- **Photo and Video Sharing**: Share your favorite photos and videos.
- **Chat Functionality**: Start chatting with friends instantly without needing to log in.
- **No Login Required**: Enter your name and start sharing or chatting immediately.
- **Dark Mode**: Toggle between light and dark modes for a personalized experience.
- **Social Media Links**: Quick access to LinkedIn, Facebook, and GitHub profiles.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript Templates), HTML, CSS, JavaScript
- **Database**: MongoDB
- **File Storage**: Local storage (with considerations for production environments)
- **Hosting**: Render.com

## Project Structure

SathiShare/ │ ├── views/ │ ├── 404.ejs # 404 error page │ ├── index.ejs # Main homepage view │ └── ... # Other views │ ├── public/ │ ├── css/ │ │ └── home.css # Styles for the homepage │ ├── img/ │ │ └── logo.PNG # Logo image │ └── ... # Other static assets (e.g., JS, images) │ ├── routes/ │ ├── index.js # Main routes for the application │ └── ... # Other route files │ ├── models/ │ ├── user.js # User model for MongoDB │ ├── file.js # File model for MongoDB │ └── ... # Other models │ ├── storage/ # Directory for storing uploaded files │ ├── .env # Environment variables ├── .gitignore # Files and directories to be ignored by Git ├── app.js # Main server file ├── package.json # Project dependencies and scripts └── README.md # Project documentation


## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/SathiShare.git
   cd SathiShare

2. Install the dependencies:
    ```bash 
    npm install

3. Create a `.env` file in the root directory and add the following:
    
    ```bash
    PORT=3000
    JWT_SECRET=your_secret_key
    NODE_ENV=development
    MONGODB_URI=mongodb://localhost:27017/sathishare

4. Run the application
    ```bash
    npm start

5. Visit http://localhost:3000 in your browser to access the application.


## Contact:
For any inquiries, you can reach out to aashisrijal252@gmail.com

### Notes:
- Replace `https://github.com/aashisrjl/SathiShare.git` with your actual GitHub repository URL.
- Customize the `.env` variables as per your requirements.
- Adjust the deployment steps based on your actual hosting service if it's not Render.
- Ensure the `LICENSE` file exists in your project repository if you reference it.

