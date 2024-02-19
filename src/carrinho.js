let botoes = document.getElementById("botoes");
let carrinho = document.getElementById("carrinho");
let dados = JSON.parse(localStorage.getItem("dados")) || [];

let atualizaCarrinho = () => {
    let totalCarrinho = document.getElementById("total");
    totalCarrinho.innerHTML = dados.map((x) => x.qtd).reduce((x, y) => x + y, 0);

    localStorage.setItem("dados", JSON.stringify(dados));
};

atualizaCarrinho();

let geraListaCarrinho = () => {
    if (dados.length === 0)
    {
        botoes.innerHTML = `
        <h2>O carrinho está vazio!</h2>
        <a href="index.html">
            <button class="btn-home">Voltar para home</button>
        </a>
        `;
        carrinho.innerHTML = ``;
    }
    else
    {
        return (carrinho.innerHTML = dados
            .map((x) => {
                let { id } = x;
                let buscaItem = itensDadosLocal.find((y) => y.id === id) || [];
                let { nome, preco, desc, img } = buscaItem;
                return `
                <div id="produto-${id}" class="item-carrinho">
                    <img class="img-item-carrinho" src="${img}" alt="" />

                    <div class="detalhe-carrinho">
                        <div class="nome-preco-x">
                            <h5 class="nome-preco">
                                <p>${nome}</p>
                                <p class="preco-item-carrinho">R$ ${preco}</p>
                            </h5>

                            <input id="${id}" type="hidden"></input>
                            <i onclick="deletaItemCarrinho(${id})" class="bi bi-x-lg"></i>
                        </div>

                        <h6 class="desc-item-carrinho">
                            <p>${desc}</p>
                        </h6>
                    </div>
                </div>
                `;
        }).join(""));
    }
};

geraListaCarrinho();

let deletaItemCarrinho = (itemEscolhido) => {
    dados = dados.filter((x) => x.id !== itemEscolhido.id);
    atualizaCarrinho();
    geraListaCarrinho();
    totalCarrinho();

    localStorage.setItem("dados", JSON.stringify(dados));
};

let deletaTudo = () => {
    dados = [];
    atualizaCarrinho();
    geraListaCarrinho();
    totalCarrinho();

    localStorage.setItem("dados", JSON.stringify(dados));
};

let totalCarrinho = () => {
    if (dados.length === 0) return
    else {
        let total = dados
        .map((x) => {
            let { id, qtd } = x;
            let buscaItem = itensDadosLocal.find((y) => y.id === id) || [];
            return qtd * buscaItem.preco;
        })
        .reduce((x, y) => x + y, 0);

        botoes.innerHTML = `
        <h2>Total: R$ ${total}</h2>
        <button class="btn-confirma">Confirma Compra</buttom>
        <button onclick="deletaTudo()" class="btn-limpaTudo">Limpa Carrinho</buttom>
        `;
    }
};

totalCarrinho();