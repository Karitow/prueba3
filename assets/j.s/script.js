const btnConversion = document.querySelector('#conversion')
const urlBase = "https://mindicador.cl/api"
async function conversor() {
    try {
    const clp = document.querySelector('#pesos').value
    const monedaAelegir = document.querySelector('#convertir').value
    const urlApi = (`${urlBase}/${monedaAelegir}`)
    const res = await fetch(urlApi)
    const data = await res.json()

    const valorCero = data.serie[0]['valor']

    const total = document.querySelector('#resultado')
    const resultado = (Number(clp) / valorCero).toFixed(2)

    total.innerHTML = `<strong>Resultado: $ ${resultado}</strong>`

    const labels = data.serie.slice(0,8).reverse().map((datosGrafico) => {
        return datosGrafico.fecha.substring(0,8);

    })

    const datos = data.serie.slice(0,8).map((datosGrafico) => {
        return datosGrafico.valor;
    })
    
    const datasets = [
        {
            label: monedaAelegir,
            borderColor: "blue",
            data: datos
        }
    ]
    const objectGraphic = {labels, datasets};

    const config = {
        type: "line",
        data: objectGraphic
    }

    const grafico = document.querySelector('#myChart')
    grafico.style.backgroundColor = 'white';
    new Chart(grafico, config);
}

catch(e) {
    alert(e.message)
}
}
    btnConversion.addEventListener("click", conversor)