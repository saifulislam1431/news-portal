let fetchData = []
    // Get Categories
const getAllCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data =>
            displayCategories(data.data)
        );


};

const displayCategories = (categories) => {
    // console.log(categories);
    const categoryContainer = document.getElementById('category-container')
    categories.news_category.forEach(category => {
        categoryContainer.innerHTML += `
        <a href="#" onclick="getCategoryId('${category.category_id}','${category.category_name}')" class="hover:bg-blue-200 px-3 py-1 rounded-lg hover:text-blue-600">${category.category_name}</a>
        `
    })
}

// Get Categories Id
const getCategoryId = (id, name) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url).then(res => res.json()).then(data => {
        fetchData = data.data
        displayAlert(data.data, name)
    })


}
const displayAlert = (items, name) => {
    document.getElementById('item-found').innerText = items.length
    document.getElementById('category-name').innerText = name
    const allNews = document.getElementById('news-container')

    document.getElementById('news-container').innerHTML = ''
    items.forEach(item => {
        const date = new Date(item.author.published_date)
        allNews.innerHTML += `
        <div class="card card-side bg-base-100 shadow-xl rounded-lg mb-4 mt-4">
                    <figure><img src="${item.thumbnail_url}" alt="Movie" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${item.title}<div class="badge badge-warning gap-2">
                        ${item.others_info.is_trending ?  "Trending": ''}
                      </div></h2>
                        <p class="pt-2 pb-2">${item.details.slice(0,150)}......</p>
                        <div class="card-actions flex justify-between items-center">
                        <div class="flex justify-center items-center gap-3">
                        <img src="${item.author.img}" class="w-12 rounded-full" alt="author img">
                        <div>
                        <p class="text-lg font-semibold">${item.author.name ?  item.author.name:"Not available"}</p>
                        <p>${date.toDateString()}</p>
                        </div>
                        </div>
                        <div class="font-semibold text-lg text-blue-700 flex justify-center items-center gap-3">
                        <i class="fa-solid fa-eye"></i>
                        <p>${item.total_view ? item.total_view :"Not available" }</p>
                        </div>
                            <div class="flex justify-between items-center gap-1">
                            <p>${generateRating(item.rating.number)}</p>
                             <p class="text-lg font-semibold"><span class="text-green-400">${item.rating.number}</span></p>
                            </div>
                           <div>
                           <label for="my-modal-3" onclick="loadModalDetails('${item._id}')" class="btn  border-blue-600 bg-transparent text-blue-700 font-semibold text-lg hover:bg-blue-600 hover:text-white outline-none"><i class="fa-solid fa-right-long"></i></label>
                           </div>
                        </div>
                    </div>
                </div>
        `
        console.log(item);
    })


}

// Function for modal
const loadModalDetails = (newsId) => {

    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url).then(res => res.json()).then(data => displayModalDetails(data.data[0]))

}
const displayModalDetails = (allDetails) => {
    console.log(allDetails);
    const { title, details } = allDetails;
    const titleOFNews = document.getElementById('title-of-news')
    const description = document.getElementById('description')
    titleOFNews.innerText = title;
    description.innerText = details;

}

// Show picks after clicking button
const showTodayPick = () => {
    let todayPicks = fetchData.filter(singleData => singleData.others_info.is_todays_pick === true);
    const cateName = document.getElementById('category-name').innerText;
    displayAlert(todayPicks, cateName)
}

// Show trending after clicking button
const showTrending = () => {
    let todayTrending = fetchData.filter(singleData => singleData.others_info.is_trending === true);
    const cateName = document.getElementById('category-name').innerText;
    displayAlert(todayTrending, cateName)
}

// Generate rating

const generateRating = (rating) => {
    let ratingHTML = ''
    for (let i = 1; i <= Math.floor(rating); i++) {
        ratingHTML += `<i class="fa-solid fa-star font-medium text-amber-500"></i>`

    }
    if (rating - Math.floor(rating) > 0) {
        ratingHTML += `<i class="fa-regular fa-star-half-stroke font-medium text-amber-500"></i>`
    }
    return ratingHTML
}
getAllCategories()