import React, { useState } from 'react'
import firebase from 'firebase';
import db, {storage} from '../../library/firebase';
import { useContextAPI } from '../../context/Context'
import { RxCross2 } from 'react-icons/rx';

const ClassworkForm = ({detailData}) => {

    const { classworkDisplay, setClassworkDisplay,loginMail,loginUser } = useContextAPI()
  
    const [selectedFile, setSelectedFile] = useState(null);

    const [formData, setFormData] = useState(
        {
            title: "", 
            instructions: "",
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

    function handleAssignClass(e){
        e.preventDefault()

        const uploadImage = storage.ref(`imagesFile/${selectedFile.name}`).put(selectedFile);

        uploadImage.on("state_changed", () => {
          storage
            .ref("imagesFile")
            .child(selectedFile.name)
            .getDownloadURL()
            .then((url) => {
                db.collection('assignedvalues')
               .doc("classes")
               .collection(detailData.id)
               .add({
                    timstamp: firebase.firestore.FieldValue.serverTimestamp(),
                    imageUrl: url,
                    text: formData.title,
                    instructions: formData.instructions,
                    sender: loginMail,
                });
           });
        });

        // if(formData.title && formData.instructions && selectedFile){
            // formData.title === "",
            // formData.instructions === "",
            // setSelectedFile(null)
        // }
    }

  return (
    <div 
        className={`JoinClass ClassworkForm ${classworkDisplay ? 'display' : ""}`}
    >
        <div className="join-class-header">
            <div className="header-left">
                <RxCross2 
                className='icon close-join-class'
                onClick={() => setClassworkDisplay(prev => !prev)}
                />
                <p className="label">
                    #Assignment
                </p>
            </div>
            <button 
                className="header-right"
                disabled={!formData.title}
                onClick={handleAssignClass}
            >
                Assign
            </button>
        </div>

        <div className="class-code-section">
            <div className="input-container">
                <form onSubmit={handleSubmit}>
                    <div className="input-data">
                        <input
                            type="text"
                            onChange={handleChange}
                            name="title"
                            value={formData.title}
                            required
                        />
                        <div className="underline">
                        </div>
                        <label>Title</label>
                    </div>

                    <div className="input-data text-area">
                        <textarea
                            // type='text'
                            value={formData.instructions}
                            onChange={handleChange}
                            name="instructions"
                            required
                        />
                        <div className="underline"></div>
                        <label htmlFor="">Instructions(Optional)</label>
                    </div>
                </form>
            </div>
        </div>

        <div className="signed-in-section">
            {/* <div className="account-section"> */}
            <p className='attach'>Attach</p>
            <input
                type="file"
                // value={selectedFile}
                onChange={(e) =>{
                    if(e.target.files[0]){
                        setSelectedFile(e.target.files[0])
                    }
                }}
            />
            {/* </div> */}
        </div>
   </div>
  )
}

export default ClassworkForm