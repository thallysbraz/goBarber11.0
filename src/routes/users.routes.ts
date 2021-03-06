import { Router } from "express";
import multer from "multer";

import CreateUserService from "../services/CreateUserService";
import ensureAuthenticate from "../middlewares/ensureAuthenticated";
import uploadConfig from "../config/upload";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

const usersRouter = Router();
const upload = multer(uploadConfig);
// A rota deve receber uma requisição, chamar outro arquivo e devolver uma resposta

usersRouter.post("/", async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });
        delete user.password;
        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

// rota para atualizar o avatar
usersRouter.patch(
    "/avatar",
    ensureAuthenticate,
    upload.single("avatar"),
    async (request, response) => {
        try {
            const updateUserAvatarService = new UpdateUserAvatarService();

            const user = await updateUserAvatarService.execute({
                user_id: request.user.id,
                avatarFilename: request.file.filename,
            });
            delete user.password;
            return response.json(user);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    },
);

export default usersRouter;
