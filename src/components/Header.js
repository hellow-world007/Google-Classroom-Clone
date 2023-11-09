import React, { useState } from 'react'
import { FiMenu } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSolidUserCircle } from 'react-icons/bi';
import { CgMenuGridO } from 'react-icons/cg';

import { useContextAPI } from '../context/Context';

const Header = () => {

  const { show, setShow, createClass, setCreateClass,createClassDisplay, setCreateClassDisplay,joinClassDisplay, setJoinClassDisplay,loginUser,logOut } = useContextAPI()

  return (
    <>
    <div className="Header">
        <div className="left-header">
           <FiMenu 
              className='icon' 
              onClick={() => setShow(prev => !prev)}
            />
           <h3 className="logo">
               Google <span>Classroom</span>
           </h3>
        </div>
        <div className="right-header">
           <AiOutlinePlus 
              className='icon plus-icon' 
              onClick={() => setCreateClass(prev => !prev)}
           />
           {/* <BiSolidUserCircle src={loginUser.photoURL} className='icon' /> */}
           <img 
              src={loginUser.photoURL} 
              className='icon img-icon' 
              onClick={logOut}
           />
           <CgMenuGridO className='icon' />
        </div>
    </div>
    <div className={`class-item ${createClass ? 'show' : ""}`}>
        <p
          className='join-class'
          onClick={() => {
            setJoinClassDisplay(true)
            setCreateClass(prev => !prev)
          }}
        >
            Join Class
        </p>
        <p
          className='create-class'
          onClick={() => {
            setCreateClassDisplay(true)
            setCreateClass(prev => !prev)
          }}
        >
            Create Class
        </p>
    </div>
    </>
  )
}

export default Header