import { UserType } from "./user.model";

export type CreateUserType = Omit<UserType, "_id">
export type ReadUserType = Partial<Pick<UserType, "correo" | "contraseña" | "_id" | "active">>;
export type UpdateUserType = Partial<UserType>
export type DeleteUserType = Pick<UserType, "_id" | "active">;