# 🐾 Pet Store - Angular 17 Application

## 📌 Project Overview

Pet Store is a single-page application built with Angular 17 and Firebase.  
It allows users to browse pets, create their own pet listings, and manage them through authentication-based access.

The application demonstrates CRUD operations, routing, authentication, and responsive UI design.

---

## 🎯 Purpose of the Application

The purpose of this project is to provide a platform where users can:

- Browse available pets
- View detailed information about each pet
- Create their own pet listings
- Edit and delete their own pets
- Manage their personal pet dashboard

---

## 👤 User Roles

### Guest Users (Not Logged In)
- Can view Home page
- Can view Catalog
- Can view Pet Details
- Can access Login and Register pages

### Authenticated Users
- Can access Dashboard
- Can create new pets
- Can edit and delete their own pets
- Can logout

---

## 🔑 Core Features

### 1. Authentication
- User registration and login using Firebase Authentication
- Persistent login state after page refresh
- Route protection using guards

### 2. Pet Management (CRUD)
- Create new pet listings
- Read/view all pets in catalog
- View detailed pet information
- Update existing pet listings
- Delete pet listings

### 3. Catalog System
- Displays all pets in a responsive card layout
- Each pet includes image, name, type, and age

### 4. Dashboard
- Displays only user-related actions
- Allows users to manage their pets

---

## 🧭 Navigation Flow

- Home → Landing page with introduction and navigation
- Catalog → Public list of all pets
- Details → Individual pet information
- Login/Register → Authentication pages
- Dashboard → User management area (protected)
- Create/Edit → Pet management pages (protected)

---

## ⚙️ Technologies Used

- Angular 17
- TypeScript
- Firebase Authentication
- Firebase Firestore
- RxJS
- HTML5 / CSS3

---

## 🔐 Route Protection

The application uses route guards to ensure security:

- Guests cannot access Dashboard, Create, or Edit pages
- Logged-in users cannot access Login or Register pages

---

## 📡 Data Handling

- Firebase Firestore is used as the database
- RxJS Observables handle asynchronous data streams
- CRUD operations are performed via Angular services

---

## 🧩 Project Structure

- Components:
  - Home
  - Catalog
  - Dashboard
  - Login
  - Register
  - Create Pet
  - Edit Pet
  - Pet Details

- Services:
  - Auth Service
  - Pet Service

- Guards:
  - Auth Guard
  - Guest Guard

---

## 🎨 UI / UX Features

- Responsive navigation bar (desktop & mobile)
- Card-based catalog layout
- Consistent button styling
- Image handling with fixed-size display
- Form validation with user feedback
- Clean and modern UI design

---

## 🚀 How to Run the Project

1. Install dependencies:
npm install


2. Run development server:
ng serve

3. Open browser:
http://localhost:4200

---

## 📦 Firebase Setup

- Project uses Firebase Authentication for login/register
- Firestore is used for storing pet data
- Ensure Firebase config is added in environment files

---

## ⚠️ Notes

- All CRUD operations require authentication
- Application prevents unauthorized access using route guards
- Data is dynamically loaded from Firebase (no hardcoded lists)

---

## 📈 Conclusion

This project demonstrates a full Angular SPA with authentication, routing, and CRUD functionality using Firebase as a backend service.
