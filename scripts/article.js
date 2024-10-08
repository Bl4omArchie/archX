// Fonction pour charger le fichier markdown
function loadMarkdown(file) {
    fetch(file)
        .then(response => response.text())
        .then(markdown => {

        var converter = new showdown.Converter();
        var html = converter.makeHtml(markdown);
        document.getElementById("blog-content").innerHTML = html;
        })
        .catch(error => console.log("Erreur de chargement du fichier markdown : ", error));
    }


loadMarkdown('test.md');