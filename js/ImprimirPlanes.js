export function ImprimirPlanes(planes) {
    let htmlPlanes = document.getElementById("Planes");
    htmlPlanes.innerHTML = "";

    for (let i = 0; i < planes.length; i++) {
        const plan = planes[i];
        htmlPlanes.innerHTML += `
            <div class="Planes__Plan">
                <div class="Planes__Plan__Precio">
                    <h3>${plan.nombre}</h3>
                    <h1>$${plan.prima}</h1>
                </div>
                <div class="Planes__Plan__Contratar">
                    <button class="Planes__Plan__Contratar__Btn">Contratar</button>
                    <p class="Planes__Plan__Contratar__Descripcion">${plan.descripcion}</p>
                </div>`
            +
            ImprimirCoberturas(plan.coberturas);
        `
            </div>
        `;
    }
}

function ImprimirCoberturas(coberturas) {
    let htmlCoberturas = `<div class="Planes__Plan__Coberturas">`;
    for (let i = 0; i < coberturas.length; i++) {
        const cobertura = coberturas[i];
        htmlCoberturas += `
                <h4 class="Planes__Plan__Coberturas__Item">${cobertura.descripcion}</h4>
        `

    }

    htmlCoberturas += `</div>`
    return htmlCoberturas;
}