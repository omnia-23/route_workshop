import { createTransport } from "nodemailer";

export const sendMail = async (userMail, temp) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "omniakhaled239@gmail.com",
      pass: "hzdt xxke vrbf ucuy",
    },
  });

  const info = await transporter.sendMail({
    from: "route : confirm email", // sender address
    to: userMail,
    subject: "confirm email", // Subject line
    html: temp,
  });

  console.log("Message sent: %s", info);
  return info.rejected.length ? false : true;
};
