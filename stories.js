// stories.js теперь объединяет истории из отдельных файлов
// Подключите stories-1min.js и stories-5min.js до этого файла

const stories = [
  ...(typeof stories1min !== 'undefined' ? stories1min : []),
  ...(typeof stories5min !== 'undefined' ? stories5min : [])
];

function getStoryIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderStory() {
  const storyId = getStoryIdFromUrl();
  const story = stories.find(s => s.id === storyId);
  const container = document.getElementById('story-container');
  if (story && container) {
    container.innerHTML = `
      <h1>${story.title}</h1>
      <p>${story.text}</p>
      <a href="index.html" style="display:inline-block;margin-top:32px;color:#b0b0b0;text-decoration:none;font-size:1.1rem;">&larr; Назад</a>
    `;
  } else if (container) {
    container.innerHTML = '<p>История не найдена.</p><a href="index.html">&larr; Назад</a>';
  }
}

if (window.location.pathname.endsWith('story.html')) {
  renderStory();
} 