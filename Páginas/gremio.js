// Funcionalidades para a página do grêmio

document.addEventListener('DOMContentLoaded', function() {
    // Animação de entrada para os elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação aos elementos
    const animatedElements = document.querySelectorAll('.gremio-card, .gremio-mission, .contact-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Funcionalidade para os botões
    const primaryBtn = document.querySelector('.btn-primary');
    const secondaryBtn = document.querySelector('.btn-secondary');

    if (primaryBtn) {
        primaryBtn.addEventListener('click', function() {
            showTeamModal();
        });
    }

    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function() {
            showEventsModal();
        });
    }

    // Modal para mostrar a equipe (simulado)
    function showTeamModal() {
        const modalHTML = `
            <div class="modal-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            ">
                <div class="modal-content" style="
                    background: white;
                    border-radius: 20px;
                    padding: 30px;
                    max-width: 500px;
                    width: 90%;
                    text-align: center;
                    transform: scale(0.8);
                    transition: transform 0.3s ease;
                ">
                    <h3 style="color: #667eea; margin-bottom: 20px;">Nossa Equipe</h3>
                    <div style="margin-bottom: 20px;">
                        <p><strong>Presidente:</strong> [Nome do Presidente]</p>
                        <p><strong>Vice-Presidente:</strong> [Nome do Vice-Presidente]</p>
                        <p><strong>Secretário:</strong> [Nome do Secretário]</p>
                        <p><strong>Tesoureiro:</strong> [Nome do Tesoureiro]</p>
                    </div>
                    <p style="color: #666; font-size: 0.9rem;">
                        A equipe da Chapa Cosmos trabalha em conjunto para representar 
                        os interesses de todos os estudantes da escola.
                    </p>
                    <button class="modal-close" style="
                        background: #667eea;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 15px;
                        margin-top: 20px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Fechar</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.querySelector('.modal-overlay');
        const modalContent = document.querySelector('.modal-content');
        
        // Animar entrada
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);

        // Fechar modal
        const closeBtn = document.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        function closeModal() {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8)';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    // Modal para mostrar próximos eventos (simulado)
    function showEventsModal() {
        const modalHTML = `
            <div class="modal-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            ">
                <div class="modal-content" style="
                    background: white;
                    border-radius: 20px;
                    padding: 30px;
                    max-width: 500px;
                    width: 90%;
                    text-align: center;
                    transform: scale(0.8);
                    transition: transform 0.3s ease;
                ">
                    <h3 style="color: #667eea; margin-bottom: 20px;">Próximos Eventos</h3>
                    <div style="margin-bottom: 20px; text-align: left;">
                        <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
                            <strong>📅 15 de Março</strong><br>
                            <span style="color: #667eea;">Assembleia Geral</span><br>
                            <small style="color: #666;">Discussão sobre melhorias na escola</small>
                        </div>
                        <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
                            <strong>📅 22 de Março</strong><br>
                            <span style="color: #667eea;">Festival Cultural</span><br>
                            <small style="color: #666;">Apresentações de música e dança</small>
                        </div>
                        <div style="padding: 15px; background: #f8f9fa; border-radius: 10px;">
                            <strong>📅 29 de Março</strong><br>
                            <span style="color: #667eea;">Gincana Estudantil</span><br>
                            <small style="color: #666;">Competição entre turmas</small>
                        </div>
                    </div>
                    <button class="modal-close" style="
                        background: #667eea;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 15px;
                        margin-top: 20px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Fechar</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.querySelector('.modal-overlay');
        const modalContent = document.querySelector('.modal-content');
        
        // Animar entrada
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);

        // Fechar modal
        const closeBtn = document.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        function closeModal() {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8)';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    // Efeito de hover nos cards de missão
    const missionItems = document.querySelectorAll('.mission-item');
    missionItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animação para os números das estatísticas
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const isPercentage = finalValue.includes('%');
            const isYear = finalValue.includes('-');
            
            if (!isPercentage && !isYear) {
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                let currentValue = 0;
                const increment = numericValue / 50;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(currentValue) + '+';
                }, 50);
            }
        });
    }

    // Executar animação quando a seção de estatísticas estiver visível
    const statsSection = document.querySelector('.gremio-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Efeito de parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Adicionar efeito de clique nos itens de contato
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            
            if (text.includes('@')) {
                // Copiar email para clipboard
                navigator.clipboard.writeText(text).then(() => {
                    showNotification('Email copiado para a área de transferência!');
                });
            } else if (text.includes('Sala')) {
                showNotification('Sala do Grêmio: 1º andar, próximo à biblioteca');
            } else if (text.includes('Segunda')) {
                showNotification('Horário de funcionamento: Segunda a Sexta, 7h às 18h');
            }
        });
        
        item.style.cursor = 'pointer';
        item.style.transition = 'transform 0.2s ease';
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Função para mostrar notificações
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #667eea;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    console.log('Página do grêmio carregada com sucesso!');
});
