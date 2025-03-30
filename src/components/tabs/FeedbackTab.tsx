
import React, { useState } from 'react';

const FeedbackTab = () => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Feedback submitted! (This is just a simulation)');
    setFeedback('');
    setEmail('');
    setSubject('');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="win98-inset p-2 mb-2">
        <div className="text-xs mb-3">
          <p className="mb-2">Your feedback is important to us! Let us know how we can improve Napster.</p>
          <p>Please fill out the form below to submit your feedback to the Napster team.</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-xs mb-1">Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#808080] bg-white px-1 py-0.5 text-xs"
            />
          </div>
          
          <div className="mb-2">
            <label className="block text-xs mb-1">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-[#808080] bg-white px-1 py-0.5 text-xs"
            />
          </div>
          
          <div className="mb-2">
            <label className="block text-xs mb-1">Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border border-[#808080] bg-white px-1 py-0.5 text-xs h-24"
            />
          </div>
          
          <div className="flex justify-end">
            <button type="submit" className="win98-button">
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackTab;
