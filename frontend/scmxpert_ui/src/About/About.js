import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
function GeminiInReact() {
  const [inputValue, setInputValue] = useState('');
  const [promtResponses, setPromtResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAiVlCW7sO6fRI48f8ClCICjfQE9M4WXSc"
  );
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const getResponseForGivenPromt = async () => {
    try {
      setLoading(true)
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputValue);
      setInputValue('')
      const response = result.response;
      const text = response.text();
      console.log(text)
      setPromtResponses([...promtResponses,text]);
  
      setLoading(false)
    }
    catch (error) {
      console.log(error)
      console.log("Something Went Wrong");
      setLoading(false)
    }
  }
    ;

  return (
  <div className="container">
      <div className="row">
        <div className="col">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ask Me Something You Want"
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <button onClick={getResponseForGivenPromt} className="btn btn-primary">Send</button>
        </div>
      </div>
      {loading ? (
        <div className="text-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        promtResponses.map((promptResponse, index) => (
          <div key={index} className="promptMessages">
            <div className={`response-text ${index === promtResponses.length - 1 ? 'fw-bold' : ''}`}>{promptResponse}</div>
          </div>
        ))
      )}
    </div>
  
  );

}
export default GeminiInReact;