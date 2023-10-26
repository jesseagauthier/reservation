# Problem: Restaurant Table Reservation System

## Background

You are tasked with developing a simple table reservation system for a restaurant. The restaurant has a total of 10 tables. Customers should be able to check the availability of tables for a specific date and time slot, and make a reservation if a table is available.

### Requirements

#### Display Available Tables

- Show a list of all 10 tables.
- Indicate which tables are available and which are reserved for a given date and time slot.

#### Make a Reservation

- Allow customers to select an available table.
- Collect the customer's name and contact number.
- Confirm the reservation and update the table status to "reserved".

#### Cancel a Reservation

- Allow customers to cancel their reservation by providing their name and contact number.
- Update the table status to "available" after cancellation.

#### Search Reservations

- Allow the restaurant staff to search for reservations using a customer's name or contact number.

### Constraints

- For simplicity, assume that each reservation is for a 2-hour time slot (e.g., 6:00 PM - 8:00 PM).
- Reservations can only be made for dates within the next 30 days.
- The system doesn't need to handle payment or other advanced features.

### Implementation

Use JavaScript to handle the logic for checking table availability, making reservations, cancelling reservations, and searching for reservations. You can use local storage (or a similar mechanism) to store the reservation data, so you don't need a backend server for this problem.
