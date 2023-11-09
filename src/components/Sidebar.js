import React from 'react'
import { MdForwardToInbox } from 'react-icons/md';
import { RiInboxFill } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { useContextAPI } from '../context/Context';

const Sidebar = (props) => {

  const { show, setShow } = useContextAPI() 
  return (
    <div className={`Sidebar ${show ? 'come' : ""}`}>
        <RxCross2 
           className='icon cross-icon'
           onClick={() => setShow(prev => !prev)}
        />
        <div className="side-item inbox">
            <MdForwardToInbox className='icon' />
            <p className="item">
                Inbox
            </p>
        </div>
        <div className="side-item starred">
            <RiInboxFill className='icon' /> 
            <p className="item">
                Starred
            </p>           
        </div>
        <div className="side-item send-mail">
            <MdForwardToInbox className='icon' /> 
            <p className="item">
                Send Mail
            </p>           
        </div>
        <div className="side-item drafts">
            <MdForwardToInbox className='icon' />
            <p className="item">
                Drafts
            </p>            
        </div>
        <hr />
        <div className="side-item all-mail">
            <RiInboxFill className='icon' />
            <p className="item">
                 All mail
            </p>            
        </div>
        <div className="side-item trash">
            <MdForwardToInbox className='icon' />
            <p className="item">
                Trash
            </p>            
        </div>
        <div className="side-item spam">
            <RiInboxFill className='icon' />
            <p className="item">
                Spam
            </p>            
        </div>
    </div>
  )
}

export default Sidebar