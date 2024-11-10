import { Router, Request, Response } from "express";
import { createUser, getUser, updateUser, deleteUser } from "./user.controller";
import { CreateUserType, DeleteUserType, ReadUserType, UpdateUserType } from "./user.types";
import { AuthMiddlewareUpdateUser, AuthMiddlewareDeleteUser } from "../middleware/auth";

// INIT ROUTES
const userRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function LoginUser(request: Request<ReadUserType>, response: Response) {
  if(!request.body.correo || !request.body.contraseña) {
    response.status(400).json({
      message: "Failure",
      information: "Missing required fields."
    });

    return;
  }

  try {
    const [user, token] = await getUser(request.body);

    if(!user) {
      response.status(404).json({
        message: "Failure",
        information: "User not found."
      });

      return;
    }

    response.status(200).json({
      message: "Success.",
      token: token,
      user: user,
    });

  } catch (error) {
    response.status(500).json({
      message: "Failure",
      information: (error as any).toString()
    });
  }
}

async function CreateUser(request: Request<CreateUserType>, response: Response) {
  if (!request.body.nombre || !request.body.correo || !request.body.contraseña) {
    response.status(400).json({
      message: "Failure",
      information: "Missing required fields."
    });

    return;
  }

  try {
    const user = await createUser(request.body);
    
    response.status(200).json({
      message: "Success.",
      user: user,
    });

  } catch (error) {
    response.status(500).json({
      message: "Failure",
      information: (error as any).toString()
    });
  }
}

async function UpdateUser(request: Request<UpdateUserType>, response: Response) {
  if (!request.body._id) {
    response.status(400).json({
      message: "Failure",
      information: "Missing _id to update."
    });

    return;
  }

  try {
    const user = await updateUser(request.body);

    if(!user) {
      response.status(404).json({
        message: "Failure",
        information: "User not found."
      });

      return;
    }

    response.status(200).json({
      message: "Success.",
      user: user,
    });

  } catch (error) {
    response.status(500).json({
      message: "Failure",
      information: (error as any).toString()
    });
  }
}

async function DeleteUser(request: Request<DeleteUserType>, response: Response) {
  if (!request.params._id) {
    response.status(400).json({
      message: "Failure",
      information: "Missing _id to delete."
    });

    return;
  }

  try {
    // Añadimos el campo active: true, para que no se desactive un usuario que ya este desactivado.
    const userData = { _id: request.params._id, active: true }
    const user = await deleteUser(userData);

    if(!user) {
      response.status(404).json({
        message: "Failure",
        information: "User not found."
      });

      return;
    } 

    response.status(200).json({
      message: "Success.",
      user: user,
    });

  } catch (error) {
    response.status(500).json({
      message: "Failure",
      information: (error as any).toString()
    });
  }
}

// DECLARE ENDPOINTS
userRoutes.get("/", LoginUser);
userRoutes.post("/", CreateUser);
userRoutes.put("/", AuthMiddlewareUpdateUser, UpdateUser);
userRoutes.delete("/:_id", AuthMiddlewareDeleteUser, DeleteUser);

// EXPORT ROUTES
export default userRoutes;
