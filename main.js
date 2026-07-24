// Lógica para navegação suave e modal LGPD

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navegação Suave (Smooth Scroll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Lógica do Modal de Privacidade
    const modal = document.getElementById('privacy-modal');
    const btnOpen = document.getElementById('btn-privacidade');
    const btnClose = document.querySelector('.close-modal');

    if (btnOpen && modal && btnClose) {
        btnOpen.addEventListener('click', () => {
            modal.classList.add('show');
        });

        btnClose.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        // Fechar ao clicar fora do conteúdo
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    // 3. Efeito leve de parallax no background da imagem principal (Opcional - toque premium)
    const heroImage = document.querySelector('.hero-image-wrapper img');
    if(heroImage) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            if(scrollPos < 800) {
                // Move a imagem muito sutilmente
                heroImage.style.transform = `translateY(${scrollPos * 0.1}px) scale(1.02)`;
            }
        });
    }
});
