/* ========================================
   PÁGINA DE TORNEIOS
======================================== */

function obterMesTorneio(data) {

    const meses = {
        "01": "janeiro",
        "02": "fevereiro",
        "03": "março",
        "04": "abril",
        "05": "maio",
        "06": "junho",
        "07": "julho",
        "08": "agosto",
        "09": "setembro",
        "10": "outubro",
        "11": "novembro",
        "12": "dezembro"
    };

    const mes = data.split("/")[1];

    return meses[mes] || "";
}


function carregarTorneios() {

    const listaTorneios =
        document.getElementById("lista-torneios");

    if (!listaTorneios) {
        return;
    }

    listaTorneios.innerHTML = "";

    Object.entries(dadosTorneios).forEach(
        function([identificador, torneio]) {

            const partesData =
                torneio.data.split("/");

            const ano =
                partesData[2];

            const mes =
                obterMesTorneio(torneio.data);

            const card =
                document.createElement("article");

            card.classList.add(
                "card-torneio-pagina"
            );

            card.dataset.mes = mes;
            card.dataset.ano = ano;

            card.innerHTML = `

                <h3>${torneio.nome}</h3>

                <p>
                    <strong>Data:</strong>
                    ${torneio.data}
                </p>

                <p>
                    <strong>Horário:</strong>
                    ${torneio.horario}
                </p>

                <p>
                    <strong>Local:</strong>
                    ${torneio.local}
                </p>

                <p>
                    <strong>Formato:</strong>
                    ${torneio.formato}
                </p>

                <p>
                    <strong>Participantes:</strong>
                    ${torneio.participantes}
                </p>

                <a href="torneio.html?id=${encodeURIComponent(identificador)}">
                    Ver resultados
                </a>
            `;

            listaTorneios.appendChild(card);
        }
    );
}


/* ========================================
   FILTRO DE TORNEIOS
======================================== */

const busca =
    document.getElementById("busca");

const filtroMes =
    document.getElementById("mes");

const filtroAno =
    document.getElementById("ano");


if (busca && filtroMes && filtroAno) {

    function filtrarTorneios() {

        const textoBusca =
            busca.value
                .trim()
                .toLowerCase();

        const mesSelecionado =
            filtroMes.value;

        const anoSelecionado =
            filtroAno.value;

        const torneios =
            document.querySelectorAll(
                ".card-torneio-pagina"
            );

        torneios.forEach(function(torneio) {

            const nome =
                torneio
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();

            const mes =
                torneio.dataset.mes;

            const ano =
                torneio.dataset.ano;

            const correspondeNome =
                nome.includes(textoBusca);

            const correspondeMes =
                mesSelecionado === "" ||
                mes === mesSelecionado;

            const correspondeAno =
                anoSelecionado === "" ||
                ano === anoSelecionado;

            if (
                correspondeNome &&
                correspondeMes &&
                correspondeAno
            ) {

                torneio.style.display = "";

            } else {

                torneio.style.display = "none";
            }
        });
    }


    busca.addEventListener(
        "input",
        filtrarTorneios
    );

    filtroMes.addEventListener(
        "change",
        filtrarTorneios
    );

    filtroAno.addEventListener(
        "change",
        filtrarTorneios
    );
}

/* ========================================
   PÁGINA DE JOGADORES
======================================== */

function carregarJogadores() {

    const listaJogadores =
        document.getElementById("lista-jogadores");

    if (!listaJogadores) {
        return;
    }

    listaJogadores.innerHTML = "";

    const jogadoresMap = {};

    Object.values(dadosTorneios).forEach(function(torneio) {

        torneio.classificacao.forEach(function(participante) {

            const nome = participante.nome;

            if (!jogadoresMap[nome]) {

                jogadoresMap[nome] = {
                    nome: nome,
                    vitorias: 0,
                    derrotas: 0,
                    decks: {}
                };

            }

            const jogador = jogadoresMap[nome];

            jogador.vitorias += participante.vitorias;
            jogador.derrotas += participante.derrotas;

            if (
                participante.deck &&
                participante.deck.trim().toLowerCase() !== "não informado"
            ) {

                const nomeDeck = participante.deck.trim();

                jogador.decks[nomeDeck] =
                    (jogador.decks[nomeDeck] || 0) + 1;

            }

        });

    });

    const jogadoresOrdenados =
        Object.values(jogadoresMap)
            .sort(function(a, b) {
                return a.nome.localeCompare(b.nome);
            });

    jogadoresOrdenados.forEach(function(jogador) {

        const decksOrdenados =
            Object.entries(jogador.decks)
                .sort(function(a, b) {
                    return b[1] - a[1];
                });

        const deckPrincipal =
            decksOrdenados.length > 0
                ? decksOrdenados[0][0]
                : "Não informado";

        const card =
            document.createElement("article");

        card.classList.add("card-jogador");

        card.innerHTML = `

            <h3>${jogador.nome}</h3>

            <p>
                <strong>Deck:</strong>
                ${deckPrincipal}
            </p>

            <p>
                <strong>Vitórias:</strong>
                ${jogador.vitorias}
            </p>

            <p>
                <strong>Derrotas:</strong>
                ${jogador.derrotas}
            </p>

            <a href="jogador.html?nome=${encodeURIComponent(jogador.nome)}">
                Ver perfil
            </a>

        `;

        listaJogadores.appendChild(card);

    });

}


