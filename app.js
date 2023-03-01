const getAllCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json()).then(data => displayCategories(data.data))
}

const displayCategories = (categories) => {
    // console.log(categories);
    const categoryContainer = document.getElementById('category-container')
    categories.news_category.forEach(category => {
        categoryContainer.innerHTML += `
        <a href="#" onclick="getCategoryId('${category.category_id}','${category.category_name}')" class="hover:bg-blue-200 px-3 py-1 rounded-lg hover:text-blue-600">${category.category_name}</a>
        `
    })
}
const getCategoryId = (id, name) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url).then(res => res.json()).then(data => displayAlert(data.data, name))

}
const displayAlert = (items, name) => {
    document.getElementById('item-found').innerText = items.length
    document.getElementById('category-name').innerText = name
    const allNews = document.getElementById('news-container')
    document.getElementById('news-container').innerHTML = ''
    items.forEach(item => {
        allNews.innerHTML += `
        <div class="card card-side bg-base-100 shadow-xl rounded-lg mb-4 mt-4">
                    <figure><img src="${item.thumbnail_url}" alt="Movie" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${item.title}</h2>
                        <p class="pt-2 pb-2">${item.details.slice(0,150)}......</p>
                        <div class="card-actions flex justify-between items-center">
                        <div class="flex justify-center items-center gap-3">
                        <img src="${item.author.img}" class="w-12 rounded-full" alt="author img">
                        <div>
                        <p class="text-lg font-semibold">${item.author.name}</p>
                        <p>${item.author.published_date}</p>
                        </div>
                        </div>
                        <div class="font-semibold text-lg text-blue-700 flex justify-center items-center gap-3">
                        <i class="fa-solid fa-eye"></i>
                        <p>${item.total_view}</p>
                        </div>
                            <div>
                             <p class="text-lg font-semibold">Rating: <span class="text-green-400">${item.rating.badge}</span></p>
                            </div>
                           <div>
                           <button class="btn border-blue-600 bg-transparent text-blue-700 font-semibold text-lg hover:bg-blue-600 hover:text-white outline-none"><i class="fa-solid fa-right-long"></i></button>
                           </div>
                        </div>
                    </div>
                </div>
        `
        console.log(item);
    })


}
getAllCategories()