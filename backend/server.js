const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to the database');
});

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { FirstName, LastName, email, password } = req.body;
    const sql = "INSERT INTO users (FirstName, LastName, email, password) VALUES (?, ?, ?, ?)";
    const values = [FirstName, LastName, email, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Signup error:', err);
            return res.json({ success: false, message: "Error occurred while signing up" });
        }
        console.log("Inserted:", result);
        return res.json({ success: true, message: "Signed up successfully" });
    });
});

// Signin endpoint
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email=? AND password=?";
    const values = [email, password];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error occurred:', err);
            return res.status(500).json({ success: false, message: 'An error occurred while processing your request.' });
        }
        
        if (data.length > 0) {
            return res.json({ success: true, message: 'Signin successful' });
        } else {
            return res.json({ success: false, message: 'Incorrect email or password' });
        }
    });
});

// Endpoint for sending emails
app.post('/sendemail', async (req, res) => {
    const { to, subject, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        
        const sql = "INSERT INTO emails (to_email, subject, message) VALUES (?, ?, ?)";
        const values = [to, subject, message];
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error storing email:', err);
                return res.status(500).json({ success: false, message: 'Failed to store email.' });
            }
            console.log('Email stored successfully.');
            return res.status(200).json({ success: true, message: 'Email sent and stored successfully.' });
        });

    } catch (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});

// Get all sent emails
app.get('/sentemails', (req, res) => {
    const sql = "SELECT id, to_email, subject, message FROM emails";

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching emails:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch emails.' });
        }
        return res.status(200).json({ success: true, emails: results });
    });
});

// Endpoint for updating an email
app.put('/updateemail/:id', (req, res) => {
    const { id } = req.params;
    const { to_email, subject, message } = req.body;
    const sql = "UPDATE emails SET to_email=?, subject=?, message=? WHERE id=?";
    const values = [to_email, subject, message, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating email:', err);
            return res.status(500).json({ success: false, message: 'Failed to update email.' });
        }
        console.log('Email updated successfully.');
        return res.status(200).json({ success: true, message: 'Email updated successfully.' });
    });
});

// Endpoint for deleting an email
app.delete('/deleteemail/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM emails WHERE id=?";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting email:', err);
            return res.status(500).json({ success: false, message: 'Failed to delete email.' });
        }
        console.log('Email deleted successfully.');
        return res.status(200).json({ success: true, message: 'Email deleted successfully.' });
    });
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
