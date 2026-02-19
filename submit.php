<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    // Aquí puedes agregar la lógica para enviar un correo o guardar en una base de datos
    echo "Gracias, $name. Tu mensaje ha sido enviado.";
}
?>