/* ========================================
   BUSCA DE JOGADORES
======================================== */

const buscaJogador =
    document.getElementById("busca-jogador");

if (buscaJogador) {

    buscaJogador.addEventListener(
        "input",
        function() {

            const texto =
                buscaJogador.value
                    .trim()
                    .toLowerCase();

            /*
             * Busca os cards neste momento,
             * depois de eles terem sido criados.
             */
            const jogadores =
                document.querySelectorAll(
                    ".card-jogador"
                );

            jogadores.forEach(function(jogador) {

                const nome =
                    jogador
                        .querySelector("h3")
                        .textContent
                        .toLowerCase();

                if (nome.includes(texto)) {

                    jogador.style.display = "";

                } else {

                    jogador.style.display = "none";

                }

            });

        }
    );

}


/* ========================================
   ESTATÍSTICAS AUTOMÁTICAS DOS DECKS
======================================== */

function calcularEstatisticasDecks() {

    const estatisticas = {};

    Object.values(dadosTorneios).forEach(function(torneio) {

        torneio.classificacao.forEach(function(participante) {

            const nomeDeck = participante.deck;

            // Não contabiliza decks desconhecidos.
            if (
                !nomeDeck ||
                nomeDeck.trim().toLowerCase() === "não informado"
            ) {
                return;
            }

            const identificadorDeck = nomeDeck
                .trim()
                .toLowerCase()
                .replaceAll(" ", "-");

            if (!estatisticas[identificadorDeck]) {

                estatisticas[identificadorDeck] = {

                    nome: nomeDeck,

                    descricao:
                        "Deck utilizado nos torneios de Yu-Gi-Oh! de São Luís.",

                    jogadores: 0,
                    torneios: 0,
                    vitorias: 0,
                    derrotas: 0,
                    winrate: "0%",

                    jogadoresLista: [],
                    jogadoresSet: new Set()

                };

            }

            const deck = estatisticas[identificadorDeck];

            // Cada participação corresponde a um jogador
            // utilizando esse deck em um torneio.
            deck.torneios += 1;

            deck.vitorias += participante.vitorias;
            deck.derrotas += participante.derrotas;

            deck.jogadoresSet.add(participante.nome);

        });

    });

    /* ========================================
       FINALIZA AS ESTATÍSTICAS
    ======================================== */

    Object.values(estatisticas).forEach(function(deck) {

        deck.jogadores = deck.jogadoresSet.size;

        deck.jogadoresLista = Array.from(
            deck.jogadoresSet
        );

        const partidas = deck.vitorias + deck.derrotas;

        if (partidas > 0) {

            deck.winrate = (
                deck.vitorias / partidas * 100
            )
                .toFixed(1)
                .replace(".", ",") + "%";

        }

        delete deck.jogadoresSet;

    });

    return estatisticas;

}

/* ========================================
   DADOS DOS DECKS
======================================== */

let dadosDecks = {};

/* ========================================
   CARDS DINÂMICOS DE DECKS
======================================== */

const listaDecks =
    document.getElementById("lista-decks");

function carregarCardsDecks() {

if (!listaDecks) {
        return;
    }

    // Limpa os cards anteriores.
    listaDecks.innerHTML = "";

    const decksCadastrados = Object.entries(dadosDecks);

    decksCadastrados.forEach(function(deck) {

        const identificador = deck[0];
        const dados = deck[1];

        const decklistCorrespondente =
            Object.values(dadosDecklists).find(
        function(decklist) {
            return decklist.deck === dados.nome;
            }
        );

        const cartaDestaque =
                decklistCorrespondente?.cartaDestaque;

        const card = document.createElement("article");

        card.classList.add("card-deck-pagina");

        card.innerHTML = `

            ${
                cartaDestaque
                    ? `
                <img
                class="carta-destaque-deck"
                src="imgYGO/cartas/${cartaDestaque}.jpg"
                alt=""
                >
                `
                : ""
            }

            <h3>${dados.nome}</h3>

            <p>
                <strong>Jogadores:</strong>
                ${dados.jogadores}
            </p>

            <p>
                <strong>Torneios:</strong>
                ${dados.torneios}
            </p>

            <p>
                <strong>Vitórias:</strong>
                ${dados.vitorias}
            </p>

            <p>
                <strong>Win Rate:</strong>
                ${dados.winrate}
            </p>

            <a href="deck.html?nome=${encodeURIComponent(identificador)}">
                Ver detalhes
            </a>

        `;

        listaDecks.appendChild(card);

    });
}

/* ========================================
   CARREGAR PERFIL REAL DO JOGADOR
======================================== */

