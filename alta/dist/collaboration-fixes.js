(() => {
  const visible = (element) => element && element.getClientRects().length > 0;
  const buttons = () => [...document.querySelectorAll("button")].filter(visible);
  const buttonWithText = (text) => buttons().find((button) => button.textContent.trim().includes(text));

  function openParticipants() {
    const directAction = buttonWithText("Gerenciar participantes");
    if (directAction) {
      directAction.click();
      return;
    }

    const menuTrigger = buttons().find((button) =>
      ["Gerenciar lista", "Opções da lista"].includes(button.getAttribute("aria-label")),
    );
    menuTrigger?.click();
    window.setTimeout(() => buttonWithText("Gerenciar participantes")?.click(), 80);
  }

  function enhanceHeaderAvatars() {
    document.querySelectorAll(".collection-members").forEach((group) => {
      if (group.dataset.participantShortcut) return;
      group.dataset.participantShortcut = "true";
      group.setAttribute("role", "button");
      group.setAttribute("tabindex", "0");
      group.setAttribute("aria-label", "Abrir participantes");
      group.addEventListener("click", openParticipants);
      group.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openParticipants();
        }
      });
    });
  }

  function enhanceListOptions() {
    document.querySelectorAll('[data-slot="sheet-content"]').forEach((sheet) => {
      if (sheet.dataset.participantSummary) return;
      const title = sheet.querySelector('[data-slot="sheet-title"]')?.textContent.trim();
      if (!title || !["Gerenciar lista", "Opções da lista"].includes(title)) return;

      const participantAction = [...sheet.querySelectorAll("button")].find((button) =>
        button.textContent.includes("Gerenciar participantes"),
      );
      if (!participantAction) return;

      sheet.dataset.participantSummary = "true";
      const summary = document.createElement("button");
      summary.type = "button";
      summary.className = "runtime-participant-summary";
      summary.setAttribute("aria-label", "Gerenciar 3 participantes");
      summary.innerHTML = `
        <span class="runtime-participant-copy">
          <strong>Participantes</strong>
          <small>3 pessoas · gerenciar e convidar</small>
        </span>
        <span class="runtime-participant-avatars" aria-hidden="true">
          <span>NC</span><span>RA</span><span>LM</span>
        </span>
        <span class="runtime-participant-chevron" aria-hidden="true">›</span>
      `;
      summary.addEventListener("click", () => participantAction.click());
      participantAction.classList.add("runtime-hidden-participant-action");
      participantAction.parentElement?.insertBefore(summary, participantAction);
    });
  }

  function normalizeCopy() {
    document.querySelectorAll('[data-slot="sheet-title"]').forEach((title) => {
      if (title.textContent.trim() === "Opções da lista") title.textContent = "Gerenciar lista";
      if (title.textContent.trim() === "Compartilhar lista") title.textContent = "Participantes";
    });
    document.querySelectorAll('[data-slot="sheet-description"]').forEach((description) => {
      if (description.textContent.trim() === "Convide pessoas diretamente ou envie um link.") {
        description.textContent = "Convide pessoas, gerencie acessos ou envie um link.";
      }
    });
    document.querySelectorAll(".sheet-field-label").forEach((label) => {
      const copy = label.textContent.trim();
      if (copy === "Convidar pessoas") label.childNodes[0].textContent = "Convidar";
      if (copy.startsWith("Participantes")) label.childNodes[0].textContent = "Na lista ";
      if (copy === "Compartilhar convite") label.childNodes[0].textContent = "Enviar link de convite";
    });
  }

  function enhance() {
    enhanceHeaderAvatars();
    enhanceListOptions();
    normalizeCopy();
  }

  const observer = new MutationObserver(enhance);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("DOMContentLoaded", enhance);
  enhance();
})();
