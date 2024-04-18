import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcryptjs from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request:Request) {
    await dbConnect()

    try {
        const { username, email, password } = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if(existingUserVerifiedByUsername){
            return Response.json({
                success: false,
                message: "Username is already taken"
            },
            {
                status: 400
            }
        )
        }

        const existingUserByEmail = await UserModel.findOne({email})

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        if(existingUserByEmail){

            if(existingUserByEmail.isVerified){
                return Response.json(
                    {
                        success: false,
                        message: "User alredy exists with this email"
                    },
                    {
                        status: 500
                    }
                )
            }else{
                const hashedPassword = await bcryptjs.hash(password, 10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
            }
        }else{
            const hashedassword = await bcryptjs.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username: username,
                password: hashedassword,
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                messages: []
            })

            await newUser.save()
        }

        // send verifcation email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )

        if(!emailResponse.success){
            return Response.json(
            {
                success: false,
                message: emailResponse.message
            },
        {
            status: 500
        })
        }

        return Response.json(
            {
                success: false,
                message: "User registerd successfully. Please verify your email"
            },
            {
                status: 200
            }
        )
        
    } catch (error) {
        console.log("Error registering User: ", error)
        return Response.json(
            {
                success: false,
                message: "Error Registering User"
            },
            {
                status: 500
            }
        )
    }
}