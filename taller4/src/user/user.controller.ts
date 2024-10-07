import readUserAction from "./read.user.action";
import createUserAction from "./create.user.action";
import { UserType } from "./user.model";

// DECLARE CONTROLLER FUNCTIONS
async function readUsers(): Promise<UserType[]> {
  const users = readUserAction();
  return users;
}

async function findUsersByHobby(hobby: string): Promise<UserType[]> {
  const users = await readUserAction();
  return users.filter((user: UserType) => user.hobbies?.includes(hobby));
}

async function userExists(id: number): Promise<boolean> {
  const users = await readUserAction();
  return users.some((user: UserType) => user.id === id);
}

async function getTeamExperience(team: string): Promise<number> {
  const users = await readUserAction();
  const teamUsers = users.filter((user: UserType) => user.team === team);
  return teamUsers.reduce((acc: number, user: UserType) => acc + (user.years || 0), 0);
}

async function findUsersByFaction(faction: String): Promise<UserType[]> {
  const users = await readUserAction();
  return users.filter((user: UserType) => user.faction === faction);
}

async function registerUser(user: UserType): Promise<UserType> {
  // VALIDATING USER (As there is no database but an array, we need to check this manually in the controller) 
  // Not necessary for the quiz, but i wanted to do it as a good practice :)
  const users = await readUserAction();
  user.id = Number(user.id);
  if (isNaN(user.id)) {
    throw new Error("User ID must be a number");
  }
  const exists = users.some((u: UserType) => u.id === user.id);
  if (exists) {
    throw new Error("User ID already exists");
  }
  // CREATING USER
  return createUserAction(user);
}

// EXPORT CONTROLLER FUNCTIONS
export { readUsers, findUsersByHobby, userExists, getTeamExperience, findUsersByFaction, registerUser };
