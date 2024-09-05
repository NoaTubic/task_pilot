# 🚀 Task Pilot - Advanced Information Systems Interoperability & Secure Coding  

**Task Pilot** is a task management system developed as part of my software engineering master's studies. It integrates advanced information systems interoperability and secure coding principles. This project was created for two key courses: **Advanced Information Systems Interoperability**, which focused on the integration of diverse systems and seamless communication between services, and **Secure Coding**, emphasizing the implementation of best practices to ensure robust security. The project uses **Node.js** with **TypeScript** for the backend and a **Flutter Desktop** demo app to showcase client-server interaction. The database layer is built on **MySQL**, managed through **Sequelize ORM**. The project also integrates **Camunda BPM**, **ActiveMQ**, and **Mule ESB** for process automation and messaging, while strictly adhering to **Clean Architecture** and **SOLID principles** to ensure scalability, maintainability, and security.

---

## 🏆 Project Highlights

- **Node.js Backend**: Developed using **TypeScript** and **Express.js**, providing a REST API to handle various operations.
- **Flutter Desktop Demo**: A demo app that interacts with the backend API, demonstrating seamless communication between client and server.
- **Sequelize ORM with MySQL**: Used for secure database management and handling SQL queries in a **MySQL** database.
- **Clean Architecture**: Adheres to **SOLID principles** for maintainable and scalable software design.
- **ActiveMQ Integration**: Handles message queuing between services.
- **Mule ESB**: Facilitates enterprise-level integration and communication between systems.
- **Camunda BPM**: Automates business processes through a workflow engine integrated with backend services.

---

## 🔌 Integrations

- **ActiveMQ**: Integrated to handle message queuing, ensuring reliable asynchronous communication between system components.
- **Mule ESB**: Enables seamless orchestration of REST API calls and manages service communication.
- **Camunda BPM**: Implements business process automation and workflow management, integrated with backend services for real-time process control.

---

## 🔐 Secure Coding Practices

This project follows secure coding practices to ensure robustness and protection against vulnerabilities:

- **JWT Authentication**: Implements JWT-based access and refresh tokens for secure user authentication and session management.
- **Role-Based Access Control (RBAC)**: Manages permissions based on user roles, ensuring secure access to sensitive resources.
- **HTTPS with SSL**: Configured to ensure secure communication between the client and server.
- **CORS Configuration**: Controls which domains can access the API, adding an additional layer of security.
- **Sequelize ORM**: Protects against SQL injection by utilizing parameterized queries and escaping inputs.
- **OWASP ZAP & Burp Suite**: Scanned the application for vulnerabilities, documented and fixed the most critical issues.
- **SQL Injection Scanner**: Tested the application against SQL injection vulnerabilities using online tools.
- **SonarQube**: Used to scan the codebase for bugs and code smells, ensuring code quality and security improvements.
- **Helmet**: Adds secure HTTP headers to protect against common web vulnerabilities.
- **Pino**: Used for error logging and monitoring, ensuring better tracking of issues and improved troubleshooting.

---

## 🛠️ Architecture & Libraries

This project is built on **Clean Architecture** principles, ensuring separation of concerns and modularity for scalability and maintainability. Here’s a list of key technologies and libraries used:

- **Node.js** with **TypeScript** for backend development
- **Express.js** for RESTful API creation
- **Sequelize ORM** for database interaction with **MySQL**
- **JWT** for authentication and authorization
- **Flutter** for the desktop application
- **Camunda BPM** for managing business processes
- **ActiveMQ** for message queue management
- **Mule ESB** for enterprise-level integration
- **OWASP ZAP**, **SQL Injection Scanner**, and **SonarQube** for vulnerability scanning and code analysis
- **Helmet** for HTTP security headers
- **Pino** for logging and monitoring

---

## 🏗️ Getting Started

### Prerequisites
- **Node.js** and **npm**
- **Flutter SDK**
- **Camunda BPM**, **ActiveMQ**, and **Mule ESB**
- **MySQL** database setup

### Installation

1. **Clone the repository:**

    ```
    git clone https://github.com/your-repo-link.git
    ```

2. **Install backend dependencies:**

    ```
    cd backend
    npm install
    ```

3. **Set up MySQL:**
    - Create a MySQL database for the project.
    - Update the database connection details (host, username, password, database name) in the `config` file used by **Sequelize ORM**.
    - Run the necessary migrations to set up your database schema:

      ```
      npx sequelize db:migrate
      ```

4. **Set up and run the Flutter demo app:**
    - Navigate to the `demo_app` directory:

      ```
      cd demo_app
      ```

    - Ensure **Flutter** is correctly installed, and then run the app:

      ```
      flutter run
      ```

5. **Start the backend server:**

    ```
    cd backend
    npm run start
    ```

