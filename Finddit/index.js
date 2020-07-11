import reddit from "./redditapi";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// *Form Event listener
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   * Get search item
  const searchTerm = searchInput.value;
  //   * Get Sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  const searchLimit = document.getElementById("limit").value;
  if (searchTerm == "") {
    //   * Show message
    showMessage("Please add a search term!!", "alert-danger");
  }

  //   Clear input
  searchInput.value = "";

  //   Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
    let output = '<div class="card-columns">';
    results.forEach((post) => {
      // * Check image
      let image = post.preview
        ? post.preview.images[0].source.url
        : "https://www.technorms.com/assets/post-featured-image-18973-1.jpg";
      output += `
        <div class="card">
         <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${truncateText(post.title, 100)}</h5>
                <p class="card-text">${truncateText(post.selftext, 100)}</p>
                <a href="${
                  post.url
                }" target="_blank" class="btn btn-primary">Read More</a>
                <hr/>
                <span class="badge badge-secondary"> Subreddit: ${
                  post.subreddit
                }</span>
                <span class="badge badge-dark"> Score: ${post.score}</span>
        </div>
        </div>
        `;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });
});
// * FUnction show message
function showMessage(message, className) {
  // Create a div
  const div = document.createElement("div");
  // add class
  div.className = `alert ${className}`;
  // *Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const searchContainer = document.getElementById("search-container");
  const search = document.getElementById("search");
  //   insert the div
  searchContainer.insertBefore(div, search);
  //   *Timeout alert
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}
function truncateText(text, limit) {
  const shortend = text.indexOf(" ", limit);
  if (shortend == -1) return text;
  return text.substring(0, shortend);
}
