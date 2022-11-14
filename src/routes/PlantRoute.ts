import { Router } from "express";
import { PlantController } from "../controllers/PlantController";

const PlantRouter = Router();

const plantController = new PlantController();

PlantRouter.get("/", (req, res) => plantController.getAllPlant(req, res));
PlantRouter.get("/:id", (req, res) =>
  plantController.getOnePlantById(req, res)
);
PlantRouter.post("/", (req, res) => plantController.createNewPlant(req, res));

PlantRouter.put("/:id", (req, res) => plantController.updateOnePlant(req, res));
PlantRouter.delete("/:id", (req, res) =>
  plantController.deleteOnePlant(req, res)
);

export default PlantRouter;
