function enviar(event) {
event.preventDefault();

  const nome = document.getElementById('nome').value;
const mensagem = document.getElementById('mensagem').value;
const telefone = '5583991114032'

const texto = `Olá! Me chamo ${nome}, ${mensagem}`
const msgFormatada = encodeURIComponent(texto)

const url = `https://wa.me/${telefone}?text=${msgFormatada}`
window.open(url, '_blank')

}





const frases = [
    "<span>Sávio <span class='roxo'>Iesous</span></span>",
    "Desenvolvedor <span class='dourado'>Front-End</span>",
  ];
  
  const elemento = document.getElementById("digitando");
  
  let fraseIndex = 0;
  let letraIndex = 0;
  let apagando = false;
  
  function digitar() {
    const frase = frases[fraseIndex];
    const fraseSemHTML = frase.replace(/<[^>]*>/g, ""); // remove tags para contar letras
  
    if (!apagando) {
      const textoVisivel = fraseSemHTML.substring(0, letraIndex + 1);
      const htmlMontado = montarHTML(frase, textoVisivel.length);
      elemento.innerHTML = htmlMontado;
  
      letraIndex++;
  
      if (letraIndex === fraseSemHTML.length) {
        apagando = true;
        setTimeout(digitar, 2000); // tempo de espera após escrever tudo
        return;
      }
    } else {
      const textoVisivel = fraseSemHTML.substring(0, letraIndex - 1);
      const htmlMontado = montarHTML(frase, textoVisivel.length);
      elemento.innerHTML = htmlMontado;
  
      letraIndex--;
  
      if (letraIndex === 0) {
        apagando = false;
        fraseIndex = (fraseIndex + 1) % frases.length;
      }
    }
  
    setTimeout(digitar, apagando ? 70 : 120);
  }
  
  function montarHTML(fraseComHTML, letrasVisiveis) {
    const div = document.createElement("div");
    div.innerHTML = fraseComHTML;
  
    let totalLetras = 0;
    const processar = (el) => {
      if (el.nodeType === Node.TEXT_NODE) {
        const texto = el.nodeValue;
        const restante = letrasVisiveis - totalLetras;
        el.nodeValue = texto.substring(0, Math.max(0, restante));
        totalLetras += texto.length;
      } else if (el.nodeType === Node.ELEMENT_NODE) {
        for (let i = 0; i < el.childNodes.length; i++) {
          processar(el.childNodes[i]);
        }
      }
    };
  
    processar(div);
    return div.innerHTML;
  }
  
  digitar();
  