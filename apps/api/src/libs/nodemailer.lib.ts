import { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } from '@/config';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import nodemailer from 'nodemailer';
import { join } from 'path';
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
});

export const sendVerificationEmail = (
  to: string,
  data: {
    email: string;
    verification_url: string;
  },
) => {
  const templatePath = join(__dirname, '/../templates/', 'verification.hbs');
  const templateSource = readFileSync(templatePath, 'utf-8');
  const compiledTemplate = compile(templateSource);
  const html = compiledTemplate(data);
  const mailOptions: nodemailer.SendMailOptions = {
    to,
    subject: 'Please verify your account',
    html,
  };
  return transporter.sendMail(mailOptions);
};
export const sendForgetPasswordEmail = (
  to: string,
  data: {
    email: string;
    forgetPasswordUrl: string;
  },
) => {
  const templatePath = join(__dirname, '/../templates/', 'forgetPassword.hbs');
  const templateSource = readFileSync(templatePath, 'utf-8');
  const compiledTemplate = compile(templateSource);
  const html = compiledTemplate(data);
  const mailOptions: nodemailer.SendMailOptions = {
    to,
    subject: 'Requested forget password',
    html,
  };
  return transporter.sendMail(mailOptions);
};
export const sendCancelOrderEmail = (
  to: string,
  data: {
    email: string;
    invoice: string;
    userName: string;
    propertiName: string;
    address: string;
  },
) => {
  const templatePath = join(__dirname, '/../templates/', 'forgetPassword.hbs');
  const templateSource = readFileSync(templatePath, 'utf-8');
  const compiledTemplate = compile(templateSource);
  const html = compiledTemplate(data);
  const mailOptions: nodemailer.SendMailOptions = {
    to,
    subject: `Pembatalan Order ${data.invoice}`,
    html,
  };
  return transporter.sendMail(mailOptions);
};
