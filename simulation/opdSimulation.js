const tokenService = require("../services/tokenService");
const dataStore = require("../models/dataStore");

function randomName() {
  const names = [
    "Amit",
    "Riya",
    "Kunal",
    "Sneha",
    "Rahul",
    "Pooja",
    "Vikas",
    "Neha",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function randomSource() {
  const sources = ["online", "walkin", "paid", "followup"];
  return sources[Math.floor(Math.random() * sources.length)];
}

function simulateDay() {
  let output = "";
  output += "===== OPD DAY SIMULATION =====\n\n";

  // 1. Normal booking
  output += "1. Booking normal tokens...\n\n";
  dataStore.doctors.forEach((doctor) => {
    doctor.slots.forEach((slot) => {
      for (let i = 0; i < slot.capacity; i++) {
        tokenService.allocateToken({
          doctorId: doctor.id,
          slotTime: slot.time,
          patientName: randomName(),
          source: randomSource(),
        });
      }
      output += `Doctor ${doctor.name}, Slot ${slot.time} filled.\n`;
    });
  });

  // 2. Emergency case
  output += "\n2. Adding Emergency Token...\n\n";
  const emergency = tokenService.addEmergencyToken({
    doctorId: "D1",
    slotTime: "09:00-10:00",
    patientName: "Critical Patient",
  });
  output += `Emergency Token Status: ${
    emergency.success ? "Inserted Successfully" : "Failed"
  }\n`;

  // 3. Cancel a token
  output += "\n3. Cancelling One Token...\n\n";
  const cancelToken = dataStore.tokens[0];
  if (cancelToken) {
    tokenService.cancelToken(cancelToken.id);
    output += `Token ${cancelToken.id} cancelled.\n`;
  }

  // 4. Mark no-show
  output += "\n4. Marking One No-Show...\n\n";
  const noShowToken = dataStore.tokens[1];
  if (noShowToken) {
    tokenService.markNoShow(noShowToken.id);
    output += `Token ${noShowToken.id} marked as NO-SHOW.\n`;
  }

  // 5. Final slot status
  output += "\n5. Final Slot Status:\n\n";
  dataStore.doctors.forEach((doctor) => {
    output += `Doctor: ${doctor.name}\n`;
    doctor.slots.forEach((slot) => {
      output += `  Slot ${slot.time} → ${slot.tokens.length}/${slot.capacity} patients\n`;
      slot.tokens.forEach((t) => {
        output += `     - ${t.patientName} (${t.source.toUpperCase()})\n`;
      });
    });
    output += "\n";
  });

  output += "===== SIMULATION COMPLETED =====\n";
  return output;
}

module.exports = { simulateDay };
