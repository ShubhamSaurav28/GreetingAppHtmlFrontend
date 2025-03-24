document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const Username = document.getElementById("name").value.trim();
    const Email = document.getElementById("email").value.trim();
    const Password = document.getElementById("password").value.trim();

    if (!Username || !Email || !Password) {
        alert("Please fill all fields!");
        return;
    }

    const userData = { Username, Email, Password };
    console.log(userData);

    try {
        const response = await fetch("https://localhost:7029/UserRegistration/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! Redirecting to login...");
            window.location.href = "login.html";
        } else {
            alert(data.message || "Registration failed!");
        }
    } catch (error) {
        console.error("Registration error:", error);
        alert("Something went wrong!");
    }
});
