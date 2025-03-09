"use client";

import React, { useState } from 'react'
import "../style.css"
import { useRouter } from "next/navigation";
export default function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://cashcat.onrender.com/register", {
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
            const data = await response.json();
            console.log("data:", data)
            if (!response.ok) {
                console.log("error parsing from backend", data);
                return;
            }
            setFormData({ username: "", email: "", password: "" });
            router.push("/")
        } catch (error) {
            console.error("error during signup", data);
        }
    };
    return (
        <div className="container">
            <div className="Login-box">
                <div className="logo-containter">
                    <div className="logo-text">Cash Cat</div>
                    <div className="sign">
                        <h2>SignUp</h2>
                    </div>

                    <div className="wrapper">
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
