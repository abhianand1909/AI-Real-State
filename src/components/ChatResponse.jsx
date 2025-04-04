import React from "react";
import "../css/ChatResponse.css";

const ChatResponse = ({ response }) => {
    if (!response || !response.candidates) {
        return (
            <div className="error-container">
                <div className="error-icon">❌</div>
                <p className="error-message">No response received. Try again.</p>
            </div>
        );
    }

    const { candidates, usageMetadata } = response;

    // Function to format the response text into sections
    const formatResponseText = (text) => {
        // Split text into sections based on common delimiters
        const sections = text.split(/(?=\n\n|##|###|#)/);
        
        return sections.map((section, index) => {
            // Check if section is a heading
            if (section.startsWith('##') || section.startsWith('###') || section.startsWith('#')) {
                const level = section.startsWith('###') ? 3 : 2;
                const content = section.replace(/^#+\s*/, '');
                return (
                    <div key={index} className={`response-section ${level === 3 ? 'sub-section' : 'main-section'}`}>
                        <h4 className="section-title">{content}</h4>
                    </div>
                );
            }
            // Regular content
            return (
                <div key={index} className="response-content">
                    <p>{section.trim()}</p>
                </div>
            );
        });
    };

    return (
        <div className="chat-response-container">
            <div className="response-header">
                <div className="ai-icon">🤖</div>
                <h3>AI Response</h3>
            </div>

            <div className="candidates-container">
                {candidates.map((candidate, index) => (
                    <div className="candidate-card" key={index}>
                        <div className="candidate-header">
                            <span className="candidate-number">Response {index + 1}</span>
                            <div className="card-divider"></div>
                        </div>
                        
                        <div className="candidate-content">
                            <div className="response-body">
                                {formatResponseText(candidate?.content?.parts[0]?.text || "No content available.")}
                            </div>

                            {candidate?.citationMetadata?.citationSources?.length > 0 && (
                                <div className="citations-section">
                                    <h4 className="citations-title">
                                        <span className="citation-icon">🔗</span>
                                        References
                                    </h4>
                                    <ul className="citations-list">
                                        {candidate.citationMetadata.citationSources.map((source, idx) => (
                                            <li key={idx} className="citation-item">
                                                <a 
                                                    href={source.uri} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="citation-link"
                                                >
                                                    {source.uri}
                                                </a>
                                                <span className="citation-index">
                                                    (Indexes: {source.startIndex} - {source.endIndex})
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {usageMetadata && (
                <div className="usage-metadata">
                    <div className="metadata-header">
                        <span className="metadata-icon">📊</span>
                        <h4>Usage Statistics</h4>
                    </div>
                    <div className="metadata-grid">
                        <div className="metadata-item">
                            <span className="item-label">Prompt Tokens</span>
                            <span className="item-value">{usageMetadata.promptTokenCount}</span>
                        </div>
                        <div className="metadata-item">
                            <span className="item-label">Response Tokens</span>
                            <span className="item-value">{usageMetadata.candidatesTokenCount}</span>
                        </div>
                        <div className="metadata-item">
                            <span className="item-label">Total Tokens</span>
                            <span className="item-value">{usageMetadata.totalTokenCount}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatResponse;
