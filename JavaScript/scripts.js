fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((response) => response.json())
    .then((data) => newsNav(data.data.news_category));

function newsNav(navItems) {
    navItems.map((item) => {
        const newsCategory = document.getElementById("news-category");
        const h3 = document.createElement("h3");
        h3.classList.add("nav-news");
        h3.innerText = `${item.category_name}`;
        newsCategory.appendChild(h3);
    });
}
