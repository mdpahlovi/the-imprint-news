//  Loader Function
const toggleLoader = (isLoading) => {
    const loader = document.getElementById("loader");
    if (isLoading) {
        loader.classList.remove("hidden");
    } else {
        loader.classList.add("hidden");
    }
};
