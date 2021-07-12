import { response } from 'express';
import { getCustomRepository, Timestamp } from 'typeorm';
import Schedule from '../entities/Schedule';
import ScheduleRepository from '../repositories/ScheduleRepository';

//interfaces
import GetByMonth from '../interfaces/GetByMonth';
import Checked from '../interfaces/Checked';
import Request from '../interfaces/Request';

class ScheduleService {

    /**
     * Resorna todos resultados listados
     * @returns {}
     */
    public async showAll(): Promise<any> {
        const scheduleRepository = getCustomRepository(ScheduleRepository);
        const appointments = await scheduleRepository.find();

        return appointments;
    }

    /**
     * Cadastra novo compromisso na agenda
     * 
     * @param request 
     * @returns {}
     */
    public async createNewSchedule(data: Request): Promise<Schedule> {

        const scheduleRepository = getCustomRepository(ScheduleRepository);
        let now = new Date;

        // cria uma instancia com o objeto a ser salvo
        const schedule = scheduleRepository.create({
            description: data.description,
            hour: data.hour,
            day: data.day,
            month: data.month,
            year: data.year
        });

        //salva o objeto
        await scheduleRepository.save(schedule);

        return schedule;

    }

    /**
     * Retorna todos compromissos de um mes especifico
     * busca é feita pelo mes e ano
     * 
     * @param data 
     * @returns {}
     */
    public async getAppointmentsByMonth(data: GetByMonth): Promise<Schedule[]> {
        const scheduleRepository = getCustomRepository(ScheduleRepository);
        const schedules = await scheduleRepository.find({ month: data.month, year: data.year });

        return schedules;
    }

    /**
     * função responsavel por editar um registro
     * 
     * @param id 
     * @param data 
     * @returns 
     */
    public async updateAppointment(id: string, data: Request): Promise<Schedule> {

        let now = new Date;

        const scheduleRepository = getCustomRepository(ScheduleRepository);

        let scheduleUpdate: any = await scheduleRepository.findOne(id);
        scheduleUpdate.description = data.description;
        scheduleUpdate.hour = data.hour;
        scheduleUpdate.day = data.day;
        scheduleUpdate.month = data.month;
        scheduleUpdate.year = data.year;
        scheduleUpdate.updated_at = now.toString();

        await scheduleRepository.save(scheduleUpdate);
        return scheduleUpdate;
    }

    /**
     * Função responsavel por remover um registro pelo id
     * @param id 
     * @returns bollean
     */
    public async deleteAppointment(id: string): Promise<boolean> {

        const scheduleRepository = getCustomRepository(ScheduleRepository);
        const schedule: any = await scheduleRepository.findOne(id);
        await scheduleRepository.delete(schedule);

        return true;
    }

    /**
     * Metodo respo
     * @param data 
     * @returns boolean
     */
    public async checkedAppointment(data: Checked): Promise<boolean> {

        const scheduleRepository = getCustomRepository(ScheduleRepository);
        const schedule: any = await scheduleRepository.findOne({
            hour: data.hour,
            day: data.day,
            month: data.month,
            year: data.year,
        });

        if (schedule) {
            return true;
        }

        return false;
    }

}

export default ScheduleService;