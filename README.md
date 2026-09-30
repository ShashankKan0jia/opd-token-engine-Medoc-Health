# OPD Token Allocation Engine

A Node.js/Express backend simulation for allocating outpatient department tokens across doctors and time slots.

## Core logic
- Slot capacity limits
- Priority-based token allocation
- Emergency handling
- Lower-priority replacement when capacity is full
- Cancellation and no-show handling
- Full-day OPD simulation

## Priority order
| Source | Priority |
|---|---:|
| Emergency | 1 |
| Paid | 2 |
| Follow-up | 3 |
| Online | 4 |
| Walk-in | 5 |

## Run
`npm install`
`node app.js`

The service uses port `3000` by default. Simulation is available at `/simulate`.

## API
`POST /api/tokens/create`
`DELETE /api/tokens/cancel/:tokenId`
`PUT /api/tokens/no-show/:tokenId`
`POST /api/tokens/emergency`
`GET /api/tokens/status/:doctorId/:slotTime`
