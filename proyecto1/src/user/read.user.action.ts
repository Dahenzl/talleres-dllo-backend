import { UserModel, UserType } from "./user.model";
import { ReadUserType } from "./user.types";

// DECLARE ACTION FUNCTION
async function readUserAction(userData: ReadUserType): Promise<UserType | null> {
  const user = await UserModel.findOne(userData);
  
  return user;

}

// EXPORT ACTION FUNCTION
export default readUserAction;
