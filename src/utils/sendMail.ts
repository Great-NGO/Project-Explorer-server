import nodemailer, { SentMessageInfo } from "nodemailer";
import { translateError } from "./translateError";
import { MAILING_EMAIL, MAILING_PASSWORD, NODE_ENV } from "./secrets";
import { logError } from "./logging";

type TSendResetPwdMail = [ success: boolean, data: SentMessageInfo | null, message: string, metadata: { status: number, metadata ?: any }]

/** 
 * @param {string} email - Users email
 * @param {string} fullName - Users Full name
 * @param {string} token - Users reset token
 * @returns {[ success: boolean, data: SentMessageInfo | null, message: string, metadata: { status: number, metadata ?: any }]}
 * 
 * Sending Reset Password mail to a user
*/
const sendResetPwdMail = async (email: string, fullName: string, token: string) : Promise< TSendResetPwdMail> => {

    try {

        let url;
        if (NODE_ENV !== "development") {
            // url = `https://ngotechprojectexplorer.herokuapp.com/reset-password?token=${token}`
            url = `https://ngotechprojectexplorer.vercel.app/reset-password?token=${token}`;
        } else {
            // url = `http://localhost:3000/reset-password?token=${token}`;
            url = `http://localhost:4000/reset-password?token=${token}`;
        }


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: MAILING_EMAIL,
                pass: MAILING_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }

        });

        let mail = {
            from: MAILING_EMAIL,
            to: email,
            subject: "NGO-TECH Project Explorer - Reset your Project Explorer password",
            html: `
        Hi there <strong>${fullName}</strong>,
        <p>Having an issue with remembering your password? Well don't worry! </p>
        <p>Click the link below to complete your password reset process within the next 30 minutes </p>
        <br> <a href="${url}">Click here to reset your password</a>
        `
        }

        const result = await transporter.sendMail(mail);
        console.log("The result ", result);
        if (result.accepted) {
            return [true, null, "Reset Password link sent successfully.", { status: 200 }];
        }
        return [false, null, "Something went wrong in sending reset password link", { status: 400 }];

    } catch (error) {
        logError("Error from sending reset password mail function ", error);
        return translateError(error, "sending reset password link.")
    }

}

const sendWelcomeMail = async (email: string, firstname: string) => {

    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: MAILING_EMAIL,
                pass: MAILING_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }

        });

        let mail = {
            from: MAILING_EMAIL,
            to: email,
            subject: "Welcome to NGO-TECH Project Explorer",
            html: `
               Hi <strong>${firstname}</strong>,
               <p>Thank you so much for checking out and signing up on my project explorer application. </p>
               <p> Outlined below are features of my application at the moment. Expect more to come in the nearest future:  </p>
               <ul>
                    <span> 1. Complete User management system - </span>
                        <li>  You can upload your profile picture or continue with the default one  </li>
                        <li>  You can update your user profile (matric number, password, email, name etc.)  </li>
                        <li>  You can login/signup with social platforms like google(as you probably already did)  </li>
                        <li> If you ever forget your password, you can request to reset your password and an email containing a reset link will be sent to you.</li>
                    
                    <span> 2. Complete Commenting system - </span>
                        <li> The goal of this application is to allow students learn, explore, connect and communicate with one another</li>
                        <li> You can view recent projects found on the home page and interact with the project owners by posting your comments and much more.</li>
                        <li> Every verified user of this application has custom notifications  </li>
    
                    <span> Finally - </span>
                        <li> This application was built and inspired by reason of the training i received from Edconnect - Edconnect NG. I would definitely recommend joining them for their next cohort(If you are interested)  </li>
                        <li> Expect more updates to this application in the nearest future. My aim is to make the app a lot more powerful and substantial than it currently is by adding more helpful features </li>
                        <li> UNTIL THEN FEEL FREE TO REACH ME ON MY DEVELOPER EMAIL @ ngotechdev@gmail.com about any suggestions, ideas or feedback you may have!  </li>
               </ul>
               <h3> Have a wonderful day! </h3>
            `
        }

        const result = await transporter.sendMail(mail);
        console.log("The result ", result);
        if (result.accepted) {
            return [true, null, "User Welcome mail sent successfully.", { status: 200 }];
        }
        return [false, null, "Something went wrong in sending welcome mail to user.", { status: 400 }];


    } catch (error) {
        logError("Error from sending welcome mail function ", error);
        return translateError(error, "sending welcome mail to user.")
    }

}

export { sendResetPwdMail }