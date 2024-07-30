import React, { useEffect, useState } from 'react';
import './SentEmails.css';

const SentEmails = () => {
    const [emails, setEmails] = useState([]);
    const [editingEmail, setEditingEmail] = useState(null);
    const [updatedEmail, setUpdatedEmail] = useState({ to_email: '', subject: '', message: '' });

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await fetch('http://localhost:8081/sentemails');
                if (!response.ok) {
                    throw new Error('Failed to fetch emails');
                }
                const data = await response.json();
                setEmails(data.emails);
            } catch (error) {
                console.error('Error fetching emails:', error);
            }
        };

        fetchEmails();
    }, []);

    const handleEditClick = (email) => {
        setEditingEmail(email);
        setUpdatedEmail({ to_email: email.to_email, subject: email.subject, message: email.message });
    };

    const handleDeleteClick = async (emailId) => {
        try {
            const response = await fetch(`http://localhost:8081/deleteemail/${emailId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete email');
            }
            setEmails(emails.filter(email => email.id !== emailId));
        } catch (error) {
            console.error('Error deleting email:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8081/updateemail/${editingEmail.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEmail),
            });
            if (!response.ok) {
                throw new Error('Failed to update email');
            }
            const updatedEmails = emails.map(email =>
                email.id === editingEmail.id ? { ...email, ...updatedEmail } : email
            );
            setEmails(updatedEmails);
            setEditingEmail(null);
        } catch (error) {
            console.error('Error updating email:', error);
        }
    };

    return (
        <div className="sent-emails">
            <h2>Sent Emails</h2>
            {editingEmail && (
                <div className="edit-dialog">
                    <h3>Edit Email</h3>
                    <input
                        type="text"
                        placeholder="To"
                        value={updatedEmail.to_email}
                        onChange={(e) => setUpdatedEmail({ ...updatedEmail, to_email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Subject"
                        value={updatedEmail.subject}
                        onChange={(e) => setUpdatedEmail({ ...updatedEmail, subject: e.target.value })}
                    />
                    <textarea
                        placeholder="Message"
                        value={updatedEmail.message}
                        onChange={(e) => setUpdatedEmail({ ...updatedEmail, message: e.target.value })}
                    />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setEditingEmail(null)}>Cancel</button>
                </div>
            )}
            {emails.length > 0 ? (
                <ul>
                    {emails.map((email) => (
                        <li key={email.id}>
                            <div><strong>To:</strong> {email.to_email}</div>
                            <div><strong>Subject:</strong> {email.subject}</div>
                            <div><strong>Message:</strong> {email.message}</div>
                            <button onClick={() => handleEditClick(email)}>Edit</button>
                            <button onClick={() => handleDeleteClick(email.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No sent emails found.</p>
            )}
        </div>
    );
};

export default SentEmails;
