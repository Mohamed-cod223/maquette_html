document.getElementById("chat-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const userInput = document.getElementById("user-input").value;
    const chatBox = document.getElementById("chat-box");

    // Affiche le message de l'utilisateur
    chatBox.innerHTML += `<p><strong>Vous:</strong> ${userInput}</p>`;

    // Envoie le message à Flask
    const response = await fetch("/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();

    // Affiche la réponse du bot
    chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.response}</p>`;

    // Vide le champ de saisie
    document.getElementById("user-input").value = "";

    // Scroll automatique vers le bas
    chatBox.scrollTop = chatBox.scrollHeight;
});
