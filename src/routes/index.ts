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

/**
* Rota responsavel por deletar um compromisso
* @returns {}
*/
routes.delete('/delete-appointment/:id', CalendarController.deleteAppointment);

/**
* Rota responsavel por verificar se o evento a ser registrado ja existe
* @returns {}
*/
routes.get('/check-appointment/:hour/:day/:month/:year', CalendarController.checkAppointment);

export default routes;
