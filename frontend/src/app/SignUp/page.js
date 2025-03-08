"use client";

import React, { useState } from 'react'
import "../style.css"
export default function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });
            if (!response.ok) {
                const error = await response.json();
                console.log("error parsing from backend", error);
            }
        } catch (error) {
            console.error("error during signup", error);
        }
        setFormData({ username: "", email: "", password: "" });
    };
    return (
        <div className="container">
            <div className="Login-box">
                <div className = "logo-containter">
                    <div className  = "logo-text">Cash Cat</div>
                    <div className = "sign">
                        <h2>SignUp</h2>
                    </div>

                    <div className = "wrapper">
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="email" className="input-field" placeholder="Enter Email" value={formData.email} onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value }) } required/>
                            <input type="text" name="username" className="input-field" placeholder="Enter Username" value={formData.username} onChange={(e) =>
                                setFormData({ ...formData, username: e.target.value }) } required/>
                            <input type="password" name="password" className="input-field" placeholder = "Enter Password" value={formData.password} onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value }) } required/>
                            <button type="submit" className="button">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
