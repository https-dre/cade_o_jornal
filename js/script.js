// -------------------- FILTRO DE NOTÍCIAS --------------------
const botoesFiltro = document.querySelectorAll(".filtro-topico");
const noticias = document.querySelectorAll(".card-noticia");
const linhasNoticias = document.querySelectorAll(".tres-noticias");
const botaoVerMais = document.getElementById("botao-ver-mais");
let verMaisAtivado = false;

function resetarMargens() {
    linhasNoticias.forEach(linha => {
        const visiveis = linha.querySelectorAll(".card-noticia:not(.oculto)");
        linha.style.display = visiveis.length === 0 ? "none" : "flex";
    });
}

botoesFiltro.forEach(botao => {
    botao.addEventListener("click", () => {
        const filtro = botao.getAttribute("data-filtro");

        noticias.forEach(noticia => {
            const tema = noticia.getAttribute("data-tema");
            noticia.classList.toggle("oculto", filtro !== "Ultimas" && tema !== filtro);
        });

        botoesFiltro.forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");

        linhasNoticias.forEach(linha => {
            linha.style.display = "flex";
        });

        document.querySelectorAll(".linha-extra").forEach(extra => extra.remove());

        botaoVerMais.style.display = (filtro === "Ultimas" && !verMaisAtivado) ? "block" : "none";
        resetarMargens();
    });
});

botaoVerMais.addEventListener("click", () => {
    const mais = document.querySelectorAll("#mais-noticias .tres-noticias");
    const container = document.querySelector("#container-noticias");

    mais.forEach(linha => {
        linha.classList.add("linha-extra");
        container.appendChild(linha);
    });

    botaoVerMais.style.display = "none";
    verMaisAtivado = true;
    resetarMargens();
});


// -------------------- CLIMA --------------------
function getWeatherIcon(weatherCode) {
    if (weatherCode === 0) return "☀️"; 
    if ([1, 2].includes(weatherCode)) return "🌤️"; 
    if (weatherCode === 3) return "☁️"; 
    if ([45, 48].includes(weatherCode)) return "🌫️"; 
    if (weatherCode >= 51 && weatherCode <= 67) return "🌦️"; 
    if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86)) return "❄️"; 
    if (weatherCode >= 80 && weatherCode <= 82) return "🌧️"; 
    if (weatherCode >= 95 && weatherCode <= 99) return "⛈️"; 
    return "❓"; 
}

async function carregarClima() {
    try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-23.6261&longitude=-46.7916&current_weather=true");
        const data = await res.json();

        if (!data.current_weather) throw new Error("Formato inesperado da API de clima");

        const temp = data.current_weather.temperature;
        const code = data.current_weather.weathercode;
        const icon = getWeatherIcon(code);

        document.querySelector(".weather-icon").textContent = icon;
        document.getElementById("weather-temp").textContent = `${temp}°C`;
    } catch (error) {
        console.error("Erro ao obter dados do clima:", error);
        document.getElementById("weather-temp").textContent = "Erro ao carregar";
        document.querySelector(".weather-icon").textContent = "❌";
    }
}
carregarClima();


// -------------------- COTAÇÃO USD/BRL --------------------
async function carregarCotacao() {
    try {
        const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=BRL");
        const data = await res.json();

        if (!data.rates || !data.rates.BRL) throw new Error("Formato inesperado da API de câmbio");

        const cotacaoBRL = data.rates.BRL;
        document.getElementById("exchange-value").textContent = `1 USD = R$ ${cotacaoBRL.toFixed(2)}`;
    } catch (error) {
        console.error("Erro ao obter a cotação:", error);
        document.getElementById("exchange-value").textContent = "Erro ao carregar";
    }
}
carregarCotacao();


// -------------------- AÇÕES NOS ÍCONES --------------------
const icons = document.querySelectorAll('.action-icon');
const popup = document.getElementById('popup');

icons.forEach(icon => {
    icon.addEventListener('click', () => {
        const action = icon.dataset.action;

        if (action === 'like') {
            icon.textContent = icon.textContent === 'favorite' ? 'favorite_border' : 'favorite';
            icon.classList.toggle('liked');
        }

        if (action === 'save') {
            icon.textContent = icon.textContent === 'bookmark' ? 'bookmark_border' : 'bookmark';
            icon.classList.toggle('saved');
        }

        if (action === 'share') {
            navigator.clipboard.writeText(window.location.href).then(() => {
                popup.classList.remove('hidden');
                popup.classList.add('show');
                setTimeout(() => {
                    popup.classList.remove('show');
                    setTimeout(() => popup.classList.add('hidden'), 400);
                }, 2000);
            });
        }
    });
});
