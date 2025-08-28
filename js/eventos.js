// Funcionalidades para a página de eventos

document.addEventListener("DOMContentLoaded", function () {
  // Filtro por categoria
  const categoryButtons = document.querySelectorAll(".category-btn");
  const eventCards = document.querySelectorAll(".event-card");
  const loadMoreBtn = document.getElementById("load-more-events");

  // Adicionar evento de clique para os botões de categoria
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedCategory = this.getAttribute("data-category");

      // Remover classe active de todos os botões
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Adicionar classe active ao botão clicado
      this.classList.add("active");

      // Filtrar eventos
      filterEvents(selectedCategory);
    });
  });

  // Função para filtrar eventos
  function filterEvents(category) {
    eventCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (category === "all" || cardCategory === category) {
        card.style.display = "block";
        card.style.animation = "fadeIn 0.5s ease-in-out";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Animação de fade in para os cards
  const fadeInAnimation = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

  // Adicionar a animação ao CSS
  const style = document.createElement("style");
  style.textContent = fadeInAnimation;
  document.head.appendChild(style);

  // Funcionalidade do botão "Carregar Mais Eventos"
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      loadMoreEvents();
    });
  }

  // Função para carregar mais eventos (simulada)
  function loadMoreEvents() {
    const loadMoreBtn = document.getElementById("load-more-events");

    // Simular carregamento
    loadMoreBtn.textContent = "Carregando...";
    loadMoreBtn.disabled = true;

    setTimeout(() => {
      // Aqui você pode adicionar lógica para carregar mais eventos do servidor
      // Por enquanto, vamos apenas mostrar uma mensagem
      loadMoreBtn.textContent = "Não há mais eventos";
      loadMoreBtn.style.background = "#ccc";
      loadMoreBtn.style.cursor = "not-allowed";
    }, 2000);
  }

  // Adicionar efeito de hover nos cards de eventos
  eventCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Funcionalidade para os botões "Ver Detalhes" removida

  // Funcionalidade para os botões de ação do evento em destaque
  const primaryBtn = document.querySelector(".btn-primary");
  const secondaryBtn = document.querySelector(".btn-secondary");

  if (primaryBtn) {
    primaryBtn.addEventListener("click", function () {
      alert('Funcionalidade "Saiba Mais" será implementada em breve!');
    });
  }

  if (secondaryBtn) {
    secondaryBtn.addEventListener("click", function () {
      // Compartilhar evento
      if (navigator.share) {
        navigator.share({
          title: "Feira de Ciências e Tecnologia 2025",
          text: "Confira este evento incrível!",
          url: window.location.href,
        });
      } else {
        // Fallback para navegadores que não suportam Web Share API
        const url = window.location.href;
        const text = "Confira este evento incrível!";
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, "_blank");
      }
    });
  }

  // Adicionar funcionalidade de ordenação por data
  function addSortFunctionality() {
    const sortHTML = `
            <div class="sort-section" style="margin-bottom: 20px;">
                <label for="event-sort" style="margin-right: 10px; font-weight: 600;">Ordenar por:</label>
                <select id="event-sort" style="padding: 8px 15px; border: 2px solid #e0e0e0; border-radius: 15px; font-size: 0.9rem;">
                    <option value="date">Data</option>
                    <option value="name">Nome</option>
                    <option value="category">Categoria</option>
                </select>
            </div>
        `;

    const categoriesSection = document.querySelector(".events-categories");
    if (categoriesSection) {
      categoriesSection.insertAdjacentHTML("beforebegin", sortHTML);

      const sortSelect = document.getElementById("event-sort");
      sortSelect.addEventListener("change", function () {
        const sortBy = this.value;
        sortEvents(sortBy);
      });
    }
  }

  // Função para ordenar eventos
  function sortEvents(sortBy) {
    const eventsGrid = document.querySelector(".events-grid");
    const cards = Array.from(eventCards);

    cards.sort((a, b) => {
      if (sortBy === "name") {
        const titleA = a.querySelector("h3").textContent;
        const titleB = b.querySelector("h3").textContent;
        return titleA.localeCompare(titleB);
      } else if (sortBy === "category") {
        const categoryA = a.getAttribute("data-category");
        const categoryB = b.getAttribute("data-category");
        return categoryA.localeCompare(categoryB);
      } else {
        // Ordenação por data (simplificada)
        const dateA = a.querySelector(".event-card-date").textContent;
        const dateB = b.querySelector(".event-card-date").textContent;
        return dateA.localeCompare(dateB);
      }
    });

    // Reordenar os cards no DOM
    cards.forEach((card) => {
      eventsGrid.appendChild(card);
    });
  }

  // Adicionar funcionalidade de ordenação
  addSortFunctionality();

  console.log("Página de eventos carregada com sucesso!");
});
