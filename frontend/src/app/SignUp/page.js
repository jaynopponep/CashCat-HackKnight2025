import React from 'react'
import "../style.css"
export default function SignUp() {
    return (
        <div className  = "container">
            <div className = "Login-box">
                <div className = "logo-containter">
                    <div className  = "logo-text">Cash Cat</div>
                    <div className = "sign">
                        <h2>SignUp</h2>
                    </div>

                    <div className = "wrapper">
                        <form>
                            <input type = "email"  className = "input-field" placeholder = "Enter Email"/>
                            <input type = "Username" className  = "input-field" placeholder = "Enter Username"/>
                            <input type = "Password" className = "input-field" placeholder = "Enter Password"/>
                            <button type = "button" className='button'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
