import React, { useState } from 'react'
import Layout from '../components/layout'
import { on } from 'nodemon'
import { onRegistration } from '../api/auth'
const Register = () => {
  const [values, setValues] = useState ({
    email: '',
    password: ''
  })
  const [error, setError] = useState(false) 
  const [sucess, setSucess] = useState(false)
  
  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e) => {
    e.preventDefault()

    try{
     const response = await onRegistration(values)
     console.log(response)
    }
    catch (error) {
      console.log(error.response)
    }
  }
  

  return(
     <Layout>
        <form onSubmit={(e)=> onsubmit(e)} className='container mt-3'>
          <h1>Register</h1>

          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email AdDress
            </label>
            <input 
              onChange={(e) => onChange(e)}
              type='email'
              className='form-control'
              id ='email'
              name='email'
              value={values.email}
              placeholder='test@gmail.com'
              required/>
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input 
              onChange={(e) => onChange(e)}
              type='password'
              value={values.password}
              className='form-control'
              id='password'
              name='password'
              placeholder='password'
              required
              />
          </div>

          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
     </Layout> 

  )
}

export default Register