import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Plant } from "../models/PlantInterface";
import { PlantService } from "../services/PlantService";

export class PlantController {
  public plantService = new PlantService();

  async getAllPlant(req: Request, res: Response): Promise<void> {
    try {
      const allPlant = await this.plantService.getAllPlant();
      res.send({ status: "OK", data: allPlant });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  async getOnePlantById(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Il manque l'id'" },
      });
      return;
    }
    try {
      const id = parseInt(paramId);
      const onePlant = await this.plantService.getOnePlantById(id);
      res.send({ status: "OK", data: onePlant });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  async createNewPlant(req: Request, res: Response): Promise<void> {
    const newPlant: Plant = {
      ...req.body,
    };
    console.log(newPlant);
    if (
      !newPlant.name ||
      newPlant.unitprice_ati === undefined ||
      newPlant.quantity === undefined ||
      newPlant.category === undefined ||
      newPlant.rating === undefined ||
      newPlant.url_picture === undefined
    ) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error: "Il manque une info",
        },
      });
      return;
    }

    try {
      await this.plantService.createNewPlant(newPlant);
      res.status(201).send({
        status: "OK",
        message: `Nouvelle plante créée`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  async updateOnePlant(req: Request, res: Response): Promise<void> {
    const changes: Plant = {
      ...req.body,
    };
    const paramId = req.params.id;
    if (!paramId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Il manque l'id" },
      });
      return;
    } else if (!changes) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error: "Une info manquante",
        },
      });
      return;
    }

    try {
      const id = parseInt(paramId);
      await this.plantService.updateOnePlant(id, changes);
      res.status(201).send({
        status: "OK",
        message: `la plante :  ${id} a été mise a jour`,
      });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }

  async deleteOnePlant(req: Request, res: Response): Promise<void> {
    const paramId = req.params.id;

    if (!paramId) {
      res.status(400).send({
        status: "FAILED",

        data: { error: "Il manque l'id " },
      });

      return;
    }

    try {
      const id = parseInt(paramId);
      await this.plantService.deleteOnePlant(id);

      res

        .status(200)

        .send({ status: "OK", message: `la plante ${id} a été supprimé` });
    } catch (error: any) {
      res

        .status(error?.status || 500)

        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
}
