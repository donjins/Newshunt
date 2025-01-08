const apiKey = '217cde20a5754d1e8fb9b5558fba9c90'
const url = 'https://newsdata.io/api/1/news?apikey=pub_64351e1cd333bda9687d2cb5117a6c6796d8a&q=technology&country=in&language=en&category=business,entertainment,sports,technology,world '

let currentPage = 1;
let totalResults = 0;

// Fetch and display news articles
function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&page=${currentPage}&pageSize=6&apiKey=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            totalResults = data.totalResults;
            displayArticles(data.articles);
            console.log(data);
        })

        .catch(error => console.error('Error fetching news:', error));
}


// Display the news articles in cards
function displayArticles(articles) {
    const newsContainer = document.getElementById('news-cards');

    articles.forEach(article => {
        const card = document.createElement('div');
        card.classList.add('news-card');
        card.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/350x200'}" alt="News Image">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(card);
    });
}

// Load more articles when the button is clicked
function loadMoreArticles() {
    if (currentPage * 6 < totalResults) {
        currentPage++;
        fetchNews();
    } else {
        document.getElementById('load-more').disabled = true;
        document.getElementById('load-more').innerText = "No More Articles";
    }
}

// Search functionality
function searchNews() {
    const query = document.getElementById('search').value;
    const url = `https://newsapi.org/v2/everything?q=${query}&page=1&pageSize=6&apiKey=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('news-cards').innerHTML = '';
            displayArticles(data.articles);
        })
        .catch(error => console.error('Error searching news:', error));
}

// Initial fetch
fetchNews();

// Event listener for search input
document.getElementById('search').addEventListener('input', searchNews);
