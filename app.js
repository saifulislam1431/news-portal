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
const displayAlert = (item, name) => {
    document.getElementById('item-found').innerText = item.length
    document.getElementById('category-name').innerText = name

}
getAllCategories()