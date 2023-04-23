import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const[name,setName] = useState("");
    const [password, setPassword] = useState("");

    const handlePostRequest = () => {
        axios.post("http://localhost:8081/book/signup",{name : name,email:email,password:password})
          .then(response => {
            console.log(response);
            
          })
          .catch(error => {
            console.log(error);
          });
          if(name&&password&&email){
          navigate("/");
          }
      };

    return (
        <div className="signup_container">
            <div className="signup_login">
                <h2>Sign Up</h2>
                <form>
                    <div className="form_field">
                        <label htmlFor="name">Name:</label>
                        <input type="name" id="name" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}/> 
                    </div>
                    <div className="form_field">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/> 
                    </div>
                    <div className="form_field">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={password} onChange ={(e)=>{setPassword(e.target.value)}}/> 
                    </div>
                    <div className="form_field">
                        <button onClick={handlePostRequest}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
