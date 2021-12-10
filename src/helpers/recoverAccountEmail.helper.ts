import nodemailer from 'nodemailer';

export default async (email: string, password: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_MAIL,
      pass: process.env.EMAIL_PASS
    }
  });
  await transporter.sendMail({
    from: `Eva.io <${process.env.EMAIL_MAIL}>`,
    to: email,
    subject: `Eva.io | Restablecer cuenta`,
    html: `La nueva contraseña de tu cuenta es: <span style="font-weigth: bold;">${password}</span>`
  });
  return;
};