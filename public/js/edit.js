const API_URL = "https://localhost:7029/HelloGreeting";

// Fetch the greeting ID and message from URL parameters
document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const greetingId = urlParams.get("id");

    if (greetingId) {
        const greetingMessage = await findGreeting(greetingId); // Wait for the response
        if (greetingMessage) {
            document.getElementById("newMessage").value = greetingMessage;
        }
    }
});

// ?? Find Greeting by ID
async function findGreeting(id) {
    try {
        const response = await fetch(`${API_URL}/FindGreeting`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ id })
        });

        const data = await response.json();
        return data.success ? data.data : null; // Ensure null if not found
    } catch (error) {
        console.error("Error finding greeting:", error);
        return null; // Return null on error
    }
}


// Form Submission Event Listener
document.getElementById("editGreetingForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const newMessage = document.getElementById("newMessage").value.trim();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");


    if (!newMessage) {
        alert("Please enter a new greeting message.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/EditGreeting/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ greeting: newMessage })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Greeting updated successfully!");
            window.location.href = "index.html"; // Redirect back to main page
        } else {
            alert(data.message || "Failed to update greeting.");
        }
    } catch (error) {
        console.error("Error editing greeting:", error);
        alert("An error occurred. Please try again.");
    }
});

// Cancel Edit and Go Back
function cancelEdit() {
    window.history.back();
}
