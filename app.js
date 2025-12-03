// --- Gemini AI Logic ---
// NOTA: En un entorno de producción real, evita exponer tu API Key directamente en el código frontend.
// Para GitHub Pages, esta es la única forma rápida, pero considera usar un proxy o backend serverless si es posible.
const apiKey = ""; 

async function askAI() {
    const input = document.getElementById('ai-question');
    const question = input.value.trim();
    const btn = document.getElementById('btn-ask');
    const responseContainer = document.getElementById('ai-response-container');
    const responseText = document.getElementById('ai-response-text');

    if (!question) return;

    // Estado de carga
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    btn.disabled = true;
    input.disabled = true;
    responseContainer.classList.remove('hidden');
    responseText.innerHTML = '<span class="opacity-70 italic">Escribiendo...</span>';

    // Contexto del sitio para la IA
    const heroText = document.querySelector('header').innerText;
    const mainText = document.getElementById('knowledge-base').innerText;
    const tutorModalText = document.getElementById('modal-tutor').innerText;
    const tutoradoModalText = document.getElementById('modal-tutorado').innerText;

    const siteContext = `${heroText} ${mainText} INFORMACIÓN TUTORES: ${tutorModalText} INFORMACIÓN TUTORADOS: ${tutoradoModalText}`;

    const prompt = `Actúa como un asistente virtual muy amigable (nunca uses emojis) del programa "Círculos de Estudio" de la UCA. Responde BASÁNDOTE ÚNICAMENTE en: "${siteContext}". Pregunta: "${question}"`;

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
        const payload = { contents: [{ parts: [{ text: prompt }] }] };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Error API');

        const data = await response.json();
        const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "La verdad, desconozco el dato que me preguntas. Si escribes al correo de círculos, te darán la información que buscas. Es este: circulosdeestudio@uca.edu.sv";
        
        // Formateo simple de negritas
        const formattedAnswer = answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        responseText.innerHTML = formattedAnswer;

    } catch (error) {
        console.error(error);
        responseText.innerHTML = "Ups, tuve un problema de conexión. Inténtalo de nuevo.";
    } finally {
        // Restaurar estado
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
        btn.disabled = false;
        input.disabled = false;
        input.focus();
    }
}

function handleEnter(e) { 
    if (e.key === 'Enter') askAI(); 
}

// --- Lógica de Modales ---
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    const body = document.body;
    
    if (modal.classList.contains('active')) {
        modal.classList.remove('active');
        body.style.overflow = 'auto';
    } else {
        // Cerrar otros modales abiertos
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
        
        modal.classList.add('active');
        body.style.overflow = 'hidden';
    }
}

// Cerrar con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        document.querySelectorAll('.modal').forEach(m => { 
            m.classList.remove('active'); 
            document.body.style.overflow = 'auto'; 
        });
    }
});