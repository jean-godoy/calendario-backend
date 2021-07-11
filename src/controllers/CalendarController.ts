import * as Yup from 'yup';

import ScheduleService from '../services/ScheduleService';
import ScheduleRepository from '../repositories/ScheduleRepository';

import { getCustomRepository } from 'typeorm';

//interfaces
import GetByMonth from '../interfaces/GetByMonth';
import Schedule from '../entities/Schedule';
import Checked from '../interfaces/Checked';

/**
 * Classe responsavel pelo controle da agenda
 */
class CalendarController {

    /**
     * Metodo todos resultados
     * @param request 
     * @param response 
     * @returns {}
     */
    public async showAll(request: any, response: any): Promise<Schedule[]> {
        const scheduleRepository = getCustomRepository(ScheduleRepository);
        const schedules = await scheduleRepository.find();

        return response.json(schedules);
    }

    /**
     * Metodo uma busca pelo mes e ano
     * @param request 
     * @param response 
     * @returns 
     */
    public async getAppointments(request: any, response: any): Promise<Schedule> {
        const scheduleService = new ScheduleService();
        let data: GetByMonth = {
            month: parseInt(request.params.month),
            year: parseInt(request.params.year)
        };

        const appointments = await scheduleService.getAppointmentsByMonth(data);

        return response.json(appointments);
    }

    /**
     * Metodo para inserção de novo registro
     * @returns {}
     */
    public async createAppointment(request: any, response: any): Promise<any> {

        //cria uma validação no post
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            hour: Yup.number().required(),
            month: Yup.number().required(),
            year: Yup.number().required()
        });
        //verifica se todos os campos foram preenchidos
        if(! await schema.isValid(request.body)) {
            return response.status(400).json({
                error: 'Validation fails.. :(',
            });
        }

        try {
            const requestJSON = request.body;

            const scheduleService = new ScheduleService();
            const schedule = await scheduleService.createNewSchedule(requestJSON);

            return response.json(schedule);
        } catch (e) {
            return response.status(400).json({ error: e });
        }
    }

    /**
     * metodo responsavel pela edição de um compromisso
     * @param request 
     * @param response 
     * @returns 
     */
    public async updateAppointment(request: any, response: any): Promise<any> {
        try {
            // recupera o id do compromisso
            const id = request.params.id;
        
            const requestJSON = request.body;
    
            const scheduleService = new ScheduleService();
            const schedule = await scheduleService.updateAppointment(id, requestJSON);
    
            return response.json(schedule);
        } catch (e) {
            return response.status(400).json({ error: e});
        }
    }

    /**
     * Metodo resopnsavel por deletar um registro
     * @param request 
     * @param response 
     */
    public async deleteAppointment(request: any, response: any): Promise<any> {
        try {
            // recupera o id do compromisso
            const id = request.params.id;
    
            const scheduleService = new ScheduleService();
            const schedule = await scheduleService.deleteAppointment(id);
    
            return response.json({ message: true });
        } catch (e) {
            return response.status(400).json({ error: e});
        }
    }

    /**
     * metodo que verifica se ja existe evento registrado
     * @param request 
     * @param response 
     * @returns {}
     */
    public async checkAppointment(request: any, response: any): Promise<any> {

        const dataJSON: Checked = {
            hour:   request.params.hour,
            day:    request.params.day,
            month:  request.params.month,
            year:   request.params.year
        }
        
        try {
            const requestJSON = request.body;

            const scheduleService = new ScheduleService();
            const result = await scheduleService.checkedAppointment(dataJSON); 

            return response.json(result);
        } catch (e) {
            return response.status(400).json({ error: e });
        }

    }

}

export default new CalendarController();