function carregarPerfilJogador() {

    const parametros = new URLSearchParams(window.location.search);
    const nomeSelecionado = parametros.get("nome");

    const nomeJogador = document.getElementById("nome-jogador");

    // Executa somente na página de perfil.
    if (!nomeJogador || !nomeSelecionado) {
        return;
    }

    const descricaoJogador = document.getElementById("descricao-jogador");
    const torneiosJogador = document.getElementById("torneios-jogador");
    const vitoriasJogador = document.getElementById("vitorias-jogador");
    const derrotasJogador = document.getElementById("derrotas-jogador");
    const winrateJogador = document.getElementById("winrate-jogador");
    const deckJogador = document.getElementById("deck-jogador");
    const usoDeck = document.getElementById("uso-deck");
    const historicoJogador = document.getElementById("lista-historico-jogador");

    let totalTorneios = 0;
    let totalVitorias = 0;
    let totalDerrotas = 0;

    const decksUtilizados = {};
    const historico = [];

    Object.entries(dadosTorneios).forEach(function([torneioId, torneio]) {

        const participante = torneio.classificacao.find(function(jogador) {
            return jogador.nome.trim().toLowerCase() ===
                nomeSelecionado.trim().toLowerCase();
        });

        if (!participante) {
            return;
        }

        totalTorneios++;
        totalVitorias += participante.vitorias;
        totalDerrotas += participante.derrotas;

        if (
            participante.deck &&
            participante.deck !== "Não informado"
        ) {
            decksUtilizados[participante.deck] =
                (decksUtilizados[participante.deck] || 0) + 1;
        }

        historico.push({
            id: torneioId,
            nome: torneio.nome,
            local: torneio.local,
            data: torneio.data,
            posicao: participante.posicao,
            deck: participante.deck
        });

    });

    if (totalTorneios === 0) {
        nomeJogador.textContent = "Jogador não encontrado";
        return;
    }

    const totalPartidas = totalVitorias + totalDerrotas;

    const winrate = totalPartidas > 0
        ? ((totalVitorias / totalPartidas) * 100).toFixed(1)
        : "0.0";

    const decksOrdenados = Object.entries(decksUtilizados)
        .sort(function(a, b) {
            return b[1] - a[1];
        });

    const deckPrincipal = decksOrdenados.length > 0
        ? decksOrdenados[0][0]
        : "Não informado";

    const usoDeckPrincipal = decksOrdenados.length > 0
        ? ((decksOrdenados[0][1] / totalTorneios) * 100).toFixed(0)
        : "0";

    nomeJogador.textContent = nomeSelecionado;

    descricaoJogador.textContent =
        "Histórico de participações nos torneios cadastrados no YgoSLZ.";

    torneiosJogador.textContent = totalTorneios;
    vitoriasJogador.textContent = totalVitorias;
    derrotasJogador.textContent = totalDerrotas;
    winrateJogador.textContent = winrate + "%";
    deckJogador.textContent = deckPrincipal;
    usoDeck.textContent = usoDeckPrincipal + "%";

    const linkDeckJogador =
    document.getElementById("link-deck-jogador");

if (linkDeckJogador && deckPrincipal !== "Não informado") {

    const deckCorrespondente =
        Object.entries(dadosDecks).find(
            function([identificador, dados]) {
                return dados.nome === deckPrincipal;
            }
        );

    if (deckCorrespondente) {

        const identificadorDeck =
            deckCorrespondente[0];

        linkDeckJogador.href =
            `deck.html?nome=${encodeURIComponent(identificadorDeck)}`;
    }
}

    historicoJogador.innerHTML = "";

    historico.forEach(function(torneio) {

        const item = document.createElement("article");

        item.classList.add("item-historico");

        item.innerHTML = `
            <div>
                <h3>
                    <a href="torneio.html?id=${encodeURIComponent(torneio.id)}">
                        ${torneio.nome}
                    </a>
                </h3>

                <p>${torneio.local} — ${torneio.data}</p>
                <p>Deck: ${torneio.deck}</p>
            </div>

            <span class="posicao">
                ${torneio.posicao}
            </span>
        `;

        historicoJogador.appendChild(item);

    });

}

/* ========================================
   RANKING DINÂMICO
======================================== */

const corpoRanking =
    document.getElementById("corpo-ranking");

const periodo =
    document.getElementById("periodo");


function calcularRanking(anoSelecionado = "") {

    const jogadoresRanking = {};

    Object.values(dadosTorneios).forEach(function(torneio) {

        const anoTorneio = torneio.data.split("/")[2];

        if (
            anoSelecionado !== "" &&
            anoTorneio !== anoSelecionado
        ) {
            return;
        }

        torneio.classificacao.forEach(function(participante) {

            const identificador =
                participante.nome.trim().toLowerCase();

            if (!jogadoresRanking[identificador]) {

                jogadoresRanking[identificador] = {
                    nome: participante.nome,
                    deck: "Não informado",
                    vitorias: 0,
                    derrotas: 0,
                    pontos: 0
                };

            }

            const jogador = jogadoresRanking[identificador];

            jogador.vitorias += participante.vitorias;
            jogador.derrotas += participante.derrotas;
            jogador.pontos += participante.vitorias * 3;

            if (
                participante.deck &&
                participante.deck !== "Não informado"
            ) {
                jogador.deck = participante.deck;
            }

        });

    });

    const ranking = Object.values(jogadoresRanking);

    ranking.sort(function(a, b) {

        if (b.pontos !== a.pontos) {
            return b.pontos - a.pontos;
        }

        return a.nome.localeCompare(b.nome, "pt-BR");

    });

    return ranking;
}


