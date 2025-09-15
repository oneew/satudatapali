import express from "express";
import auth from "../connection/auth.js";
import {
    synchronizeFile,
    synchronizeAllFiles,
    fetchDataFromExternal,
    fetchFinalDataFromSipd,
    fetchReferenceDataFromSipd,
    sendDisableRequestToSipd,
    getSyncStatus
} from "../controller/integrationController.js";

const router = express.Router();

// All integration routes require authentication
router.use(auth);

// Synchronize a specific file with external systems
router.post("/sync/:id", synchronizeFile);

// Synchronize all verified files with external systems
router.post("/sync-all", synchronizeAllFiles);

// Fetch data from external systems
router.get("/fetch/:system/:datasetId", fetchDataFromExternal);

// Fetch final data from SIPD e-walidata
router.get("/sipd/final", fetchFinalDataFromSipd);

// Fetch reference data from SIPD e-walidata
router.get("/sipd/reference", fetchReferenceDataFromSipd);

// Send disable request to SIPD e-walidata
router.post("/sipd/disable", sendDisableRequestToSipd);

// Get synchronization status for a file
router.get("/status/:id", getSyncStatus);

export default router;