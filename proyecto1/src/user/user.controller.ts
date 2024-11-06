import createUserAction from "./create.user.action";
import readUserAction from "./read.user.action";
import updateUserAction from "./update.user.action";
import deleteUserAction from "./delete.user.action";
import { UserType } from "./user.model";
import { CreateUserType, ReadUserType, UpdateUserType, DeleteUserType } from "./user.types";
import { sign } from "jsonwebtoken"
import { env } from "process";

// DECLARE CONTROLLER FUNCTIONS
async function getUser(userData: ReadUserType): Promise<[UserType | null, string | null]> {
  // Si se manda el paramatero active como false, incluye en la busqueda los usuarios desactivados, de lo contrario solo los activos :D
  if(userData.active === false) {
    console.log("Including disabled users in the search.")
    delete userData.active;
  } else{
    userData.active = true;
  }

  try {
    const user = await readUserAction(userData);
    if(user){
      const token = sign({ "_id":user._id }, (env as {JWT_KEY: string}).JWT_KEY);

      return [user, token];
    } else{
      return [null, null];
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

async function createUser(userData: CreateUserType): Promise<UserType> {
  try {
    const newUser = await createUserAction(userData);

    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
}

async function updateUser(userData: UpdateUserType): Promise<UserType | null> {
  try {
    const updatedUser = await updateUserAction(userData);

    return updatedUser;
  } catch (error: any) {
    throw new Error(error);
  }
}

async function deleteUser(userData: DeleteUserType): Promise<UserType | null> {
  try {
    const deletedUser = await deleteUserAction(userData);

    return deletedUser;
  } catch (error: any) {
    throw new Error(error);
  }
}

// EXPORT CONTROLLER FUNCTIONS
export { getUser, createUser, updateUser, deleteUser };
