# 🚀 Smart Travel Reservation System

A complete full-stack **Bus and Railway Booking System** built with Spring Boot and React.

## Tech Stack

| Layer    | Technology                                                  |
|----------|-------------------------------------------------------------|
| Backend  | Java 17, Spring Boot 3.2.5, Spring Security (JWT), JPA, MySQL 8 |
| Frontend | React 18, Vite 5, Tailwind CSS 3, Axios, React Router v6   |

## Prerequisites

- **Java 17+** (JDK)
- **Maven 3.8+**
- **Node.js 18+** and npm
- **MySQL 8** (running on `localhost:3306`)

## Quick Start

### 1. Database Setup

The database `smart_travel_db` will be created automatically. Just ensure MySQL is running:

```sql
-- Default credentials in application.properties:
-- username: root
-- password: root
-- Change these in backend/src/main/resources/application.properties if needed
```

### 2. Backend (Port 8080)

```bash
cd backend
mvn spring-boot:run
```

The backend will:
- Auto-create all tables via JPA/Hibernate
- Seed the database with sample data (2 users, 5 buses, 5 trains)

### 3. Frontend (Port 5173)

```bash
cd frontend
npm install
npm run dev
```

### 4. Open the App

Navigate to **http://localhost:5173**

## Demo Credentials

| Role  | Email             | Password  |
|-------|-------------------|-----------|
| Admin | admin@travel.com  | admin123  |
| User  | john@travel.com   | user123   |

## Features

### 👤 User Features
- Register & Login with JWT authentication
- Search buses by source, destination, date
- Search trains by source, destination, date
- Book bus/train tickets with passenger details
- Auto-calculated pricing
- View and cancel bookings

### 🛡️ Admin Features
- Dashboard with summary cards
- Full CRUD for buses and trains
- View all bus and train bookings
- Activity log tracking all admin actions

## API Endpoints

| Method | Endpoint                    | Access  |
|--------|-----------------------------|---------|
| POST   | /api/auth/register          | Public  |
| POST   | /api/auth/login             | Public  |
| GET    | /api/buses/search           | Public  |
| GET    | /api/trains/search          | Public  |
| GET    | /api/buses/{id}             | Public  |
| GET    | /api/trains/{id}            | Public  |
| GET    | /api/buses                  | Admin   |
| POST   | /api/buses                  | Admin   |
| PUT    | /api/buses/{id}             | Admin   |
| DELETE | /api/buses/{id}             | Admin   |
| GET    | /api/trains                 | Admin   |
| POST   | /api/trains                 | Admin   |
| PUT    | /api/trains/{id}            | Admin   |
| DELETE | /api/trains/{id}            | Admin   |
| POST   | /api/bus-bookings           | User    |
| GET    | /api/bus-bookings/my        | User    |
| PUT    | /api/bus-bookings/{id}/cancel | User  |
| POST   | /api/train-bookings         | User    |
| GET    | /api/train-bookings/my      | User    |
| PUT    | /api/train-bookings/{id}/cancel | User |
| GET    | /api/admin/dashboard        | Admin   |
| GET    | /api/admin/bus-bookings     | Admin   |
| GET    | /api/admin/train-bookings   | Admin   |
| GET    | /api/admin/logs             | Admin   |
