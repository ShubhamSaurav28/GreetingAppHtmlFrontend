document.addEventListener("DOMContentLoaded", () => {
    const authButtons = document.getElementById("auth-buttons");
    if (!authButtons) return; // Prevent errors if element is missing

    const token = localStorage.getItem("token");

    if (token) {
        // User is logged in: Show Logout button and fetch user data
        authButtons.innerHTML = `
            <span id="userGreeting" class="mr-4 text-lg font-semibold text-white"></span>
            <button id="logoutBtn" class="px-5 py-2 bg-red-500 text-white rounded-lg">Logout</button>
        `;

        // Fetch user data
        // fetchUserData();

        // Logout functionality
        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("token"); // Remove token
            window.location.href = "login.html"; // Redirect to login
        });
    } else {
        // User is not logged in: Show login/register buttons
        authButtons.innerHTML = `
            <a href="login.html" class="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">Login</a>
            <a href="register.html" class="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition">Register</a>
        `;
    }
});


// Function to fetch user data
// async function fetchUserData() {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     try {
//         const response = await fetch("https://localhost:7029/UserRegistration/profile", {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         });

//         if (response.ok) {
//             const data = await response.json();
//             document.getElementById("userGreeting").innerText = `Hello, ${data.name}!`;
//         } else if (response.status === 401) {
//             localStorage.removeItem("token");
//             window.location.href = "login.html"; // Redirect if unauthorized
//         } else {
//             console.error("Error fetching user data");
//         }
//     } catch (error) {
//         console.error("Fetch error:", error);
//     }
// }

// Function to update greeting text
function updateGreeting() {
    const greetings = [
        "Hello, User! 👋",
        "Welcome Back! 🎉",
        "Great to see you again! 😊",
        "Have an amazing day! 🌟",
        "Stay positive and keep shining! ✨"
    ];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    document.getElementById("greeting-text").innerText = randomGreeting;
}
