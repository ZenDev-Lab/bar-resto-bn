import bcrypt from "bcrypt"
import prisma from "../utils/connectDb"

export interface RegisterData{
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    role: string,
    contract: string,
    phoneNumber: string,
    password:string
}


export const registerUser = async (data: any) => {
    
    const { username, firstName, lastName, email, age, role, contract, phoneNumber, password } = data;

    const isUserExist = await prisma.users.findFirst({
        where: {
            OR: [{ email }, { username }]
        }
    });

    if (isUserExist) {
        throw Error("User already exists")
    }

    const hashPassword = bcrypt.hashSync(password, 10)
    
    const newUser = await prisma.users.create({
        data: {
            username,
            firstName,
            lastName,
            email,
            age,
            contract,
            role,
            phoneNumber,
            password:hashPassword
        }
    })

  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
    
}