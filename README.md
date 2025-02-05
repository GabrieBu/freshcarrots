# FreshCarrots 🥕

FreshCarrots is a powerful and dynamic movie exploration platform designed to help users discover movies based on themes, genres, and trending searches. It integrates real-time discussions, reviews, and personalized recommendations.

## Project Structure

- **Frontend**: Built with React.js and Vite for a fast, modern, and responsive user experience.
- **Main Server**: An Express.js server that acts as the central hub, dispatching requests to different backend services.
- **Dynamic Data Server**: Another Express.js server that fetches up-to-date movie information from MongoDB.
- **Static Data Server**: A Spring Boot (Java) server that manages more persistent movie-related data in PostgreSQL.

## Features

- Explore millions of movies with detailed metadata.
- Access reviews from Rotten Tomatoes.
- Get recommendations based on user search trends.
- Engage in **Discussion Rooms**—live chat spaces on movie topics and actors (powered by Socket.io).
- Fast and scalable architecture for real-time data fetching and seamless browsing.
