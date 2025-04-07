document.addEventListener("DOMContentLoaded", () => {
    const registerBtn = document.getElementById("registerBtn");
    const loginBtn = document.getElementById("loginBtn");
    const registerDropdown = document.getElementById("registerDropdown");
    const loginDropdown = document.getElementById("loginDropdown");
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const registerMessage = document.getElementById("registerMessage");
    const loginMessage = document.getElementById("loginMessage");
    const logoutBtn = document.getElementById("logoutBtn");
    const uploadForm = document.getElementById("uploadForm");
    const gallery = document.getElementById("gallery");
    const sidebar = document.getElementById("sidebar");

    let selectedImage = null; // Variable para almacenar la imagen seleccionada

    // Alternar visibilidad de menús desplegables
    registerBtn?.addEventListener("click", () => {
        toggleDropdown(registerDropdown);
        loginDropdown.style.display = "none";
    });

    loginBtn?.addEventListener("click", () => {
        toggleDropdown(loginDropdown);
        registerDropdown.style.display = "none";
    });

    function toggleDropdown(dropdown) {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    }

    // Registro de usuario
    registerForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;

        if (username && password && email) {
            localStorage.setItem("user", JSON.stringify({ username, password, email }));
            registerMessage.textContent = "Registro exitoso.";
            registerMessage.style.color = "green";
            setTimeout(() => {
                window.location.href = "fotos.html";
            }, 2000);
        } else {
            registerMessage.textContent = "Todos los campos son obligatorios.";
            registerMessage.style.color = "red";
        }
    });

    // Inicio de sesión
    loginForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && username === storedUser.username && password === storedUser.password) {
            loginMessage.textContent = "Inicio de sesión exitoso.";
            loginMessage.style.color = "green";
            setTimeout(() => {
                window.location.href = "fotos.html";
            }, 2000);
        } else {
            loginMessage.textContent = "Usuario o contraseña incorrectos.";
            loginMessage.style.color = "red";
        }
    });

    // Cerrar sesión
    logoutBtn?.addEventListener("click", () => {
        localStorage.removeItem("activeSession");
        window.location.href = "index.html";
    });

    // Subir fotos
    uploadForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const fileInput = document.getElementById("imageUpload");
        const description = document.getElementById("description").value;

        if (fileInput.files.length > 0) {
            const reader = new FileReader();

            reader.onload = () => {
                const container = document.createElement("div");
                const img = document.createElement("img");
                const caption = document.createElement("p");

                img.src = reader.result;
                img.alt = description;
                caption.textContent = description;

                // Evento para seleccionar imagen
                img.addEventListener("click", () => {
                    selectedImage = container; // Guardar el contenedor seleccionado
                    showImageControls(caption, container); // Mostrar botones de edición/eliminación
                });

                // Agregar elementos al contenedor
                container.appendChild(img);
                container.appendChild(caption);
                gallery.appendChild(container);
            };

            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    // Mostrar botones en la barra lateral para editar/eliminar
    function showImageControls(caption, container) {
        const controls = document.createElement("div");
        controls.id = "imageControls";

        // Botón para editar descripción
        const editBtn = document.createElement("button");
        editBtn.textContent = "Editar Descripción";
        editBtn.addEventListener("click", () => {
            const newDescription = prompt("Edita la descripción:", caption.textContent);
            if (newDescription !== null) {
                caption.textContent = newDescription; // Actualizar descripción
            }
        });

        // Botón para eliminar fotografía
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar Foto";
        deleteBtn.addEventListener("click", () => {
            gallery.removeChild(container); // Eliminar la foto del DOM
            controls.remove(); // Ocultar controles
        });

        // Limpiar controles previos si existen
        const existingControls = sidebar.querySelector("#imageControls");
        if (existingControls) {
            existingControls.remove();
        }

        // Agregar botones al contenedor de controles
        controls.appendChild(editBtn);
        controls.appendChild(deleteBtn);

        // Mostrar controles en la barra lateral
        sidebar.appendChild(controls);
    }
});
