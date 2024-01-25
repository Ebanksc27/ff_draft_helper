# Front End Example Work In Progress

https://github.com/Ebanksc27/ff_draft_helper/assets/126507556/ef8bc155-0c33-494f-89a7-acc610947da6

# Frontend Documentation

## Overview

This document provides an overview of the frontend architecture for the Fantasy Football Draft Helper application. The frontend is built using React and offers a user-friendly interface for users to manage their fantasy football drafts.

## Components

### `App.js`

Serves as the root component that wraps the entire application. It uses React Router for navigation between different views.

### `Header.js`

Displays the navigation bar at the top of the application, providing links to different routes and dynamic display depending on the user's authentication status.

### `LoginForm.js`

Handles user login. It communicates with the backend to authenticate users.

### `RegisterForm.js`

Allows new users to register. It sends user information to the backend to create a new account.

### `Dashboard.js`

Acts as the home page for authenticated users, providing a summary view of their draft boards and other relevant information.

### `PlayerList.js`

Displays a list of players that users can search through and add to their favorites.

### `PlayerCard.js`

Represents an individual player with options to view more details and add the player to the favorites list.

### `DraftList.js`

Lists all the drafts that the user has created or participated in. *(This component is for future implementation and is not currently active.)*

### `DraftBoard.js` (Work in Progress)

Represents the user's draft board where they can organize their drafted players by position using drag-and-drop functionality. The implementation of adding players from the favorites list is currently in progress.

## Services

### `auth.js`

Provides authentication services, including login, registration, and JWT token management.

### `userService.js`

Handles user-related data fetching from the backend, like retrieving user profiles.

### `playerService.js`

Manages fetching player data from the backend, including search functionality and retrieving favorites.

### `draftService.js`

Handles draft-related operations such as fetching and updating draft boards. *(Future implementations will include creating and fetching specific drafts.)*

## Technologies

- React
- React Router
- Axios for API calls
- Material-UI for component styling
- `react-beautiful-dnd` for implementing drag-and-drop functionality
- JWT for user authentication

## State Management

State within the application is managed using React's useState and useEffect hooks. Each component that requires state management declares its own state and logic for updating it based on interactions or API calls.

## Draft Board (Work in Progress)

The draft board feature is currently under development. It will allow users to:

- View a list of their favorite players.
- Sort players by position.
- Add players to their draft board via drag-and-drop.

This feature aims to enhance the user experience by providing a seamless way to organize their preferred players leading up to their fantasy draft.

## Authentication

User authentication is handled via JWT. The application stores the JWT in `localStorage` and includes it in the headers of authenticated API requests.

## Error Handling

The application provides feedback to the user through error messages when an operation fails, such as failed API calls or authentication errors.

---

*Note: The draft board feature is in active development, and this document will be updated as new features are implemented and finalized.*



# Backend Development Documentation

## Overview
This document outlines the backend development process for a full-stack web application. The backend is built using Node.js and Express and integrates with the Sleeper API for NFL data. It includes user authentication, session management, and CRUD operations for various entities.

## Tools and Technologies

- **Node.js**: JavaScript runtime environment for executing JavaScript code server-side.
- **Express**: Web application framework for Node.js, used for building the web API.
- **PostgreSQL**: Relational database system for storing user data, player rankings, drafts, and other relevant data.
- **Jest**: JavaScript testing framework used for writing unit and integration tests.
- **Supertest**: Library for testing HTTP assertions, used in conjunction with Jest.
- **bcryptjs**: Library for hashing and comparing passwords for user authentication.
- **jsonwebtoken (JWT)**: Implementation of JSON Web Tokens for user authentication and session management.
- **Sleeper API**: External API for fetching NFL players' data.

## Backend Features

### User Authentication
- **Registration**:

 Allows new users to register with a username, email, and password.
- **Login**: Authenticates users and provides a JWT for session management.

### API Integration
- **Sleeper API**: Integrated to fetch and store NFL players' data. Handles data synchronization and updates.

### CRUD Operations
- **Players**: Retrieve all players, specific player details, and update player data.
- **Drafts**: Create, read, update, and delete draft information.
- **Rankings**: Manage player rankings with the ability to add, retrieve, update, and remove rankings.

### Database Schema
- PostgreSQL database with tables for users, players, drafts, and rankings.
- Relations and constraints set up to maintain data integrity.

### Testing and Debugging
- Comprehensive testing of backend routes using Jest and Supertest.
- Mocking of database interactions and authentication middleware for isolated testing.

## Challenges and Solutions
- **API Data Integration**: Managed the large data set from the Sleeper API and resolved data format discrepancies.
- **Authentication**: Implemented secure user authentication and token-based session management.
- **Data Schema Design**: Designed a relational database schema that efficiently handles complex data relationships.
- **Error Handling**: Implemented robust error handling for API routes to ensure stability and reliability.

## Future Enhancements
- Expand the test suite to cover more edge cases and error scenarios.
- Implement additional features based on user feedback and application requirements.
- Optimize performance for handling larger datasets and higher user loads.

---

*This documentation provides a comprehensive overview of the backend development process for the application, detailing the technologies used, features implemented, challenges faced, and potential future enhancements.*
