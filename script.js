const redditApiUrl = 'https://www.reddit.com/r/business/new.json?limit=4';
let nextUrl = '';
let prevUrl = '';

function displayResults(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '';
      data.data.children.forEach(child => {
        const story = child.data;
        const title = story.title;
        const author = story.author;
        const comments = story.num_comments;

        const storyElement = document.createElement('div');
        storyElement.innerHTML = `
          <div class="result">
            <h3 id="header">${title}</h3>
            <div class="commentsAuthor">
              <p id="comment"> ${comments} comments </p>
              <p id="author">submitted by ${author}</p>
            </div>
          </div>
        `;
        resultsContainer.appendChild(storyElement);
      });

      nextUrl = data.data.after;
      prevUrl = data.data.before;

      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');

      if (prevUrl !== null) {
        prevBtn.style.display = 'block';
      } else {
        prevBtn.style.display = 'block';
      }

      if (nextUrl !== null) {
        nextBtn.style.display = 'block';
      } else {
        nextBtn.style.display = 'block';
      }
    });
}

displayResults(redditApiUrl);

const prevBtn = document.getElementById('prevBtn');
prevBtn.addEventListener('click', () => {
  displayResults(`https://www.reddit.com/r/business/new.json?before=${prevUrl}&limit=4`);
});

const nextBtn = document.getElementById('nextBtn');
nextBtn.addEventListener('click', () => {
  displayResults(`https://www.reddit.com/r/business/new.json?after=${nextUrl}&limit=4`);
});
