document.getElementById("resetPasswordForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const token = new URLSearchParams(window.location.search).get("token"); // Extract token from URL

    if (!email || !newPassword || !confirmPassword) {
        alert("Please fill in all fields!");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch("https://localhost:7029/UserRegistration/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, email, newPassword })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Password reset successful! Redirecting to login...");
            window.location.href = "login.html";
        } else {
            alert(data.message || "Failed to reset password.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
    }
});
