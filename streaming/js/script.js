const form = document.querySelector("#formBusca");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const inputTitulo = document.querySelector("#titulo");
    const resultado = document.querySelector("#resultado");
    const titulo = inputTitulo.value.trim();

    if (titulo === "") {
        alert("Por favor, digite o nome do filme.");
        return;
    }

    if (titulo.length <= 3) {
        alert("Número de caracteres insuficiente.");
        return;
    }

    inputTitulo.value = "";

    const resposta = await fetch(
        "https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(titulo)
    );

    const dados = await resposta.json();
    const filtrados = dados.filter(item =>
        item.show.name.toLowerCase().includes(titulo.toLowerCase())
    );

    mostrarResultado(filtrados);

    function mostrarResultado(lista) {

        resultado.innerHTML = "";

        resultado.classList.add("row"); 

        if (lista.length === 0) {
            resultado.innerHTML = `
                <div class="col-12">
                    <h2 class="card p-3 mb-2 mt-3 text-danger text-center">
                        Nenhum resultado encontrado.
                    </h2>
                </div>
            `;
            return;
        }

        lista.forEach(item => {

            const show = item.show;
            const col = document.createElement("div");

            col.classList.add("col-md-6", "mb-4", "p-1");
            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="row g-0 h-100">
                        <div class="col-md-4">
                            <img 
                                src="${show.image?.original || "https://via.placeholder.com/300x450"}" 
                                class="img-fluid rounded-start h-100 object-fit-cover" 
                                style="height: 250px; object-fit: cover;"
                                alt="${show.name}"
                            >
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${show.name}
                                </h5>
                                <strong>Idioma:</strong>
                                <p class="card-text">
                                    ${show.language || "Idioma não informado"}
                                </p>
                                <strong>Gênero:</strong>
                                <p class="card-text">
                                    <small class="text-body-secondary">
                                        ${show.genres.join(", ") || "Gênero não informado"}
                                    </small>
                                </p>
                                <strong>Descrição:</strong>
                                <p class="card-text">
                                    <small class="text-body-secondary">
                                        ${show.summary
                                            ? show.summary.replace(/<[^>]+>/g, "").slice(0, 150) + "..."
                                            : "Descrição não informada"}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            resultado.appendChild(col);
        });
    }
});