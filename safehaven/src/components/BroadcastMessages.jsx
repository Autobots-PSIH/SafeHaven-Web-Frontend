import React, { useEffect, useState } from 'react';
import '../Stylesheets/BroadcastMessages.css'; 
import axios from "axios";

function BroadcastMessages(props) {
  const [expanded, setExpanded] = useState([]);
  const [messageType, setMessageType] = useState('Broadcast'); 
  const [message, setMessage] = useState('');
  const [messagesData, setMessagesData] = useState([]); // Initialize messagesData as an empty array

  const toggleExpansion = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };
  const fetchData = async () => {
    axios.get(
       "https://disastro-temp-production.up.railway.app/api/shelter/get-broadcasts/",
       config
     ).then((response)=>{setMessagesData(response.data.data); console.log(response.data)}).catch((err)=>{
       console.log(err.message)
     })

     
   
 };
  const handleMessageTypeChange = (event) => {
    setMessageType(event.target.value);
  };

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1MjI1Y2U3LTRiZjEtNGZiNy04MzViLTA4ZjQwNjkyZWExNSIsImV4cCI6MTcyNjcyNDczMX0.fFWWSaFT7UojEKzE9z7cSQBFh1mJikIBdhrVCQO7oXw";
 // props.accessToken;
   const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    

    fetchData();
  }, []);

  const handleSendClick = async (e) => {
    e.preventDefault(); 
    const requestData = {
      message: message,
    };
  
    axios.post(
      "https://disastro-temp-production.up.railway.app/api/shelter/broadcast/",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log(response);
      fetchData();
      setMessage('');
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <div className='container'>
       <h2 style={{margin:'25px', fontWeight:'bold'}}>Broadcast Messages</h2> 
      {messagesData.length===0?(<><div  style={{margin:'25px'}}>Loading...</div></>):(<><div className="broadcast-messages">      
        {messagesData.map((item, index) => (
          <div key={index} className={`card ${expanded[index] ? 'expanded' : ''}`}>
            <p className={`message-text ${expanded[index] ? 'expanded' : ''}`}>
              {item.message.length > 100 ? (
                <>
                  {expanded[index] ? item.message : `${item.message.slice(0, 100)}...`}
                  <button className="read-more-button" onClick={() => toggleExpansion(index)}>
                    {expanded[index] ? 'Read Less' : 'Read More'}
                  </button>
                </>
              ) : (
                item.message
              )}
            </p>
          </div>
        ))}
      </div></>)}
      
    
      <form className='Message-Form'>
        <textarea className='Broadcast-TextArea' placeholder='Write a Message' onChange={e => setMessage(e.target.value)}></textarea>
        <hr style={{border:'1px solid #d3d2d2'}}></hr>
        <div className="Send-Message-toolbar">
          <select className="message-type-dropdown" value={messageType} onChange={handleMessageTypeChange}>
            <option value="Broadcast">Broadcast</option>
            <option value="Send to Taluk">Send to Taluka</option>
          </select>
          <button className="send-button" onClick={handleSendClick}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default BroadcastMessages;
