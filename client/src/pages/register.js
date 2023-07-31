import { useState } from 'react'
import { onRegistration } from '../api/auth'
import Layout from '../components/layout'
import React from 'react'

const Register = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await onRegistration(values);
      setError('');
      setSuccess(data.message);
      setValues({ email: '', password: '' });
    } catch (error) {
      console.log('Full Error:', error);
      if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length > 0) {
        console.log(error.response.data.errors[0].msg);
        setError(error.response.data.errors[0].msg);
      } else {
        console.error('Error:', error);
        setError('An error occurred. Please try again later.');
      }
      setSuccess('');
    }
    
  }

  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
        <h1>Register</h1>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={values.email}
            placeholder='test@gmail.com'
            required
          />
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
            placeholder='passwod'
            required
          />
        </div>

        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
        <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </Layout>
  )
}

export default Register