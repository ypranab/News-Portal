const loadNews = async (news_default) => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    newsCatagoriesShow(data.data.news_category);
}

const newsCatagoriesShow = (news) => {
    const newsCatagories = document.getElementById('news-catagories');
    toggleSpinner(false);

    for (const newsCatagory of news) {
        const newsDiv = document.createElement('span');
        newsDiv.innerHTML = `
        <span class='mb-5'>
        <button onclick="loadNewsDetails('${newsCatagory.category_id}')" class="btn btn-light">${newsCatagory.category_name}</button>
        </span>
        `;
        newsCatagories.appendChild(newsDiv);
        //console.log(newsCatagory.category_id);
    }
}

const loadNewsDetails = async (category_id) => {
    const newsDetails = document.getElementById('news-details');
    newsDetails.textContent = '';
    toggleSpinner(false);

    const url2 = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url2);
    const data = await res.json();
    displayNews(data.data);
}

const displayNews = newsInfo => {
    const newsDetails = document.getElementById('news-details');
    newsDetails.textContent = '';
    //console.log(newsInfo);
    for (const newsSingle of newsInfo) {
        const newsDetailDiv = document.createElement('div');
        newsDetailDiv.classList.add('card');
        newsDetailDiv.innerHTML = `
        <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${newsSingle.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${newsSingle.title}</h5>
                        <p class="card-text">${newsSingle.details.slice(0, 500)}...</p>
                        <div class="row">
                        <div class="col-1">
                        <img class="w-100 rounded-circle" src="${newsSingle.author.img}" alt="">
                        </div>
                        <div class="col-5">
                        <p class="card-text">${newsSingle.author.name}</small></p>
                        </div>
                        <div class="col-6">
                        <p class="card-text"><i class="fa-solid fa-eye"></i>${newsSingle.total_view}</small></p>
                        </div>
                        </div>
                        <button onclick="newsIdDetails('${newsSingle._id}')" class="btn btn-warning mt-2" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Show Details</button>
                        </div>
                    </div>
                </div>
            `;
        newsDetails.appendChild(newsDetailDiv);
        //console.log(newsSingle);
    }
    toggleSpinner(true);
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (!isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

const newsIdDetails = async news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    const res = await fetch(url);
    const data = await res.json();
    loadNewsModal(data.data);
}
const loadNewsModal = modalNewsDetail => {
    console.log(modalNewsDetail);
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = modalNewsDetail[0].title;
    const modalDetails = document.getElementById('modal-details');
    modalDetails.innerHTML = `
    <img src="${modalNewsDetail[0].image_url}" class="mw-100"></img>
    <p>Author: ${modalNewsDetail[0].author.name ? modalNewsDetail[0].author.name : 'No Author Information'}</p>
    <p>${modalNewsDetail[0].details}</p>
    `;
}

loadNewsDetails('04');
loadNews();


