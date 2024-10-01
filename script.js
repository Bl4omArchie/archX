document.addEventListener('DOMContentLoaded', function () {
    const defaultTag = 'crypto';
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