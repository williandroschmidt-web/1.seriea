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

function aplicarTemaConfigurado() {
    const modo = localStorage.getItem('usuarioModo') || 'auto';
    const cor = localStorage.getItem('usuarioCor') || '#38bdf8';
    const clima = localStorage.getItem('usuarioClima') || 'auto';
    const nome = localStorage.getItem('usuarioNome') || '';

    // 1. Aplica Cor de Acento
    document.documentElement.style.setProperty('--cor-acento', cor);

    // 2. Aplica Nome
    if (nome) tituloBoasVindas.innerText = `Olá, ${nome}`;

    // 3. Lógica de Clima e Modo (Dia/Noite)
    document.body.classList.remove('tema-dia', 'tema-noite', 'tema-chuva');

    if (clima === 'chuva') {
        document.body.classList.add('tema-chuva');
        subtitulo.innerText = "⚡ Tempestade detectada! Fique seguro.";
    } else {
        const hora = new Date().getHours();
        let eDia = (hora >= 6 && hora < 18);

        // Se o usuário forçou um modo, ignora a hora
        if (modo === 'light') eDia = true;
        if (modo === 'dark') eDia = false;

        if (eDia) {
            document.body.classList.add('tema-dia');
            subtitulo.innerText = "☀️ Tenha um excelente dia de aprendizado!";
        } else {
            document.body.classList.add('tema-noite');
            subtitulo.innerText = "🌙 Noite produtiva de estudos por aqui.";
        }
    }
}

btnSalvar.onclick = () => {
    localStorage.setItem('usuarioNome', inputNome.value);
    localStorage.setItem('usuarioModo', selectModo.value);
    localStorage.setItem('usuarioCor', selectCor.value);
    localStorage.setItem('usuarioClima', selectClima.value);
    
    aplicarTemaConfigurado();
    modal.style.display = 'none';
};

// Carrega configurações ao abrir
window.onload = () => {
    inputNome.value = localStorage.getItem('usuarioNome') || '';
    selectModo.value = localStorage.getItem('usuarioModo') || 'auto';
    selectCor.value = localStorage.getItem('usuarioCor') || '#38bdf8';
    selectClima.value = localStorage.getItem('usuarioClima') || 'auto';
    
    aplicarTemaConfigurado();
};
