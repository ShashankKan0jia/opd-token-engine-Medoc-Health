const dataStore = {
  doctors: [
    {
      id: "D1",
      name: "Dr. Sharma",
      slots: [
        { time: "09:00-10:00", capacity: 5, tokens: [] },
        { time: "10:00-11:00", capacity: 5, tokens: [] },
      ],
    },
    {
      id: "D2",
      name: "Dr. Mehta",
      slots: [
        { time: "09:00-10:00", capacity: 4, tokens: [] },
        { time: "10:00-11:00", capacity: 4, tokens: [] },
      ],
    },
    {
      id: "D3",
      name: "Dr. Khan",
      slots: [{ time: "11:00-12:00", capacity: 6, tokens: [] }],
    },
  ],

  tokens: [], // All tokens created in the system

  priorities: {
    emergency: 1,
    paid: 2,
    followup: 3,
    online: 4,
    walkin: 5,
  },
};

module.exports = dataStore;
