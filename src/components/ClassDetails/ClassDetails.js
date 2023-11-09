import React, { useState } from 'react'
import {BiSolidUserCircle} from 'react-icons/bi'
import firebase from 'firebase'
import { useContextAPI } from '../../context/Context'
import db, { storage } from '../../library/firebase'
import Announce from '../Announcement/Announce'
import Topics from './Topics'
import { Route, Switch } from 'react-router-dom'
import { BsFileEarmarkText } from 'react-icons/bs'
import { BiFullscreen } from 'react-icons/bi'
import { FaRegCopy } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClassDetails = ({detailData,classData}) => {

    console.log(detailData)
    const [inputClick, setInputClick ] = useState(false)
    const [value, setValue ] = useState('')

    const [ invitationDisplay, setInvitationDisplay ] = useState(false)

    const [selectedFile, setSelectedFile] = useState(null);
    const { loginMail,loginUser,classworks, setClassworks } = useContextAPI()

    const location = useLocation();
    
    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleInvitationLink(e){
        navigator.clipboard.writeText(location.pathname)
        toast("pathname copied to clipboard!");
    }

    const handlePostBtn = (e) => {
        e.preventDefault();
        
        const uploadImage = storage.ref(`images/${selectedFile.name}`).put(selectedFile);
    
        uploadImage.on("state_changed", () => {
          storage
            .ref("images")
            .child(selectedFile.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("announcments")
                .doc("classes")
                .collection(detailData.id)
                .add({
                  timstamp: firebase.firestore.FieldValue.serverTimestamp(),
                  imageUrl: url,
                  text: value,
                  sender: loginMail,
                });
            });
        });
        if(value && selectedFile){
            setInputClick(false)
            setValue('')
            setSelectedFile(null)
        }
    };

    let works = []
    for(let i=1; i<=classworks.length; i+=3){
      works.push(classworks[i])
    }

  return (
    <div>
    <div key={detailData.id} className='ClassDetails'>
        <Switch>
            <Route path={`/${detailData.id}`}>
              <Topics detailData={detailData} />
            </Route>
        </Switch>
        {/* <Topics /> */}

        <div className='detail-header'>
           <p className='class-name'>
            Class Name: {detailData.className}
            </p> 
           <p className='section'>
            Section: {detailData.section}
            </p> 
        </div> 

        <div className='detail-main'>
            <div className='detail-main-left'>
                <div className='class-id-section'>
                    <p className='id-title'>
                        Class code
                    </p>
                    <p className='code'>
                        {detailData.id}
                    </p>
                    <div 
                        className='zoom--icon'
                        onClick={() => setInvitationDisplay(true)}
                    >
                        <BiFullscreen className='icon zoom-icon' />
                    </div>
                </div>

                <>
                <div className={`overlay ${invitationDisplay ? 'display' : ""}`}> </div>
                <ToastContainer />
                <div className={`invitatin-popup ${invitationDisplay ? 'disp' : ''}`}>
                    <p className='code'>
                        {detailData.id}
                    </p>
                    <div className='bottom-section'>
                       <p className='class-name'>
                            Class Name: {detailData.className}
                       </p>
                       <div 
                            className='copy-link'
                            onClick={handleInvitationLink}
                       >
                           <FaRegCopy className='icon' />
                           <span>Copy invitation link</span>
                       </div>
                    </div>
                    <div 
                        className='zoom--icon close-join-class'
                        onClick={() => setInvitationDisplay(false)}
                    >
                        <RxCross2 className='icon' />
                    </div>
                </div>
                </>

                <div className='upcomming-section'>
                    <p className='upcomming-title'>
                        Upcomming
                    </p>
                    <p className='due-title'>
                        No work due in soon
                    </p>
                </div>
            </div>
            <div className='detail-main-right'>
                <form className='input-section' onSubmit={handleSubmit}>
                    <div 
                        className={`input-dataa ${inputClick ? 'expand' : ''}`}
                        onClick={() => 
                            setInputClick(true)
                        }
                    >
                        {/* {!inputClick && <BiSolidUserCircle 
                            className='icon icon-in-detail' 
                        />} */}
                        {!inputClick && 
                        <img src={loginUser.photoURL}
                            className='icon icon-in-detail' 
                        />}
                        <input
                            type="text"
                            // onChange={handleChange}
                            autoComplete="off"
                            onChange={(e) => setValue(e.target.value)}
                            name="class_name"
                            value={value}
                            required
                            className={`${inputClick ? 'change' : ''}`}
                        />
                       <div className="underline"></div>
                       <label 
                          htmlFor=""
                          className={`${inputClick ? 'up' : ''}`}
                        >
                          Announce something to your class
                       </label>
                    </div>
                    { inputClick &&
                    <div className='bottom-section'>
                        <input
                            type="file"
                            // value={selectedFile}
                            onChange={(e) =>{
                                if(e.target.files[0]){
                                    setSelectedFile(e.target.files[0])
                                }
                            }}
                        />
                        <div className='btns-container'>
                            <button 
                               className='cancel-btn'
                               onClick={() => setInputClick(false)}
                            >
                               Cancel
                            </button>
                            <button 
                               className='post-btn'
                               onClick={handlePostBtn}
                               disabled={value === ''}
                            >
                               Post
                            </button>
                        </div>
                    </div> }
                </form>
                <Announce detailData={detailData} />
                <div className='cont-announcement'>
                    { works.map((work) => {
                        return (
                            <div className='cont-announce'>
                                <div className='iconic'>
                                    <BsFileEarmarkText className='icon' />
                                </div>
                                <div>
                                    <span>{loginUser.displayName}</span> posted a new assignment : {work.text}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ClassDetails