const stories = {
  "temnyj-golos": {
    id: "temnyj-golos",
    title: "Тёмный голос",
    text: "В темноте кто-то тихо позвал меня по имени. Я обернулся — и увидел, что дома я один.",
    category: "мистика"
  },
  "nochnaya-ruka": {
    id: "nochnaya-ruka",
    title: "Ночная рука",
    text: "Я проснулся от того, что кто-то гладил меня по волосам. Но я живу один.",
    category: "мистика"
  },
  "foto-vo-sne": {
    id: "foto-vo-sne",
    title: "Фото во сне",
    text: "В телефоне появилась фотография, которую я не делал. На ней я сплю, а рядом кто-то стоит.",
    category: "интернет-страшилки"
  },
  "zvonok-nochyu": {
    id: "zvonok-nochyu",
    title: "Звонок ночью",
    text: "Поздно ночью раздался звонок. Я снял трубку, но на том конце была только тишина... и чьё-то дыхание.",
    category: "городские легенды"
  },
  "ten-v-okne": {
    id: "ten-v-okne",
    title: "Тень в окне",
    text: "Я увидел в окне отражение человека за своей спиной. Но когда обернулся — никого не было.",
    category: "мистика"
  },
  "gost-v-koridore": {
    id: "gost-v-koridore",
    title: "Гость в коридоре",
    text: "Каждую ночь я слышу шаги в коридоре. Но когда выхожу — там пусто.",
    category: "мистика"
  },
  "chernaya-ruka": {
    id: "chernaya-ruka",
    title: "Чёрная рука",
    text: "В детстве мне рассказывали о чёрной руке, которая хватает за ногу ночью. Сегодня я почувствовал прикосновение...",
    category: "страшилки"
  },
  "zapiska": {
    id: "zapiska",
    title: "Записка",
    text: "Я нашёл под дверью записку: 'Не оглядывайся'. Я оглянулся... и увидел глаза в темноте.",
    category: "интернет-страшилки"
  },
  "kto-to-pod-krovatyu": {
    id: "kto-to-pod-krovatyu",
    title: "Кто-то под кроватью",
    text: "Мама крикнула меня на кухню. Я уже вышел из комнаты, как вдруг услышал шёпот из-под кровати: 'Не ходи, это не мама'.",
    category: "городские легенды"
  },
  "zvonok-iz-proshlogo": {
    id: "zvonok-iz-proshlogo",
    title: "Звонок из прошлого",
    text: "Мне позвонили и сказали: 'Не выходи из дома сегодня'. Голос был мой, только детский.",
    category: "мистика"
  }
};

function getStoryIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderStory() {
  const storyId = getStoryIdFromUrl();
  const story = stories[storyId];
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