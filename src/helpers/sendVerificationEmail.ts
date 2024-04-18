import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerficationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {

    try {

        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['delivered@resend.dev'],
            subject: 'Verification Email ',
            react: VerificationEmail({username, otp: verifyCode}),
          });
        
        return{
            success:false,
            message: "Verification email sent successfully"
        }
        sendVerificationEmail
    } catch (error) {
        console.log("Error sending verification email ", error)

        return{
            success:false,
            message: "Failed to send verification email"
        }
    }
    
}