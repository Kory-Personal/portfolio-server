const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const axios = require('axios');
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

router.get('/verify', emailVerify);
router.post('/send', sendEmail);

async function sendEmail(req, res) {
  try {
    console.log(req.body);
    let { name, email, number, message } = req.body;
    let content = `name: ${name} \n email: ${email} \n number: ${number} \n message: ${message}`;

    let mail = {
      from: name,
      to: process.env.EMAIL,
      subject: 'New Contact from ' + name,
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

async function emailVerify(req, res) {
  try {
    console.log(req.query)
    const emailAddress = req.query.email;
    const API_KEY = process.env.REAL_EMAIL_API
    const API_URL = process.env.REAL_EMAIL_URL
    console.log({ emailAddress })
    const results = await axios(
      {
      method: 'get',
      url: `${API_URL}?email=${emailAddress}`,
      crossDomain: true,
      headers: {
          Authorization: `Bearer ${API_KEY}`
      }
      })
    console.log(results.data);
    if (results.data.status === 'valid') {
      res.status(200).send(results.data.status);
    } else {
      res.status(500).send(results.data.status);
    }
  } catch (e) {console.error(e)}
    
}

module.exports = router;