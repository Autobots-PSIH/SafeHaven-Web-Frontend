import React, { useEffect, useState } from 'react';
import '../Stylesheets/BroadcastMessages.css'; 
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import Switch from '@mui/material/Switch';
import { ToastContainer, toast } from 'react-toastify';

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

  const handleMessageTypeChange = (event) => {
    setMessageType(event.target.value);
  };

  const token = props.accessToken;
   const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchData = async () => {
    axios.get(
       "https://disastro-temp-production.up.railway.app/api/shelter/get-broadcasts/",
       config
     ).then((response)=>{setMessagesData(response.data.data); console.log(response.data)}).catch((err)=>{
       console.log(err.message)
     })
 };
  useEffect(() => {
    

    fetchData();
  }, []);

  const handleSendClick = async (e) => {
    e.preventDefault(); 
    setMessage('');
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
      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };
  
  const accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1MjI1Y2U3LTRiZjEtNGZiNy04MzViLTA4ZjQwNjkyZWExNSIsImV4cCI6MTcyNjc0NDA2MX0.8wXNkU2WAQadykMJWV1vySwbo_CsaZxqtSLBYJAxiHg";
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch the admin status when the component mounts
    axios
      .get("https://disastro-temp-production.up.railway.app/api/shelter/get-admin/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response)
        if (response.status === 200 && response.data.status === true) {
          setIsAdmin(true);
        }
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching admin status:", error);
      });
  }, []);
  
  const handleSwitchChange = () => {
    // Toggle the admin status
    const newAdminStatus = !isAdmin;
    setIsAdmin(newAdminStatus); 
    axios
      .put(
        "https://disastro-temp-production.up.railway.app/api/shelter/admin-update/",
        {
          disaster_status: newAdminStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200 && newAdminStatus === true) {
          // Show a success toast message
          toast.error("Disaster enabled", {
            position: 'top-right',
            autoClose: 3000, // Close the toast after 3 seconds
          });
        } else {
          // Show a success toast message
          toast.success("Disaster disabled", {
            position: "top-right",
            autoClose: 3000, // Close the toast after 3 seconds
          });
        }
       // Update the switch state based on the response
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error updating admin status:", error);
      });
  };
  const label = { inputProps: { 'aria-label': 'Disaster?' } };

  return (
    <div className='container'>
   <div className="broadcast-container">
        <div className="broadcast-header">
          <h2 style={{ fontWeight: 'bold' }}>Broadcast Messages</h2>
        </div>
        <div className="broadcast-content">
        {!isAdmin?
          (<div className="switch-container" >
            <p style={{padding:'10px'}}>Disaster Alert</p>
            <Switch
              {...label}
              onChange={handleSwitchChange}
              color="default"
              title="Enable Disaster?"
              checked={isAdmin}
            />
            </div>):(<div className="switch-containerred" >
            <p style={{padding:'10px'}}>Disaster Alert</p>
            <Switch
              {...label}
              onChange={handleSwitchChange}
              color="default"
              title="Disable Disaster?"
              checked={isAdmin}
            />
            </div>)}
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
        <textarea className='Broadcast-TextArea' placeholder='Write a Message' onChange={e => setMessage(e.target.value) } value={message}></textarea>
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
      </div>
      <div className="toast-container">
        <ToastContainer position="center" />
      </div>
    </div>
  );
}

export default BroadcastMessages;
