(() => {
  const flows = [
    { id: "choose", hypothesis: "H1–H2", title: "Encontrar sem saber o nome", supporting: "Busca por pista e curadoria", action: "Buscar" },
    { id: "scene", hypothesis: "H3", title: "Decidir por uma prévia", supporting: "Feed vertical em Em cena", action: "Em cena" },
    { id: "contribute", hypothesis: "H4–H5", title: "Guardar, avaliar ou indicar", supporting: "Ações distintas no detalhe", action: "detail" },
    { id: "collaborate", hypothesis: "H6", title: "Construir uma lista junto", supporting: "Listas e participantes em Minha área", action: "profile" },
    { id: "access", hypothesis: "H7–H8", title: "Entender preço e acesso", supporting: "Loja, oferta e próximo passo", action: "Loja" },
  ];

  const clickButton = (matcher) => {
    const button = [...document.querySelectorAll(".device button")].find(matcher);
    button?.click();
  };

  const launch = (flow) => {
    document.querySelectorAll(".guided-flow").forEach((button) => {
      button.toggleAttribute("data-active", button.dataset.flow === flow.id);
    });
    if (flow.action === "detail") {
      clickButton((button) => button.innerText.includes("Depois do Sol") && button.innerText.includes("Incluído"));
    } else if (flow.action === "profile") {
      clickButton((button) => button.getAttribute("aria-label") === "Perfil");
    } else {
      clickButton((button) => button.innerText.trim() === flow.action);
    }
  };

  const renderGuide = () => {
    const notes = document.querySelector(".notes");
    if (!notes || notes.dataset.guided === "true") return;
    notes.dataset.guided = "true";
    notes.innerHTML = `
      <span class="guide-badge">Exploração guiada</span>
      <h2>Abra os fluxos ligados às hipóteses</h2>
      <p class="guide-intro">Use os atalhos para chegar aos principais comportamentos. A navegação continua livre dentro do protótipo.</p>
      <div class="guided-flows">
        ${flows.map((flow, index) => `
          <button class="guided-flow" type="button" data-flow="${flow.id}" ${index === 0 ? "data-active" : ""}>
            <span>${String(index + 1).padStart(2, "0")}</span>
            <div><small>${flow.hypothesis}</small><strong>${flow.title}</strong><em>${flow.supporting}</em></div>
            <b aria-hidden="true">›</b>
          </button>`).join("")}
      </div>
      <h3>Observe durante o percurso</h3>
      <p>Primeiro caminho, desvios, retornos, feedback percebido e termos que geram dúvida.</p>
      <small><strong>Limite:</strong> títulos, transações, sincronização e recomendação são simulados.</small>`;
    notes.querySelectorAll(".guided-flow").forEach((button) => {
      button.addEventListener("click", () => launch(flows.find((flow) => flow.id === button.dataset.flow)));
    });
  };

  const observer = new MutationObserver(() => renderGuide());
  observer.observe(document.getElementById("root"), { childList: true, subtree: true });
  renderGuide();
})();
