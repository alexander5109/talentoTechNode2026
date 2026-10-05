import { readFile } from "node:fs/promises";

async function leerDatosGlobales(ruta) {
	const contenido = await readFile(ruta, "utf8");
	return JSON.parse(contenido);
}


async function fetchearDatosGlobales(ruta) {
	const respuesta = await fetch(ruta);
	if (!respuesta.ok) {
		throw new Error(`Error al obtener los datos: ${respuesta.status} ${respuesta.statusText}`);
	}
	return await respuesta.json();
}

function obtenerId(recurso) {
	const partes = recurso.split("/");
	return {
		nombre: partes[0],
		id: partes[1] ? Number(partes[1]) : null,
	};
}

async function main() {
	const argumentos = process.argv.slice(2);
	const metodo = argumentos[0]?.toUpperCase();
	const recursoArgumento = argumentos[1];

	if (!new Set(["GET", "POST", "DELETE"]).has(metodo)) {
		throw new Error(`Método actualmente no permitido: ${metodo}`);
	}

	if (!recursoArgumento) {
		throw new Error("Debe indicar un recurso.");
	}
	const datos = await leerDatosGlobales("./data/datos.json");
	const recurso = obtenerId(recursoArgumento);
	const recursoDatos = datos[recurso.nombre] || await fetchearDatosGlobales(`https://fakestoreapi.com/${recursoArgumento}`); //trucazo, trabajo una api de lo que verdaderamente me interesa  y si me mandan "products", ahi si consumo la api berreta de fakestoreapi 

	if (!recursoDatos) {
		throw new Error(`Recurso desconocido: ${recurso.nombre}`);
	}

	switch (metodo) {
		case "GET":
			if (recurso.id === null) {
				console.log(recursoDatos);
				break;
			}
			const medico = recursoDatos.find(medico => medico.id === recurso.id);
			if (!medico) {
				throw new Error(`No existe el médico con id ${recurso.id}.`);
			}
			console.log(medico);
			break;


		case "POST":
			const [nombre, especialidad] = argumentos.slice(2);
			if (!nombre || !especialidad) {
				throw new Error("Para crear un médico debe indicar nombre y especialidad.");
			}
			const medicosIds = recursoDatos.map(medico => medico.id)
			const nuevoId = Math.max(...medicosIds) + 1;
			const nuevoMedico = {
				id: nuevoId,
				nombre,
				especialidad,
			};
			recursoDatos.push(nuevoMedico);
			console.log("Médico creado:");
			console.log(nuevoMedico);
			break;


		case "DELETE":
			if (recurso.id === null) {
				throw new Error("Debe indicar el id del médico a eliminar.");
			}
			const indice = recursoDatos.findIndex(medico => medico.id === recurso.id);
			if (indice === -1) {
				throw new Error(`No existe el médico con id ${recurso.id}.`);
			}
			const eliminado = recursoDatos.splice(indice, 1)[0];
			console.log("Médico eliminado:");
			console.log(eliminado);
			break;
	}
}

main().catch(error => {
	console.error(error);
	console.error("\nCausa:", error.cause);
	process.exit(1);
});