import { Router } from "express";
import CalendarController from "../controllers/CalendarController";

const routes = Router();

/**
 * Retorna uma lista com todos registros
 * @returns {}
 */
routes.get('/show-all', CalendarController.showAll);

/**
 * Rota que retorna todos compromissos de um mes especificado pelo mes e ano
 * @returns {}
 */
routes.get('/get-appointment/:month/:year', CalendarController.getAppointments);

/**
 * Rota para inserção de novo registro
 * @returns {}
 */
routes.post('/create-appointment', CalendarController.createAppointment);

/**
* Rota responsavel pela edição de compromissos
* @returns {}
*/
routes.put('/update-appointment/:id');

//Rota responsave por deletar um registro
routes.delete('/delete-appointment/:id', CalendarController.deleteAppointment);

export default routes;
