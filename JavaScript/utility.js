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
function isDataNotFound(data) {
    if (data == "" || data == "null" || data == "system" || data == undefined) {
        const defaultValue = "Nothing Found";
        return defaultValue;
    } else {
        return data;
    }
}
