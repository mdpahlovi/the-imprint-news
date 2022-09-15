toggleLoader(true);
fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((response) => response.json())
    .then((newsCategoryData) => newsNav(newsCategoryData.data.news_category))
    .catch((error) =>
        alert(`Some Mistake Happened on :
            ${error}`)
    );

const newsNav = (navItems) => {
    navItems.map((item) => {
        const newsCategory = document.getElementById("news-category");
        const div = document.createElement("div");
        div.innerHTML = `<h3 class="text-gray-500 cursor-pointer" id="${item.category_name}" onclick="loadNewsData('${item.category_id},${item.category_name}')">${item.category_name}</h3>`;
        newsCategory.appendChild(div);
        toggleLoader(false);
    });
};

const loadNewsData = (item) => {
    const itemArray = item.split(",");
    setInnerText("category", `${itemArray[1]}`);
    isActive(`${itemArray[1]}`);
    toggleLoader(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${itemArray[0]}`;
    fetch(url)
        .then((response) => response.json())
        .then((newsData) => loadNewsArray(newsData.data))
        .catch((error) =>
            alert(`Some Mistake Happened on :
                ${url}
                ${error}`)
        );
};

const loadNewsArray = (newsData) => {
    setInnerText("total-news", `${newsData.length}`);
    const sortedNews = sortNews(newsData);
    document.getElementById("news-card").innerHTML = "";
    displayNews(sortedNews);
    toggleLoader(false);
};

const loadNewData = (newsId) => {
    const newsUrl = `https://openapi.programming-hero.com/api/news/${newsId}`;
    fetch(newsUrl)
        .then((response) => response.json())
        .then((newsData) => openModal(newsData.data[0]))
        .catch((error) =>
            alert(`Some Mistake Happened on :
                ${newsUrl}
                ${error}`)
        );
};

const openModal = (newsData) => {
    document.getElementById("exampleModalScrollableLabel").innerText = `${newsData.title}`;
    document.getElementById("modalBody").innerHTML = `
        <img class="mb-1" src="${newsData.image_url}">
        <div class="flex gap-2">
            <img class="w-10 rounded-full" src=${newsData.author.img} alt="" />
            <div>
                <h5 class="font-medium">${isDataNotFound(newsData.author.name)}</h5>
                <p class="text-sm">
                ${newsData.author.published_date?.split(" ")[0] ?? "Not Found"}
                </p>
            </div>
        </div>
        <p>${newsData.details}</p>`;
    console.log(newsData);
};
