# App_limpeza
# Cleaning Schedule Web App
# Cleaning Service Management App

A web application designed to simplify the management of cleaning services, including clients, employees, schedules, appointments, working hours, and payments.

The project is being developed as an MVP for a cleaning business, with a focus on making scheduling simple for administrators, employees, and clients.

## 🚧 Project Status

**MVP — In Development**

The core scheduling and management features are currently being implemented and tested. New features and improvements will be added progressively.

## ✨ Main Features

### 👩‍💼 Admin Interface

The administrator has full access to the system and can:

* Add, edit, and manage clients
* Add and manage employees
* Configure employee availability
* Create and manage appointments
* Select the employee assigned to each appointment
* Set appointment duration and price
* Add notes and observations
* View employee working hours
* Track amounts to be received
* Detect scheduling conflicts
* Manage existing appointments

### 👷 Employee Interface

Employees can access their own information and schedule:

* View their personal calendar
* See assigned appointments
* View working hours
* Track scheduled hours
* View amounts to be received

Employees do not have access to other employees' private information.

### 👤 Client Interface

The client interface is designed to provide a simple booking experience, similar to a marketplace platform:

* Browse available employees
* Select an employee
* View available dates and times
* View service prices
* Book an appointment
* Choose another available time if a scheduling conflict occurs

Clients cannot modify or delete existing appointments. If the selected time is no longer available, the client must choose another available time.
Additional information provided by the client is attached to the appointment and can be viewed by the administrator and the assigned employee.

📅 Appointment Management

The application includes a scheduling system that helps prevent double bookings.

When a client attempts to book an appointment, the system checks whether the selected employee is already scheduled during the requested period.

If a conflict is detected, the client is notified and can select another available date or time.

Existing appointments are protected from being modified or deleted by clients.

If a conflict is detected, the adm is notified and can decide how to resolve it.

Appointments can include:

* Client
* Employee
* Date
* Start time
* End time
* Price
* Notes
* Employee color

## 👥 Client Management

Client information can be stored and managed directly from the application.

The client record can contain:

* Name
* Address
* Phone number
* Notes
* Appointment history

The address information can also be used to help organize employees and appointments more efficiently.

## 👷 Employee Management

Employees can be registered with their own availability and working schedule.

The system is designed to support availability by:

* Day of the week
* Morning
* Afternoon
* Evening

Each employee can also have an individual calendar color to make the schedule easier to understand visually.

## 💰 Working Hours & Payments

The application includes an employee hours section to help track:

* Scheduled working hours
* Total hours
* Amounts to be received

This allows the administrator to have a clearer overview of the workload and expected payments for each employee.

## 📆 Google Calendar Integration

Appointments can be connected to **Google Calendar**, making it easier to manage scheduled cleaning services outside the application.

## 🛠️ Technologies

The project currently uses:

* HTML
* CSS
* JavaScript
* Git
* GitHub
* GitHub Pages

The project is being developed with a focus on clean structure, reusable logic, and progressive implementation of business rules.

## 🚀 Running the Project

Clone the repository and open the project in your preferred development environment.

The application can also be tested through its GitHub Pages deployment.

## 🎯 Project Goals

The main goal of this project is to create a simple and practical management platform for cleaning businesses while applying software development concepts such as:

* Object-oriented programming concepts
* Business logic
* Data management
* Calendar and scheduling logic
* Conflict detection
* User roles and permissions
* Responsive user interfaces
* Version control with Git and GitHub

## 🔮 Future Improvements

Planned improvements include:

* Database integration
* Authentication and user accounts
* Complete role-based access control
* Improved employee availability management
* Advanced calendar views
* Payment tracking
* Automated notifications
* Improved mobile experience
* More advanced employee/client matching based on location
* Production deployment

## 📌 About the Project

This project started as a real-world application for managing a cleaning business and is also being used as a portfolio project to demonstrate practical software development skills.

The application is continuously evolving as new requirements are identified and tested.


## Author **Karen Francellino**
  Developed as a practical web development and version control project.
