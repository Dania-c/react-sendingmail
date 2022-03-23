
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "./sendMailFormComponent.scss"
export default function () {
    const [email, setEmail] = useState('');// select it press CTRL+space to get the name to import it automatically
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!email || !subject || !message) {
            return toast.error('kindly fill email, subject and message');
        }
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/email`, { email, subject, message });
            setLoading(false)
            toast.success(data.message)
        } catch (error) {
            setLoading(false);
            toast.error(error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            )
        }
    }
    return (
        <>
            <ToastContainer position='bottom-center' limit={1} />
            <form className='sendMailFormComponent' onSubmit={submitHandler}>
                <h1> Send Mail</h1>
                <div className='email'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='subject'>
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id='subject' onChange={(e) => setSubject(e.target.value)} />
                </div>
                <div className='message'><label htmlFor="message">Message</label>
                    <textarea type="text" id='message' onChange={(e) => setMessage(e.target.value)} />
                </div>
                <div className='button' disabled={loading}>
                    <button type="submit">{loading ? 'Sending...' : 'Submit'}</button>
                </div>
            </form></>
    )
}
