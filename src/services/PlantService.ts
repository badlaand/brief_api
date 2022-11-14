import { AppDataSource } from "../data-source";
import { Plant } from "../models/PlantInterface";

export class PlantService {
  getAllPlant(): Promise<Plant[]> {
    return AppDataSource.query("SELECT * FROM plant; ");
  }

  getOnePlantById(id: number): Promise<Plant> {
    return AppDataSource.query(
      "SELECT plant FROM plant WHERE plant.id = ${id};"
    );
  }
  createNewPlant(newPlant: Plant): Promise<any> {
    return AppDataSource.query(
      `INSERT INTO plant ( name, unitprice_ati,quantity,category,rating,url_picture) VALUES ('${newPlant.name}', ${newPlant.unitprice_ati},
   ${newPlant.quantity},'${newPlant.category}',${newPlant.rating},'${newPlant.url_picture}');`
    );
  }
  updateOnePlant(id: number, changes: Plant): Promise<any> {
    return AppDataSource.query(`UPDATE plant
SET name = '${changes.name}',
 unitprice_ati = ${changes.unitprice_ati},
 quantity = ${changes.quantity},
category = '${changes.category}',
quantity = ${changes.quantity},
rating = ${changes.rating},
url_picture = '${changes.url_picture}' WHERE id= ${id}`);
  }

  deleteOnePlant(id: number): Promise<any> {
    return AppDataSource.query(`

    DELETE plant FROM plant

WHERE id = ${id}`);
  }
}
