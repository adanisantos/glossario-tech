import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// 2. Inicializar o Firebase App usando a configuração do firebase-config.js
// A variável 'firebaseConfig' vem do outro arquivo que você acabou de preencher.
const app = initializeApp(firebaseConfig);

// 3. Obter uma referência ao serviço Firestore (o seu banco de dados)
const db = getFirestore(app);

// 4. Referência ao local no HTML onde a lista de termos será exibida
const listaTermosElement = document.getElementById('lista-termos');

// Função principal para buscar, filtrar e exibir os termos
async function carregarGlossario() {
    try {
        // Limpa o conteúdo atual (o "Carregando termos...")
        listaTermosElement.innerHTML = '';
        
        // 5. Busca todos os documentos (termos) na coleção 'termos'
        // 'termos' é o nome da coleção que você criou no Firebase.
        const termosSnapshot = await getDocs(collection(db, "termos"));
        
        // Verifica se encontrou algo
        if (termosSnapshot.empty) {
            listaTermosElement.innerHTML = '<p>Nenhum termo encontrado no glossário.</p>';
            return;
        }

        // 6. Itera sobre cada termo encontrado e cria o HTML
        termosSnapshot.forEach((doc) => {
            // Pega os dados do termo. Lembre-se que você usou: nome, versaoBR, explicacao, situacoes
            const termo = doc.data(); 
            
            // Cria o bloco (card) para o termo
            const termoHTML = `
                <div class="termo-card">
                    <h2>${termo.nome} <span class="versao-br">(${termo.versaoBR})</span></h2>
                    
                    <p class="explicacao">${termo.explicacao}</p>
                    
                    ${termo.situacoes && termo.situacoes.length > 0 ? `
                        <p class="situacoes-titulo">Onde você vê isso:</p>
                        <ul>
                            ${termo.situacoes.map(sit => `<li>${sit}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
                <hr>
            `;
            
            // Adiciona o HTML ao elemento listaTermos
            listaTermosElement.innerHTML += termoHTML;
        });

    } catch (error) {
        // Em caso de erro, mostra a mensagem de erro no console para debug
        console.error("Erro ao carregar o glossário: ", error);
        listaTermosElement.innerHTML = '<p class="erro-conexao">Erro ao carregar dados. Verifique o console para detalhes.</p>';
    }
}

// 7. Chama a função para iniciar o carregamento assim que o site abrir
carregarGlossario();
