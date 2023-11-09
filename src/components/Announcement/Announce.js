import React, { useEffect, useMemo, useState } from 'react'
import db from '../../library/firebase';
import { useContextAPI } from '../../context/Context';
import { BiDotsVerticalRounded } from 'react-icons/bi'

const Announce = ({detailData}) => {
    const [announcement, setAnnouncement] = useState([]);
    const { loginUser } = useContextAPI();

    useEffect(() => {
      if (detailData) {
        let unsubscribe = db
          .collection("announcments")
          .doc("classes")
          .collection(detailData.id)
          .onSnapshot((snap) => {
            setAnnouncement(snap.docs.map((doc) => doc.data()));
          });
        return () => unsubscribe();
      }
    }, [detailData]);

    let works = []
    for(let i=1; i<=announcement.length; i+=3){
      works.push(announcement[i])
    }

    const announceEl = announcement.map(announce => {
      // console.log(announce.imageUrl.includes('.docx','.pdf','.word'))
        return (
            <div className='announce-el'>
              <div className='announce-header'>
                <div className='header--left'>
                  <img src={loginUser.photoURL}
                    className='icon icon-in-details' 
                  />
                  <p className='header--name'>
                    {loginUser.displayName}
                  </p>
                </div>
                <div>
                  {/* <BiDotsVerticalRounded className='icon header-icon' /> */}
                  {
                  new Date(announce.timstamp.seconds*1000).getHours() + ":" + new Date(announce.timstamp.seconds*1000).getMinutes() + ", "+ new Date(announce.timstamp.seconds*1000).toDateString()
                  }
                </div>
              </div>

              <p className='announce-text'>
                {announce.text}
              </p>
              { 
              announce.imageUrl.includes('.docx','.pdf','.word') ? 
              <div className='file-section'>
                <a href={announce.imageUrl}>{announce.imageUrl.slice(87,101)}
                </a>
                <p>File</p>
              </div> 
              : 
              <img src={announce.imageUrl} className='announce-img' />
              }
            </div>
        )
    })

    return (
      <div className='Announce'>
        {announceEl}
      </div>
    )
}

export default Announce