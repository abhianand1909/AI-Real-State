import React, { useState } from 'react';
import '../css/ChatInput.css';

const ChatInput = ({ onSubmit }) => {
    const [question, setQuestion] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (question.trim()) {
            onSubmit(question);
            setQuestion("");
        }
    };

    return (
        <div className="chat-input-container">
            <form onSubmit={handleSubmit} className="chat-input-form">
                <div className="input-wrapper">
                    <div className={`input-group ${isFocused ? 'focused' : ''}`}>
                        <input 
                            type="text"
                            className="chat-input"
                            placeholder="Enter Area Name or Coordinates"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <button 
                            type="submit" 
                            className="submit-button"
                            disabled={!question.trim()}
                        >
                            <span className="button-text">Submit</span>
                            <span className="button-icon">→</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChatInput;