# ThoughtFlow

  
ThoughtFlow is a journaling application that allows users to log their thoughts and emotions and view statistics based on those entries. The application is built using React Native with JavaScript/TypeScript, integrates with Firebase for authentication, Java/Spring Boot for a backend, and MySQL as the database. The application's backend is hosted on an AWS EC2 instance which connects to an AWS RDS instance. Additionally, this repository contains the the files for a NextJS website which is hosted at [thoughtflowjournal.vercel.app](thoughtflowjournal.vercel.app) and which hosts the APK for sideloading the application on Android.

## Features

  
-  **User Authentication**: Users can register and log in using their email and password.

  
-  **Journal Entries**: Users can create, update, and delete journal entries. Each entry can include a title, content, image, and selected moods.

  
-  **AI Integration**: The application uses Google's Gemini Generative AI to provide responses based on the journal entry content.

  
-  **Statistics**: Users can view statistics based on their journal entries.

  
-  **Settings**: Users can log out and manage other settings.

## Maintenance

 **Clone the repository:**
 

     git clone https://gitlab.com/wgu-gitlab-environment/student-repos/JonathanMitchell1234/d424-software-engineering-capstone/-/tree/working-branch/

 **Install the dependencies:**

     npm install
**Create a .env file with your own API keys:**

    EXPO_PUBLIC_GOOGLE_API_KEY=YOURKEY
    EXPO_PUBLIC_FIREBASE_API_KEY=YOURKEY

**Run the Docker image containing the Java/Spring Boot backend on port 8080:**

    sudo docker run --platform linux/amd64 -d -p 8080:8080 jonmitchell1234/journalbackend:test2

**Start the Expo server:**

    npx expo start

## Installing the APK as an End User

1) Navigate to [thoughtflowjournal.vercel.app](thoughtflowjournal.vercel.app) in your browser.

2) Click the download APK button on the landing page.

3) On your Android device, go to settings > security (or similar) and find the setting labeled Unknown Sources or Install Apps from Unknown Sources and toggle this setting to on.

4) Tap on the APK file and start the installation process.

5) Open the ThoughtFlow app on your Android Device

6) Tap the register link and register an account using your email/password.

7) Login to the app using your email/password combo.