function atualizarRanking() {

    if (!corpoRanking || !periodo) {
        return;
    }

    corpoRanking.innerHTML = "";

    const ranking = calcularRanking(periodo.value);

    ranking.forEach(function(jogador, index) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${index + 1}º</td>
            <td><a href="jogador.html?nome=${encodeURIComponent(jogador.nome)}">
            ${jogador.nome}</a></td>
            <td>${jogador.deck}</td>
            <td>${jogador.vitorias}</td>
            <td>${jogador.derrotas}</td>
            <td>${jogador.pontos}</td>
        `;

        corpoRanking.appendChild(linha);

    });

}


if (corpoRanking && periodo) {

    periodo.addEventListener(
        "change",
        atualizarRanking
    );

}


/* ========================================
   BUSCA DE DECKS
======================================== */

const buscaDeck =
    document.getElementById("busca-deck");


if (buscaDeck) {

    buscaDeck.addEventListener("input", function() {

        const texto =
            buscaDeck.value.toLowerCase();


        const cardsDeck =
            document.querySelectorAll(
                ".card-deck-pagina"
            );


        cardsDeck.forEach(function(deck) {

            const nome =
                deck
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();


            if (nome.includes(texto)) {

                deck.style.display = "";

            } else {

                deck.style.display = "none";

            }

        });

    });

}


/* ========================================
   PÁGINA DINÂMICA DO DECK
======================================== */

function carregarPaginaDeck() {

    const nomeDeckElemento =
        document.getElementById("nome-deck");

    // Executa somente na página individual do deck.
    if (!nomeDeckElemento) {
        return;
    }

    const parametrosDeck =
        new URLSearchParams(window.location.search);

    const deckSelecionado =
        parametrosDeck.get("nome");

    const deck = dadosDecks[deckSelecionado];

    if (!deck) {
        nomeDeckElemento.textContent =
            "Deck não encontrado";
        return;
    }

    const descricaoDeck =
        document.getElementById("descricao-deck");

    const jogadoresDeck =
        document.getElementById("jogadores-deck");

    const torneiosDeck =
        document.getElementById("torneios-deck");

    const vitoriasDeck =
        document.getElementById("vitorias-deck");

    const winrateDeck =
        document.getElementById("winrate-deck");

    const listaJogadoresDeck =
        document.getElementById("lista-jogadores-deck");

    const listaHistoricoDeck =
        document.getElementById("lista-historico-deck");


    /* INFORMAÇÕES GERAIS */

    nomeDeckElemento.textContent = deck.nome;
    descricaoDeck.textContent = deck.descricao;
    jogadoresDeck.textContent = deck.jogadores;
    torneiosDeck.textContent = deck.torneios;
    vitoriasDeck.textContent = deck.vitorias;
    winrateDeck.textContent = deck.winrate;


    /* JOGADORES QUE UTILIZARAM O DECK */

    if (listaJogadoresDeck) {

        listaJogadoresDeck.innerHTML = "";

        deck.jogadoresLista.forEach(function(nomeJogador) {
            
            const decklistJogador =
    Object.entries(dadosDecklists).find(function([id, decklist]) {

        return (
            decklist.jogador.trim().toLowerCase() ===
                nomeJogador.trim().toLowerCase() &&

            decklist.deck.trim().toLowerCase() ===
                deck.nome.trim().toLowerCase()
        );

    });

            const jogador =
                document.createElement("article");

            jogador.classList.add(
                "card-jogador-deck"
            );

           jogador.innerHTML = `
    <h3>${nomeJogador}</h3>

    <a href="jogador.html?nome=${encodeURIComponent(nomeJogador)}">
        Ver perfil
    </a>

    ${
        decklistJogador
            ? `
                <a href="decklist.html?id=${encodeURIComponent(decklistJogador[0])}">
                    Ver decklist
                </a>
            `
            : ""
    }
`;

            listaJogadoresDeck.appendChild(jogador);

        });

    }


    /* HISTÓRICO REAL DO DECK */

    if (listaHistoricoDeck) {

        listaHistoricoDeck.innerHTML = "";

        let encontrouHistorico = false;

        Object.entries(dadosTorneios).forEach(
            function([torneioId, torneio]) {

                torneio.classificacao.forEach(
                    function(participante) {

                        if (
                            !participante.deck ||
                            participante.deck.trim().toLowerCase() !==
                            deck.nome.trim().toLowerCase()
                        ) {
                            return;
                        }

                        encontrouHistorico = true;

                        const itemHistorico =
                            document.createElement("article");

                        itemHistorico.classList.add(
                            "item-historico-deck"
                        );

                        itemHistorico.innerHTML = `

                            <div class="dados-historico-deck">

                                <h3>
                                    <a href="torneio.html?id=${encodeURIComponent(torneioId)}">
                                        ${torneio.nome}
                                    </a>
                                </h3>

                                <p>
                                    <strong>Data:</strong>
                                    ${torneio.data}
                                </p>

                                <p>
                                    <strong>Jogador:</strong>
                                    ${participante.nome}
                                </p>

                                <p>
                                    <strong>Local:</strong>
                                    ${torneio.local}
                                </p>

                                <p>
                                    <strong>Colocação:</strong>
                                    ${participante.posicao}
                                </p>

                            </div>

                            <div class="resultado-historico-deck">

                                <span>
                                    ${participante.vitorias}V
                                </span>

                                <span>
                                    ${participante.derrotas}D
                                </span>

                            </div>
                        `;

                        listaHistoricoDeck.appendChild(
                            itemHistorico
                        );

                    }
                );

            }
        );

        if (!encontrouHistorico) {

            listaHistoricoDeck.innerHTML = `
                <p class="sem-historico">
                    Nenhum histórico encontrado
                    para este deck.
                </p>
            `;

        }

    }

}


/* ========================================
   INICIALIZAR RANKING
======================================== */

if (corpoRanking && periodo) {
    atualizarRanking();
}
// Calcula os decks depois de carregar os torneios.
dadosDecks = calcularEstatisticasDecks();

// Carrega o perfil somente depois de cadastrar os torneios.
carregarPerfilJogador();

// Cards da página de decks
carregarCardsDecks();

// Página individual do deck
carregarPaginaDeck();

// Página geral de jogadores
carregarJogadores();

// Página geral de torneios
carregarTorneios();

/* ========================================
   PÁGINA DINÂMICA DO TORNEIO
======================================== */

const parametrosTorneio =
    new URLSearchParams(
        window.location.search
    );

const torneioSelecionado =
    parametrosTorneio.get("id");

const corpoClassificacao =
        document.getElementById(
        "corpo-classificacao"
    );


if (
    torneioSelecionado &&
    dadosTorneios[torneioSelecionado]
) {

    const torneio =
        dadosTorneios[
            torneioSelecionado
        ];


    const nomeTorneio =
        document.getElementById(
            "nome-torneio"
        );

    const dataTorneio =
        document.getElementById(
            "data-torneio"
        );

    const horarioTorneio =
        document.getElementById(
            "horario-torneio"
        );

    const localTorneio =
        document.getElementById(
            "local-torneio"
        );

    const formatoTorneio =
        document.getElementById(
            "formato-torneio"
        );

    
    if (nomeTorneio) {

        nomeTorneio.textContent =
            torneio.nome;

        dataTorneio.textContent =
            torneio.data;

        horarioTorneio.textContent =
            torneio.horario;

        localTorneio.textContent =
            torneio.local;

        formatoTorneio.textContent =
            torneio.formato;

    }
/* ========================================
   CLASSIFICAÇÃO DO TORNEIO
======================================== */

if (corpoClassificacao &&
    Array.isArray(torneio.classificacao)) {

    corpoClassificacao.innerHTML = "";

    const participantesTorneio =
        document.getElementById("participantes-torneio");

    if (participantesTorneio) {
        participantesTorneio.textContent =
            torneio.participantes;
    }

    torneio.classificacao.forEach(function(participante) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${participante.posicao}</td>
            <td>${participante.nome}</td>
            <td>${participante.deck}</td>
            <td>${participante.vitorias ?? "-"}</td>
            <td>${participante.derrotas ?? "-"}</td>
            <td>${participante.pontos ?? "-"}</td>
        `;

        corpoClassificacao.appendChild(linha);

    });

    /* DECKLISTS DO TORNEIO */

    const listaDecklistsTorneio =
        document.getElementById("lista-decklists-torneio");

    if (listaDecklistsTorneio) {

        listaDecklistsTorneio.innerHTML = "";

        torneio.classificacao.forEach(function(participante) {

            const card = document.createElement("article");

            card.classList.add("card-decklist");

  const decklistEncontrada =
    Object.entries(dadosDecklists).find(
        function([id, decklist]) {

            return (
                decklist.jogador === participante.nome &&
                Array.isArray(decklist.torneios) &&
                decklist.torneios.includes(torneioSelecionado)
            );

        }
    );


    let botaoDecklist = "";


    if (decklistEncontrada) {

    const idDecklist =
        decklistEncontrada[0];

    botaoDecklist = `
        <a
            class="botao-ver-decklist"
            href="decklist.html?id=${idDecklist}">
            Ver Decklist
        </a>
    `;

}

            card.innerHTML = `
                <h3>${participante.deck}</h3>

                <p>${participante.nome}</p>

                <p>
                    <strong>Colocação:</strong>
                    ${participante.posicao}
                </p>

                <p>
                    <strong>Pontos:</strong>
                    ${participante.pontos ?? "-"}
                </p>

                ${botaoDecklist}
            `;

            
            listaDecklistsTorneio.appendChild(card);

        });

    }

    }

}

