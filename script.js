document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const whatsappBtn = document.getElementById("whatsapp-btn");

    // Respuestas predefinidas del chatbot
    const predefinedResponses = {
        "hola": "¡Hola! ¿En qué puedo ayudarte hoy?",
        "servicios": "Ofrecemos servicios como eliminación de reportes negativos, impugnación de fotodetecciones y más.",
        "contacto": "Puedes contactarnos a través del formulario de contacto o hablar directamente con un profesional por WhatsApp.",
        "gracias": "¡De nada! Estoy aquí para ayudarte."
    };

    // Mostrar el botón de WhatsApp después de ciertas interacciones
    function showWhatsAppButton() {
        whatsappBtn.style.display = "block";
    }

    // Manejar el clic en el botón de enviar
    sendBtn.addEventListener("click", function () {
        const userMessage = userInput.value.trim().toLowerCase();

        if (userMessage) {
            // Mostrar mensaje del usuario
            chatBox.innerHTML += `<p class="user-msg"><strong>Tú:</strong> ${userMessage}</p>`;

            // Verificar si hay una respuesta predefinida
            if (predefinedResponses[userMessage]) {
                chatBox.innerHTML += `<p class="bot-message"><strong>Bot:</strong> ${predefinedResponses[userMessage]}</p>`;
            } else {
                // Respuesta genérica si no hay coincidencia
                chatBox.innerHTML += `<p class="bot-message"><strong>Bot:</strong> Lo siento, no tengo una respuesta para eso. ¿Te gustaría hablar con un profesional?</p>`;
                showWhatsAppButton(); // Mostrar el botón de WhatsApp
            }

            // Limpiar input y desplazar el chat hacia abajo
            userInput.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    });

    // Redirigir a WhatsApp al hacer clic en el botón
    whatsappBtn.addEventListener("click", function () {
        const phoneNumber = "573001234567"; // Reemplaza con tu número de WhatsApp Business
        const message = encodeURIComponent("Hola, quiero más información sobre sus servicios.");
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    });
});document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const confirmationMessage = document.getElementById("confirmation-message");

    // Validación personalizada para el nombre
    const nameInput = document.getElementById("name");
    nameInput.addEventListener("input", function () {
        if (nameInput.value.length < 3) {
            nameInput.setCustomValidity("El nombre debe tener al menos 3 caracteres.");
        } else {
            nameInput.setCustomValidity("");
        }
    });

    // Manejar el envío del formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío tradicional

        // Validar el formulario
        if (form.checkValidity()) {
            // Simular el envío del formulario (puedes reemplazar esto con una solicitud AJAX)
            setTimeout(function () {
                form.reset(); // Limpiar el formulario
                confirmationMessage.classList.remove("hidden");
                confirmationMessage.classList.add("visible");
            }, 1000); // Simular un retraso de 1 segundo
        } else {
            alert("Por favor, completa todos los campos correctamente.");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const confirmationMessage = document.getElementById("confirmation-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío tradicional

        // Validar el formulario
        if (form.checkValidity()) {
            const formData = new FormData(form);

            // Enviar datos con AJAX
            fetch("submit.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    form.reset(); // Limpiar el formulario
                    confirmationMessage.classList.remove("hidden");
                    confirmationMessage.classList.add("visible");
                } else {
                    alert("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
            });
        } else {
            alert("Por favor, completa todos los campos correctamente.");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const sugerenciasForm = document.getElementById("sugerencias-form");
    const confirmacionMessage = document.getElementById("sugerencias-confirmacion");

    sugerenciasForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío tradicional

        // Simular el envío del formulario (puedes reemplazar esto con una solicitud AJAX)
        setTimeout(function () {
            sugerenciasForm.reset(); // Limpiar el formulario
            confirmacionMessage.classList.remove("hidden");
            confirmacionMessage.classList.add("visible");
        }, 1000); // Simular un retraso de 1 segundo
    });
});
document.addEventListener("DOMContentLoaded", function () {

    const chatContainer = document.querySelector(".chat-container");

    chatbotToggle.addEventListener("click", function () {
        chatContainer.classList.toggle("visible");
    });
});

// --- ANIMACIONES DE SCROLL (REVEAL) ---
document.addEventListener("DOMContentLoaded", function () {
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, // El elemento aparece cuando el 15% es visible en pantalla
        rootMargin: "0px 0px -50px 0px" 
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Deja de observar una vez que ya apareció
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});