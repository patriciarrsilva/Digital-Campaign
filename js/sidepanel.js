const sidepanel = document.getElementById("sidepanel");

/* Set the width of the sidebar to show it */
function openNav() {
    sidepanel.className += " sidepanel-open";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
    sidepanel.className = sidepanel.className.replace(/\bsidepanel-open\b/g, "");
}