/* ========================================
   BUSCA DE NOTÍCIAS
======================================== */

const buscaNoticia =
    document.getElementById("busca-noticia");


if (buscaNoticia) {

    buscaNoticia.addEventListener(
        "input",
        function() {

            const texto =
                buscaNoticia.value
                    .toLowerCase()
                    .trim();


            const noticias =
                document.querySelectorAll(
                    ".card-noticia-pagina"
                );


            noticias.forEach(
                function(noticia) {

                    const titulo =
                        noticia
                            .querySelector("h3")
                            .textContent
                            .toLowerCase();


                    if (titulo.includes(texto)) {

                        noticia.style.display = "";

                    } else {

                        noticia.style.display = "none";

                    }

                }
            );

        }
    );

}

/* ========================================
   DADOS DAS NOTÍCIAS
======================================== */

const dadosNoticias = {

    "ots-championship-comunidade": {

        titulo:
            "OTS Championship movimenta a comunidade local",

        data:
            "20/08/2026",

        resumo:
            "Confira os destaques e resultados do último OTS Championship realizado em São Luís.",

        conteudo: `
            O OTS Championship realizado em São Luís
            reuniu jogadores da comunidade local em mais
            uma rodada competitiva de Yu-Gi-Oh!.

            O evento contou com diferentes estratégias
            e decks, além de partidas disputadas ao longo
            do torneio.

            Os resultados do evento também passam a
            integrar as estatísticas do YGO São Luís,
            incluindo ranking de jogadores, decks
            utilizados e histórico de participações.
        `

    },


    "weekly-tournament-guilda98": {

        titulo:
            "Weekly Tournament reúne jogadores na Guilda98",

        data:
            "27/08/2026",

        resumo:
            "O torneio semanal contou com diferentes decks e disputas competitivas.",

        conteudo: `
            A Guilda98 recebeu mais uma edição do Weekly
            Tournament de Yu-Gi-Oh!.

            Jogadores da comunidade participaram do evento
            utilizando diferentes decks e estratégias.

            As informações do torneio ficam registradas no
            YGO São Luís para consulta de resultados,
            jogadores e estatísticas.
        `

    },


    "ranking-atualizado": {

        titulo:
            "Ranking de jogadores é atualizado",

        data:
            "31/08/2026",

        resumo:
            "Veja as mudanças mais recentes no ranking competitivo de Yu-Gi-Oh! de São Luís.",

        conteudo: `
            O ranking competitivo do YGO São Luís recebeu
            uma nova atualização com base nos resultados
            mais recentes dos torneios locais.

            A classificação considera o desempenho dos
            jogadores e permite acompanhar a evolução ao
            longo do período.

            O objetivo é manter um histórico organizado
            da comunidade competitiva da cidade.
        `

    }

};

