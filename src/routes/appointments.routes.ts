import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();

// A rota deve receber uma requisição, chamar outro arquivo e devolver uma resposta

appointmentsRouter.get("/", async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post("/", async (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date); // transformando o dado para Date

        const createAppointment = new CreateAppointmentService();
        const appointment = await createAppointment.execute({
            provider,
            date: parsedDate,
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
