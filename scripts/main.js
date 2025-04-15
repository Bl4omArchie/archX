let selected_page = "Home";
let darkMode = false;

const colorSetLight = {
    primaryColor: "white",
    primaryColorComplement: "whitesmoke",
    
    secondaryColor: "#00A000",
    secondaryColorComplement: "#008900",
    
    textColor: "#333",
    textLink: "#00A000",
    
    boxShadowColor: "rgba(0, 0, 0, 0.2)",
};

const colorSetDark = {
    primaryColor: "#1A1A1A",
    primaryColorComplement: "#272727",
    
    secondaryColor: "#00A000",
    secondaryColorComplement: "#008900",
    
    textColor: "#DDD",
    textLink: "#00A000",
    
    boxShadowColor: "rgba(0, 0, 0, 1)",
    // boxShadowColor: "rgba(255, 255, 255, 0.1)",
};

function toggleDarkMode(override = null) {
    if (override != null) darkMode = override;
    else darkMode = !darkMode;

    document.getElementById("toggle-dark-mode").textContent = darkMode ? "☀️" : "🌙"

    if (darkMode) updateColors(colorSetDark);
    else updateColors(colorSetLight);
};

function updateColors(colorSet) {
    const root = document.documentElement;

    root.style.setProperty("--primary-color", colorSet.primaryColor);
    root.style.setProperty("--primary-color-complement", colorSet.primaryColorComplement);
    root.style.setProperty("--secondary-color", colorSet.secondaryColor);
    root.style.setProperty("--secondary-color-complement", colorSet.secondaryColorComplement);
    root.style.setProperty("--text-color", colorSet.textColor);
    root.style.setProperty("--text-link", colorSet.textLink);
    root.style.setProperty("--box-shadow-color", colorSet.boxShadowColor);
}

function loadPage(page) {
    console.log("loadPage(page) not impemented yet");

    const path = "subpages/" + page.toLowerCase().replaceAll(" ", "") + ".html"
    const main_content = document.getElementById("main-content")

    main_content.children = null
    main_content.textContent = null

        fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load page: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                main_content.innerHTML = html;
            })
            .catch(error => {
                console.error(error);
                main_content.textContent = "Failed to load content.";
            });
}

function BolderizeLink(page) {
    console.log(document.getElementsByTagName("header")[0].children.item(0).textContent)

    Array.from(document.getElementsByTagName("header")[0].children)
        .forEach((child) => {
            if (child.textContent.trim() === page.trim()) child.classList.add("selected-link");
            else child.classList.remove("selected-link");
        });
}

function setSelectedPage(page) {
    selected_page = page;

    loadPage(selected_page);
    BolderizeLink(selected_page);
}

window.onload = (event) => {
    toggleDarkMode(false);
    setSelectedPage(selected_page);
}
