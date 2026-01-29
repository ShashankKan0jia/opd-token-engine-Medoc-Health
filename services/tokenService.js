const dataStore = require("../models/dataStore");

// simple ID generator without any external package
function generateId() {
  return "T" + Math.random().toString(36).substr(2, 9);
}

// Find doctor by ID
function getDoctor(doctorId) {
  return dataStore.doctors.find((d) => d.id === doctorId);
}

// Allocate token based on priority and slot availability
function allocateToken({ doctorId, slotTime, patientName, source }) {
  const doctor = getDoctor(doctorId);
  if (!doctor) return { error: "Doctor not found" };

  const slot = doctor.slots.find((s) => s.time === slotTime);
  if (!slot) return { error: "Slot not found" };

  const priority = dataStore.priorities[source];
  if (!priority) return { error: "Invalid source type" };

  const newToken = {
    id: generateId(),
    patientName,
    doctorId,
    slotTime,
    source,
    priority,
    status: "ACTIVE",
    createdAt: new Date(),
  };

  // If slot has space, directly add
  if (slot.tokens.length < slot.capacity) {
    slot.tokens.push(newToken);
    dataStore.tokens.push(newToken);
    return { success: true, token: newToken };
  }

  // Slot is full → find the lowest priority token
  let lowestPriorityIndex = -1;
  let worstPriority = -1;

  slot.tokens.forEach((t, index) => {
    if (t.priority > worstPriority) {
      worstPriority = t.priority;
      lowestPriorityIndex = index;
    }
  });

  // If new token has higher priority, replace the worst one
  if (priority < worstPriority) {
    const removedToken = slot.tokens[lowestPriorityIndex];
    removedToken.status = "MOVED";

    slot.tokens.splice(lowestPriorityIndex, 1);
    slot.tokens.push(newToken);
    dataStore.tokens.push(newToken);

    return {
      success: true,
      token: newToken,
      message: "Lower priority token was replaced",
      removedToken,
    };
  }

  return {
    success: false,
    message: "Slot is full and priority is not high enough",
  };
}

// Cancel a token
function cancelToken(tokenId) {
  const token = dataStore.tokens.find((t) => t.id === tokenId);
  if (!token) return { error: "Token not found" };

  token.status = "CANCELLED";

  const doctor = getDoctor(token.doctorId);
  const slot = doctor.slots.find((s) => s.time === token.slotTime);
  slot.tokens = slot.tokens.filter((t) => t.id !== tokenId);

  return { success: true, message: "Token cancelled successfully" };
}

// Mark token as no-show
function markNoShow(tokenId) {
  const token = dataStore.tokens.find((t) => t.id === tokenId);
  if (!token) return { error: "Token not found" };

  token.status = "NO_SHOW";

  const doctor = getDoctor(token.doctorId);
  const slot = doctor.slots.find((s) => s.time === token.slotTime);
  slot.tokens = slot.tokens.filter((t) => t.id !== tokenId);

  return { success: true, message: "Token marked as no-show" };
}

// Emergency token insertion
function addEmergencyToken(data) {
  return allocateToken({ ...data, source: "emergency" });
}

// Get slot status
function getSlotStatus(doctorId, slotTime) {
  const doctor = getDoctor(doctorId);
  if (!doctor) return { error: "Doctor not found" };

  const slot = doctor.slots.find((s) => s.time === slotTime);
  if (!slot) return { error: "Slot not found" };

  return {
    doctor: doctor.name,
    slot: slot.time,
    capacity: slot.capacity,
    filled: slot.tokens.length,
    tokens: slot.tokens,
  };
}

module.exports = {
  allocateToken,
  cancelToken,
  markNoShow,
  addEmergencyToken,
  getSlotStatus,
};
