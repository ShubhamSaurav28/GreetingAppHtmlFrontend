const API_URL = "https://localhost:7029/HelloGreeting"; // Update with actual API URL

// ?? Add Greeting
async function createGreeting() {
    const greetingText = document.getElementById("greetingText").value.trim();
    if (!greetingText) {
        alert("Please enter a greeting!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/Greeting`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ greeting: greetingText })
        });

        const result = await response.json();
        alert(result.data);

        // Refresh greeting list
        getAllMessages();

        // Clear input field
        document.getElementById("greetingText").value = "";
    } catch (error) {
        console.error("Error adding greeting:", error);
    }
}



document.addEventListener("DOMContentLoaded", () => {
    getAllMessages(); // Fetch and display greetings automatically
});


// ?? Get All Messages
async function getAllMessages() {
    try {
        const response = await fetch(`${API_URL}/GetAllMessages`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        
        const data = await response.json();
        const greetingList = document.getElementById("greetingList");
        greetingList.innerHTML = ""; // Clear previous list

        if (data.success && data.data.length > 0) {
            data.data.forEach(msg => {
                const listItem = document.createElement("li");
            listItem.classList.add("bg-gray-700", "p-4", "rounded-lg", "shadow-md", "flex", "justify-between", "items-center");

            listItem.innerHTML = `
                <span class="text-white font-medium">${msg.message}</span>
                <div class="flex gap-3">
                    <button onclick="editGreeting('${msg.id}')" class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">✏️ Edit</button>
                    <button onclick="deleteGreeting('${msg.id}')" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">🗑️ Delete</button>
                </div>
            `;
            greetingList.appendChild(listItem);
            });
        } else {
            greetingList.innerHTML = `<li>No greetings found.</li>`;
        }
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}


// ?? Redirect to Edit Page with ID
async function editGreeting(id) {
    window.location.href = `edit.html?id=${id}`;
}

// ?? Delete Greeting
async function deleteGreeting(id) {
    if (!confirm("Are you sure you want to delete this greeting?")) return;

    try {
        const response = await fetch(`${API_URL}/DeleteGreeting/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        const data = await response.json();
        alert(data.message);
        getAllMessages();
    } catch (error) {
        console.error("Error deleting greeting:", error);
    }
}
