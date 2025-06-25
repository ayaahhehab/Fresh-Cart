import React, { useContext, useState } from 'react';
import Style from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { data, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
export default function Login() {
  
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState('')
  const {setUserToken, setUserData} = useContext(UserContext);

  async function submitLogin(values){
    setIsLoading(true);
    const response =  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
    .catch(
      (error)=>{
        setIsLoading(false);
        setError(error.response.data.message)

      })
    console.log(values)
    console.log(response.data)

    if (response.data.message === 'success'){
      console.log(response.data.token)
      setIsLoading(false);
      localStorage.setItem('userToken', response.data.token)

      setUserToken(response.data.token)
      setUserData(response.data.user)
      navigate('/')
    }
  }


 
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const validateScheme = Yup.object({
    email: Yup.string().email('email is invalid').required('email is required'),
    password: Yup.string().matches(passwordRegex,
      'Password must:\n- Be at least 8 characters long\n- Contain at least one lowercase letter\n- Contain at least one uppercase letter\n- Contain at least one number'
    )
      .required('password is required'),
  })

  const formik = useFormik({
    initialValues:{      phone:'',
      email:'',
      password:'',
    },validationSchema:validateScheme,
    onSubmit:submitLogin,
    
    
  })
  return <>
  <div className='w-75 m-auto py-5'>
    {error?<div className="alert alert-danger">{error}</div>:<></> }
  
    <h4>Login now!</h4>
  <form className='py-3' onSubmit={formik.handleSubmit}>
        

    <label htmlFor='email'>E-mail: </label>
    <input className='form-control mb-2'
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    value={formik.values.email}
    type='email'
    id='email'
    name='email'/>
    {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:<></>}

    <label htmlFor='password'>Password: </label>
    <input className='form-control mb-2'
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    value={formik.values.password}
    type='password'
    id='password'
    name='password'/>
    {formik.errors.password && formik.touched.password ?<div className="alert alert-danger" style={{ whiteSpace: 'pre-line' }}>{formik.errors.password}</div>:<></>}

   
    {isLoading? 
    <button className='btn bg-main text-white mt-3' type="button"><i className='fas fa-spinner fa-spin '></i></button>
    :
    <div className='d-flex align-items-center'>
      <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-3' type="submit">Login</button>
   <Link className='btn mt-3' to={'/register'}>Register Now</Link>
    </div>
    }
    
       
  </form>
  </div>
  
  </>
    
}
