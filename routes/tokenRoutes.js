const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/tokenController");

// Create token (online, walk-in, paid, follow-up)
router.post("/create", tokenController.createToken);

// Cancel a token
router.delete("/cancel/:tokenId", tokenController.cancelToken);

// Mark no-show
router.put("/no-show/:tokenId", tokenController.markNoShow);

// Add emergency token
router.post("/emergency", tokenController.addEmergency);

// Get slot status
router.get("/status/:doctorId/:slotTime", tokenController.getSlotStatus);

module.exports = router;
