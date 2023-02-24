/***
 *  
 *
 */

//depedencies
require('dotenv').config();
const nodemailer = require("nodemailer");

async function main(formData) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `${formData.email} <sohag8455@gmail.com>`,
    to: "sohag15-13845@diu.edu.bd",
    subject: `${formData.subject}`,
    text: `${formData.message}`,
    html: `<p>${formData.message}</p>
    <p>from<br>${formData.name}<br>${formData.email}</p>
            `,
  });
}

module.exports = main;
