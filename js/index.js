let games = [];
let activated_category = "mmorpg";
let games_row = document.querySelector("#games");
let categories = document.querySelectorAll("[data-category]");
let game_cards = document.querySelectorAll(".game_card");

// CLASSES
class Ui {
  showMovies() {
    let games_cards = games_obj.map((game) => {
      return `<div class="col-md-3  border-black ">
          <div class="card bg-transparent text-white" data-id=${game.game_id}>
              <div class="card-body p-3 ">
                  <figure class="position-relative">
                      <img src=${game.thumb} 
                      class="card-img-top object-fit-cover h-100"
                          alt=${game.game_title}>
                  </figure>
                  <div class="card-title  d-flex justify-content-between align-items-center">
                      <span>${game.game_title}</span>
                      <span class="badge bg-primary p-2">free</span>
                  </div>
                  <small class="card-text">${game.short_desc}</small>

              </div>
              <div class="card-footer bg-transparent d-flex justify-content-between">
                  <span class="badge p-2 text-uppercase">${game.category}</span>
                  <span class="badge  p-2 text-uppercase">${game.platform}</span>
              </div>
          </div>
      </div>`;
    });
    /**
     * why using .join('') with map arry :
     * template literals use the toString() method which by default joins
     * the returned array by map with a ,.
     * To avoid this "problem" you can use join('')
     */

    games_row.innerHTML = games_cards.join("");
    document.querySelector("#container").appendChild(games_row);
  }
}

class Game {
  constructor(id, title, short_desc, category, thumb, url, platform) {
    this.game_id = id;
    this.game_title = title;
    this.short_desc = short_desc;
    this.category = category;
    this.thumb = thumb;
    this.url = url;
    this.platform = platform;
  }
}
async function displayGames(category) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=${category}&sort-by=release-date`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7ac8eee9b9mshe3ad16bf98b14bbp1f9930jsn3ae2ec7f2201",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    games = await response.json();
    games_obj = games.map((game) => {
      return new Game(
        game.id,
        game.title,
        game.short_description,
        game.genre,
        game.thumbnail,
        game.game_url,
        game.platform
      );
    });

    let ui = new Ui();
    ui.showMovies();
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Change category
(function () {
  for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener("click", function (e) {
      clickedCategory = e.target.getAttribute("data-category");
      displayGames(clickedCategory);
    });
  }
})();

displayGames(activated_category);
console.log("cards",document.querySelectorAll(".card"));
// Open game-details
for (let i = 0; i < game_cards.length; i++) {
  // console.log(document.querySelectorAll(".card"));
  game_cards[i].addEventListener("click", function (e) {
    console.log(e.target.getAttribute("data-id"));
  });
}
