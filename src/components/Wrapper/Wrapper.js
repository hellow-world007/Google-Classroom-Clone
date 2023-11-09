import React from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import CreateClass from '../CreateClass/CreateClass'
import JoinClass from '../JoinClass/JoinClass'
import ClassworkForm from '../ClassDetails/ClassworkForm'

const Wrapper = ({detailData}) => {
  return (
    <>
        <Header />
        <Sidebar />
        <CreateClass />
        <JoinClass />
        <ClassworkForm detailData={detailData} />
    </>
  )
}

export default Wrapper