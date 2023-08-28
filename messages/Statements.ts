import { useState } from "react";
import * as Yup from 'yup';

/* eslint-disable prettier/prettier */


  export const emailSchema = Yup.string().required('field is required') .email('Invalid email address');

  export const passwordSchema = Yup.string() .required('field is required') .min(6, 'Password must be at least 6 characters');
 
  export const fullnameSchema =  Yup.string().required('field is required').min(1,'Name must be have at least one letter');
  
  export const genderSchema = Yup.string() .required('field is required')

  export const birthDateSchema = Yup.string() .required('field is required')

  export const termsSchema = Yup.boolean() .required('field is required')

  export const otpCodeSchema = Yup.number().required('Field is required').min(1000, 'OTP code must be 4 digits').max(9999, 'OTP code must be 4 digits'); 

  export const imageSchema = Yup.string().optional()

  export const categorySchema = Yup.string().required()

  export const descriptionSchema = Yup.string().required('Must Write Description').min(20, 'At list 20 characters')