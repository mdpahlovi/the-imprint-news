// Load Data
const loadData = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        alert(`Error : ${error.message}
    In : ${url}`);
    }
};

//  Loader Function
const toggleLoader = (isLoading) => {
    const loader = document.getElementById("loader");
    if (isLoading) {
        loader.classList.remove("hidden");
    } else {
        loader.classList.add("hidden");
    }
};

// No Data Found
const isDataNotFound = (data) => {
    if (data == "" || data == "null" || data == "system" || data == undefined) {
        const defaultValue = "Nothing Found";
        return defaultValue;
    } else {
        return data;
    }
};

// Display News Card
const displayNews = (newsArray) => {
    newsArray.map((newsItem) => {
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
                    <button class="group button button-secondary" onclick="loadNewData('${newsItem._id}')" 
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalScrollable">
                        View More <span class="button-animation"></span>
                    </button>
                </div>
            </div>`;
        newsCard.appendChild(div);
    });
};

//Nav item Active Function
const isActive = (id) => {
    const newsCategory = document.querySelectorAll("#news-category > div > h3");
    newsCategory.forEach((news) => {
        news.classList.remove("nav-news-active");
        news.classList.add("text-gray-500");
    });
    const navId = document.getElementById(id);
    if (navId) {
        navId.classList.add("nav-news-active");
        navId.classList.remove("text-gray-500");
    }
};

const homeActive = () => {
    const newsCategory = document.querySelectorAll("#news-category > div > h3");
    newsCategory.forEach((news) => {
        news.classList.remove("nav-news-active");
        news.classList.add("text-gray-500");
    });
    const navId = document.getElementById("home");
    navId.classList.add("nav-news-active");
    navId.classList.remove("text-gray-500");
};

// setInnerText
const setInnerText = (id, value) => {
    const newsCategory = document.getElementById(id);
    newsCategory.innerText = value;
};

// Test

const sortNews = (array) => {
    const sortContainer = document.getElementById("sort-container");
    if (sortContainer.value === "view") {
        array.sort((a, b) => {
            return b.total_view - a.total_view;
        });
    }
    return array;
};
