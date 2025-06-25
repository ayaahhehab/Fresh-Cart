import React, { useState } from 'react';
import Style from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState('')

  let navigate = useNavigate();
  //formik bta5od obj esmo initVal b7ot feh ely na 3yzah
  async function submitRegister(values){
    setIsLoading(true);
    const response =  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
    .catch(
      (error)=>{
        setIsLoading(false);
        setError(error.response.data.message)

      })
    console.log(values)
    console.log(response.data)
    if (response.data.message === 'success'){
      setIsLoading(false);
      navigate('/login')
    }
  }

  // function validate(values){
  //   let errors = {};
  //   let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  //   let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  //   if(!values.name){
  //     errors.name = "name is required";
  //   }else if (values.name.length < 3){
  //     errors.name = "name minLength is 3";
  //   }

  //   if(!values.phone){
  //     errors.phone="phone is required "
  //   }else if(!phoneRegex.test(values.phone)){
  //     errors.phone = "phone number is invalid";
  //   }
  //   if(!values.email){
  //     errors.email="email is required "
  //   }else if(!emailRegex.test(values.email)){
  //     errors.email = "email is invalid";
  //   }

  //   console.log(values)
  //   return errors;

  // }

 
  let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  let validateScheme = Yup.object({
    name: Yup.string().min(3,'name minLength is 3').max(10, 'name maxLength is 3').required('name is required'),
    email: Yup.string().email('email is invalid').required('email is required'),
    phone: Yup.string().matches(phoneRegex, 'phone is invalid').required('phone is required'),
    password: Yup.string().matches(passwordRegex,
      'Password must:\n- Be at least 8 characters long\n- Contain at least one lowercase letter\n- Contain at least one uppercase letter\n- Contain at least one number'
    )
      .required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'password is not matched').required('rePassword is required'),
  })

  let formik = useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:''
    },validationSchema:validateScheme,
    onSubmit:submitRegister,
    
    
  })
  return <>
  <div className='w-75 m-auto py-5'>
    {error?<div className="alert alert-danger">{error}</div>:<></> }
  
    <h4>Register now!</h4>
  <form className='py-3' onSubmit={formik.handleSubmit}>
    <label htmlFor='name'>Name: </label>
    <input className='form-control mb-2'
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    value={formik.values.name}
    type='text'
    id='name'
    name='name'/> 
    {formik.errors.name && formik.touched.name?<div className="alert alert-danger">{formik.errors.name}</div>:<></>}
    

    <label htmlFor='email'>E-mail: </label>
    <input className='form-control mb-2'
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    value={formik.values.email}
    type='email'
    id='email'
    name='email'/>
    {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:<></>}


    <label htmlFor='phone'>phone: </label>
    <input className='form-control mb-2'
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    value={formik.values.phone}
    type='tel'
    id='phone'
    name='phone'/>
    {formik.errors.phone && formik.touched.phone ?<div className="alert alert-danger">{formik.errors.phone}</div>:<></>}


    <label htmlFor='password'>Password: </label>
    <input className='form-control mb-2'
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    value={formik.values.password}
    type='password'
    id='password'
    name='password'/>
    {formik.errors.password && formik.touched.password ?<div className="alert alert-danger" style={{ whiteSpace: 'pre-line' }}>{formik.errors.password}</div>:<></>}

    <label htmlFor='rePassword'>rePassword: </label>
    <input className='form-control mb-2'
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    value={formik.values.rePassword}
    type='password'
    id='rePassword'
    name='rePassword'/>
    {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger">{formik.errors.rePassword}</div>:<></>}

    {isLoading? <button className='btn bg-main text-white mt-3' type="button">
      <i className='fas fa-spinner fa-spin '></i>
      </button> : <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-3' type="submit">
      Submit
      </button>
      }
    
      
  </form>
  </div>
  
  </>
    
}
