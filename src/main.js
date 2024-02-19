let produtos = document.getElementById("produtos");

let dados = JSON.parse(localStorage.getItem("dados")) || [];

let geraListaProdutos = () => {
    return (produtos.innerHTML = itensDadosLocal
        .map((x) => {
            let { id } = x;
            let buscaItem = itensDadosLocal.find((y) => y.id === id);
            let buscaDados = dados.find((z) => z.id === id);
            let viewStatus = buscaDados === undefined ? "visible" : "hidden";
            return `
            <div id="produto-${id}" class="item-lista">
                <img id="img-${id}" class="img-item-lista" src="${buscaItem.img}" alt="">

                <div class="info-item-lista">
                    <h3>${buscaItem.nome}</h3>

                    <p>${buscaItem.desc}</p>

                    <div class="preco-botoes">
                        <h2>R$ ${buscaItem.preco}</h2>

                        <div class="botoes-item-lista">
                            <input id="${id}" type="hidden">
                            <i onclick="deletaItem(${id})" class="bi bi-cart-dash-fill"></i>
                            <div id="btn-add-${id}" style="visibility: ${viewStatus}">
                                <i onclick="adicionaItem(${id})" class="bi bi-cart-plus-fill"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        })
        .join("")
    );
};

geraListaProdutos();

let adicionaItem = (itemEscolhido) => {
    let buscaItem = dados.find((x) => x.id === itemEscolhido.id);

    if (buscaItem === undefined) {
        dados.push({
            id: itemEscolhido.id,
            qtd: 1,
        });
        document.getElementById("img-"+itemEscolhido.id).classList.add("filtro");
        document.getElementById("btn-add-"+itemEscolhido.id).style.visibility = "hidden";
    }

    atualizaCarrinho();
};

let deletaItem = (itemEscolhido) => {
    let buscaItem = dados.find((x) => x.id === itemEscolhido.id);

    if (buscaItem !== undefined) {
        var i = dados.findIndex((x) => x.id === buscaItem.id);
        dados.splice(i, 1);
        document.getElementById("img-"+itemEscolhido.id).classList.remove("filtro");
        document.getElementById("btn-add-"+itemEscolhido.id).style.visibility = "visible";
    }

    atualizaCarrinho();
};

let atualizaCarrinho = () => {
    let totalCarrinho = document.getElementById("total");
    totalCarrinho.innerHTML = dados.map((x) => x.qtd).reduce((x, y) => x + y, 0);

    localStorage.setItem("dados", JSON.stringify(dados));
};

atualizaCarrinho();