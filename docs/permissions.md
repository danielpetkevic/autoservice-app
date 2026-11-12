# AutoService – Role-Based Access Control (RBAC)

## 1. Overview

AutoService uses Role-Based Access Control (RBAC) to restrict access to application resources based on the authenticated user's role.

The system supports three roles:

| Role     | Description                                                                        |
| -------- | ---------------------------------------------------------------------------------- |
| Admin    | Manages users, vehicles, services, appointments, repairs, inventory, and payments. |
| Mechanic | Manages assigned repair orders, records performed services, and tracks used parts. |
| Client   | Manages personal vehicles, books appointments, and tracks repair progress.         |

Each user has one application role. Spatie Laravel Permission is the authorization source of truth; the legacy `users.role` column is retained for compatibility and migration backfills.

Authorization is enforced on the Laravel backend using Spatie roles, Policies, and Gates. React uses permissions to control the interface, but frontend restrictions are not considered security boundaries.

The available route middleware aliases are `role`, `permission`, and `role_or_permission`. Multiple roles use a pipe, for example `role:admin|mechanic`.

`RolePermissionSeeder` creates the roles and permissions and is safe to run repeatedly. Public registration always assigns the `client` role.

---

## 2. Permission Matrix

### Legend

- **All** – Access to all records.
- **Own** – Access only to records owned by the authenticated client.
- **Assigned** – Access only to records related to a repair order assigned to the authenticated mechanic.
- **Yes** – Action is permitted.
- **No** – Action is forbidden.
- **Conditional** – Action requires additional business-rule checks.

### 2.1 Users

| Action                 | Admin | Mechanic | Client |
| ---------------------- | ----- | -------- | ------ |
| View users             | All   | No       | No     |
| Create users           | Yes   | No       | No     |
| Update users and roles | Yes   | No       | No     |
| Delete users           | Yes   | No       | No     |
| View own profile       | Yes   | Yes      | Yes    |
| Update own profile     | Yes   | Yes      | Yes    |

Public registration creates Client accounts only. Mechanic and Admin roles are assigned by an authorized administrator.

### 2.2 Vehicles

| Action          | Admin | Mechanic | Client |
| --------------- | ----- | -------- | ------ |
| View vehicles   | All   | Assigned | Own    |
| Create vehicles | Yes   | No       | Yes    |
| Update vehicles | All   | No       | Own    |
| Delete vehicles | All*  | No       | Own*   |

_Deletion is restricted when a vehicle is associated with active appointments or repair orders. Historical records must be preserved._

### 2.3 Services and Categories

| Action                    | Admin | Mechanic | Client |
| ------------------------- | ----- | -------- | ------ |
| View active services      | Yes   | Yes      | Yes    |
| View inactive services    | Yes   | Yes      | No     |
| Create services           | Yes   | No       | No     |
| Update services           | Yes   | No       | No     |
| Delete services           | Yes*  | No       | No     |
| Manage service categories | Yes   | No       | No     |

_Services referenced by appointments or repairs should be deactivated rather than physically deleted._

### 2.4 Parts Inventory

| Action                  | Admin | Mechanic | Client |
| ----------------------- | ----- | -------- | ------ |
| View inventory          | All   | All      | No     |
| Create parts            | Yes   | No       | No     |
| Update parts and prices | Yes   | No       | No     |
| Delete parts            | Yes*  | No       | No     |
| Adjust stock quantities | Yes   | No       | No     |

_Parts referenced by repair history must not be physically deleted._

Mechanics may register parts used in their assigned repairs, but they cannot directly modify inventory records or prices.

### 2.5 Appointments

| Action                    | Admin       | Mechanic | Client |
| ------------------------- | ----------- | -------- | ------ |
| View appointments         | All         | Assigned | Own    |
| Create appointments       | Yes         | No       | Yes    |
| Update appointments       | All*        | No       | Own*   |
| Cancel appointments       | All*        | No       | Own*   |
| Confirm appointments      | Yes         | No       | No     |
| Delete appointments       | Conditional | No       | No     |
| Select requested services | Yes         | No       | Own*   |

_Clients can modify or cancel only pending appointments, before repair work has started._

Appointment services are managed through the Appointment model. No separate CRUD controller is required for `appointment_services`.

### 2.6 Repair Orders

| Action                     | Admin       | Mechanic  | Client |
| -------------------------- | ----------- | --------- | ------ |
| View repair orders         | All         | Assigned  | Own    |
| Create repair orders       | Yes         | No        | No     |
| Update diagnosis and notes | All         | Assigned  | No     |
| Change repair status       | Yes         | Assigned* | No     |
| Assign mechanics           | Yes         | No        | No     |
| Delete repair orders       | Conditional | No        | No     |
| View repair history        | All         | Assigned  | Own    |

_Mechanics can perform only permitted status transitions. Completed or delivered repairs must not be modified without administrator authorization._

### 2.7 Repair Services

| Action                      | Admin | Mechanic  | Client |
| --------------------------- | ----- | --------- | ------ |
| View performed services     | All   | Assigned  | Own    |
| Add performed services      | Yes   | Assigned  | No     |
| Update performed services   | Yes   | Assigned* | No     |
| Remove performed services   | Yes   | Assigned* | No     |
| Set or override unit prices | Yes   | No        | No     |

_Modifications are permitted only while the repair order is editable._

When adding a service, the system uses the catalog price as the default `unit_price`. Mechanic-submitted prices must not be trusted; the backend determines the actual price.

### 2.8 Repair Parts

