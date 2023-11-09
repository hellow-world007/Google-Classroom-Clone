import React, { useState } from 'react'
import { useContextAPI } from '../../context/Context'
import { RxCross2 } from 'react-icons/rx';
import { BiSolidUserCircle } from 'react-icons/bi';
import db from '../../library/firebase';

const JoinClass = () => {

  const { joinClassDisplay, setJoinClassDisplay,loginUser } = useContextAPI()

    const [formData, setFormData] = useState(
        {
            class_code: "", 
            owners_email: "",
        }
   )
   const [ error, setError ] = useState()
   const [ joinedData, setJoinedData ] = useState()
   const [ exists,setExists ] = useState(false)

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
    }

    function handleJoinClass(e){
        e.preventDefault()
        db.collection('createdClasses')
           .doc(formData.owners_email)
           .collection('classes')
           .doc(formData.class_code)
           .get().then((doc) => {
             if(doc.exists && doc.owner !== loginUser.email){
                setExists(true)
                setJoinedData(doc.data())
                setError(false)
             }else{
                setExists(false)
                setError(true)
             }
           })

        if(exists === true){
            db.collection('JoinedClasses')
              .doc(loginUser.email)
              .collection('classes')
              .doc(formData.class_code)
              .set({
                joinedData
              })
              .then(() => {
                setJoinClassDisplay(false)
                formData.class_code = ''
                formData.owners_email = ''
              })
        }
    }

  return (
    <div 
        className={`JoinClass ${joinClassDisplay ? 'display' : ""}`}
    >
        <div className="join-class-header">
            <div className="header-left">
                <RxCross2 
                   className='icon close-join-class'
                   onClick={() => setJoinClassDisplay(prev => !prev)}
                />
                <p className="label">
                    Join Class
                </p>
            </div>
            <button 
               className="header-right"
               disabled={!formData.class_code && error}
               onClick={handleJoinClass}
            >
                Join
            </button>
        </div>
        <div className="signed-in-section">
           <p className="current-sign-in-title">
              You are currently signed in as
           </p>
           <div className="account-section">
              <div className="account-wrapper">
                {/* <BiSolidUserCircle className='icon' /> */}
                <img 
                    src={loginUser.photoURL} 
                    className='icon img-icon img-icon-2' 
                />
                <div className="owner-title">
                    <p className="owner-name">{loginUser.displayName}</p>
                    <p className="owner-mail">
                      {loginUser.email}
                    </p>
                </div>
              </div>
              <button className="switch-account">
                 Switch account
              </button>
           </div>
        </div>

        <div className="class-code-section">
            <p className="class-code-title">
                Class Code
            </p>
            <p className='query'>Ask your teacher for the class code, then enter it here</p>
            <div className="input-container">
                <form onSubmit={handleSubmit}>
                    <div className="input-data">
                        <input
                            type="text"
                            onChange={handleChange}
                            name="class_code"
                            value={formData.class_code}
                            required
                        />
                        <div className="underline"></div>
                        <label style={{color:error && 'tomato'}}>Class Code</label>
                        {error && <p style={{color:'tomato',textAlign:'center'}}>no class was found</p>}
                    </div>
                    <div className="input-data">
                        <input
                            type="text"
                            onChange={handleChange}
                            name="owners_email"
                            value={formData.owners_email}
                            required
                        />
                        <div className="underline"></div>
                        <label htmlFor="">Owners Email</label>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default JoinClass