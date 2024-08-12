"use strict";

const baseURL = "http://127.0.0.1:3000";

window.onload = () => {
    const login = document.getElementById("login-container");
    const signup = document.getElementById("signup-container");
    const signupLink = document.getElementById("signup-shortlink");
    const loginLink = document.getElementById("login-shortlink");

    signupLink.onclick = () => {
        login.style.display = "none";
        signup.style.display = "flex";
    };

    loginLink.onclick = () => {
        login.style.display = "flex";
        signup.style.display = "none";
    };

    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    loginForm.onsubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const username = formData.get("username");
        const password = formData.get("password");

        loginUser(username, password);
    };

    signupForm.onsubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(signupForm);
        const username = formData.get("username");
        const password = formData.get("password");

        registerUser(username, password);
    }
}

async function loginUser(username, password) {
    const url = baseURL + "/api/login";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if(!response.ok) throw new Error("Login failed");

    const data = await response.json();

    if(data.error) {
        // failed login
        console.log("error: " + data.error);
        return;
    }

    // save JWT token in localStorage for later use
    localStorage.setItem("token", data.response.token);

    window.location.href="admin.html";
}

async function registerUser(username, password) {
    const url = baseURL + "/api/register";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if(response.ok) {
        console.log("user created");
    } else {
        console.log("error creating user");
    }
}