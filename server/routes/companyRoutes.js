import express from "express";

import {
  getCompanies,
  getSingleCompany,
} from "../controllers/companyController.js";

const router = express.Router();

router.get("/", getCompanies);

router.get("/:id", getSingleCompany);

export default router;