/* ========================================
   CARDS DINÂMICOS DE NOTÍCIAS
======================================== */

const listaNoticias =
    document.getElementById("lista-noticias");


if (listaNoticias) {

    Object.entries(dadosNoticias).forEach(
        function(item) {

            const identificador = item[0];
            const noticia = item[1];


            const card =
                document.createElement("article");


            card.classList.add(
                "card-noticia-pagina"
            );


            card.innerHTML = `

                <span class="data-noticia">
                    ${noticia.data}
                </span>

                <h3>
                    ${noticia.titulo}
                </h3>

                <p>
                    ${noticia.resumo}
                </p>

                <a href="noticia.html?id=${identificador}">
                    Ler notícia
                </a>

            `;


            listaNoticias.appendChild(card);

        }
    );

}

/* ========================================
   PÁGINA INDIVIDUAL DA NOTÍCIA
======================================== */

const parametrosNoticia =
    new URLSearchParams(
        window.location.search
    );

const noticiaSelecionada =
    parametrosNoticia.get("id");


if (
    noticiaSelecionada &&
    dadosNoticias[noticiaSelecionada]
) {

    const noticia =
        dadosNoticias[noticiaSelecionada];


    const tituloNoticia =
        document.getElementById(
            "titulo-noticia"
        );

    const dataNoticiaIndividual =
        document.getElementById(
            "data-noticia-individual"
        );

    const conteudoNoticia =
        document.getElementById(
            "conteudo-noticia"
        );


    if (tituloNoticia) {

        tituloNoticia.textContent =
            noticia.titulo;

        dataNoticiaIndividual.textContent =
            noticia.data;

        conteudoNoticia.textContent =
            noticia.conteudo;

    }

}
/* ========================================
   CARROSSEL / BANNER SLIDER DA HOME
======================================== */

const slidesHome =
    document.querySelectorAll(".banner-slider .slide");

const botoesSlide =
    document.querySelectorAll(".banner-slider .botao-slide");

const botaoAnterior =
    document.querySelector(".slider-anterior");

const botaoProximo =
    document.querySelector(".slider-proximo");

const bannerSlider =
    document.querySelector(".banner-slider");


if (
    bannerSlider &&
    slidesHome.length > 0 &&
    botoesSlide.length > 0
) {

    let slideAtual = 0;
    let intervaloSlider;


    function mostrarSlide(indice) {

        slidesHome.forEach(
            function(slide) {
                slide.classList.remove("ativo");
            }
        );

        botoesSlide.forEach(
            function(botao) {
                botao.classList.remove("ativo");
            }
        );


        slideAtual = indice;

        if (slideAtual < 0) {
            slideAtual = slidesHome.length - 1;
        }

        if (slideAtual >= slidesHome.length) {
            slideAtual = 0;
        }


        slidesHome[slideAtual]
            .classList.add("ativo");

        botoesSlide[slideAtual]
            .classList.add("ativo");
    }


    function proximoSlide() {
        mostrarSlide(slideAtual + 1);
    }


    function iniciarSliderAutomatico() {

        intervaloSlider = setInterval(
            proximoSlide,
            5000
        );

    }


    function reiniciarSliderAutomatico() {

        clearInterval(intervaloSlider);
        iniciarSliderAutomatico();

    }


    botoesSlide.forEach(
        function(botao) {

            botao.addEventListener(
                "click",
                function() {

                    const indice =
                        Number(botao.dataset.slide);

                    mostrarSlide(indice);
                    reiniciarSliderAutomatico();

                }
            );

        }
    );


    if (botaoAnterior) {

        botaoAnterior.addEventListener(
            "click",
            function() {
                mostrarSlide(slideAtual - 1);
                reiniciarSliderAutomatico();
            }
        );

    }


    if (botaoProximo) {

        botaoProximo.addEventListener(
            "click",
            function() {
                mostrarSlide(slideAtual + 1);
                reiniciarSliderAutomatico();
            }
        );

    }


    bannerSlider.addEventListener(
        "mouseenter",
        function() {
            clearInterval(intervaloSlider);
        }
    );


    bannerSlider.addEventListener(
        "mouseleave",
        function() {
            reiniciarSliderAutomatico();
        }
    );


    mostrarSlide(0);
    iniciarSliderAutomatico();
}

