import mongoose from 'mongoose'

export interface IUser {
 firstName: string;
 lastname: string;
 DOB: Date;
 email: string;
 phoneNumber:number;
 password:string
}
export interface ITransaction {
 reference: string;
 amount: number;
 receiverAccout: string;
 senderAccount: string;
 createdAt: Date;
 transferDescription:string
}
export interface IBalance {
 accountNo: string;
 balance: string;
 createdAt: Date;
 updatedAt: Date;
 userId: string
}