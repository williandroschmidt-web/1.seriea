const modal = document.getElementById('modal-config');
const btnConfig = document.getElementById('btn-config');
const btnFechar = document.getElementById('btn-fechar');
const btnSalvar = document.getElementById('btn-salvar');

const inputNome = document.getElementById('username');
const selectModo = document.getElementById('theme-mode');
const selectCor = document.getElementById('theme-color');
const selectClima = document.getElementById('clima-teste');

const tituloBoasVindas = document.getElementById('welcome-title');
const subtitulo = document.getElementById('subtitulo-boasvindas');

// Abre e Fecha Modal
btnConfig.onclick = () => modal.style.display = 'flex';
btnFechar.onclick = () => modal.style.display = 'none';

// =======================================================
// O NOVO SENSOR DE CLIMA REAL (API)
// =======================================================
async function buscarClimaReal() {
    try {
        // 1. Pedimos ao navegador a localização aproximada do usuário
        navigator.geolocation.getCurrentPosition(async (posicao) => {
            const lat = posicao.coords.latitude;
            const lon = posicao.coords.longitude;

            // 2. Ligamos para a API de clima usando a latitude e longitude
            const resposta = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            const dados = await reply = await resposta.json();
            
            // 3. Pegamos o código do clima atual (Weather Code)
            const codigoClima = dados.current_weather.weathercode;

            // Códigos da Open-Meteo para chuva/tempestade vão de 51 até 99
            const estaChovendo = (codigoClima >= 51 && codigoClima <= 99);

            if (estaChovendo) {
                localStorage.setItem('climaInternet', 'chuva');
            } else {
                localStorage.setItem('climaInternet', 'limpo');
            }
            
            // Recarrega o tema com a informação atualizada da internet
            aplicarTemaConfigurado();
        });
    } catch (erro) {
        console