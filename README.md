# Image Uploader 
This is a full-stack image uploader project that allows users to upload an image from a React Native mobile app. The image is stored on a Node.js backend with PostgreSQL as the database. The uploaded image is then made visible on a React web app.

## Project Structure
- React Native App: Mobile app where users can select and upload images from their device.
- Node.js Backend: RESTful API to handle image uploads and store image metadata in PostgreSQL.
- PostgreSQL Database: Stores the image metadata such as filename, file path, and upload timestamp.
- React Web App: Displays the uploaded images fetched from the Node.js backend.

## Tech Stack
- Frontend: React, React Native
- Backend: Node.js, Express.js
- Database: PostgreSQL
- File Upload: Multer
- Others: Axios, CORS

## Features
1. React Native App:
   - Allows users to select an image from their device and upload it.
   - Sends the image to a Node.js backend.
2. Node.js Backend:
   - API to handle image uploads.
   - Stores image metadata (filename, file path, timestamp) in PostgreSQL.
   - Serves uploaded images as static files.
3. PostgreSQL:
   - Stores metadata including the file URL or file path for each uploaded image.
4. React Web App:
   - Displays all uploaded images fetched from the Node.js backend.

## Installation
### Prerequisites
  - Node.js and npm installed
  - PostgreSQL installed and running
  - Expo CLI for React Native app development

### Backend Setup
1. Clone the repository:<br/>
   git clone https://github.com/Diparya/ImageUploader.git<br/>
   cd ImageUploader/backend
2. Install the dependencies:<br/>
   npm install
3. Configure PostgreSQL:<br/>
   - Create a PostgreSQL database:<br/>
     CREATE DATABASE ImageUploader;
  -  Set up the database schema:<br/>
     CREATE TABLE images (<br/>
      id SERIAL PRIMARY KEY,<br/>
      filename TEXT NOT NULL,<br/>
      filepath TEXT NOT NULL,<br/>
      upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP<br/>
     );
4. Configure the database connection in backend/index.js:<br/>
    const pool = new Pool({<br/>
     user: 'postgres',   // Your PostgreSQL user<br/>
     host: 'localhost',  // Your PostgreSQL host<br/>
     database: 'ImageUploader',  // Your database name<br/>
     password: 'your-password',  // Your PostgreSQL password<br/>
     port: 5432,  // Default PostgreSQL port<br/>
    });
5. Start the backend server:<br/>
   npm run dev<br/>
The backend will run on http://localhost:3000.

## React Native App Setup
1. Navigate to the react-native-app directory:<br/>
   cd ../frontend
2. Install the dependencies:<br/>
   npm install
3. Start the app using Expo:<br/>
   npm start<br/>
You can now test the app on an emulator or real device using the Expo Go app.

## React Web App Setup
1. Navigate to the react-web-app directory:<br/>
   cd ../webapp
2. Install the dependencies:<br/>
   npm install
3. Start the React web app:<br/>
   npm run dev

## Usage
1. Upload Image:
   - Open the React Native app and select an image from your device.
   - Click on the "Upload" button to send the image to the backend.
2. View Images:
   - Open the React web app to see all the uploaded images.
  
## API Endpoints
### POST /upload
- Description: Upload an image.
- Request:
     - Form data containing an image file under the key image.
- Response:
     - 200 OK: On successful upload.
     - 500 Internal Server Error: If something goes wrong.
### GET /images
- Description: Fetch all uploaded images.
- Response:
     - Returns an array of image metadata (id, filename, filepath, upload time).

## Contributing
Contributions are welcome! Please create a pull request with your changes.

## Contact
For any questions or inquiries, please contact diparya28@gmail.com.

## Final Note
Ensure that the backend is running and properly configured, and that the React Native app can access the backend using the correct IP address. If you are testing on a physical device, use your computer's local IP address instead of localhost.
