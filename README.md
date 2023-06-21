
<div align="center">
  <img src="screenshots/Logo.jpg" alt="Code Editor" width="300">
</div>

# CodeEditor

CodeEditor is a simple, real-time collaborative code editor built with React, Redux, and Socket.IO. It allows users to create code blocks, edit them in real time, and share them with others. This project was created as part of a job interview assignment.

## Navigation

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Screenshots](#screenshots)
- [Mobile](#mobile)
- [Getting Started](#getting-started)

## Features



## Technology Stack

### Frontend
- React
- Redux
- React Rauter Dom
- Axios
- Scss
- MUI Material

### Backend
- Node.js
- Express
- MongoDB
- socket.io

## Screenshots

### Loby Page
![Loby Page](screenshots/LobyPage.png)

The Lobby page displays the title "Choose code block" and a list of code block items. Clicking on an item directs the user to the corresponding code block page.

### Teacher Mode
![Teacher Mode](screenshots/TeacherMode.png)

In teacher mode, the mentor can view the selected code block in read-only mode, allowing them to observe the student's progress, while also having the option to request the solution if needed.

### Student Mode
![Student Mode](screenshots/StudentMode.png)

In student mode, the user can actively modify the code within the selected code block. They also have the option to click a button and request hints directly within the application to receive guidance during the coding task.

### Correct Solution
![Correct Solution](screenshots/CorrectSolution.png)

When the user successfully enters the correct solution to the coding task, the screen goes wild with confetti. Because let's be honest, confetti brings a whole new level of happiness..


## Mobile

<img src="screenshots/LobyPageMobile.png" width=25%/><img src="screenshots/TeacherModeMobile.png" width=25%/><img src="screenshots/StudentModeMobile.png" width=25%/><img src="screenshots/CorrectSolutionMobile.png" width=25%/>

## Installation

### Prerequisites

Ensure you have the following installed on your local system:

- Node.js 14.0.0 or above
- npm 6.0.0 or above

### Setup

1. Clone the repository to a directory of your choice using `git clone https://github.com/ShaharSaadon/codeEditor.git`.
2. Navigate into the `codeEditor` directory.
3. Install server dependencies using `npm install`.
4. Navigate into the `client` directory using `cd client`.
5. Install client dependencies using `npm install`.
6. Run the server using `npm start` from the root directory.
7. Run the client using `npm run dev` from the `client` directory.

## Usage

Visit `http://localhost:5173` to view the application in your browser. If the application is running on a different port, make sure to update the server's core address accordingly.

