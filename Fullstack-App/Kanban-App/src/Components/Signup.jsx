import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";



export const Signup = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const siginup = await fetch(
        `https://kanban-backend-71y9.onrender.com/user/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            userName,
            email,
            password,
            role,
          }),
        }
      );
      const data = await siginup.json();
      console.log(data);
      alert("login success")
      navigate("/login")

    } catch (error) {
      alert(error)
    }
  };

  return (
    <>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            userName:
            <input
              type="text"
              name="userName"
              placeholder="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            Role
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">user</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};
