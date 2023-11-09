import React from 'react'
import { BiUserPin } from 'react-icons/bi'
import { BiFolder } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { BiSolidUserCircle } from 'react-icons/bi';

const JoinedClasses = ({classData}) => {
  return (
    <div className='joined-class'>
        <div className='joined-class-header'>
            <Link to={`/${classData.id}`}>
                <p className='class-name'> 
                    {classData.className}
                </p>
                <p className='joined-email'> 
                    {classData.owner}
                </p> 
            </Link>
        </div>
        <div className='blank-space'>
            <BiSolidUserCircle 
                className='joined-class-image-icon icon' 
            />
        </div>
        <div className='joined-class-footer'>
            <BiUserPin className='icon joined-icon-left' />
            <BiFolder className='icon joined-icon-right' />
        </div>
    </div>
  )
}

export default JoinedClasses