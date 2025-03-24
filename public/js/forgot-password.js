document.getElementById("forgotPasswordForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    if (!email) {
        alert("Please enter your email!");
        return;
    }

    try {
        const response = await fetch("https://localhost:7029/UserRegistration/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Password reset link sent! Check your email.");
        } else {
            alert(data.message || "Failed to send reset link.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
    }
});
