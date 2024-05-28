

import React, { useEffect, useState } from 'react';
import './Gemini.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CiChat1 } from 'react-icons/ci';
import Sidebar from './Sidebar';
import { KeyData } from '../ENDPOINTS/EndPoint';
import { FaArrowCircleRight } from "react-icons/fa";
import { GiArtificialHive } from "react-icons/gi";
function Gemini() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('Untitled');
  const [loader,setLoader]=useState(false)

  const questions = {
    q1: 'What is SCMXpert?',
    q2: 'What Problems SCMXpert Solves?'
  }
  const genAI = new GoogleGenerativeAI(
    KeyData.gemini_api_key
  );
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const generateTitle = async (title) => {
    if (title) {
      // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      // const result = await model.generateContent(`Generate a concise title for ${title} in 10 characters. If the title is empty, label it as 'Untitled'.`);
      // const response = result.response;
      // const text = response.text();
      // setTitle(text)
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
       const result = await model.generateContent(`Generate a concise title for ${title} in 10 characters. If the title is empty, label it as 'Untitled'.`);
       const response = result.response;
      const text = response.text();
      setTitle(text)
      }
      catch (error) {
    console.log("something went wrong")
        setLoader(false)
      }
    }
    else {
      alert("I am ")
      setTitle('Untitled')

    }
  
  }
  useEffect(() => {
   
    generateTitle(title);
  
  }, [])

  const handleSuggestedQuestionClick = (question) => {
    setInputValue(question); // Set the clicked question as the input value
  };

  const handleSendMessage = async (inputValue) => {
    setLoader(true);
    if (inputValue.trim() !== '') {
  

      const newMessage = {
        text: inputValue.trim(),
        sender: 'user',
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');

      let prompt = inputValue;
      if (inputValue === questions.q1 || inputValue === questions.q2) {
        prompt += ' Tell in 40 words';
      }

      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        console.log("Model",genAI)
        const result = await model.generateContent(`${prompt}`);

        const response =  result.response;
        const text =  response.text();
        setMessages([
          ...messages,
          newMessage,
          { text: text, sender: 'bot', timestamp: new Date().toLocaleString() },
        ]);
        setLoader(false)
        generateTitle(text);
      }
      catch (error) {
        setMessages([
          ...messages,
          newMessage,
          { text: "Something Went Wrong", sender: 'bot', timestamp: new Date().toLocaleString() },
        ]);
        setLoader(false)
      }
    }
  };
  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage(inputValue)
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleDeleteOption = () => {
   
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setTitle(title);
   
    setShowModal(false); // Close the modal
  };
  const [options, setOptions] = useState([
    { value: title, label: 'Title' },
    { value: '1', label: 'Delete' }
  ]);

  const handleChangeOption = () => {
    // Change the label of the 'Delete' option
    setOptions(options.map(option => {
      if (option.value === '1') {
        return { ...option, label: 'Changed' }; // Change the label to 'Changed'
      }
      return option;
    }));
  };

  return (
    <div style={{ overflowX: "hidden", overflowY: 'auto', background: "#E4E9F7", height: "100%" }} className='gemini'>



      <div style={{ height: '100%' }}>
        <Sidebar />
        <div className='chat-messages' >
        <select
  className="form-select bg-transparent"
  aria-label="Default select example"
  style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
  onChange={(e) => {
    if (e.target.value === "1") {
      handleDeleteOption();
  
    }
  }}
>
  <option value="title">{title}</option>
  {title !== "Untitled" && <option value="1">Delete</option>}
</select>


{messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}>
            <div className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}>{message.timestamp}</div>
        
            <div className="message-text">{message.text}</div>
          </div>
        ))}
{loader && (
          <div className="loaderforgemini">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )} {/* Loader element */}
     
        </div>
        {showModal && (
        <div
          class="modal fade show"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div class="modal-dialog modal-dialog-centered" role="document" >
          <div className="modal-content" style={{ backgroundColor: 'rgba(228, 233, 247, 0.8)', backdropFilter: 'blur(5px)' }}>
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Delete Chat
                </h5>
               
              </div>
              <div class="modal-body">Are you sure you want to delete this chat?</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleCloseModal}
                >
                  No
                </button>
                <button type="button" class="btn btn-primary" onClick={()=>{
                    setMessages([]);
                    setTitle('Untitled');
                    setShowModal(false)
                }}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


        <div className='chat-input-message'>
          <div className="chat-input">
            <input
        
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask Me Something You Want"
              className="input-field"
              onKeyDown={handleEnterKeyPress}
            />

            {inputValue ? (
             <FaArrowCircleRight 
             size={25} 
             onClick={() => handleSendMessage(inputValue)} 
             style={{ marginLeft: '10px', cursor: 'pointer' }} 
           />
           
            ) : (
              <FaArrowCircleRight size={25} style={{ marginLeft: '10px', color: 'gray', cursor: 'not-allowed' }} />
            )}
          </div>

          {messages.length === 0 ? (
  <div className="suggested-questions" style={{ position: 'fixed', bottom: 50, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className='row d-flex justify-content-center align-items-center'>
      <div className='col-sm-6'>
        <ul className="suggested-list" style={{ listStyle: 'none', padding: 20 }}>
          <li className="suggested-item"  onClick={() => handleSendMessage("What is SCMXpert?")}>What is SCMXpert?</li>
        </ul>
      </div>
      <div className='col-sm-6'>
        <ul className="suggested-list" style={{ listStyle: 'none', padding: 20 }}>
          <li className="suggested-item"  onClick={() => handleSendMessage("What challenges does SCMXpert solve?")}>
What challenges does SCMXpert solve?</li>
        </ul>
      </div>
    </div>
  </div>
) : null}



        </div>

      </div>
    </div>

  );
}


export default Gemini;