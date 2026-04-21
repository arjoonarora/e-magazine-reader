const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");
const book = document.getElementById("bookContainer");

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");

const modeToggle = document.getElementById("modeToggle");
const zoomToggle = document.getElementById("zoomToggle");

const TOTAL = 22;
let page = 0;
let scrollMode = false;

/* CHECK MOBILE */
const isMobile = () => window.innerWidth <= 768;

/* RENDER */
function render() {

    leftPage.innerHTML = "";
    rightPage.innerHTML = "";

    leftPage.removeAttribute("data-page");
    rightPage.removeAttribute("data-page");

    if (page === 0) {
        rightPage.setAttribute("data-page", 0);
        leftPage.innerHTML = "<h2>Start Reading</h2>";
        return;
    }

    if (page >= TOTAL - 1) {
        leftPage.setAttribute("data-page", page);
        rightPage.innerHTML = "<h2>End</h2>";
        return;
    }

    if (isMobile()) {
        rightPage.setAttribute("data-page", page);
        return;
    }

    leftPage.setAttribute("data-page", page);
    rightPage.setAttribute("data-page", page + 1);
}

/* NEXT */
function next() {
    if (scrollMode) return;

    if (isMobile()) page++;
    else page += (page === 0 ? 1 : 2);

    if (page >= TOTAL) page = TOTAL - 1;

    render();
}

/* PREV */
function prev() {
    if (scrollMode) return;

    if (isMobile()) page--;
    else page -= (page <= 1 ? 1 : 2);

    if (page < 0) page = 0;

    render();
}

/* SCROLL MODE */
modeToggle.onclick = () => {
    scrollMode = !scrollMode;

    if (scrollMode) {
        book.classList.add("scroll-mode");
        book.innerHTML = "";

        for (let i = 0; i < TOTAL; i++) {
            const div = document.createElement("div");
            div.setAttribute("data-page", i);
            book.appendChild(div);
        }
    } else {
        location.reload();
    }
};

/* ZOOM */
zoomToggle.onclick = () => {
    document.body.classList.toggle("zoom");
};

/* BUTTONS */
nextBtn.onclick = next;
prevBtn.onclick = prev;

/* KEYBOARD CONTROLS */
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "z") document.body.classList.toggle("zoom");
    if (e.key === "s") modeToggle.click();
});

// ========== MOBILE PE ZOOM BUTTON DISABLE ==========
const zoomToggle = document.getElementById('zoomToggle');
 isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;

if (isMobile) {
    zoomToggle.disabled = true;
    zoomToggle.style.opacity = '0.5';
    zoomToggle.style.cursor = 'not-allowed';
    zoomToggle.title = 'Zoom mode is not available on mobile';
}


render();