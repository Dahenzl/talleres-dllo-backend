import { users, UserType } from "./user.model";

// DECLARE ACTION FUNCTION
async function createUserAction(user: UserType): Promise<UserType> {
    users.push(user);
    
    return user;
}

// EXPORT ACTION FUNCTION
export default createUserAction;
