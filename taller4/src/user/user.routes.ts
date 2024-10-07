import { Router, Request, Response } from "express";
import { readUsers, findUsersByHobby, userExists, getTeamExperience, findUsersByFaction, registerUser } from "./user.controller";

// INIT ROUTES
const userRoutes = Router();

// DECLARE ENDPOINT FUNCTIONS
async function GetUsers(request: Request, response: Response) {
  const users = await readUsers();

  response.status(200).json({users: users});
}

async function GetUsersByHobby(request: Request, response: Response) {
  const hobby = String(request.query.hobby);
  const users = await findUsersByHobby(hobby);

  response.status(200).json({users: users});
}

async function UserExists(request: Request, response: Response) {
  const id = Number(request.query.id);
  const exists = await userExists(id);

  response.status(200).json({exists: exists});
}

async function GetTeamExperience(request: Request, response: Response) {
  const team = String(request.query.team);
  const totalExperience = await getTeamExperience(team);

  response.status(200).json({totalExperience: totalExperience});
}

async function GetUsersByFaction(request: Request, response: Response) {
  const faction = String(request.query.faction);
  const users = await findUsersByFaction(faction);

  response.status(200).json({users: users});
}

async function RegisterUser(request: Request, response: Response) {
  try{
    const user = request.body;
    // VALIDATING QUERY PARAMS (As there is no database but an array, we need to check this manually in the route) 
    // Not necessary for the quiz, but i wanted to do it as a good practice :)
    if(!user.name || !user.id){
      return response.status(400).json({message: "Name and ID are required"});
    } 
    const newUser = await registerUser(user);
    response.status(201).json({user: newUser});
  } catch (error: any) {
    response.status(400).json({message: error.message});
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
