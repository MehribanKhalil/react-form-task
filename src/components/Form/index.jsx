import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import './index.css'
import useLocalStorage from '../../hooks/useLocalStorage';

const FormSection = () => {
    const [data, getUserInfo] = useLocalStorage()
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

    const SignUpSchema = Yup.object().shape({
        name: Yup.string()
            .max(15, "Name must be max 15 characters")
            .required("Please provide your name"),

        surname: Yup.string()
            .max(15, "Surname must be max 20 characters")
            .required("Please provide your surname"),

        email: Yup.string()
            .email('Must be a valid email')
            .required("Please provide your email"),

        password: Yup.string()
            .matches(passwordRegex, "Password must contain minimum eight characters, at least one letter and one number")
            .required("Please provide your password"),
    });


    const handleSubmit = (values, { resetForm }) => {
        getUserInfo(values)
        setTimeout(() => {
            resetForm();
        }, 1000);
    }

    return (
        <div className='sign_up_page'>
            <Formik
                initialValues={{ name: '', surname: "", email: '', password: '' }}
                validationSchema={SignUpSchema}
                onSubmit={handleSubmit}
            >

                {({ dirty, isSubmitting, isValid }) => (
                    <Form className='form'>
                        <h2>Sign Up</h2>

                        <div className='form_element_box'>
                            <label htmlFor="name">First name: </label>
                            <Field placeholder="Enter name" type="text" name="name" className='input' />
                            <ErrorMessage name="name" component="div" className='error_message' />
                        </div>

                        <div className='form_element_box'>
                            <label htmlFor="surname">Last name: </label>
                            <Field placeholder="Enter last name" type="text" name="surname" className='input' />
                            <ErrorMessage name="surname" component="div" className='error_message' />
                        </div>

                        <div className='form_element_box'>
                            <label htmlFor="email">Email:</label>
                            <Field placeholder="Enter email " type="email" name="email" className='input' />
                            <ErrorMessage name="email" component="div" className='error_message' />
                        </div>

                        <div className='form_element_box'>
                            <label htmlFor="password">Password:</label>
                            <Field placeholder="Enter password" type="password" name="password" className='input' />
                            <ErrorMessage name="password" component="div" className='error_message' />
                        </div>

                        <div className='form_element_box'>
                            <button type="submit" disabled={!dirty || !isValid || isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>

                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default FormSection