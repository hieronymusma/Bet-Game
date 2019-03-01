import { User } from "../server-interfaces/user";

export interface Transaction {
    user: User;
    betMoney: number;
    betTarget: BetTarget;
}

export enum BetTarget {
    Blue = 0,
    Red = 1
}