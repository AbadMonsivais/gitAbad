const inputLugar = document.getElementById("lugar");
const botonBuscar = document.getElementById("buscar");
const resultados = document.getElementById("resultados");
const mensaje = document.getElementById("mensaje");

async function buscarLugar() {

    const lugar = inputLugar.value.trim();

    if (!lugar) {
        mensaje.textContent = "Ingresa un lugar válido.";
        resultados.innerHTML = "";
        return;
    }

    mensaje.textContent = "Buscando...";
    resultados.innerHTML = "";

    try {
        const respuesta = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(lugar)}&count=1&language=es&format=json`
        );

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener la información.");
        }

        const data = await respuesta.json();

        if (!data.results || data.results.length === 0) {
            throw new Error("No se encontró el lugar.");
        }

        const ciudad = data.results[0];

        mensaje.textContent = "";

        resultados.innerHTML = `
            <h2>${ciudad.name}</h2>
            <ul>
                <li><strong>País:</strong> ${ciudad.country}</li>
                <li><strong>Estado:</strong> ${ciudad.admin1 || "No disponible"}</li>
                <li><strong>Latitud:</strong> ${ciudad.latitude}</li>
                <li><strong>Longitud:</strong> ${ciudad.longitude}</li>
                <li><strong>Zona horaria:</strong> ${ciudad.timezone || "No disponible"}</li>
            </ul>
        `;

    } catch (error) {
        mensaje.textContent = "Ocurrió un error al realizar la consulta.";
        resultados.innerHTML = "";
        console.error(error);
    }
}

botonBuscar.addEventListener("click", buscarLugar);