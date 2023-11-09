import React, { useState } from 'react'
import { useContextAPI } from '../../context/Context'
import CreateClassForm from './CreateClassForm'

const CreateClass = () => {

  const { createClassDisplay, setCreateClassDisplay } = useContextAPI()
  const [ showForm,setShowForm ] = useState(false)
  
  const [formData, setFormData] = React.useState(
    {
      isChecked: false
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

  return (
    <>
    <div className={`overlay ${createClassDisplay ? 'display' : ""}`}>
    </div>
    {showForm ? (<CreateClassForm setShowForm={setShowForm}/>) : (
      <div 
        className={`CreateClass ${createClassDisplay ? 'display' : ""}`}
      >
        <p className='top-text text'>Using Classroom at a school/university with students?</p>

        <p className='text'>
          If so, your school must sign up for a <a href="/help" className='link-text'>Google Workspace for Education</a> account before you can use Classroom. <a href="/learn" className='link-text'>Learn more</a>
        </p>

        <p className='text'>
          Google Workspace for Education lets schools/universities decide which Google services their students can use, and provides additional
          <a href="/privacy" className='link-text'> privacy and security</a> protection that is important in a school or university setting. Students cannot use Google Classroom in a school or university with their personal accounts
        </p>

        <div className="checkbox-container">
          <form onSubmit={handleSubmit}>
            <input 
              type="checkbox" 
              id="isChecked" 
              checked={formData.isChecked}
              onChange={handleChange}
              name="isChecked"
            />
            <label htmlFor="isChecked">
              I've read and understand the above notice, and I'm not using Classroom at a school/university with students
            </label>
          </form>
        </div>
        <div className="btn-container">
          <button
            className='btn btn1'
            onClick={() => setCreateClassDisplay(false)}
          >
            Go back
          </button>
          <button
            className='btn'
            onClick={() => setShowForm(true)}
            disabled={!formData.isChecked}
          >
            Continue
          </button>
        </div>
      </div>
    )}
    </>
  )
}

export default CreateClass