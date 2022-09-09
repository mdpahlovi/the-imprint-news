toggleLoader(true);
fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((response) => response.json())
    .then((newsCategoryData) => newsNav(newsCategoryData.data.news_category))
    .catch((error) =>
        alert(`Some Mistake Happened on :
            ${error}`)
    );

function newsNav(navItems) {
    navItems.map((item) => {
        const newsCategory = document.getElementById("news-category");
        const div = document.createElement("div");
        div.innerHTML = `<h3 class="nav-news" onclick="loadNewsData('${item.category_id},${item.category_name}')">${item.category_name}</h3>`;
        newsCategory.appendChild(div);
        toggleLoader(false);
    });
}

function loadNewsData(item) {
    const itemArray = item.split(",");
    const newsCategory = document.getElementById("category");
    newsCategory.innerText = `${itemArray[1]}`;
    toggleLoader(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${itemArray[0]}`;
    fetch(url)
        .then((response) => response.json())
        .then((newsData) => loadNewsCard(newsData.data))
        .catch((error) =>
            alert(`Some Mistake Happened on :
                ${url}
                ${error}`)
        );
}

function loadNewsCard(newsData) {
    const sortContainer = document.getElementById("sort-container").value;
    if (sortContainer == "view") {
        newsData.sort((a, b) => {
            return b.total_view - a.total_view;
        });
    }
    const totalNews = document.getElementById("total-news");
    totalNews.innerText = `${newsData.length}`;
    document.getElementById("news-card").innerHTML = "";
    newsData.map((newsItem) => {
        const newsCard = document.getElementById("news-card");
        const div = document.createElement("div");
        div.classList.add("flex", "flex-col", "items-center", "sm:flex-row", "border", "rounded-xl");
        div.innerHTML = `
            <img class="p-6 pb-0 sm:pb-6 sm:pr-0 w-full sm:w-[244px] sm:h-[300px]" src=${
                newsItem.thumbnail_url
            } alt="" />
            <div class="p-6 flex flex-col justify-start gap-3">
                <h5 class="text-xl md:text-2xl font-medium">${newsItem.title}</h5>
                <p class="line-clamp-6 sm:line-clamp-3 md:line-clamp-4">
                ${newsItem.details}</p>
                <div class="flex flex-wrap gap-x-4 gap-y-3 justify-between items-center">
                    <div class="flex gap-2">
                        <img class="w-10 rounded-full" src=${newsItem.author.img} alt="" />
                        <div>
                            <h5 class="font-medium">${isDataNotFound(newsItem.author.name)}</h5>
                            <p class="text-sm">
                            ${newsItem.author.published_date?.split(" ")[0] ?? "Not Found"}</p>
                        </div>
                    </div>
                    <h5 class="font-medium"><i class="fa-solid fa-eye"></i> ${newsItem.total_view}</h5>
                    <button class="group button button-secondary" onclick="openNewsData('${newsItem._id}')" 
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalScrollable">
                        View More <span class="button-animation"></span>
                    </button>
                </div>
            </div>`;
        newsCard.appendChild(div);
        toggleLoader(false);
    });
}

function openNewsData(newsId) {
    const newsUrl = `https://openapi.programming-hero.com/api/news/${newsId}`;
    fetch(newsUrl)
        .then((response) => response.json())
        .then((newsData) => openModalData(newsData.data[0]))
        .catch((error) =>
            alert(`Some Mistake Happened on :
                ${newsUrl}
                ${error}`)
        );
}

function openModalData(newsData) {
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
}
