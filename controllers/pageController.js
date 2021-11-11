//Imports
const nodemailer = require('nodemailer');
const Course = require('../models/Course');
const User = require('../models/User');

//Gets Index page, which is home page
exports.getIndexPage = async (req, res) => {

  const courses = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.countDocuments({role: 'student'});
  const totalTeachers = await User.countDocuments({role: 'teacher'});


  res.status(200).render('index', {
    page_name: 'index',
    courses,
    totalCourses,
    totalStudents,
    totalTeachers
  });
};

//Gets About page
exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

//Gets Register page
exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage  = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login'
  })
}

//Gets Contact page
exports.getContactPage  = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact'
  })
}

//Sends email
exports.sendEmail = async (req, res) => {

  try {
    
  const outputMessage = `
      <h1> Mail Details </h1>
      <ul>
        <li> Name: ${req.body.name} </li>
        <li> Email: ${req.body.email} </li>
      </ul>
      <h1> Message </h1>
      <p> ${req.body.message} </p>  
      `
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "alparslan007.aa@gmail.com", // gmail account
      pass: "kmptrhvccybywnyy", // gmail password
    },
    tls: {
      rejectUnauthorized: false
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Smart Edu Contact Form" <alparslan007.aa@gmail.com>', // sender address
    to: "shafiqullahturkmen@gmail.com", // list of receivers
    subject: "Smart Edu Contact Form New Message ✔", // Subject line
    html: outputMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  req.flash('success', 'We Received your message successfully')

  res.status(200).redirect('/contact'); 

  } catch (error) {
    req.flash('error', `Something Wrong Happend!`);
    console.log(error);
    res.status(200).redirect('/contact');
  }


}