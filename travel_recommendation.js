document.addEventListener('navbarLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearButton');
    const cardsContainer = document.getElementById('cards-container');
    const cardsSection = document.getElementById('cards-section');

    // Show or hide the clear button based on input value
    searchInput.addEventListener('input', () => {
        console.log("Input...");
        clearButton.style.display = searchInput.value ? 'block' : 'none';
        searchRecommendations(searchInput.value)
    });

    // Clear the input field when the clear button is clicked
    clearButton.addEventListener('click', () => {
        console.log("Clear");
        searchInput.value = '';
        clearButton.style.display = 'none';

        if (cardsContainer) {
            cardsContainer.innerHTML = ''; // Removes all child elements from the cards container
            console.log('All cards cleared');
        }

        searchInput.focus();
    });
});

// Fetch JSON Data
async function fetchTravelData() {
    try {
        const response = await fetch('travel_recommendation_api.json'); // Replace with actual file path
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching travel data:', error);
        return null;
    }
}

function generateCards(data, type) {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ''; // Clear previous cards

    if (!data[type]) {
        cardsContainer.innerHTML = `<p>No results found for "${type}".</p>`;
        return;
    }

    console.log(data[type]);

    data[type].forEach(item => {
        console.log(item)
        if(type == 'countries') {
            imageUrl = item.cities[0].imageUrl;
            imageAlt = item.cities[0].name;
            textCont = item.cities[0].name;
            textDesc = item.cities[0].description;
        } else {
            imageUrl = item.imageUrl;
            imageAlt = item.name;
            textCont = item.name;
            textDesc = item.description;
        }
        
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = imageAlt;

        const content = document.createElement('div');
        content.classList.add('card-content');

        const title = document.createElement('h3');
        title.textContent = textCont;

        const desc = document.createElement('p');
        desc.textContent = textDesc;

        content.appendChild(title);
        content.appendChild(desc);
        card.appendChild(image);
        card.appendChild(content);
        cardsContainer.appendChild(card);
    });
}

// Show Cards Section
function showCardsSection() {
    const cardsSection = document.getElementById('cards-section');

    cardsSection.style.display = 'block'; // Make the cards section visible
}

// Search Recommendations
async function searchRecommendations(type) {
    console.log(type);

    const data = await fetchTravelData();

    if(type == 'country') {
        type = 'countries';
    }

    if (data && data[type]) {
        generateCards(data, type);
        showCardsSection();
    } else {
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = ''; // Clear previous cards
    }
}

function updateNewYorkTime() {
    const options = { 
      timeZone: 'America/New_York', 
      hour12: true, 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric' 
    };
    const newYorkTime = new Date().toLocaleTimeString('en-US', options);
    document.getElementById('newYorkTime').textContent = newYorkTime;
  }

  // Update time every second
  setInterval(updateNewYorkTime, 1000);
  updateNewYorkTime(); // Initialize immediately