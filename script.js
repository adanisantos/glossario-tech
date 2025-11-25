// script.js
import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const listaTermosElement = document.getElementById('lista-termos');

async function carregarGlossario() {
    try {
        listaTermosElement.innerHTML = '<p>Carregando termos...</p>';
        
        const termosSnapshot = await getDocs(collection(db, "termos"));
        
        if (termosSnapshot.empty) {
            listaTermosElement.innerHTML = '<p>Nenhum termo encontrado no glossário.</p>';
            return;
        }

        listaTermosElement.innerHTML = "";
        termosSnapshot.forEach((doc) => {
            const termo = doc.data(); 
            const termoHTML = `
                <div class="termo-card">
                    <h2>${termo.nome} <span class="versao-br">(${termo.versaoBR || ""})</span></h2>
                    <p class="explicacao">${termo.explicacao || ""}</p>
                    ${termo.situacoes && termo.situacoes.length > 0 ? `
                        <p class="situacoes-titulo">Onde você vê isso:</p>
                        <ul>
                            ${termo.situacoes.map(sit => `<li>${sit}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
                <hr>
            `;
            listaTermosElement.innerHTML += termoHTML;
        });

    } catch (error) {
        console.error("Erro ao carregar o glossário: ", error);
        listaTermosElement.innerHTML = '<p class="erro-conexao">Erro ao carregar dados. Verifique o console para detalhes.</p>';
    }
}

carregarGlossario();
