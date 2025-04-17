let selected_page = "Home";
let currentFilter = "";
let darkMode = "false";

const colorSetLight = {
    primary: "white",
    primaryVariant: "#f9f9f9",
    primaryVariant2: "#bbb",
    
    secondary: "#00A000",
    secondaryVariant: "#007800",
    
    tertiary: "#ffa216",
    tertiaryVariant: "#ffb23d",
    
    text: "#333",
    
    boxShadow: "rgba(0, 0, 0, 0.2)",

    performanceGood: "#d4f8d4",
    performanceAverage: "#ffe4b3",
    performancePoor: "#f8d4d4",
};

const colorSetDark = {
    primary: "#1A1A1A",
    primaryVariant: "#272727",
    primaryVariant2: "#444",
    
    secondary: "#00A000",
    secondaryVariant: "#008900",
    
    tertiary: "#ffa216",
    tertiaryVariant: "#ffb23d",
    
    text: "#DDD",
    
    boxShadow: "rgba(0, 0, 0, 1)",

    performanceGood: "#d4f8d4",
    performanceAverage: "#ffe4b3",
    performancePoor: "#f8d4d4",
};

window.onload = () => {
    loadCookies();
    toggleDarkMode(darkMode);
    setSelectedPage(selected_page);
}

function loadCookies() {
    darkMode = loadCookie("darkMode") == "true"
    selected_page = loadCookie("selectedPage") || "Home"
}

function loadCookie(cookieId) {
    return ((document.cookie.split("; ")
    .filter((str) => str.includes(cookieId))[0] || "X=")
    .split("=")[1] || "")
}

function setCookie(cookieId, cookieValue) {
    document.cookie = `${cookieId}=${cookieValue}; path=/`;
}

function toggleDarkMode(override = null) {
    if (override != null) darkMode = override;
    else darkMode = !darkMode;
    setCookie("darkMode", darkMode)

    document.getElementById("toggle-dark-mode").textContent = darkMode ? "☀️" : "🌙"

    if (darkMode) updateColors(colorSetDark);
    else updateColors(colorSetLight);
}

function updateColors(colorSet) {
    const root = document.documentElement;

    root.style.setProperty("--primary", colorSet.primary);
    root.style.setProperty("--primary-var", colorSet.primaryVariant);
    root.style.setProperty("--primary-var-2", colorSet.primaryVariant2);
    root.style.setProperty("--secondary", colorSet.secondary);
    root.style.setProperty("--secondary-var", colorSet.secondaryVariant);
    root.style.setProperty("--tertiary", colorSet.tertiary);
    root.style.setProperty("--tertiary-var", colorSet.tertiaryVariant);
    root.style.setProperty("--text", colorSet.text);
    root.style.setProperty("--box-shadow", colorSet.boxShadow);
    root.style.setProperty("--performance-good", colorSet.performanceGood);
    root.style.setProperty("--performance-average", colorSet.performanceAverage);
    root.style.setProperty("--performance-poor", colorSet.performancePoor);
}

function setSelectedPage(page) {
    selected_page = page;
    setCookie("selectedPage", selected_page)

    loadPage(selected_page);
    BolderizeLink(selected_page);
}

function loadPage(page) {
    const path = "subpages/" + page.replaceAll(" ", "") + ".html"
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
    Array.from(document.getElementsByTagName("header")[0].children)
        .forEach((child) => {
            if (child.getAttribute('type') === page) child.classList.add("selected-link");
            else child.classList.remove("selected-link");
        });
}

function addOrRemoveFilter(filterName) {
    currentFilter == filterName ? currentFilter = "" : currentFilter = filterName

    for (const child of document.getElementById("filters").children) {
        const type = child.getAttribute('type');
        if (currentFilter == type) child.classList.add("filter-active")
        else child.classList.remove("filter-active")
    }

    for (const child of document.getElementById("filtered-list").children) {
        const type = child.getAttribute('type');
        if (currentFilter != "" && currentFilter != type) child.classList.add("hide")
        else child.classList.remove("hide")
    }

}