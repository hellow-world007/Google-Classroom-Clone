import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useContextAPI } from '../../context/Context'
import db from '../../library/firebase'
import { Link } from 'react-router-dom'
import {decode} from 'html-entities';

const Classwork = ({detailData}) => {
  const { showPopup, setShowPopup,classworkDisplay, setClassworkDisplay,classworks, setClassworks } = useContextAPI()

  const { loginUser } = useContextAPI();

  useEffect(() => {
    if (detailData) {
      let unsubscribe = db
        .collection("assignedvalues")
        .doc("classes")
        .collection(detailData.id)
        .onSnapshot((snap) => {
            setClassworks(snap.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [detailData]);

  let works = []
  for(let i=1; i<=classworks.length; i+=3){
    works.push(classworks[i])
  }

  return (
    <div className='Classwork'>
        <button 
           className='create-btn-classwork'
           //onClick={handleClassworkBtn}
           onClick={() => setShowPopup(prev => !prev)}
        >
           <AiOutlinePlus className='icon' />
           <span>Create</span>
        </button>

        { works.map(work => {
            return(
                <div className='assigned-text-list'>
                    <div 
                        className='assigned-text-header'
                    >
                        <p className='task-title'>
                            {work.text}
                        </p>
                        <p className='task-timestamp'>
                            {
                            new Date(work.timstamp.seconds*1000).getHours() + ":" + new Date(work.timstamp.seconds*1000).getMinutes() + ", "+ new Date(work.timstamp.seconds*1000).toDateString()
                            }
                        </p>
                    </div>
    
                    <div className='assigned-text-main'>
                        <p className='task-instructions'>
                            {work.instructions}
                        </p>
                        <p className='task-images'>
                        <a href={work.imageUrl} target='_blank' >
                            <img className='img--left' src={work.imageUrl} />
                            <div className='img--right'>
                                <p>{work.imageUrl.slice(87,101)}</p>
                                <p>Image</p>
                            </div>
                        </a>
                        </p>
                    </div>
                </div>
            )
        })}
        
        { showPopup && 
        <div className='popup-container'>
            <ul className='popup-element'>
                <li
                    onClick={() => {
                        setClassworkDisplay(true)
                        setShowPopup(prev => !prev)
                    }} 
                >
                    Assignment
                </li>
                <li
                   onClick={() => {
                        setClassworkDisplay(true)
                        setShowPopup(prev => !prev)
                    }}
                >
                    Quiz assignment
                </li>
                <li
                   onClick={() => {
                        setClassworkDisplay(true)
                        setShowPopup(prev => !prev)
                    }}
                >
                    Question
                </li>
                <li
                   onClick={() => {
                        setClassworkDisplay(true)
                        setShowPopup(prev => !prev)
                    }}
                >
                    Material
                </li>
                <li
                   onClick={() => {
                        setClassworkDisplay(true)
                        setShowPopup(prev => !prev)
                    }}
                >
                    Reuse post
                </li>
                <li
                   onClick={() => {
                        setClassworkDisplay(true)
                        setShowPopup(prev => !prev)
                    }}
                >
                    Topic
                </li>
            </ul>
        </div> }
        <div className='assigned-classwork'>

        </div>
    </div>
  )
}

export default Classwork