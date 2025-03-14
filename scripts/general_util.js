document.addEventListener('DOMContentLoaded', function () {
    const defaultTag = 'default';
    showTag(defaultTag);
    setActiveTag(defaultTag);

    document.querySelectorAll('.tag-filter').forEach(function (tagElement) {
        tagElement.addEventListener('click', function () {
            const selectedTag = this.getAttribute('data-tag');
            if (selectedTag === 'all') {
                showAll();
            } else {
                showTag(selectedTag);
            }
            setActiveTag(selectedTag);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('header nav a').forEach(function(link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Fonction pour afficher les éléments ayant un tag spécifique
function showTag(tag) {
    document.querySelectorAll('li').forEach(function (li) {
        const liTags = li.getAttribute('data-tags').toLowerCase();
        if (liTags.includes(tag.toLowerCase())) {
            li.style.display = 'block';
        } else {
            li.style.display = 'none';
        }
    });
    updateTitlesVisibility();
}

// Fonction pour afficher tous les éléments
function showAll() {
    document.querySelectorAll('li').forEach(function (li) {
        li.style.display = 'block';
    });
    updateTitlesVisibility();
}

// Fonction pour afficher/masquer les titres en fonction des éléments visibles
function updateTitlesVisibility() {
    document.querySelectorAll('h3').forEach(function (title) {
        const ul = title.nextElementSibling;
        const hasVisibleItems = Array.from(ul.querySelectorAll('li')).some(function (li) {
            return li.style.display === 'block';
        });
        title.style.display = hasVisibleItems ? 'block' : 'none';
    });

    document.querySelectorAll('h4').forEach(function (title) {
        const ul = title.nextElementSibling;
        const hasVisibleItems = Array.from(ul.querySelectorAll('li')).some(function (li) {
            return li.style.display === 'block';
        });
        title.style.display = hasVisibleItems ? 'block' : 'none';
    });
}

// Fonction pour changer l'apparence du bouton actif
function setActiveTag(tag) {
    document.querySelectorAll('.tag-filter').forEach(function (button) {
        if (button.getAttribute('data-tag') === tag) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    // Vérifie si le mode sombre est déjà activé dans le localStorage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }

    toggleButton.addEventListener('click', function () {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'disabled');
            themeIcon.textContent = '🌙';
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
            themeIcon.textContent = '☀️';
        }
    });
});

document.querySelectorAll('.tag-filter').forEach(button => {
    button.addEventListener('click', function() {
        const tag = this.getAttribute('data-tag');
        const targetH3 = [...document.querySelectorAll('h3')].find(h3 => 
            h3.textContent.toLowerCase().includes(tag.toLowerCase())
        );

        if (targetH3) {
            targetH3.scrollIntoView({ behavior: 'smooth' });
        }
    });
});