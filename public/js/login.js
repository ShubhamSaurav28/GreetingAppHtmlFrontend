document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter your email and password!");
        return;
    }

    const loginData = { email, password };

    try {
        const response = await fetch("https://localhost:7029/UserRegistration/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });
        console.log(response);

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            localStorage.setItem("token", data.data);
            alert("Login successful! Redirecting...");
            window.location.href = "index.html";
        } else {
            alert(data.message || "Login failed!");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong!");
    }
});
