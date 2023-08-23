import { useState } from "react";
import * as Yup from 'yup';

/* eslint-disable prettier/prettier */


  export const emailSchema = Yup.string().required('field is required') .email('Invalid email address');

  export const passwordSchema = Yup.string() .required('field is required') .min(6, 'Password must be at least 6 characters');
 
  export const fullnameSchema =  Yup.string().required('field is required').min(1,'Name must be have at least one letter');
  
  export const genderSchema = Yup.string() .required('field is required')

  export const birthDateSchema = Yup.string() .required('field is required')
 