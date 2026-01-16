const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Auto-highlight ONLY the current page's nav pill
(() => {
    const nav = document.querySelector(".nav");
    if (!nav) return;
  
    const links = nav.querySelectorAll("a.pill");
    if (!links.length) return;
  
    // normalize path: "/" -> "/index.html"
    const normalize = (path) => {
      if (!path) return "/index.html";
      return path.endsWith("/") ? path + "index.html" : path;
    };
  
    const currentPath = normalize(window.location.pathname);
  
    // clear any old active states
    links.forEach((a) => a.classList.remove("active"));
  
    // find the one that matches this page
    let matched = false;
  
    links.forEach((a) => {
      // Use the browser-resolved URL (handles relative hrefs correctly)
      const linkPath = normalize(new URL(a.getAttribute("href"), window.location.href).pathname);
  
      if (linkPath === currentPath && !matched) {
        a.classList.add("active");
        matched = true;
      }
    });
  
    // fallback: if nothing matched, highlight About/index
    if (!matched) {
      links.forEach((a) => {
        const linkPath = normalize(new URL(a.getAttribute("href"), window.location.href).pathname);
        if (linkPath.endsWith("/index.html")) a.classList.add("active");
      });
    }
  })();

  // ===== Anchor scroll + "jump highlight" (works on all pages) =====
document.addEventListener("DOMContentLoaded", () => {
  const pickTitle = (target) => {
    // IMPORTANT: .card before .section (index.html main has class "section")
    const container =
      target.closest(".resume-block") ||
      target.closest(".card") ||
      target.closest(".section") ||
      target;
  
    // highlight the best title inside that container
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
    void el.offsetWidth; // restart animation
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

  // highlight on load + back/forward navigation
  if (window.location.hash) setTimeout(handleHash, 250);
  window.addEventListener("hashchange", () => setTimeout(handleHash, 150));
});
  
 // ===== Resume Modal (safe on all pages) =====
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

  // click outside modal closes
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeModal();
  });
});

    // Modal
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalContent = document.getElementById("modalContent");
    const modalClose = document.getElementById("modalClose");

    function openModal(title, content){
      modalTitle.textContent = title;
      modalContent.textContent = content;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
    }

    function closeModal(){
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
    }

    document.querySelectorAll(".open-modal").forEach(btn => {
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