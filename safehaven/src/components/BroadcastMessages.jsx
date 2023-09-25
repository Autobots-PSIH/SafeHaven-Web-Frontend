import React, { useEffect, useState } from 'react';
import '../Stylesheets/BroadcastMessages.css'; 
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import Switch from '@mui/material/Switch';
import { ToastContainer, toast } from 'react-toastify';
import { faL } from '@fortawesome/free-solid-svg-icons';
import broadcast from '../images/Broadcast.svg'
import alertmessage from '../images/alert.svg'
import { Info, X } from 'lucide-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function BroadcastMessages(props) {
  const [expanded, setExpanded] = useState([]);
  const [messageType, setMessageType] = useState('Broadcast'); 
  const [message, setMessage] = useState('');
  const [messagesData, setMessagesData] = useState([]); // Initialize messagesData as an empty array
  const [mesfetch, setMesfetch]=useState(false);
  const [sendload,setSendLoad]= useState(false);
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
       "https://safehaven-backend-production.up.railway.app/api/shelter/get-broadcasts/",
       config
     ).then((response)=>{setMessagesData(response.data.data); console.log(response.data); setMesfetch(true)}).catch((err)=>{
       console.log(err.message)
       setMesfetch(true);
     })
 };
  useEffect(() => {
    

    fetchData();
  }, []);

  const handleSendClick = async (e) => {
    setSendLoad(true);
    e.preventDefault(); 
    
    const requestData = {
      message: message,
    };
  
    axios.post(
      "https://safehaven-backend-production.up.railway.app/api/shelter/broadcast/",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log(response);
      setMessage('');
      fetchData();
      setSendLoad(false);
      
    })
    .catch((error) => {
      console.error("Error:", error);
      setSendLoad(false);
      toast.error("Broadcast not Sent!!", {
        position: 'bottom-left',
        autoClose: 3000, // Close the toast after 3 seconds
      });
    });
  };
  
  const accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1MjI1Y2U3LTRiZjEtNGZiNy04MzViLTA4ZjQwNjkyZWExNSIsImV4cCI6MTcyNjc0NDA2MX0.8wXNkU2WAQadykMJWV1vySwbo_CsaZxqtSLBYJAxiHg";
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch the admin status when the component mounts
    axios
      .get("https://safehaven-backend-production.up.railway.app/api/shelter/get-admin/", {
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
        "https://safehaven-backend-production.up.railway.app/api/shelter/admin-update/",
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
        <div className="broadcast-header" style={{display:'inline-flex', marginTop:'1vh'}}>
        <img src={broadcast} style={{height:'16px',margin:'2px', marginRight: '4px'}}></img>
          <h2 style={{ fontWeight: 'bold' }}>Broadcast Messages</h2>
        </div>
        <div className="broadcast-content">
        {!isAdmin?
          (<>
          <div className="switch-container" style={{display:'inline-flex'}} >
            <img  style={{height:'20px', margin:'5px'}} src={alertmessage} alt='https://fontawesome.com/icons/light-emergency-on?f=classic&s=regular'></img>
            <p style={{padding:'10px'}}>Disaster Alert</p>
            <Switch
              {...label}
              onChange={handleSwitchChange}
              color="default"
              title="Enable Disaster?"
              checked={isAdmin}
            />
            </div>
            <div className="rounded-md border-l-4 border-black bg-gray-100 p-4" style={{width:'95%',margin:'10px'}}>
            <div className="flex items-center justify-between space-x-4">
              <div>
                <Info className="h-6 w-6" style={{color:'GrayText'}} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{color:'GrayText'}}>
                An alert broadcast will be sent to all users in your region upon activation of this toggle
                </p>
              </div>
            </div>
          </div></>):(<><div className="switch-containerred" style={{display:'inline-flex'}} >
            <img  style={{height:'20px', margin:'5px'}} src={alertmessage} ></img>
            <p style={{padding:'10px'}}>Disaster Alert</p>
            <Switch
              {...label}
              onChange={handleSwitchChange}
              color="default"
              title="Disable Disaster?"
              checked={isAdmin}
            />
            </div>
            <div className="rounded-md border-l-4 border-black bg-gray-100 p-4" style={{width:'95%',margin:'10px'}}>
            <div className="flex items-center justify-between space-x-4">
              <div>
                <Info className="h-6 w-6" style={{color:'GrayText'}} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{color:'GrayText'}}>
                An alert broadcast will be sent to all users in your region upon activation of this toggle
                </p>
              </div>
            </div>
          </div>
            </>)}
      {messagesData.length===0 ?(<><div  style={{margin:'25px'}}>{mesfetch===true?(<p>No Broadcast Messages</p>):(<FontAwesomeIcon style={{alignSelf:'center', height:'40px', marginLeft:'30%'}} icon={faSpinner} spin  />)} </div></>):(<><div className="broadcast-messages">      
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
        {sendload?(<FontAwesomeIcon style={{height:'40px', margin:'25%'}} icon={faSpinner} spin  />):(<>    
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
        </>  
        )}
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
