import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    }
});

export const registerUserMailTemplate = `
<div>
<h1> Dear {{username}} </h1>
<p> A new account has been created for you! </p>
<h2> Thank you! </h2>
`