# Drone Game

Drone Game is a game where the player controls a drone flying through a cave, avoiding collisions with the walls. The objective is to navigate as far as possible and score the highest points.

## How to Run the Project Locally

To run this project on your local machine, follow these steps:

1. **Clone the repository:**

```bash
https://github.com/NatalyKrvch/verbose-octo-enigma.git
```
2. **Navigate to the project directory:**

```bash
cd verbose-octo-enigma
```
3. **Install dependencies:**

```bash
yarn install
```
4. **Run the project:**

```bash
yarn dev
```

## Game Description
Drone Game is an interactive game where the player controls a drone flying through a cave. The player can control the drone using the keyboard:
- Left/Right Arrow - Adjust the drone's horizontal speed.
- Up/Down Arrow - Adjust the drone's vertical speed.

The goal is to navigate through the cave without hitting the walls. The further you go, the more points you earn. The results of successfully completed games are stored in the browser's local storage and displayed on the leaderboard on the home page.


## Technologies Used

**Core Technologies**

- React
- TypeScript
- Context API
- Vite

**Routing**
- React Router

**User Interface**
- Material-UI: A React component library that provides modern design components. Used for building visual elements like buttons, dialogs, and tables.
- React D3 Speedometer: A component for creating speedometers. Used to display the drone's speed (both horizontal and vertical) in the form of gauges.
- React Toastify: A library for displaying notifications. Used to inform the user about game events such as game start or game end.

**Data Handling**
- Axios: A library for making HTTP requests. Used for communicating with the server, retrieving, and processing data (e.g., initializing the game and fetching tokens).
- LocalStorage: A built-in browser mechanism for storing data on the client side. Used for saving game results (player name, difficulty, and final score) and displaying them on the leaderboard.

**Game Implementation**
- WebSocket: A protocol for real-time data transfer between client and server. Used for receiving cave data during the game, ensuring a smooth gameplay experience.
- React Hooks: Built-in React functions for managing local state and side effects. Used for controlling game state, cave animation, drone control, and collision detection.
- SVG