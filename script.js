const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

(() => {
    const nav = document.querySelector(".nav");
    if (!nav) return;
  
    const links = nav.querySelectorAll("a.pill");
    if (!links.length) return;

    const normalize = (path) => {
      if (!path) return "/index.html";
      return path.endsWith("/") ? path + "index.html" : path;
    };
  
    const currentPath = normalize(window.location.pathname);

    links.forEach((a) => a.classList.remove("active"));
  
    let matched = false;
  
    links.forEach((a) => {
      const linkPath = normalize(new URL(a.getAttribute("href"), window.location.href).pathname);
  
      if (linkPath === currentPath && !matched) {
        a.classList.add("active");
        matched = true;
      }
    });

    if (!matched) {
      links.forEach((a) => {
        const linkPath = normalize(new URL(a.getAttribute("href"), window.location.href).pathname);
        if (linkPath.endsWith("/index.html")) a.classList.add("active");
      });
    }
  })();

  // Anchor scroll + "jump highlight" (works on all pages)
document.addEventListener("DOMContentLoaded", () => {
  const pickTitle = (target) => {
    const container =
      target.closest(".resume-block") ||
      target.closest(".card") ||
      target.closest(".section") ||
      target;
  
    return (
      container.querySelector(".section-title") ||
      container.querySelector(".resume-h3") ||
      container.querySelector(".card-title") ||
      container.querySelector("h2") ||
      container.querySelector("h3") ||
      container
    );
  };

  const animateTitle = (el) => {
    if (!el) return;
    el.classList.remove("title-hit");
    void el.offsetWidth;
    el.classList.add("title-hit");
    setTimeout(() => el.classList.remove("title-hit"), 1200);
  };

  const handleHash = () => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    animateTitle(pickTitle(target));
  };

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      animateTitle(pickTitle(target));
      history.pushState(null, "", `#${id}`);
    });
  });

  if (window.location.hash) setTimeout(handleHash, 250);
  window.addEventListener("hashchange", () => setTimeout(handleHash, 150));
});
  
 //Resume Modal
 document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openResumeBtn");
  const overlay = document.getElementById("resumeModalOverlay");
  const closeBtn = document.getElementById("closeResumeBtn");

  if (!openBtn || !overlay || !closeBtn) {
    console.warn("Resume modal elements not found. Check IDs in HTML.");
    return;
  }

  const openModal = () => {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeModal();
  });
});

    // Modal
    document.addEventListener("DOMContentLoaded", () => {
      const modal = document.getElementById("modal");
      const modalTitle = document.getElementById("modalTitle");
      const modalContent = document.getElementById("modalContent");
      const modalClose = document.getElementById("modalClose");
    
      if (!modal || !modalTitle || !modalContent || !modalClose) return;
    
      function openModal(title, content) {
        modalTitle.textContent = title;
        modalContent.textContent = content;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");
      }
    
      function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");
      }
    
      document.querySelectorAll(".open-modal").forEach((btn) => {
        btn.addEventListener("click", () => {
          openModal(btn.dataset.title || "Case Study", btn.dataset.content || "");
        });
      });
    
      modalClose.addEventListener("click", closeModal);
      modal.addEventListener("click", (e) => {
        if (e.target.dataset.close === "true") closeModal();
      });
    
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
      });
    });

    document.addEventListener("DOMContentLoaded", () => {
      const langBtn = document.getElementById("langToggleBtn");
      const title = document.getElementById("helloTitle");
      const text = document.getElementById("helloText");
    
      if (!langBtn || !title || !text) return;
    
      let isEnglish = true;
    
      const englishText =
        "I’m Aisling, a junior at Fordham University studying Computer Science, and I’m really interested in roles in Product Management as well as product or data analyst positions. I’ve completed a Product Management internship and studied abroad in Madrid in Fall 2025, experiences that helped me enjoy working at the intersection of technology, strategy, and user experience. Outside of class and work, I love listening to music, reading, staying organized, and making fun plans with my friends.";
    
      const spanishText =
        "Soy Aisling, estudiante de tercer año en Fordham University, donde estudio Ciencias de la Computación. Me interesan los roles en Product Management, así como posiciones de analista de producto o datos. He completado una pasantía en Product Management y estudié en Madrid durante el otoño de 2025, experiencias que me hicieron disfrutar trabajar en la intersección de tecnología, estrategia y experiencia de usuario. Fuera de clases y trabajo, me encanta escuchar música, leer, mantenerme organizada y hacer planes divertidos con mis amigos.";
    
      langBtn.addEventListener("click", () => {
        if (isEnglish) {
          title.textContent = "Hi!";
          text.textContent = spanishText;
          langBtn.textContent = "English";
        } else {
          title.textContent = "¡Hola!";
          text.textContent = englishText;
          langBtn.textContent = "Español";
        }
        isEnglish = !isEnglish;
      });
    });