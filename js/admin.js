"use strict";

window.onload = async () => {
    const url = "https://backend-moment4-1-p9uh.onrender.com/api/admin";
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if(response.ok) {
        const data = await response.json();

        const container = document.querySelectorAll(".inner-container")[0];
        container.innerHTML = `
            <h2>${data.title}</h2>
            <p>${data.message}</p>
        `;
    } else {
        window.location.href="index.html";
    }

    // logout - deletes token from localStorage and redirects to index.html
    const logoutBtn = document.getElementById(("logout-button"));
    logoutBtn.onclick = () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    }
}