import { publishNotification } from './publisher.js';
import userService from "../services/userService.js";

export async function sendSMS(number,message) {

    // const user = await userService.findUseById(req.user.id);
    // console.log(user);
        // Publish notification message
        const notification = {
            type: 'sms', 
            to: number,
            message: message
        };
        await publishNotification(notification);
return;
}

export async function sendEmail(email,message) {
    // Publish notification message
    const notification = {
        type: 'email',
        to: email,
        message: message
    };
    await publishNotification(notification);
return;
}

// export async function sendSMS(userId,message) {

//     const user = await userService.findUseById(userId);
//     // Publish notification message
//     const notification = {
//         type: 'sms', 
//         to: user.phone_no,
//         message: message
//     };
//     await publishNotification(notification);
// return;
// }