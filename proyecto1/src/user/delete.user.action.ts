import { UserModel, UserType } from "./user.model";
import { DeleteUserType } from "./user.types";

// DECLARE ACTION FUNCTION
async function deleteUserAction(userData: DeleteUserType): Promise<UserType | null> {
    const deletedUser = await UserModel.findOneAndUpdate(userData, { active: false }, { new: true });

    return deletedUser;
}

// EXPORT ACTION FUNCTION
export default deleteUserAction;