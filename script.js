const API_KEY = "6f7eeb48288e42828fed8e5c4554eecc";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load",()=>FetchNews("India"));


function reload(){
    window.location.reload();
}
async function FetchNews(query)
{
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = "";
    articles.forEach(article => {
        if(!article.urlToImage)return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article)
{
    const newsImage = cardClone.querySelector('#news-image');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    // newsSource.innerHTML = article.source;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>
    window.open(article.url,"_blank"));
}
let currSelectedNav = null;
function onNavItemClick(id)
{
    FetchNews(id);
    const navItem = document.getElementById(id);
    currSelectedNav?.classList.remove("active");
    currSelectedNav = navItem;
    currSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchNews = document.getElementById("news-search");

searchButton.addEventListener("click",()=>{
    const query = searchNews.value;
    if(!query) return;
    FetchNews(query);
    currSelectedNav?.classList.remove("active");
    currSelectedNav = null;
})