/* ========================================
   BANNER INTEIRO CLICÁVEL
======================================== */

const slidesClicaveis =
    document.querySelectorAll(".slide[data-link]");


slidesClicaveis.forEach(
    function(slide) {

        slide.addEventListener(
            "click",
            function(evento) {

                // Se clicou no botão/link,
                // deixa o próprio link funcionar.
                if (
                    evento.target.closest("a") ||
                    evento.target.closest("button")
                ) {
                    return;
                }


                const destino =
                    slide.dataset.link;


                if (destino) {

                    window.location.href =
                        destino;

                }

            }
        );

    }
);

// ========================================
// PÁGINA DE DECKLIST
// ========================================

function carregarPaginaDecklist() {

    const containerMain =
        document.getElementById("decklist-main");

    // Se não estamos na página decklist.html,
    // não executa esta função.
    if (!containerMain) {
        return;
    }


    const parametros =
        new URLSearchParams(window.location.search);

    const idDecklist =
        parametros.get("id");


    const decklist =
        dadosDecklists[idDecklist];


    if (!decklist) {

        document.querySelector(".pagina-decklist").innerHTML = `
            <div class="cabecalho-decklist">
                <h1>Decklist não encontrada</h1>

                <p>
                    A decklist solicitada não está cadastrada.
                </p>
            </div>
        `;

        return;
    }


    // -----------------------------
    // Informações principais
    // -----------------------------

    document.getElementById(
        "decklist-jogador"
    ).textContent =
        decklist.jogador;


    document.getElementById(
        "decklist-deck"
    ).textContent =
        decklist.deck;

// -----------------------------
// Torneios em que a decklist foi utilizada
// -----------------------------

const containerTorneios =
    document.getElementById(
        "decklist-torneios"
    );


if (
    containerTorneios &&
    Array.isArray(decklist.torneios)
) {

    containerTorneios.innerHTML = "";


    decklist.torneios.forEach(
        function(idTorneio) {

            const torneio =
                dadosTorneios[idTorneio];


            if (!torneio) {
                return;
            }


            const participante =
                torneio.classificacao.find(
                    function(item) {

                        return item.nome ===
                            decklist.jogador;

                    }
                );


           const linha =
    document.createElement("a");


linha.href =
    `torneio.html?id=${idTorneio}`;


linha.classList.add(
    "link-torneio-decklist"
);


if (participante) {

    linha.textContent =
        `${torneio.nome} — ${torneio.data} — ${participante.posicao} lugar`;

} else {

    linha.textContent =
        `${torneio.nome} — ${torneio.data}`;

}


containerTorneios.appendChild(
    linha
);
        }
    );

}
        
    // -----------------------------
    // Função para contar cartas
    // -----------------------------

    function contarCartas(cartas) {

        return cartas.reduce(
            function(total, carta) {

                return total +
                    carta.quantidade;

            },
            0
        );

    }


    const quantidadeMain =
        contarCartas(decklist.main);

    const quantidadeExtra =
        contarCartas(decklist.extra);

    const quantidadeSide =
        contarCartas(decklist.side);


    document.getElementById(
        "quantidade-main"
    ).textContent =
        `${quantidadeMain} cartas`;


    document.getElementById(
        "quantidade-extra"
    ).textContent =
        `${quantidadeExtra} cartas`;


    document.getElementById(
        "quantidade-side"
    ).textContent =
        `${quantidadeSide} cartas`;


    // -----------------------------
    // Renderizar cartas
    // -----------------------------

    function renderizarCartas(
        cartas,
        container
    ) {

        container.innerHTML = "";


        cartas.forEach(function(carta) {

            for (
                let i = 0;
                i < carta.quantidade;
                i++
            ) {

                const imagem =
                    document.createElement("img");

                imagem.src =
                    `imgYGO/cartas/${carta.id}.jpg`;

                imagem.alt =
                    carta.nome;

                imagem.title =
                    carta.nome;

                imagem.classList.add(
                    "carta-decklist"
                );

                container.appendChild(
                    imagem
                );

            }

        });

    }


    renderizarCartas(
        decklist.main,
        containerMain
    );


    renderizarCartas(
        decklist.extra,
        document.getElementById(
            "decklist-extra"
        )
    );


    renderizarCartas(
        decklist.side,
        document.getElementById(
            "decklist-side"
        )
    );

}