| Action               | Admin | Mechanic  | Client |
| -------------------- | ----- | --------- | ------ |
| View used parts      | All   | Assigned  | Own    |
| Add used parts       | Yes   | Assigned  | No     |
| Update used parts    | Yes   | Assigned* | No     |
| Remove used parts    | Yes   | Assigned* | No     |
| Override unit prices | Yes   | No        | No     |

_Modifications are permitted only while the repair order is editable._

Part quantities must be validated against available stock. Stock changes must be handled transactionally to avoid inconsistent inventory.

### 2.9 Payments

| Action                 | Admin | Mechanic | Client |
| ---------------------- | ----- | -------- | ------ |
| View payments          | All   | No       | Own    |
| Create payment records | Yes   | No       | No     |
| Update payment records | Yes*  | No       | No     |
| Mark payments as paid  | Yes   | No       | No     |
| Refund payments        | Yes   | No       | No     |
| Delete payment records | No    | No       | No     |

_Payment changes must preserve an auditable financial history. Corrections should use controlled adjustments rather than destructive deletion._

Client access to payments is derived through:

`Payment → RepairOrder → Appointment → User`

---

## 3. Ownership and Assignment Rules

### Client ownership

A Client can access a vehicle only when:

`vehicles.user_id === auth()->id()`

A Client can access an appointment only when:

`appointments.user_id === auth()->id()`

A Client can access a repair order only when:

`repairOrder.appointment.user_id === auth()->id()`

A Client can access payments only when their associated repair order belongs to the client.

When creating an appointment, the selected vehicle must belong to the authenticated client.

### Mechanic assignment

A Mechanic can access a repair order only when:

`repair_orders.mechanic_id === auth()->id()`

Related repair services and repair parts inherit authorization from their parent repair order.

A Mechanic can view an appointment or vehicle only when it is associated with a repair order assigned to that mechanic.

### Administrator access

Admins can access and manage all operational resources, subject to business rules protecting historical, financial, and completed records.

Administrator authorization must not bypass data-integrity checks.

---

## 4. Business Rules

1. Every authenticated user has exactly one role: `admin`, `mechanic`, or `client`.
2. New public registrations receive the `client` role.
3. Clients cannot assign or change their own role.
4. Clients cannot access other clients' vehicles, appointments, repairs, or payments.
5. Mechanics can modify only their assigned repair orders.
6. Clients cannot approve appointments or assign mechanics.
7. A repair order must reference an existing appointment.
8. An appointment can have at most one repair order.
9. Repair services and parts belong to a repair order.
10. Repair prices are stored as historical values in `unit_price`.
11. Completed or delivered repairs are locked against normal modification.
12. Inventory quantities cannot become negative.
13. Appointment booking must prevent conflicting reservations.
14. Financial records must be protected from unauthorized changes.
15. Client-facing repair details must be limited to information appropriate for the customer.

---

## 5. Laravel Implementation

### Role storage

Store the role in the `users` table:

`users.role`

Possible values:

- `admin`
- `mechanic`
- `client`

Use a PHP backed enum for role values if appropriate.

### Authorization

Implement resource authorization through Laravel Policies:

- `UserPolicy`
- `VehiclePolicy`
- `ServicePolicy`
- `ServiceCategoryPolicy`
- `PartPolicy`
- `AppointmentPolicy`
- `RepairOrderPolicy`
- `PaymentPolicy`

RepairService and RepairPart permissions can be enforced through their parent RepairOrder, with additional checks on the repair status.

### Security principles

- Authorize every protected backend operation.
- Validate requests using Laravel Form Requests.
- Never trust role, owner ID, mechanic ID, or prices supplied by an unauthorized client.
- Scope database queries by ownership or assignment.
- Return HTTP 403 for forbidden operations.
- Use transactions for related writes and inventory changes.
- Restrict mass assignment to approved attributes.
- Do not rely on React component visibility for security.

---

## 6. React and Inertia.js

React should display only actions that are available to the authenticated user.

Examples:

- Clients see "My Vehicles" and "Book Appointment".
- Mechanics see "Assigned Repairs".
- Admins see "Manage Users", "Services", and "Inventory".

Use authorization data provided by Laravel to determine which actions should appear in the interface.

However, hiding a button does not grant or deny permissions. Laravel must independently authorize every request.

---

## 7. Authorization Testing

Use Pest to test the permission matrix.

### Required test scenarios

- Admin can access administrative resources.
- Mechanic cannot manage users.
- Client cannot manage service prices.
- Client can create and update their own vehicle.
- Client cannot access another client's vehicle.
- Client cannot book an appointment for another client's vehicle.
- Client cannot view another client's repair order.
- Mechanic can view an assigned repair order.
- Mechanic cannot modify another mechanic's repair order.
- Mechanic cannot override service or part prices.
- Client cannot approve appointments.
- Client cannot access another client's payments.
- Unauthorized users receive HTTP 403.
- Guests are redirected to authentication for protected routes.
- Completed repair orders cannot be modified without appropriate authorization.
- Invalid repair status transitions are rejected.

Use factories to create users with each role and test resource ownership, mechanic assignment, and edge cases.

---

## 8. Definition of Done

The RBAC implementation is complete when:

- [ ] All three user roles are supported.
- [ ] Public registration assigns the Client role.
- [ ] Role-based access is implemented in Laravel.
- [ ] All protected operations enforce authorization.
- [ ] Resource ownership rules work correctly.
- [ ] Mechanic assignment restrictions are enforced.
- [ ] React displays appropriate navigation and actions.
- [ ] Unauthorized direct URL and HTTP requests are blocked.
- [ ] Pest authorization tests pass.
- [ ] The permission matrix matches implemented behavior.
