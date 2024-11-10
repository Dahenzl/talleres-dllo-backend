import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import readUserAction from "../user/read.user.action";
import { DeleteUserType, ReadUserType, UpdateUserType } from "../user/user.types";
import { CreateBookType, DeleteBookType, UpdateBookType } from "../book/book.types";
import { env } from "process";

export async function AuthMiddlewareUpdateUser(request: Request<UpdateUserType>, response: Response, next: NextFunction) {
    if (typeof request.headers.authorization !== 'string') {
        return response.status(401).json({
            message: "Not authorized."
        });
    }

    try {
        const jwtValues = verify(request.headers.authorization, (env as { JWT_KEY: string }).JWT_KEY);
        if (jwtValues && typeof jwtValues !== 'string' && '_id' in jwtValues) {
            const AuthUserId = { _id: jwtValues._id, active: true };
            const user = await readUserAction(AuthUserId as ReadUserType);
            if (user) {
                if (user._id == request.body._id || user.canUpdateUsers) {
                    console.log("User is authorized to update the given user.");
                    next();
                } else {
                    return response.status(401).json({
                        message: "Not authorized."
                    });
                }
            } else {
                return response.status(401).json({
                    message: "Not authorized."
                });
            }
        } else {
            return response.status(401).json({
                message: "Not authorized."
            });
        }
    } catch (error) {
        return response.status(401).json({
            message: "Not authorized."
        });
    }
}

export async function AuthMiddlewareDeleteUser(request: Request<DeleteUserType>, response: Response, next: NextFunction) {
    if (typeof request.headers.authorization !== 'string') {
        return response.status(401).json({
            message: "Not authorized."
        });
    }

    try {
        const jwtValues = verify(request.headers.authorization, (env as { JWT_KEY: string }).JWT_KEY);
        if (jwtValues && typeof jwtValues !== 'string' && '_id' in jwtValues) {
            const AuthUserId = { _id: jwtValues._id, active: true };
            const user = await readUserAction(AuthUserId as ReadUserType);
            if (user) {
                if (user._id == request.params._id || user.canDeleteUsers) {
                    console.log("User is authorized to delete the given user.");
                    next();
                } else {
                    return response.status(401).json({
                        message: "Not authorized."
                    });
                }
            } else {
                return response.status(401).json({
                    message: "Not authorized."
                });
            }
        } else {
            return response.status(401).json({
                message: "Not authorized."
            });
        }
    } catch (error) {
        return response.status(401).json({
            message: "Not authorized."
        });
    }
}

export async function AuthMiddlewareCreateBook(request: Request<CreateBookType>, response: Response, next: NextFunction) {
    if (typeof request.headers.authorization !== 'string') {
        return response.status(401).json({
            message: "Not authorized."
        });
    }

    try {
        const jwtValues = verify(request.headers.authorization, (env as { JWT_KEY: string }).JWT_KEY);
        if (jwtValues && typeof jwtValues !== 'string' && '_id' in jwtValues) {
            const AuthUserId = { _id: jwtValues._id, active: true };
            const user = await readUserAction(AuthUserId as ReadUserType);
            if (user) {
                if (user.canCreateBooks) {
                    console.log("User is authorized to create books.");
                    next();
                } else {
                    return response.status(401).json({
                        message: "Not authorized."
                    });
                }
            } else {
                return response.status(401).json({
                    message: "Not authorized."
                });
            }
        } else {
            return response.status(401).json({
                message: "Not authorized."
            });
        }
    } catch (error) {
        return response.status(401).json({
            message: "Not authorized."
        });
    }
}

export async function AuthMiddlewareDeleteBook(request: Request<DeleteBookType>, response: Response, next: NextFunction) {
    if (typeof request.headers.authorization !== 'string') {
        return response.status(401).json({
            message: "Not authorized."
        });
    }

    try {
        const jwtValues = verify(request.headers.authorization, (env as { JWT_KEY: string }).JWT_KEY);
        if (jwtValues && typeof jwtValues !== 'string' && '_id' in jwtValues) {
            const AuthUserId = { _id: jwtValues._id, active: true };
            const user = await readUserAction(AuthUserId as ReadUserType);
            if (user) {
                if (user.canDeleteBooks) {
                    console.log("User is authorized to delete books.");
                    next();
                } else {
                    return response.status(401).json({
                        message: "Not authorized."
                    });
                }
            } else {
                return response.status(401).json({
                    message: "Not authorized."
                });
            }
        } else {
            return response.status(401).json({
                message: "Not authorized."
            });
        }
    } catch (error) {
        return response.status(401).json({
            message: "Not authorized."
        });
    }
}

export async function AuthMiddlewareUpdateBook(request: Request<UpdateBookType>, response: Response, next: NextFunction) {
    if (typeof request.headers.authorization !== 'string') {
        return response.status(401).json({
            message: "Not authorized."
        });
    }

    try {
        const jwtValues = verify(request.headers.authorization, (env as { JWT_KEY: string }).JWT_KEY);
        if (jwtValues && typeof jwtValues !== 'string' && '_id' in jwtValues) {
            const AuthUserId = { _id: jwtValues._id, active: true };
            const user = await readUserAction(AuthUserId as ReadUserType);
            if (user) {
                request.body.authUser = user._id;
                if (request.body.titulo || request.body.autor || request.body.genero || request.body.fecha_publicacion || request.body.editorial || request.body.disponibilidad || request.body.historial || request.body.active) {
                    if (user.canUpdateBooks) {
                        console.log("User is authorized to update books.");
                        next();
                    } else {
                        return response.status(401).json({
                            message: "Not authorized."
                        });
                    }
                } else {
                    next();
                }
            } else {
                return response.status(401).json({
                    message: "Not authorized."
                });
            }
        } else {
            return response.status(401).json({
                message: "Not authorized."
            });
        }
    } catch (error) {
        return response.status(401).json({
            message: "Not authorized."
        });
    }
}