import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
});

export async function sendEmail({ to, subject, html, from }) {
	return transporter.sendMail({
		from: from || process.env.SMTP_FROM,
		to,
		subject,
		html,
	});
}