carregarPaginaDecklist();

/* ========================================
   TOP 4 DA PÁGINA INICIAL
======================================== */

function carregarRankingHome() {

    const corpoRankingHome =
        document.getElementById("ranking-home");

    // Se não estiver na página inicial,
    // não executa esta parte
    if (!corpoRankingHome) {
        return;
    }

    const jogadores = {};

    // Percorre todos os torneios cadastrados
    Object.values(dadosTorneios).forEach(function(torneio) {

        if (!Array.isArray(torneio.classificacao)) {
            return;
        }

        torneio.classificacao.forEach(function(participante) {

            if (!jogadores[participante.nome]) {
                jogadores[participante.nome] = {
                    nome: participante.nome,
                    pontos: 0,
                    vitorias: 0,
                    derrotas: 0
                };
            }

            jogadores[participante.nome].pontos +=
                Number(participante.pontos) || 0;

            jogadores[participante.nome].vitorias +=
                Number(participante.vitorias) || 0;

            jogadores[participante.nome].derrotas +=
                Number(participante.derrotas) || 0;
        });
    });

    // Transforma em lista e ordena o ranking
    const ranking = Object.values(jogadores);

    ranking.sort(function(a, b) {

        // 1º critério: pontos
        if (b.pontos !== a.pontos) {
            return b.pontos - a.pontos;
        }

        // 2º critério: vitórias
        if (b.vitorias !== a.vitorias) {
            return b.vitorias - a.vitorias;
        }

        // 3º critério: menos derrotas
        return a.derrotas - b.derrotas;
    });

    // Pega somente os 4 primeiros
    const top4 = ranking.slice(0, 4);

    corpoRankingHome.innerHTML = "";

    top4.forEach(function(jogador, indice) {

        const linha =
            document.createElement("tr");

        // Mantém as classes visuais
        // que você já utilizava no Top 3
        if (indice === 0) {
            linha.classList.add("top-1");
        }

        if (indice === 1) {
            linha.classList.add("top-2");
        }

        if (indice === 2) {
            linha.classList.add("top-3");
        }

        linha.innerHTML = `
            <td>${indice + 1}°</td>
            <td>${jogador.nome}</td>
            <td>${jogador.pontos}</td>
            <td>${jogador.vitorias}</td>
            <td>${jogador.derrotas}</td>
        `;

        corpoRankingHome.appendChild(linha);
    });
}

carregarRankingHome();

/* ========================================
   TOP 3 DECKS MAIS UTILIZADOS - HOME
======================================== */

function carregarDecksMaisUtilizados() {

    const containerDecks =
        document.getElementById("decks-mais-utilizados");

    // Se não estiver na página inicial,
    // não executa esta parte
    if (!containerDecks) {
        return;
    }

    const contagemDecks = {};

    let totalDecksInformados = 0;

    // Percorre todos os torneios cadastrados
    Object.values(dadosTorneios).forEach(function(torneio) {

        if (!Array.isArray(torneio.classificacao)) {
            return;
        }

        torneio.classificacao.forEach(function(participante) {

            const nomeDeck = participante.deck;

            // Ignora decks sem informação
            if (
                !nomeDeck ||
                nomeDeck.trim().toLowerCase() === "não informado"
            ) {
                return;
            }

            if (!contagemDecks[nomeDeck]) {
                contagemDecks[nomeDeck] = {
                    nome: nomeDeck,
                    aparicoes: 0
                };
            }

            contagemDecks[nomeDeck].aparicoes++;
            totalDecksInformados++;
        });
    });

    // Transforma o objeto em lista
    const rankingDecks =
        Object.values(contagemDecks);

    // Ordena do mais utilizado para o menos utilizado
    rankingDecks.sort(function(a, b) {
        return b.aparicoes - a.aparicoes;
    });

    // Mostra somente os 3 primeiros
    const top3Decks =
        rankingDecks.slice(0, 3);

    containerDecks.innerHTML = "";

    top3Decks.forEach(function(deck) {

        const percentual =
            totalDecksInformados > 0
                ? (
                    deck.aparicoes /
                    totalDecksInformados *
                    100
                ).toFixed(1)
                : 0;

        const deckCorrespondente =
             Object.entries(dadosDecks).find(
        function([identificador, dados]) {
            return dados.nome === deck.nome;
            }
        );

        const identificadorDeck =
                deckCorrespondente
                ? deckCorrespondente[0]
                : null;

        const card =
            document.createElement("article");

        card.classList.add("card-deck");

        card.innerHTML = `
            <h3>${deck.nome}</h3>

            <p>
                <strong>Aparições:</strong>
                ${deck.aparicoes}
            </p>

            <p>
                <strong>Percentual de uso:</strong>
                ${percentual}%
            </p>

            ${
    identificadorDeck
        ? `
            <a href="deck.html?nome=${encodeURIComponent(identificadorDeck)}">
                Ver detalhes
            </a>
        `
        : `
            <a href="decks.html">
                Ver detalhes
            </a>
        `
}
        `;

        containerDecks.appendChild(card);
    });
}

carregarDecksMaisUtilizados();