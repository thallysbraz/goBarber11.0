import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface Request {
    provider: string;
    date: Date;
}

// Dependency Inversion

class CreateAppointmentService {
    public async execute({ provider, date }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );
        const appointmentDate = startOfHour(date); // pegando somente a hora

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw Error("Horario ja marcado");
        }

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });
        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
