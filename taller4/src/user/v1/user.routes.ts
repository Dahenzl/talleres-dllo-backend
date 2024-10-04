import { Router, Request, Response } from "express";
import { readUsers, findUsersByHobby, userExists, getTeamExperience, findUsersByFaction, registerUser  } from "./user.controller";

// INIT ROUTES
const userRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function GetUsers(request: Request, response: Response) {
  const users = await readUsers();
  response.status(200).json({users: users });
}

async function GetUsersByHobby(request: Request, response: Response) {
  const hobby = request.body.hobby;
  const users = await findUsersByHobby(hobby);

  response.status(200).json({
    users: users,
  });
}

async function UserExists(request: Request, response: Response) {
  const id = Number(request.body.id);
  const exists = await userExists(id);

  response.status(200).json({
    exists: exists,
  });
}

async function GetTeamExperience(request: Request, response: Response) {
  const team = request.body.team;
  const totalExperience = await getTeamExperience(team);

  response.status(200).json({
    totalExperience: totalExperience,
  });
}

async function GetUsersByFaction(request: Request, response: Response) {
  const faction = request.body.faction;
  const users = await findUsersByFaction(faction);

  response.status(200).json({
    users: users,
  });
}

async function RegisterUser(request: Request, response: Response) {
  try {
    const user = request.body;
    if(!user.id || !user.name) {
      response.status(400).json({
        message: "Missing required fields",
      })
    } else{
      user.id = Number(user.id);
      const newUser = await registerUser(user);
      response.status(201).json({
        user: newUser,
      });
    }
  } catch (error: any) {
    response.status(400).json({
      message: error.message,
    });
  }
}

// DECLARE ENDPOINTS
userRoutes.get("/", GetUsers);
userRoutes.get("/hobby", GetUsersByHobby);
userRoutes.get("/exists", UserExists);
userRoutes.get("/team-experience", GetTeamExperience);
userRoutes.get("/by-faction", GetUsersByFaction);
userRoutes.post("/", RegisterUser);

// EXPORT ROUTES
export default userRoutes;
