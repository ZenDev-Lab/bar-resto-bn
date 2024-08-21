
import { Request, Response } from 'express'
import { registerUser } from '../../services/registerService'
export  const register = async (req: Request, res: Response)=>{
  try {
    const newUser = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      newUser
    })
  } catch (error:any) {
    if (error.message === "User already exists") {
      return res.status(401).json({
        success: false,
        message: error.message
      });
      
    }
    console.error("Error during registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error:error.name
    })
  }

}