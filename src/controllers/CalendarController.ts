import * as Yup from 'yup';
import { Request, Response } from 'express';

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
    public async showAll(request: Request, response: Response): Promise<Response> {
        const scheduleService = new ScheduleService();
        const schedules = await scheduleService.showAll();

        return response.json(schedules);
    }

    /**
     * Metodo uma busca pelo mes e ano
     * @param request 
     * @param response 
     * @returns 
     */
    public async getAppointments(request: Request, response: Response): Promise<Response> {
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
    public async createAppointment(request: Request, response: Response): Promise<Response> {

        //cria uma validação no request
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
     * @returns {}
     */
    public async updateAppointment(request: Request, response: Response): Promise<Response> {
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
     * @returns {}
     */
    public async deleteAppointment(request: Request, response: Response): Promise<Response> {
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
    public async checkAppointment(request: Request, response: Response): Promise<Response> {

        const dataJSON: Checked = {
            hour:   parseInt(request.params.hour),
            day:    parseInt(request.params.day),
            month:  parseInt(request.params.month),
            year:   parseInt(request.params.year)
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