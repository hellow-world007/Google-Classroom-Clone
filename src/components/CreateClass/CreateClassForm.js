import React, { useState } from 'react'
import { useContextAPI } from '../../context/Context'
import { nanoid } from 'nanoid'
import db from '../../library/firebase'

const CreateClassForm = ({setShowForm}) => {

    const { createClassDisplay, setCreateClassDisplay,loginMail } = useContextAPI()
    const [formData, setFormData] = useState(
        {
            class_name: "", 
            section: "", 
            subject: "",
            room: ""
        }
    )
    
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

    function addClass(e){
        e.preventDefault();
        const id = nanoid()
        
        db.collection('createdClasses')
           .doc(loginMail)
           .collection('classes')
           .doc(id)
           .set({
            owner: loginMail,
            className: formData.class_name,
            section: formData.section,
            room: formData.room,
            id: id,
        })
        .then(() => {
            setCreateClassDisplay(false);
            setShowForm(false)
        })
        //db.collection(<parent-collection>).doc(<doc-id>).collection(<child-collection>)
    }

  return (
    <div className="Form">
       <p className="form-title">
         Create class
       </p>
       <form onSubmit={handleSubmit}>
            <div className="input-data">
                <input
                    type="text"
                    onChange={handleChange}
                    name="class_name"
                    value={formData.class_name}
                    required
                />
               <div className="underline"></div>
               <label htmlFor="">Class name</label>
            </div>
            <div className="input-data">
                <input
                    type="text"
                    onChange={handleChange}
                    name="section"
                    value={formData.section}
                    required
                />
                <div className="underline"></div>
                <label htmlFor="">Section</label>
            </div>
            <div className="input-data">
                <input
                    type="text"
                    onChange={handleChange}
                    name="subject"
                    value={formData.subject}
                    required
                />
                <div className="underline"></div>
                <label htmlFor="">Subject</label>
            </div>
            <div className="input-data">
                <input
                    type="text"
                    onChange={handleChange}
                    name="room"
                    value={formData.room}
                    required
                />
                <div className="underline"></div>
                <label htmlFor="">Room</label>
            </div>
        </form>
        <div className="btn-container">
            <button
                className='btn btn1'
                onClick={() => {
                    setCreateClassDisplay(false)
                    setShowForm(false)
                }}
            >
               Cancel
            </button>
            <button
                className='btn'
                onClick={addClass}
                disabled={!formData.class_name}
            >
               Create
            </button>
        </div>
    </div>
  )
}

export default CreateClassForm