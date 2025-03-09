"use client";

import React, {useState} from 'react'
import { useRouter } from 'next/navigation';
import "../style.css"

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      const data = await response.json();
      console.log(data.jwt_token)
      localStorage.setItem("token", data.jwt_token)
      if (!response.ok) {
        console.log("error parsing from backend", data);
        return;
      }
      console.log("login successful", data);
      setFormData({ username: "", password: "" });
      router.push("/")
    } catch (error) {
      console.log("error during login", error);
    }
  }
  return (
      <div className="container">
        <div className="Login-box">
          <div className="logo-containter">
            <div className="logo-text">Cash Cat</div>
            <div className="sign">
              <h2>Login</h2>
            </div>
            <div className="wrapper">
              <form onSubmit={handleSubmit}>
                <input type="text" name="username" className="input-field" placeholder="Enter Username" value={formData.username} onChange={(e) =>
                    setFormData({...formData, username: e.target.value}) } required/>
                <input type="password" name="password" className="input-field" placeholder="Enter Password" value={formData.password} onChange={(e) =>
                    setFormData({...formData, password: e.target.value}) } required/>
                <a href="/forgot-password" className="password">Forgot Password?</a>
                <button type="submit" className="button">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

 
 

 
 
