fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((response) => response.json())
    .then((newsCategoryData) => newsNav(newsCategoryData.data.news_category));

function newsNav(navItems) {
    navItems.map((item) => {
        const newsCategory = document.getElementById("news-category");
        const div = document.createElement("div");
        div.innerHTML = `<h3 class="nav-news" onclick="loadNewsData('${item.category_id},${item.category_name}')">${item.category_name}</h3>`;
        newsCategory.appendChild(div);
    });
}

function loadNewsData(item) {
    const itemArray = item.split(",");
    const newsCategory = document.getElementById("category");
    newsCategory.innerText = `${itemArray[1]}`;
    const url = `https://openapi.programming-hero.com/api/news/category/${itemArray[0]}`;
    fetch(url)
        .then((response) => response.json())
        .then((newsData) => loadNewsCard(newsData.data));
}

function loadNewsCard(newsData) {
    const totalNews = document.getElementById("total-news");
    totalNews.innerText = `${newsData.length}`;
    console.log(newsData);
}
