# SuiteStay Description
Suite Stay is a full-featured hotel reservation web application designed to provide an intuitive and seamless experience for both users and administrators. The platform allows users to browse available destinations, check-in/check-out dates, and guest preferences, while also offering powerful reservation management tools.

## Key Features
- **User Authentication:** Secure login and sign-up functionalities, enabling personalized user accounts for a seamless experience.
- **Dynamic Landing Page:** Allows users to select their desired destination, check-in/check-out dates, and specify the number of guests.
- **Reservation Management:** Users can view and edit their reservations prior to check-out, including changing dates, room types, and guest details.
- **Room Selection:** Choose from a variety of 6 room types, ranging from cozy studios to luxurious panoramic suites and penthouses, to suit all preferences and budgets.
- **Checkout and Payment:** Secure checkout process, where users can input their payment details to confirm bookings.
- **Manage Reservations:** A user-friendly component that allows users to manage their reservations by filtering and deleting entries as needed.



# Technologies Used

### Frontend:
- **Angular:** A powerful framework for building dynamic and responsive web applications, used for managing the frontend logic and views.
- **PrimeNG:** A rich set of UI components for Angular that provides a consistent, modern, and user-friendly interface, enabling easy integration of complex elements like date pickers, buttons, and data tables.
- **TypeScript:** A statically typed superset of JavaScript, offering better development tools and error checking for a more robust and maintainable codebase.

### Backend:
- **Spring Boot:** A widely-used Java-based framework for building scalable and secure RESTful APIs. It simplifies backend development by providing embedded servers, automatic configuration, and easy integration with databases.
- **Spring Data JPA:** Used for data persistence, simplifying database interactions by leveraging the power of JPA (Java Persistence API) to manage and query the relational database.
- **Hibernate:** A powerful ORM (Object-Relational Mapping) framework integrated with Spring Data JPA, making database access seamless and efficient by mapping Java objects to database tables.

### Database
- **MySQL:** A relational database management system used for storing user data, reservations, and room details. MySQL’s robust querying capabilities ensure fast, reliable data management.

### Other Tools
- **Bootstrap:** For responsive design and ensuring the application is mobile-friendly.
- **RxJS:** Used for handling asynchronous data streams and making the application more reactive and event-driven.
- **Adobe Stock:** For high-quality images used throughout the application, providing a professional and appealing visual experience.



# Getting Started
### Angular
- [**Vs Code**](https://code.visualstudio.com/) installation
- **Node.js:** v22.11.0 or higher
- **Angular CLI:** Compatible with Angular 18.2.12

  ```bash
  npm install -g @angular/cli@18.2.12
  ```
- **Install Dependencies** Use npm to install all project dependencies:

  ```bash
  npm install
  ```
- Verify Package Versions Ensure the following versions are installed: To verify, open the package.json file or run:
  
  ```bash
  npm list --depth=0
  ```

### Spring Boot
- **Java:** version 22.0.2

  ```bash
  java -version
  ```
- [**Maven:**](https://maven.apache.org/download.cgi) Version 3.9.8
  
  ```bash
  mvn -v
  ```
- [Install IntelliJ]( https://www.jetbrains.com/idea/download/?section=windows) to run backend and extract it to different folder.
- [Install MySql Work Bench](https://dev.mysql.com/downloads/workbench/) for the database and use yaml file to set it up.
  
## Running the application

Running the Application
Follow these steps to run both the frontend and backend of the Suite Stay application:

Prerequisites
Ensure you have the following installed:

- Node.js v22.11.0 or higher
- Angular CLI (compatible with Angular 18.2.12)
- Java JDK v22.0.2 or higher
- Apache Maven v3.9.8 or higher
- MySQL Server (along with MySQL Workbench for easier database management)

#### Step: 1 Start the Backend (IntelliJ)
- Navigate to the backend directory and open with IntelliJ:
  ```bash
  cd backend
  ```
- Build the Spring Boot application using Maven:
  ```bash
  mvn clean install
  ```
- Start the backend server
  ```bash
  mvn spring-boot:run
  ```
- Ensure you connected the database in the yaml file


#### Step 2: Start the Frontend (Vs Code)
- Navigate to the frontend directory:
  ```bash
  cd ../frontend
  ```
- Install project dependencies:
  ```bash
  npm install
  ```
- Start the Angular development server:
  ```bash
  ng serve
  ```
- Open your browser and navigate to http://localhost:4200.
