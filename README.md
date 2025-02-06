# Custom AI Chat App

## Table of Contents

- [Custom AI Chat App](#custom-ai-chat-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Usage](#usage)

---

## Features

- **AI Chat Interface:**  
  Send messages and receive simulated (or real) streaming responses from an AI chat service.
- **State Management:**  
  Global state is managed with [Zustand](https://github.com/pmndrs/zustand).
- **Form Handling:**  
  Login and other forms are managed with [react-hook-form](https://react-hook-form.com/).
- **Unified Design System:**  
  A custom theme centralizes colors, typography, spacing, and more. Reusable components ensure a consistent UI across the app.
- **TypeScript Aliases:**  
  Cleaner and more maintainable import paths using custom TypeScript path aliases.

---

## Tech Stack

- **React Native** (Expo)
- **TypeScript**
- **Expo CLI**
- **Zustand** for state management
- **react-hook-form** for form handling
- **Axios** for API calls
- **Custom Design System** with a centralized theme

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/CustomAIChat.git
   cd CustomAIChat
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Install Expo CLI globally (if you haven’t already):**

   ```bash
   npm install -g expo-cli
   ```

   Configuration

   TypeScript Aliases

   This project uses TypeScript path aliases. In your tsconfig.json file, the "compilerOptions" section should include:

   ```json
   {
     "compilerOptions": {
       "baseUrl": "./",
       "paths": {
         "@components": ["src/components"],
         "@utils/*": ["src/utils/*"],
         "@theme/*": ["src/theme/*"],
         "@store/*": ["src/store/*"],
         "@screens/*": ["src/screens/*"],
         "@navigation/*": ["src/navigation/*"]
       }
     }
   }
   ```

   This allows you to import modules like:

   ```typescript
   import { MyButton } from "@components";
   import { theme } from "@theme/theme";
   import { useChatCompletion } from "@utils/api";
   ```

   Metro Bundler Configuration

   Metro must know about your aliases. Create or update the metro.config.js file at the root with the following:

   ```js
   // metro.config.js
   const { getDefaultConfig } = require("expo/metro-config");

   const defaultConfig = getDefaultConfig(**dirname);
   defaultConfig.resolver.extraNodeModules = {
   "@components": `${**dirname}/src/components`,
     "@utils": `${__dirname}/src/utils`,
     "@theme": `${**dirname}/src/theme`,
     "@store": `${**dirname}/src/store`,
     "@screens": `${__dirname}/src/screens`,
     "@navigation": `${\_\_dirname}/src/navigation`,
   };


   module.exports = defaultConfig;
   ```

## Usage

Starting the App

1.  Start the Expo development server:

    ```bash
    expo start
    ```

2.  Run the app on your device:
    • Use an emulator (iOS/Android) or scan the QR code with the Expo Go app.
3.  Chat:
    Send messages using the text input and tap Send to receive simulated responses.

Project Structure

```CustomAIChat/
├── App.tsx # Entry point
├── babel.config.js
├── metro.config.js # Metro configuration for path aliases
├── package.json
├── tsconfig.json # TypeScript configuration with aliases
└── src
├── components # Reusable UI components (MyButton, MyInput, MyText, etc.)
├── navigation # Navigation setup (RootNavigator, AppTabs)
├── screens # App screens (ChatScreen, LoginScreen, ProfileScreen)
├── store # Global state managed by Zustand
├── theme # Centralized theme (colors, spacing, typography, etc.)
└── utils # Utility functions and custom hooks (e.g., useMockChatCompletion)
```

License

This project is licensed under the MIT License. See the LICENSE file for details.
