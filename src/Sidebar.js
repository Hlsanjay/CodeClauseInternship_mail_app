import React, { useState } from 'react';
import ComposeDialog from './ComposeDialog';
import SentEmails from './SentEmails';
import './Sidebar.css';

const Sidebar = () => {
    const [activeView, setActiveView] = useState(null); // null, 'compose', or 'sent'

    const handleComposeClick = () => {
        setActiveView('compose');
    };

    const handleSentClick = () => {
        setActiveView('sent');
    };

    const handleCloseComposeDialog = () => {
        setActiveView(null); // Close the dialog
    };

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r4.png" alt="Gmail Logo" />
            </div>
            <button className="sidebar__compose" onClick={handleComposeClick}>Compose</button>
            <div className="sidebar__options">
                <div className="sidebar__option">Inbox</div>
                <div className="sidebar__option">Starred</div>
                <div className="sidebar__option">Snoozed</div>
                <div className="sidebar__option" onClick={handleSentClick}>Sent</div>
                <div className="sidebar__option">Drafts</div>
                <div className="sidebar__option">More</div>
            </div>
            {activeView === 'compose' && (
                <ComposeDialog 
                    isOpen={activeView === 'compose'} 
                    onClose={handleCloseComposeDialog} 
                />
            )}
            {activeView === 'sent' && <SentEmails />}
        </div>
    );
};

export default Sidebar;
