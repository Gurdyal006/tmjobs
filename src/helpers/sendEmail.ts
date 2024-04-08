// import nodemailer from "nodemailer";

// export const sendEmail = async ({ to, subject, text, html }: any) => {
//   try {
//     const transporter = await nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       auth: {
//         user: process.env.auth_user,
//         pass: process.env.password,
//       },
//     });

//     await transporter.sendMail({
//       from: "goldieytesting4218@gmail.com",
//       to: to,
//       subject,
//       text,
//       html,
//     });
//   } catch (error) {
//     console.log(error, "mail err");

//     return error;
//   }
// };
