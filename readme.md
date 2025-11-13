# SathiShare
[sathishare.aashishrijal.com.np](https://sathishare.aashishrijal.com.np)

SathiShare is a simple platform built with Node.js, MongoDB, and EJS that lets users share text, files, photos, videos, or chat with friends without requiring a login. It supports dark mode and provides quick links to social profiles.

## Features

- Text sharing
- File upload and download / preview
- Photo & video sharing
- Instant chat (no login required)
- Dark mode toggle
- Social media links (LinkedIn, Facebook, GitHub)

## Technologies

- Backend: Node.js, Express
- Frontend: EJS, HTML, CSS, JavaScript
- Database: MongoDB
- File storage: Local (consider cloud storage for production)
- Hosting: Render (or other hosts)

## Project structure (example)

```
SathiShare/
├─ views/
│  ├─ index.ejs
│  ├─ 404.ejs
│  └─ ...
├─ public/
│  ├─ css/
│  │  └─ home.css
│  ├─ img/
│  │  └─ logo.png
│  └─ ...
├─ routes/
│  └─ index.js
├─ models/
│  ├─ user.js
│  └─ file.js
├─ storage/        # uploaded files
├─ .env
├─ .gitignore
├─ app.js
├─ package.json
└─ README.md
```

## Installation

### Prerequisites

- Node.js
- MongoDB
- Git

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/SathiShare.git
    cd SathiShare
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the project root (example):
    ```env
    PORT=3000
    JWT_SECRET=your_secret_key
    NODE_ENV=development
    MONGODB_URI=mongodb://localhost:27017/sathishare
    ```

4. Start the app:
    ```bash
    npm start
    ```

5. Open http://localhost:3000

## Contact

For inquiries: aashisrijal252@gmail.com

## Notes

- Replace the GitHub clone URL above with your repository URL.
- Adjust `.env` values for production.
- Use cloud file storage in production (S3, etc.) instead of local storage.
- Update deployment steps according to your hosting provider.
- Ensure a LICENSE file is present if you reference it.

