import { UserModel, UserType } from "./user.model";
import { UpdateUserType } from "./user.types";

// DECLARE ACTION FUNCTION
async function updateUserAction(userData: UpdateUserType): Promise<UserType | null> {
    const updatedUser = await UserModel.findOneAndUpdate({ _id: userData._id, active: true }, userData, { new: true });

    return updatedUser;
}

export default updateUserAction;