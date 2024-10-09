# ThoughtFlow

ThoughtFlow is a journaling application that allows users to log their thoughts and emotions and view statistics based on those entries. The application is built using React Native with JavaScript/TypeScript, integrates with Firebase for authentication, Java/Spring Boot for a backend, and MySQL as the database. The application's backend is hosted on an AWS EC2 instance which connects to an AWS RDS instance. Additionally, this repository contains the the files for a NextJS website which is hosted at [thoughtflowjournal.vercel.app](/wgu-gitlab-environment/student-repos/JonathanMitchell1234/d424-software-engineering-capstone/-/blob/working-branch/thoughtflowjournal.vercel.app) and which hosts the APK for sideloading the application on Android.

![App Login Screen](https://github.com/user-attachments/assets/26e84835-e986-4283-bc6b-6ac51175a981)   ![App Main Screen](https://github.com/user-attachments/assets/10ec69c5-7314-475d-b611-6fe18457778f)



## [](#features)Features

-   **User Authentication**: Users can register and log in using their email and password.
    
-   **Journal Entries**: Users can create, update, and delete journal entries. Each entry can include a title, content, image, and selected moods.
    
-   **AI Integration**: The application uses Google's Gemini Generative AI to provide responses based on the journal entry content.
    
-   **Statistics**: Users can view statistics based on their journal entries.
    
-   **Settings**: Users can log out and manage other settings.
    

## [](#maintenance)Maintenance

<img src="https://github.com/user-attachments/assets/815e1d2c-982b-4011-ac5a-2d59461cf644" height="50%" width="50%">

**Clone the repository:**

```
 git clone https://gitlab.com/wgu-gitlab-environment/student-repos/JonathanMitchell1234/d424-software-engineering-capstone.git
```

**Checkout to docker-deploy Branch**

    git checkout docker-deploy

**Fill in the Environmental Variables in the Front End Directory**

    EXPO_PUBLIC_GOOGLE_API_KEY=YOURGOOGLEGEMINIAPIKEY

    EXPO_PUBLIC_FIREBASE_API_KEY=YOUREXPOPUBLICFIREBASEAPIKEY

    REACT_APP_FIREBASE_API_KEY=YOURFIREBASEAPIKEY
    
    REACT_APP_FIREBASE_AUTH_DOMAIN=YOURFIREBASEAUTHDOMAIN
    
    REACT_APP_FIREBASE_PROJECT_ID=YOURFIREBASEPROJECTID
    
    REACT_APP_FIREBASE_STORAGE_BUCKET=YOURFIREBASESTORAGEBUCKET
    
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOURSENDERID
    
    REACT_APP_FIREBASE_APP_ID=YOURAPPID
    
    REACT_APP_FIREBASE_MEASUREMENT_ID=YOURMEASUREMENTID


**Create a.env file in the database Directory and fill it in**

    MYSQL_ROOT_PASSWORD=YOURROOTPASSWORD
    MYSQL_DATABASE=YOURDBNAME

**Create a .env file Root Directory and fill it in**

    REACT_APP_BACKEND_URL=exp://YOUREXPOBACKENDURL
    
    DATABASE_URL=mysql://root:YOURMYSQLPASSWORD@db:3306/thoughtflow_journal_db
    
    MYSQL_ROOT_PASSWORD=YOURMYSQLROOTPASSWORD
    
    MYSQL_DATABASE=YOURDBNAME

**Fill in the Backend Data Source in application.properties**

    spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
    spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

**Run the Docker Compose File**

    docker compose up

**That's it, the entire application is now running and you can make changes as needed in your local environment.**

## [](#installing-the-apk-as-an-end-user)Installing the APK as an End User

1.  Navigate to [thoughtflowjournal.vercel.app](/wgu-gitlab-environment/student-repos/JonathanMitchell1234/d424-software-engineering-capstone/-/blob/working-branch/thoughtflowjournal.vercel.app) in your browser.
    
2.  Click the download APK button on the landing page.
    
3.  On your Android device, go to settings > security (or similar) and find the setting labeled Unknown Sources or Install Apps from Unknown Sources and toggle this setting to on.
    
4.  Tap on the APK file and start the installation process.
    
5.  Open the ThoughtFlow app on your Android Device
    
6.  Tap the register link and register an account using your email/password.
    
7.  Login to the app using your email/password combo.
