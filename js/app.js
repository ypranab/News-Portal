const loadNews = async (news_default) => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    //const url3 = `https://openapi.programming-hero.com/api/news/${news_id}`;
    //const url3 = 'https://openapi.programming-hero.com/api/news/2e78e5e0310c2e9adbb6efb1a263e745';
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
                        <img src="${newsSingle.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${newsSingle.title}</h5>
                            <p class="card-text">${newsSingle.details.slice(0, 500)}</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            `;
        newsDetails.appendChild(newsDetailDiv);
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

loadNewsDetails('08');
loadNews();


