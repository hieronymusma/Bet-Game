import { User } from "./user";

export interface UserStatus {
    user: User;
    hasTransaction: boolean;
}
