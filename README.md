[README.md](https://github.com/user-attachments/files/24938939/README.md)
# OPD Token Allocation Engine (Backend)  
**Medoc Health – SWE Intern Assignment**

This project is a backend service that simulates an OPD (Out Patient Department) token allocation system for multiple doctors using slot-based capacity and priority-based scheduling.  
The focus of this assignment is on algorithm design, backend logic, and real-world OPD flow handling.

The system is intentionally kept simple and uses in-memory storage so that the core logic remains clear and easy to evaluate.

---

## Problem Statement Summary

In a hospital OPD:
- Each doctor has fixed time slots.
- Each slot has a maximum capacity.
- Patients arrive from different sources like:
  - Emergency
  - Paid priority
  - Follow-up
  - Online booking
  - Walk-in
- Emergency and higher priority patients must be handled first.
- If a slot is full, higher priority patients can replace lower priority ones.
- Tokens can be cancelled or marked as no-show.
- A simulation is required to demonstrate one full OPD day.

This project implements all of the above.

---

## Priority Rules

Lower number = Higher priority

| Source      | Priority |
|------------|---------|
| Emergency  | 1 |
| Paid       | 2 |
| Follow-up  | 3 |
| Online     | 4 |
| Walk-in    | 5 |

---

## Features Implemented

- Slot-based capacity control  
- Priority-based token allocation  
- Replacement of lower priority tokens when slots are full  
- Emergency token handling  
- Token cancellation  
- No-show handling  
- API-based design using Express.js  
- Simulation of a complete OPD day  
- Clear final slot status reporting  

---

## Project Structure

```
opd-token-engine/
│
├── app.js
├── routes/
│   └── tokenRoutes.js
├── controllers/
│   └── tokenController.js
├── services/
│   └── tokenService.js
├── models/
│   └── dataStore.js
├── simulation/
│   └── opdSimulation.js
├── docs/
│   ├── OPD_Token_Allocation_System_Report.docx
│   └── simulation_output.png
└── README.md
```

---

## How to Run the Project

### 1. Install dependencies
```bash
npm install
```

### 2. Start the server
```bash
node app.js
```

Server runs at:
```
http://localhost:3000
```

---

## API Endpoints

### Create Token
```
POST /api/tokens/create
```
Body:
```json
{
  "doctorId": "D1",
  "slotTime": "09:00-10:00",
  "patientName": "Ravi",
  "source": "online"
}
```

---

### Cancel Token
```
DELETE /api/tokens/cancel/:tokenId
```

---

### Mark No-Show
```
PUT /api/tokens/no-show/:tokenId
```

---

### Add Emergency Token
```
POST /api/tokens/emergency
```

---

### Get Slot Status
```
GET /api/tokens/status/:doctorId/:slotTime
```

---

## OPD Simulation (Browser View)

The OPD simulation is exposed through a browser-friendly route:

```
http://localhost:3000/simulate
```

This:
- Simulates one complete OPD day
- Shows:
  - Normal bookings  
  - Emergency insertion  
  - Cancellation  
  - No-show  
  - Final slot status  

## OPD Simulation Screenshot

Below is the simulation output captured from:

http://localhost:3000/simulate

![OPD Simulation Output](Project report and Screenshot/simulation.png)


## Design Decisions

| Decision | Reason |
|--------|-------|
| In-memory data storage | Keeps focus on algorithm and logic |
| No database | Not required for assignment scope |
| Express.js | Lightweight and fast for APIs |
| Priority replacement model | Closely matches real OPD behavior |
| Simulation module | Proves working logic, not just theory |

---

## Limitations

- Data resets when the server restarts  
- No authentication  
- No database persistence  
- No UI  
- Not production-ready (intentionally simple)

These are acceptable since the assignment focuses on backend logic and algorithm correctness.

---

## Submission Deliverables

All required deliverables are included in this repository:

- **Source Code** → Root folders  
- **Design Report** → `docs/OPD_Token_Allocation_System_Report.docx`  
- **Simulation Proof** → `docs/simulation_output.png`  

This single GitHub repository link is sufficient for complete evaluation.

---

## Conclusion

This project demonstrates:
- Practical backend system design
- Priority-based scheduling logic
- Emergency handling
- Slot capacity enforcement
- Real-world OPD behavior simulation

It reflects how a simplified OPD token management backend would work in an actual hospital environment.
