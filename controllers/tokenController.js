const tokenService = require("../services/tokenService");

// Create a normal token (online, walk-in, paid, followup)
function createToken(req, res) {
  const result = tokenService.allocateToken(req.body);
  res.json(result);
}

// Cancel token
function cancelToken(req, res) {
  const { tokenId } = req.params;
  const result = tokenService.cancelToken(tokenId);
  res.json(result);
}

// Mark no-show
function markNoShow(req, res) {
  const { tokenId } = req.params;
  const result = tokenService.markNoShow(tokenId);
  res.json(result);
}

// Add emergency token
function addEmergency(req, res) {
  const result = tokenService.addEmergencyToken(req.body);
  res.json(result);
}

// Get slot status
function getSlotStatus(req, res) {
  const { doctorId, slotTime } = req.params;
  const result = tokenService.getSlotStatus(doctorId, slotTime);
  res.json(result);
}

module.exports = {
  createToken,
  cancelToken,
  markNoShow,
  addEmergency,
  getSlotStatus,
};
