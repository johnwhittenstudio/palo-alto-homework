const redditApiUrl = 'https://www.reddit.com/r/business/new.json?limit=4';

fetch(redditApiUrl)
  .then(response => response.json())
  .then(data => {
    const resultsContainer = document.getElementById('results');
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
  });