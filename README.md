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



# Running the Application with Docker

## Step 1 Install Docker Desktop
- Ensure you have [Docker Desktop](https://www.docker.com/products/docker-desktop) installed.

## Step 2 Clone the Repo
- clone the repository if not already done into a created folder:

  ```bash
    git clone https://github.com/AngelReyes97/SuiteStay-Hotel-App.git
  ```

## Step 3 Cd to the Created Folder
- Use Git or any other CLI to cd into the folder where docker-compose is located.

Created folder

  ├── SuiteStay
  
  ├── docker-compose.yml

## Step 4 Build Images
- Build the backend image
  ```bash
    docker-compose build backend
  ```
- Build the frontend image
   ```bash
    docker-compose build frontend
  ```
- wait a couple minutes

# Step 5 Run the Container
- Run the container this will start all the services defined in the docker-compose.yml file (backend, frontend, and database).
   ```bash
    docker-compose up -d
  ```
# Step 5 Access the Application
- Open Docker Desktop go to containers and open the frontend localhost browser.
