import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { IoLocationOutline, IoMailOutline, IoCallOutline, IoAlarmOutline } from "react-icons/io5";
import { FaRegUser , FaRegEnvelope, FaRegEnvelopeOpen, FaRegArrowAltCircleRight } from "react-icons/fa";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import * as yup from 'yup';
import { userId, db } from '../../Firebase/config';
import { ref, set, update, onValue } from "firebase/database";


// styles 
import './styles.scss'

// assets
import arrowDown from '../../assets/arrow-down.svg'
import { Formik } from 'formik';

const Contact = () => {

    const [modal, setModal] = useState(false);

    const schema =  yup.object().shape({
        yourName: yup.string().required(),
        email: yup.string().email(),
        message: yup.string().required()
    })
    const initialValues = {
        yourName: '',
        email: '',
        message: '',
    }

    const MessageModal = () => (
        <Modal
            size="lg"
            show={modal}
            onHide={() => setModal(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Message Sent
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    Your query sent successfully, we will contact you soon!
            </Modal.Body>
            <Modal.Footer>
                    <Button onClick={() => setModal(false)} variant="secondary">Close</Button>
                </Modal.Footer>
        </Modal>
    )

  return (
    <>
        <Header/>
        <div className="container-fluid content-page-bg">
            <div className="row page-cover">
                <div className="cover-content d-flex justify-content-center align-items-center flex-column">
                    <h3>Contact Us</h3>
                    <h2>Don't hesitate to contact us</h2>
                    <p>We're here to help you help others</p>
                </div>
                <img className="section-arrow" src={arrowDown} alt="arrow down" />
            </div> 
            <div className="container content-section">
                <div className="row h-100">
                <div className="col-md-6">
                    <h2>Head Office</h2>
                    <h6>AppsGenii Technologies (Pvt) Ltd.</h6>
                    <ul className="contact-list">
                        <li><IoLocationOutline/> 22-S, Imperial Commercial Block, Paragon City?? Lahore Cantt, Lahore 54000, Punjab, Pakistan.</li>
                        <li><IoCallOutline/><a href="tel:+92 (332) 2777436">+92 (332) 2777436</a></li>
                        <li><IoMailOutline/><a href="mailto:donation@familydonation.com">donation@familydonation.com</a></li>
                        <li><IoAlarmOutline/>Monday to Friday (9:00 am - 9:00 pm)</li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <h2>We love to read</h2>
                    <Formik
                                        validationSchema={schema}
                                        initialValues={initialValues}
                                        // validateOnChange={true}
                                        initialErrors={schema.isValidSync(initialValues)}
                                        validateOnBlur={true}
                                        validateOnMount={true}
                                        validate={(values) => {
                                            let errors = {};
                                            if (!values.yourName) {
                                                errors.yourName = 'First name is required';
                                            }
                                            if (!values.email) {
                                                errors.email = 'Email is required';
                                            }
                                            if (!values.message) {
                                                errors.message = 'Message is required';
                                            }

                                            return errors;
                                        }}
                                    >
                                           {({
                                            setFieldValue,
                                            handleBlur,
                                            values,
                                            errors,
                                            touched,
                                        }) => {
                                            console.log('values, errors, touched: ', values,
                                                errors,
                                                touched)
                                                const sendMessage = (e) => {
                                                    e.preventDefault();
                                                    const data = {
                                                        userName: values.yourName,
                                                        email: values.email,
                                                        message: values.message
                                                    }
                                                    set(ref(db, 'messages/' + userId), data);
                                                    setModal(true);
                                                }
                                            return (
                                                <Form>
                                                <Form.Group className="fd-form-field" controlId="yourName">
                                                    <Form.Control value={values.yourName} isInvalid={errors.yourName && touched.yourName} onBlur={handleBlur} onChange={(e) => setFieldValue('yourName', e.target.value)} type="text" placeholder="Your Name" />
                                                    <div className="input-icon"><FaRegUser/></div>
                                                <Form.Control.Feedback type="invalid">
                                                                            {errors.yourName}
                                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="fd-form-field" controlId="email">
                                                    <Form.Control type="email" value={values.email} isInvalid={errors.email && touched.email} onBlur={handleBlur} onChange={(e) => setFieldValue('email', e.target.value)} className="text" placeholder="Email Address" />
                                                    <div className="input-icon"><FaRegEnvelope/></div>
                                                    <Form.Control.Feedback type="invalid">
                                                                            {errors.email}
                                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="fd-form-field" controlId="message">
                                                    <Form.Control type="text-area" value={values.message} isInvalid={errors.message && touched.message} onBlur={handleBlur} onChange={(e) => setFieldValue('message', e.target.value)} rows={4}  placeholder="Message" />
                                                    <div className="input-icon"><FaRegEnvelopeOpen/></div>
                                                    <Form.Control.Feedback type="invalid">
                                                                            {errors.message}
                                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <div className="row mt-4">
                                                    <div className="col-md-8">
                                                        {/* Captcha will go here */}
                                                    </div>
                                                    <div className="col-md-4 d-flex justify-content-end">
                                                        <Button type={'submit'} variant="success" disabled={!values.email || !values.message || !values.yourName || (errors.yourName || errors.email || errors.message)} onClick={(e) => sendMessage(e)} className="main-btn contact-main-btn"><FaRegArrowAltCircleRight className="SvgIcon noColor"/>Send Message</Button>
                                                    </div>
                                                </div>
                                            </Form>
                                            )
                                        }}
                    </Formik>
                </div>
                </div>
            </div>
            {MessageModal()}
        <Footer/>
        </div>
    </>
  )
}

export default Contact