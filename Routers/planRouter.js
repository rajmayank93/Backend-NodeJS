const express = require("express");
const app = express();
const planRouter = express.Router();
const {
  protectRoute,
  isAuthorised,
} = require("./../controller/authController");

const {
  getAllPlans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
} = require("./../controller/planController");

planRouter.route("/allPlans").get(getAllPlans);

// own plan -->logged in necessary
planRouter.use(protectRoute);
planRouter.route("/plan/:id").get(getPlan);

// only be done by either admin or restraunt owner
planRouter.use(isAuthorised[("admin", "restraunt")]);
planRouter
  .route("/crudPlan")
  .post(createPlan)
  .patch(updatePlan)
  .delete(deletePlan);
