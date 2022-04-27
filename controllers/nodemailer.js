const nodemailer = require('nodemailer');

// let testEmailAccount = await nodemailer.createTestAccount()

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: false,
  auth: {
    user: 'servicesmpt3@gmail.com',
    pass: 'Gorod48.ru',
  },
});

const result = transporter.sendMail({
  from: '"Node js" <nodejs@example.com>',
  to: 'user@example.com, user@example.com',
  subject: 'Message from Node js',
  text: 'This message was sent from Node js server.',
  html:
    'This <i>message</i> was sent from <strong>Node js</strong> server.',
});

console.info(result);
