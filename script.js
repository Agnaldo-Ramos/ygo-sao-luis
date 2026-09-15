/* ========================================
   FILTRO DE TORNEIOS
======================================== */

const busca = document.getElementById("busca");
const filtroMes = document.getElementById("mes");
const filtroAno = document.getElementById("ano");

const torneios =
    document.querySelectorAll(".card-torneio-pagina");


if (busca && filtroMes && filtroAno) {

    function filtrarTorneios() {

        const textoBusca =
            busca.value.toLowerCase();

        const mesSelecionado =
            filtroMes.value;

        const anoSelecionado =
            filtroAno.value;


        torneios.forEach(function(torneio) {

            const nome = torneio
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
   JAVA - JOGADORES BUSCA
======================================== */

const buscaJogador = document.getElementById("busca-jogador");

const jogadores = document.querySelectorAll(".card-jogador");


if (buscaJogador) {

    buscaJogador.addEventListener("input", function () {

        const texto = buscaJogador.value.toLowerCase();


        jogadores.forEach(function (jogador) {

            const nome = jogador
                .querySelector("h3")
                .textContent
                .toLowerCase();


            if (nome.includes(texto)) {

                jogador.style.display = "block";

            } else {

                jogador.style.display = "none";

            }

        });

    });

}

/* ========================================
   PERFIL DOS JOGADORES
======================================== */

const dadosJogadores = {

    yuri: {
        nome: "Yuri Rego",

        descricao: "Jogador de Yu-Gi-Oh! de São Luís",

        torneios: 3,

        vitorias: 18,

        derrotas: 6,

        winrate: "75,0%",

        pontos: 76,

        rankingAnual: {

            "2026": {
            posicao: 1,
            vitorias: 18,
            derrotas: 6,
            pontos: 76
        },

    },

        deck: "Mitsurugi",

        usoDeck: "Deck utilizado em 3 torneios.",

        historico: [
    {
        torneio: "OTS Championship",
        local: "Nexus Card Game",
        data: "20/08/2026",
        posicao: "1º Lugar",
        deck: "Mitsurugi",
        vitorias: 7,
        derrotas: 1
    },

    {
        torneio: "Weekly Tournament",
        local: "Guilda98",
        data: "27/08/2026",
        posicao: "3º Lugar",
        deck: "Mitsurugi",
        vitorias: 5,
        derrotas: 3
    },

    {
        torneio: "Evento Championship",
        local: "Nexus Card Game",
        data: "31/08/2026",
        posicao: "2º Lugar",
        deck: "Mitsurugi",
        vitorias: 6,
        derrotas: 2
    }
    ]
    },

    renan: {
        nome: "Renan Cuba",

        descricao: "Jogador de Yu-Gi-Oh! de São Luís",

        torneios: 3,

        vitorias: 16,

        derrotas: 8,

        winrate: "66,7%",

        pontos: 67,

        rankingAnual: {

            "2026": {
            posicao: 2,
            vitorias: 16,
            derrotas: 8,
            pontos: 67
        },

    },

        deck: "Branded",

        usoDeck: "Deck utilizado em 3 torneios.",

        historico: [
    {
        torneio: "OTS Championship",
        local: "Nexus Card Game",
        data: "20/08/2026",
        posicao: "2º Lugar",
        deck: "Branded",
        vitorias: 6,
        derrotas: 2
    },

    {
        torneio: "Weekly Tournament",
        local: "Guilda98",
        data: "27/08/2026",
        posicao: "1º Lugar",
        deck: "Branded",
        vitorias: 4,
        derrotas: 4
    },

    {
        torneio: "Evento Championship",
        local: "Nexus Card Game",
        data: "31/08/2026",
        posicao: "4º Lugar",
        deck: "Branded",
        vitorias: 6,
        derrotas: 2
    }
    ]
    },

    kayo: {
        nome: "Kayo Ribeiro",

        descricao: "Jogador de Yu-Gi-Oh! de São Luís",

        torneios: 3,

        vitorias: 14,

        derrotas: 10,

        winrate: "58,3%",

        pontos: 62,

        rankingAnual: {

            "2026": {
            posicao: 3,
            vitorias: 14,
            derrotas: 10,
            pontos: 62
        },

    },

        deck: "Yummy",

        usoDeck: "Deck utilizado em 3 torneios.",

        historico: [
    {
        torneio: "OTS Championship",
        local: "Nexus Card Game",
        data: "20/08/2026",
        posicao: "3º Lugar",
        deck: "Yummy",
        vitorias: 5,
        derrotas: 3
    },

    {
        torneio: "Weekly Tournament",
        local: "Guilda98",
        data: "27/08/2026",
        posicao: "2º Lugar",
        deck: "Yummy",
        vitorias: 4,
        derrotas: 4
    },

    {
        torneio: "Evento Championship",
        local: "Nexus Card Game",
        data: "31/08/2026",
        posicao: "1º Lugar",
        deck: "Yummy",
        vitorias: 5,
        derrotas: 3
    }
]
    },

    kleber: {
        nome: "Kleber Rossel",

        descricao: "Jogador de Yu-Gi-Oh! de São Luís",

        torneios: 3,

        vitorias: 11,

        derrotas: 13,

        winrate: "45,8%",

        pontos: 55,

        rankingAnual: {

            "2026": {
            posicao: 4,
            vitorias: 11,
            derrotas: 13,
            pontos: 55
        },

    },

        deck: "Elfnote",

        usoDeck: "Deck utilizado em 3 torneios.",

        historico: [
    {
        torneio: "OTS Championship",
        local: "Nexus Card Game",
        data: "20/08/2026",
        posicao: "4º Lugar",
        deck: "Elfnote",
        vitorias: 4,
        derrotas: 4
    },

    {
        torneio: "Weekly Tournament",
        local: "Guilda98",
        data: "27/08/2026",
        posicao: "4º Lugar",
        deck: "Elfnote",
        vitorias: 3,
        derrotas: 5
    },

    {
        torneio: "Evento Championship",
        local: "Nexus Card Game",
        data: "31/08/2026",
        posicao: "3º Lugar",
        deck: "Elfnote",
        vitorias: 4,
        derrotas: 4
    }
]
    }

};

/* ========================================
   ESTATÍSTICAS AUTOMÁTICAS DOS DECKS
======================================== */

function calcularEstatisticasDecks() {

    const estatisticas = {};


    Object.values(dadosJogadores).forEach(
        function(jogador) {


            jogador.historico.forEach(
                function(participacao) {


                    const nomeDeck =
                        participacao.deck;


                    const identificadorDeck =
                        nomeDeck
                            .toLowerCase()
                            .replaceAll(" ", "-");


                    // Se o deck ainda não existe,
                    // ele é criado
                    if (!estatisticas[identificadorDeck]) {

                        estatisticas[identificadorDeck] = {

                            nome: nomeDeck,

                            descricao:
                                `Deck utilizado nos torneios de Yu-Gi-Oh! de São Luís.`,

                            jogadores: 0,

                            torneios: 0,

                            vitorias: 0,

                            derrotas: 0,

                            winrate: "0%",

                            jogadoresLista: [],

                            jogadoresSet: new Set()

                        };

                    }


                    const deck =
                        estatisticas[identificadorDeck];


                    // Conta uma participação em torneio
                    deck.torneios += 1;


                    // Soma as vitórias daquele torneio
                    deck.vitorias +=
                        participacao.vitorias;


                    // Soma as derrotas daquele torneio
                    deck.derrotas +=
                        participacao.derrotas;


                    // Registra o jogador sem duplicar
                    deck.jogadoresSet.add(
                        jogador.nome
                    );


                }
            );

        }
    );


    /* ========================================
       FINALIZA AS ESTATÍSTICAS
    ======================================== */

    Object.values(estatisticas).forEach(
        function(deck) {


            // Quantidade de jogadores diferentes
            deck.jogadores =
                deck.jogadoresSet.size;


            // Transforma o Set em uma lista normal
            deck.jogadoresLista =
                Array.from(
                    deck.jogadoresSet
                );


            const partidas =
                deck.vitorias +
                deck.derrotas;


            if (partidas > 0) {

                deck.winrate =
                    (
                        deck.vitorias /
                        partidas *
                        100
                    )
                    .toFixed(1)
                    .replace(".", ",")
                    + "%";

            }


            // Não precisamos mais do Set
            delete deck.jogadoresSet;

        }
    );


    return estatisticas;

}


/* ========================================
   DADOS DOS DECKS
======================================== */

const dadosDecks = calcularEstatisticasDecks();

/* ========================================
   CARDS DINÂMICOS DE DECKS
======================================== */

const listaDecks =
    document.getElementById("lista-decks");


if (listaDecks) {

    const decksCadastrados =
        Object.entries(dadosDecks);


    decksCadastrados.forEach(function(deck) {

        const identificador =
            deck[0];

        const dados =
            deck[1];


        const card =
            document.createElement("article");


        card.classList.add(
            "card-deck-pagina"
        );


        card.innerHTML = `

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

            <a href="deck.html?nome=${identificador}">
                Ver detalhes
            </a>

        `;


        listaDecks.appendChild(card);

    });

}

/* ========================================
   CARREGAR PERFIL DO JOGADOR
======================================== */

const parametros = new URLSearchParams(window.location.search);

const jogadorSelecionado = parametros.get("nome");


if (jogadorSelecionado && dadosJogadores[jogadorSelecionado]) {

    const jogador = dadosJogadores[jogadorSelecionado];


    const nomeJogador =
        document.getElementById("nome-jogador");

    const descricaoJogador =
        document.getElementById("descricao-jogador");

    const torneiosJogador =
        document.getElementById("torneios-jogador");

    const vitoriasJogador =
        document.getElementById("vitorias-jogador");

    const derrotasJogador =
        document.getElementById("derrotas-jogador");

    const winrateJogador =
        document.getElementById("winrate-jogador");

    const deckJogador =
        document.getElementById("deck-jogador");

    const usoDeck =
        document.getElementById("uso-deck");

    const historicoJogador =
        document.getElementById("lista-historico-jogador");


    nomeJogador.textContent = jogador.nome;

    descricaoJogador.textContent = jogador.descricao;

    torneiosJogador.textContent = jogador.torneios;

    vitoriasJogador.textContent = jogador.vitorias;

    derrotasJogador.textContent = jogador.derrotas;

    winrateJogador.textContent = jogador.winrate;

    deckJogador.textContent = jogador.deck;

    usoDeck.textContent = jogador.usoDeck;

    historicoJogador.innerHTML = "";

    // Histórico de torneios do jogador //

    jogador.historico.forEach(function(torneio) {

    const item = document.createElement("article");

    item.classList.add("item-historico");


    item.innerHTML = `

        <div>

            <h3>${torneio.torneio}</h3>

            <p>${torneio.local}</p>

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


if (corpoRanking && periodo) {


    function atualizarRanking() {

        // Limpa o ranking antes de criar novamente
        corpoRanking.innerHTML = "";


        // Pega todos os jogadores
        const jogadoresRanking =
            Object.values(dadosJogadores);


        // Descobre qual período foi selecionado
        const anoSelecionado =
            periodo.value;


        // Cria uma lista temporária com os dados
        const rankingOrganizado =
            jogadoresRanking.map(function(jogador) {


                // Se estiver no ranking geral
                if (anoSelecionado === "") {

                    return {

                        nome: jogador.nome,

                        deck: jogador.deck,

                        vitorias: jogador.vitorias,

                        derrotas: jogador.derrotas,

                        pontos: jogador.pontos

                    };

                }


                // Se estiver selecionado um ano
                const dadosAno =
                    jogador.rankingAnual[anoSelecionado];


                return {

                    nome: jogador.nome,

                    deck: jogador.deck,

                    vitorias: dadosAno.vitorias,

                    derrotas: dadosAno.derrotas,

                    pontos: dadosAno.pontos

                };

            });


        // Organiza pelo maior número de pontos
        rankingOrganizado.sort(function(a, b) {

            return b.pontos - a.pontos;

        });


        // Cria as linhas da tabela
        rankingOrganizado.forEach(function(jogador, index) {

            const linha =
                document.createElement("tr");


            linha.innerHTML = `

                <td>${index + 1}º</td>

                <td>${jogador.nome}</td>

                <td>${jogador.deck}</td>

                <td>${jogador.vitorias}</td>

                <td>${jogador.derrotas}</td>

                <td>${jogador.pontos}</td>

            `;


            corpoRanking.appendChild(linha);

        });

    }


    // Atualiza o ranking quando mudar o período
    periodo.addEventListener(
        "change",
        atualizarRanking
    );


    // Cria o ranking ao abrir a página
    atualizarRanking();

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

const parametrosDeck =
    new URLSearchParams(window.location.search);

const deckSelecionado =
    parametrosDeck.get("nome");

const listaHistoricoDeck =
        document.getElementById(
        "lista-historico-deck"
         );


if (
    deckSelecionado &&
    dadosDecks[deckSelecionado]
) {

    const deck =
        dadosDecks[deckSelecionado];

    const nomeDeck =
        document.getElementById("nome-deck");

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
        document.getElementById(
            "lista-jogadores-deck"
        );


    if (nomeDeck) {

        nomeDeck.textContent =
            deck.nome;

        descricaoDeck.textContent =
            deck.descricao;

        jogadoresDeck.textContent =
            deck.jogadores;

        torneiosDeck.textContent =
            deck.torneios;

        vitoriasDeck.textContent =
            deck.vitorias;

        winrateDeck.textContent =
            deck.winrate;

        listaJogadoresDeck.innerHTML = "";


       deck.jogadoresLista.forEach(
    function(nomeJogador) {

        const jogador =
            document.createElement("article");


        jogador.classList.add(
            "card-jogador-deck"
        );


        let identificadorJogador = "";


        Object.entries(dadosJogadores).forEach(
            function(item) {

                const chave = item[0];
                const dados = item[1];


                if (dados.nome === nomeJogador) {

                    identificadorJogador =
                        chave;

                }

            }
        );


        jogador.innerHTML = `

            <h3>
                ${nomeJogador}
            </h3>

            <a href="jogador.html?nome=${identificadorJogador}">
                Ver perfil
            </a>

        `;


        listaJogadoresDeck.appendChild(
            jogador
        );

    }
);

    }

}

/* ========================================
   HISTÓRICO DO DECK
======================================== */


if (listaHistoricoDeck) {

    listaHistoricoDeck.innerHTML = "";

    let encontrouHistorico = false;


    Object.values(dadosJogadores).forEach(
        function(jogador) {


            jogador.historico.forEach(
                function(participacao) {


                    // Evita erro caso algum torneio
                    // ainda não tenha deck cadastrado
                    if (!participacao.deck) {
                        return;
                    }


                    const identificadorParticipacao =
                        participacao.deck
                            .toLowerCase()
                            .replaceAll(" ", "-");


                    if (
                        identificadorParticipacao ===
                        deckSelecionado
                    ) {

                        encontrouHistorico = true;

                        const identificadorTorneio =
                            participacao.torneio
                                .toLowerCase()
                                .replaceAll(" ", "-");


                        const itemHistorico =
                            document.createElement(
                                "article"
                            );


                        itemHistorico.classList.add(
                            "item-historico-deck"
                        );


                        itemHistorico.innerHTML = `

                            <div class="dados-historico-deck">

                                <h3>
                                <a href="torneio.html?id=${identificadorTorneio}">
                                    ${participacao.torneio}
                                </a>
                                </h3>

                                <p>
                                    <strong>Data:</strong>
                                    ${participacao.data}
                                </p>

                                <p>
                                    <strong>Jogador:</strong>
                                    ${jogador.nome}
                                </p>

                                <p>
                                    <strong>Local:</strong>
                                    ${participacao.local}
                                </p>

                                <p>
                                    <strong>Colocação:</strong>
                                    ${participacao.posicao}
                                </p>

                            </div>


                            <div class="resultado-historico-deck">

                                <span>
                                    ${participacao.vitorias}V
                                </span>

                                <span>
                                    ${participacao.derrotas}D
                                </span>

                            </div>

                        `;


                        listaHistoricoDeck.appendChild(
                            itemHistorico
                        );

                    }

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

/* ========================================
   DADOS DOS TORNEIOS
======================================== */

const dadosTorneios = {

    "ots-championship": {
        nome: "OTS Championship",
        data: "20/08/2026",
        horario: "16:00",
        local: "Nexus Card Game",
        formato: "Tradicional"
    },

    "weekly-tournament": {
        nome: "Weekly Tournament",
        data: "27/08/2026",
        horario: "15:00",
        local: "Guilda98",
        formato: "Tradicional"
    },

    "evento-championship": {
        nome: "Evento Championship",
        data: "31/08/2026",
        horario: "14:00",
        local: "Nexus Card Game",
        formato: "Tradicional"
    }

};

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

if (corpoClassificacao) {

    corpoClassificacao.innerHTML = "";

    const participantes = [];


    Object.entries(dadosJogadores).forEach(
        function(item) {

            const identificadorJogador = item[0];
            const jogador = item[1];


            jogador.historico.forEach(
                function(participacao) {

                    const identificadorParticipacao =
                        participacao.torneio
                            .toLowerCase()
                            .replaceAll(" ", "-");


                    if (
                        identificadorParticipacao ===
                        torneioSelecionado
                    ) {

                        participantes.push({

                            id: identificadorJogador,

                            nome: jogador.nome,

                            deck: participacao.deck,

                            posicao: participacao.posicao,

                            vitorias: participacao.vitorias,

                            derrotas: participacao.derrotas

                        });

                    }

                }
            );

        }
    );


    /* ========================================
       QUANTIDADE DE PARTICIPANTES
    ======================================== */

    const participantesTorneio =
        document.getElementById(
            "participantes-torneio"
        );


    if (participantesTorneio) {

        participantesTorneio.textContent =
            participantes.length;

    }


    /* ========================================
       ORDENAR CLASSIFICAÇÃO
    ======================================== */

    participantes.sort(
        function(a, b) {

            return (
                parseInt(a.posicao) -
                parseInt(b.posicao)
            );

        }
    );


    /* ========================================
       CRIAR LINHAS DA TABELA
    ======================================== */

    participantes.forEach(
        function(participante) {

            const linha =
                document.createElement("tr");


            linha.innerHTML = `

                <td>
                    ${participante.posicao}
                </td>

                <td>
                    <a href="jogador.html?nome=${participante.id}">
                        ${participante.nome}
                    </a>
                </td>

                <td>
                    ${participante.deck}
                </td>

                <td>
                    ${participante.vitorias}
                </td>

                <td>
                    ${participante.derrotas}
                </td>

            `;


            corpoClassificacao.appendChild(
                linha
            );

        }
    );


    /* ========================================
       DECKLISTS DO TORNEIO
    ======================================== */

    const listaDecklistsTorneio =
        document.getElementById(
            "lista-decklists-torneio"
        );


    if (listaDecklistsTorneio) {

        listaDecklistsTorneio.innerHTML = "";


        participantes.forEach(
            function(participante) {

                const identificadorDeck =
                    participante.deck
                        .toLowerCase()
                        .replaceAll(" ", "-");


                const card =
                    document.createElement(
                        "article"
                    );


                card.classList.add(
                    "card-decklist"
                );


                card.innerHTML = `

                    <h3>
                        ${participante.deck}
                    </h3>

                    <p>
                        ${participante.nome}
                    </p>

                    <p>
                        <strong>Colocação:</strong>
                        ${participante.posicao}
                    </p>

                    <a href="deck.html?nome=${identificadorDeck}">
                        Ver detalhes
                    </a>

                `;


                listaDecklistsTorneio.appendChild(
                    card
                );

            }
        );

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