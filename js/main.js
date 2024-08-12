"use strict";

const baseURL = "http://127.0.0.1:3000";

window.onload = () => {
    document.getElementById("signup-shortlink").onclick = switchForm;
    document.getElementById("login-shortlink").onclick = switchForm;

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

    if (response.ok) {
        const data = await response.json();
        // save JWT token in localStorage for later use
        localStorage.setItem("token", data.response.token);
        window.location.href="admin.html";
    } else {
        const message = document.getElementById("message");
        clearMessage(message);

        message.classList.add("bad");
        message.innerHTML = "Wrong username or password";
        message.style.display = "flex";
    }
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
    const data = await response.json();
    const message = document.getElementById("message");
    clearMessage(message);

    if(response.ok) {
        switchForm();
        message.classList.add("good");
        message.innerHTML = "User created!";
        message.style.display = "flex";
    } else {
        message.classList.add("bad");
        message.innerHTML = data.error;
        message.style.display = "flex";
    }
}

function switchForm() {
    const login = document.getElementById("login-container");
    const signup = document.getElementById("signup-container");
    const message = document.getElementById("message");
    clearMessage(message);

    const isLoginVisible = login.style.display !== "none";
    login.style.display = isLoginVisible ? "none" : "flex";
    signup.style.display = isLoginVisible ? "flex" : "none";
}

function clearMessage(element) {
    element.classList.remove("good");
    element.classList.remove("bad");
    element.innerHTML = "";
}