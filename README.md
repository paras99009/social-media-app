Social Media App
A feature-rich social media application built with React, TypeScript, Appwrite, and Tailwind CSS. This project offers a seamless user experience with functionalities like post creation, user authentication, and profile management.

Table of Contents
Introduction

Tech Stack

Features

Quick Start

Environment Variables

Links

License

Introduction
This project is a comprehensive social media platform that allows users to create, edit, and delete posts, manage their profiles, and interact with other users' content. It leverages modern web technologies to deliver a responsive and intuitive user interface.

Tech Stack
React: Frontend library for building user interfaces.

TypeScript: Typed superset of JavaScript for enhanced code quality.

Appwrite: Backend-as-a-Service (BaaS) platform providing authentication, database, and storage solutions.

Tailwind CSS: Utility-first CSS framework for rapid UI development.

React Query: Data-fetching library for managing server-state in React applications.

Features
User Authentication: Secure sign-up and sign-in functionalities.

Post Management: Create, edit, delete, like, and save posts.

Profile Management: Update user profiles and view other users' profiles.

Responsive Design: Optimized for various devices with a mobile-first approach.

Infinite Scroll: Seamless content loading for an enhanced user experience.

Quick Start
Follow these steps to set up the project locally:

Prerequisites
Ensure you have the following installed:

Node.js

npm

Git

Installation
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/paras99009/social-media-app.git
Navigate to the Project Directory:

bash
Copy
Edit
cd social-media-app
Install Dependencies:

bash
Copy
Edit
npm install
Set Up Environment Variables:

Create a .env file in the root directory and add the following:

env
Copy
Edit
VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_STORAGE_ID=your_storage_id
VITE_APPWRITE_USER_COLLECTION_ID=your_user_collection_id
VITE_APPWRITE_POST_COLLECTION_ID=your_post_collection_id
VITE_APPWRITE_SAVES_COLLECTION_ID=your_saves_collection_id
Replace your_* with your actual Appwrite credentials.

Run the Development Server:

bash
Copy
Edit
npm run dev
The application will be running at http://localhost:5173.

Environment Variables
The project requires the following environment variables:

VITE_APPWRITE_URL: Appwrite endpoint URL.

VITE_APPWRITE_PROJECT_ID: Appwrite project ID.

VITE_APPWRITE_DATABASE_ID: Appwrite database ID.

VITE_APPWRITE_STORAGE_ID: Appwrite storage ID.

VITE_APPWRITE_USER_COLLECTION_ID: Collection ID for users.

VITE_APPWRITE_POST_COLLECTION_ID: Collection ID for posts.

VITE_APPWRITE_SAVES_COLLECTION_ID: Collection ID for saved posts.

Links
Live Demo: https://socialapp-mocha.vercel.app/sign-in

GitHub Repository: https://github.com/paras99009/social-media-app

License
This project is licensed under the MIT License.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
#   s o c i a l - m e d i a - a p p 
 
 #   s o c i a l - m e d i a - a p p 
 
 