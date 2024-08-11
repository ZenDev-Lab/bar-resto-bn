import { Request, Response } from "express"

export default async (req:Request, res:Response) => {
 res.send('<h1>Welcome To Resto and Management System Version 1</h1>')
}