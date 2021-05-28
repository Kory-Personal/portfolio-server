const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

const transport = {
  host: 'smtp.gmail.com',//grab smtp host of gmail
  port: 587 || 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  }
}

console.log(transport)

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages.')
  }
})

router.post('/send', sendEmail);

async function sendEmail(req, res) {
  try {
    console.log(req.body);
    let { name, email, message } = req.body;
    let content = `name: ${name} \n email: ${email} \n message: ${message}`;

    let mail = {
      from: name,
      to: process.env.EMAIL,
      subject: 'New Message from Portfolio Contact',
      text: content
    }

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
          status: 'success'
        })
      }
    })
  } catch (e) {console.error(e)}
}

module.exports = router;