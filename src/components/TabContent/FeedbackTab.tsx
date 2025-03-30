
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { toast } from "@/utils/toast";

const FeedbackTab = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  
  const handleSubmitFeedback = () => {
    if (name && email && feedback) {
      toast.success('Feedback submitted successfully!');
      setName('');
      setEmail('');
      setFeedback('');
    } else {
      toast.error('Please fill out all fields');
    }
  };

  return (
    <div className="h-[340px] flex flex-col">
      <div className="flex-grow win98-inset bg-white overflow-auto p-4">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Send Feedback to Napster</h2>
          <p className="text-sm mb-4">
            Your feedback helps us improve Napster. Please let us know if you have any suggestions,
            bug reports, or feature requests.
          </p>
          
          <div className="mb-3">
            <label className="block mb-1">Your Name:</label>
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="mb-3">
            <label className="block mb-1">Email Address:</label>
            <Input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="mb-3">
            <label className="block mb-1">Feedback:</label>
            <textarea 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-24 border border-napsterDarkGray p-2"
            />
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-between">
        <button 
          className="win98-button"
          onClick={handleSubmitFeedback}
        >
          Submit Feedback
        </button>
        <button 
          className="win98-button"
          onClick={() => {
            setName('');
            setEmail('');
            setFeedback('');
            toast.info('Form cleared');
          }}
        >
          Clear Form
        </button>
      </div>
    </div>
  );
};

export default FeedbackTab;
