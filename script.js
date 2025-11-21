/** @format */

// Список шпалер для фону
const wallpapers = [
  "img/Lucid_Origin_a_beautiful_wallpaper_with_a_mystical_content_fea_0.jpg",
  "img/Lucid_Origin_a_beautiful_wallpaper_with_a_mystical_content_fea_1.jpg",
  "img/Lucid_Origin_a_beautiful_wallpaper_with_a_mystical_content_fea_2.jpg",
  "img/Lucid_Origin_a_beautiful_wallpaper_with_a_mystical_content_fea_3.jpg",
  "img/Lucid_Origin_A_mystical_backdrop_with_a_witchs_spellbook_lying_0.jpg",
  "img/Lucid_Origin_A_mystical_backdrop_with_a_witchs_spellbook_lying_1.jpg",
  "img/Lucid_Origin_A_mystical_backdrop_with_a_witchs_spellbook_lying_2.jpg",
  "img/Lucid_Origin_A_mystical_backdrop_with_a_witchs_spellbook_lying_3.jpg",
  "img/Lucid_Origin_A_mystical_backdrop_with_witchy_attributes_featur_0.jpg",
  "img/Lucid_Origin_A_mystical_backdrop_with_witchy_attributes_featur_1.jpg",
  "img/Lucid_Origin_A_mystical_backdrop_with_witchy_attributes_featur_2.jpg",
  "img/Lucid_Origin_A_mystical_backdrop_with_witchy_attributes_featur_3.jpg",
];

// Встановлення випадкової шпалери раз на день
function setDailyWallpaper() {
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem("wallpaper_date");
  const savedWallpaper = localStorage.getItem("wallpaper_path");

  // Якщо сьогодні вже вибрана шпалера - використовуємо її
  if (savedDate === today && savedWallpaper) {
    document.body.style.backgroundImage = `url('${savedWallpaper}')`;
    return;
  }

  // Вибираємо нову випадкову шпалеру
  const randomWallpaper =
    wallpapers[Math.floor(Math.random() * wallpapers.length)];

  // Зберігаємо дату та шпалеру
  localStorage.setItem("wallpaper_date", today);
  localStorage.setItem("wallpaper_path", randomWallpaper);

  // Встановлюємо фон
  document.body.style.backgroundImage = `url('${randomWallpaper}')`;
}

// Колода карт таро (78 карт)
const tarotDeck = [
  // Старші аркани (22 карти)
  "Дурень",
  "Маг",
  "Верховна Жриця",
  "Імператриця",
  "Імператор",
  "Ієрофант",
  "Закохані",
  "Колісниця",
  "Сила",
  "Відлюдник",
  "Колесо Фортуни",
  "Справедливість",
  "Повішений",
  "Смерть",
  "Помірність",
  "Диявол",
  "Вежа",
  "Зірка",
  "Місяць",
  "Сонце",
  "Суд",
  "Світ",
  // Молодші аркани - Жезли (14 карт)
  "Туз Жезлів",
  "Двійка Жезлів",
  "Трійка Жезлів",
  "Четвірка Жезлів",
  "П'ятірка Жезлів",
  "Шістка Жезлів",
  "Сімка Жезлів",
  "Вісімка Жезлів",
  "Дев'ятка Жезлів",
  "Десятка Жезлів",
  "Паж Жезлів",
  "Лицар Жезлів",
  "Королева Жезлів",
  "Король Жезлів",
  // Молодші аркани - Кубки (14 карт)
  "Туз Кубків",
  "Двійка Кубків",
  "Трійка Кубків",
  "Четвірка Кубків",
  "П'ятірка Кубків",
  "Шістка Кубків",
  "Сімка Кубків",
  "Вісімка Кубків",
  "Дев'ятка Кубків",
  "Десятка Кубків",
  "Паж Кубків",
  "Лицар Кубків",
  "Королева Кубків",
  "Король Кубків",
  // Молодші аркани - Мечі (14 карт)
  "Туз Мечів",
  "Двійка Мечів",
  "Трійка Мечів",
  "Четвірка Мечів",
  "П'ятірка Мечів",
  "Шістка Мечів",
  "Сімка Мечів",
  "Вісімка Мечів",
  "Дев'ятка Мечів",
  "Десятка Мечів",
  "Паж Мечів",
  "Лицар Мечів",
  "Королева Мечів",
  "Король Мечів",
  // Молодші аркани - Пентаклі (14 карт)
  "Туз Пентаклів",
  "Двійка Пентаклів",
  "Трійка Пентаклів",
  "Четвірка Пентаклів",
  "П'ятірка Пентаклів",
  "Шістка Пентаклів",
  "Сімка Пентаклів",
  "Вісімка Пентаклів",
  "Дев'ятка Пентаклів",
  "Десятка Пентаклів",
  "Паж Пентаклів",
  "Лицар Пентаклів",
  "Королева Пентаклів",
  "Король Пентаклів",
];

let selectedCards = [];
let shuffledDeck = [];

// Функція для перемішування колоди
function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Перемішування колоди поза екраном (викликається перед створенням карт)
function shuffleDeckOffScreen() {
  shuffledDeck = shuffleDeck(tarotDeck);
}

// Створення карт на сторінці
function createCards() {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";

  // Якщо колода ще не перемішана, перемішуємо її
  if (shuffledDeck.length === 0) {
    shuffleDeckOffScreen();
  }

  // Розраховуємо оптимальний розмір карт з нахлестом, щоб всі 78 карт вмістилися
  const containerWidth = container.offsetWidth - 10; // Враховуємо padding
  const totalCards = shuffledDeck.length; // 78 карт
  const visiblePixels = 2; // Видимі пікселі кожної наступної карти

  // Спочатку визначаємо бажаний розмір карти (з урахуванням мінімуму)
  // Формула: containerWidth = cardWidth + visiblePixels * (totalCards - 1)
  const calculatedWidth =
    (containerWidth - visiblePixels * (totalCards - 1)) / totalCards;

  // Встановлюємо мінімальний розмір карти для зручності
  const minCardWidth = 25;
  let maxCardWidth = Math.max(minCardWidth, calculatedWidth);

  // Збільшуємо карти в 1.5 рази
  maxCardWidth = maxCardWidth * 1.5;

  // Розраховуємо нахлест так, щоб видно було тільки 2 пікселі
  const cardOverlap = maxCardWidth - visiblePixels;
  const cardHeight = maxCardWidth * 1.5; // Співвідношення 2:3

  shuffledDeck.forEach((cardName, index) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.dataset.cardIndex = index;
    cardElement.dataset.cardName = cardName;

    // Не визначаємо перевернутість зараз - це буде визначено після вибору всіх карт
    cardElement.dataset.isReversed = "false";

    // Встановлюємо розмір картки
    cardElement.style.width = `${maxCardWidth}px`;
    cardElement.style.height = `${cardHeight}px`;

    // Розраховуємо кут обертання для щільної гармошки
    const maxRotation = 25; // Менший кут для щільнішого віяла
    const rotation = ((index - totalCards / 2) / totalCards) * maxRotation;

    // Зберігаємо початкове обертання для віяла
    cardElement.dataset.rotation = rotation;
    cardElement.style.transform = `rotate(${rotation}deg)`;
    cardElement.style.transition = "all 0.3s ease";

    cardElement.innerHTML = '<div class="card-back"></div>';

    // Встановлюємо margin для нахлесту
    if (index > 0) {
      cardElement.style.marginLeft = `-${cardOverlap}px`;
    }

    // Додаємо hover ефект з збереженням обертання
    cardElement.addEventListener("mouseenter", function () {
      if (!this.classList.contains("selected")) {
        const rot = this.dataset.rotation;
        this.style.transform = `translateY(-10px) scale(1.05) rotate(${rot}deg)`;
      }
    });

    cardElement.addEventListener("mouseleave", function () {
      if (!this.classList.contains("selected")) {
        const rot = this.dataset.rotation;
        this.style.transform = `rotate(${rot}deg)`;
      }
    });

    cardElement.addEventListener("click", () =>
      selectCard(cardElement, cardName, index)
    );

    container.appendChild(cardElement);
  });
}

// Вибір карти
function selectCard(cardElement, cardName, index) {
  if (selectedCards.length >= 3) {
    return;
  }

  if (cardElement.classList.contains("selected")) {
    // Зняти вибір
    cardElement.classList.remove("selected");
    selectedCards = selectedCards.filter((card) => card.name !== cardName);
    // Повертаємо початкове обертання (без перевернутості)
    const rot = cardElement.dataset.rotation;
    cardElement.style.transform = `rotate(${rot}deg)`;
    cardElement.classList.remove("reversed");
    cardElement.dataset.isReversed = "false";
  } else {
    // Перевірка: чи вже вибрана ця карта (за назвою) - блокуємо дублікати
    const isAlreadySelected = selectedCards.some((card) => card.name === cardName);
    if (isAlreadySelected) {
      return; // Не дозволяємо вибрати ту саму карту двічі
    }

    // Додати вибір - визначаємо перевернутість рандомно тільки при виборі
    const isReversed = Math.random() < 0.5;

    cardElement.classList.add("selected");
    selectedCards.push({
      name: cardName,
      index: index,
      reversed: isReversed, // Визначаємо перевернутість при виборі
    });

    // Зберігаємо перевернутість і одразу показуємо візуально
    cardElement.dataset.isReversed = isReversed;
    if (isReversed) {
      cardElement.classList.add("reversed");
    } else {
      cardElement.classList.remove("reversed");
    }

    // Піднімаємо карту, зберігаючи обертання віяла
    const rot = cardElement.dataset.rotation;
    cardElement.style.transform = `translateY(-20px) scale(1.1) rotate(${rot}deg)`;
  }

  // Оновлюємо відображення вибраних карт (показуємо результат одразу)
  updateSelectedCardsDisplay();
  updateSubmitButton();
  updateCardsState();
}

// Оновлення відображення вибраних карт
function updateSelectedCardsDisplay() {
  const container = document.getElementById("selected-cards-container");
  container.innerHTML = "";

  if (selectedCards.length === 0) {
    container.innerHTML =
      '<p style="color: rgba(255, 255, 255, 0.5);">Виберіть карти з колоди вище</p>';
    return;
  }

  const list = document.createElement("div");
  list.className = "selected-cards-list";

  selectedCards.forEach((card, position) => {
    const cardItem = document.createElement("div");
    cardItem.className = "selected-card-item";
    const reversedClass = card.reversed ? "reversed" : "";
    const reversedText = card.reversed ? " (перевернута)" : "";
    cardItem.innerHTML = `
      <div class="selected-card-visual ${reversedClass}">
        <div class="card-back"></div>
      </div>
      <div class="selected-card-info">
        <span class="selected-card-number">${position + 1}</span>
        <span class="selected-card-name">${card.name}${reversedText}</span>
      </div>
    `;
    list.appendChild(cardItem);
  });

  container.appendChild(list);
}

// Оновлення стану кнопки відправки
function updateSubmitButton() {
  const submitBtn = document.getElementById("submit-btn");
  submitBtn.disabled = selectedCards.length !== 3;
}

// Оновлення стану карт (блокування невибраних після вибору 3)
function updateCardsState() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    if (selectedCards.length >= 3 && !card.classList.contains("selected")) {
      card.classList.add("disabled");
    } else {
      card.classList.remove("disabled");
    }
  });
}

// Скидання вибору
function resetSelection() {
  selectedCards = [];
  // Перемішуємо колоду поза екраном перед новим розкладом
  shuffleDeckOffScreen();
  createCards();
  updateSelectedCardsDisplay();
  updateSubmitButton();
  document.getElementById("question").value = "";
  document.getElementById("result-section").classList.add("hidden");
  // Перевернутість буде визначена заново при наступному виборі
}

// API ключ тепер на сервері (PHP), не потрібен на клієнті

// Збереження та завантаження моделі
function loadModel() {
  const savedModel = localStorage.getItem("openrouter_model");
  if (savedModel) {
    document.getElementById("model-select").value = savedModel;
  } else {
    // За замовчуванням Meta Llama 3.3
    document.getElementById("model-select").value =
      "meta-llama/llama-3.3-70b-instruct:free";
  }
}

function saveModel() {
  const model = document.getElementById("model-select").value;
  localStorage.setItem("openrouter_model", model);
}

// Перевірка ліміту запитів на клієнті (додаткова перевірка)
function checkClientRateLimit() {
  const storageKey = "tarot_requests";
  const maxRequests = 5;
  const oneDay = 24 * 60 * 60 * 1000;

  const stored = localStorage.getItem(storageKey);
  const now = Date.now();

  if (!stored) {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        firstRequest: now,
        requests: [now],
      })
    );
    return { allowed: true, remaining: maxRequests - 1 };
  }

  const data = JSON.parse(stored);

  // Якщо пройшло більше доби - скидаємо
  if (now - data.firstRequest > oneDay) {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        firstRequest: now,
        requests: [now],
      })
    );
    return { allowed: true, remaining: maxRequests - 1 };
  }

  // Фільтруємо запити за останню добу
  data.requests = data.requests.filter((timestamp) => now - timestamp < oneDay);

  if (data.requests.length >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  data.requests.push(now);
  localStorage.setItem(storageKey, JSON.stringify(data));

  return { allowed: true, remaining: maxRequests - data.requests.length };
}

// Відправка запиту на API через Netlify Function
async function submitReading() {
  if (selectedCards.length !== 3) {
    return;
  }

  // Перевірка ліміту на клієнті
  const clientRateLimit = checkClientRateLimit();
  if (!clientRateLimit.allowed) {
    alert(
      "🔮 Не зловживайте магією! Ви вже зробили максимальну кількість розкладів на сьогодні (5). Спробуйте завтра."
    );
    return;
  }

  saveModel();

  const question = document.getElementById("question").value.trim();
  const loading = document.getElementById("loading");
  const resultSection = document.getElementById("result-section");
  const resultContent = document.getElementById("result-content");

  // Показати завантаження
  loading.classList.remove("hidden");
  resultSection.classList.add("hidden");

  // Формування запиту для AI
  const cardsList = selectedCards
    .map((card, index) => {
      const positionText = card.reversed ? "перевернута" : "пряма";
      return `${index + 1}. ${card.name} - ${positionText}`;
    })
    .join("\n");

  const prompt = `Ти експерт з таро. Проведи розклад на трьох картах таро.

Вибрані карти:
${cardsList}
${question ? `\nПитання клієнта: ${question}` : ""}

Надай стислу розшифровку цього розкладу. Враховуй, що перевернуті карти мають інше значення ніж прямі. Опиши коротко значення кожної карти (враховуючи чи вона пряма чи перевернута), а потім загальне значення розкладу. Будь стислим і конкретним. Відповідай українською мовою.`;

  try {
    const selectedModel = document.getElementById("model-select").value;

    // Запит до Netlify Function (ключ прихований на сервері)
    const response = await fetch("/.netlify/functions/tarot-reading", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      // Перевірка на rate limit
      if (response.status === 429) {
        const rateLimitRemaining = response.headers.get(
          "X-RateLimit-Remaining"
        );
        if (rateLimitRemaining === "0") {
          alert(
            "🔮 Не зловживайте магією! Ви вже зробили максимальну кількість розкладів на сьогодні (5). Спробуйте завтра."
          );
          return;
        }
      }
      // Якщо відповідь не 200 - показуємо повідомлення про тріснутий магічний шар
      throw new Error("magic_ball_broken");
    }

    const data = await response.json();
    const reading = data.choices[0].message.content;

    resultContent.textContent = reading;
    resultSection.classList.remove("hidden");
  } catch (error) {
    // Якщо помилка - показуємо повідомлення про тріснутий магічний шар
    let errorText =
      "🔮 Магічний шар тріснув, спробуйте змінити модель і перепитати";

    // Якщо це не помилка API (наприклад, мережева помилка), показуємо більш детальну інформацію
    if (error.message !== "magic_ball_broken") {
      errorText += `\n\nДеталі: ${error.message}`;
    }

    resultContent.textContent = errorText;
    resultSection.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }
}

// Ініціалізація
document.addEventListener("DOMContentLoaded", () => {
  setDailyWallpaper();
  // Перемішуємо колоду поза екраном перед створенням карт
  shuffleDeckOffScreen();
  createCards();
  updateSelectedCardsDisplay();
  loadModel();

  document
    .getElementById("reset-btn")
    .addEventListener("click", resetSelection);
  document
    .getElementById("submit-btn")
    .addEventListener("click", submitReading);
  document.getElementById("model-select").addEventListener("change", saveModel);

  // Перераховуємо карти при зміні розміру вікна
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Зберігаємо назви вибраних карт та їх перевернутість перед пересозданием
      const savedCards = selectedCards.map((card) => ({
        name: card.name,
        reversed: card.reversed,
      }));
      // Очищаємо selectedCards перед відновленням
      selectedCards = [];
      // Не перемішуємо колоду при зміні розміру - зберігаємо поточну послідовність
      createCards();
      // Відновлюємо вибрані карти за назвами з їх перевернутістю
      savedCards.forEach((savedCard) => {
        const cardElement = document.querySelector(
          `[data-card-name="${savedCard.name}"]`
        );
        if (cardElement) {
          const index = parseInt(cardElement.dataset.cardIndex);
          // Відновлюємо вибір з збереженою перевернутістю
          cardElement.classList.add("selected");
          cardElement.dataset.isReversed = savedCard.reversed;
          if (savedCard.reversed) {
            cardElement.classList.add("reversed");
          } else {
            cardElement.classList.remove("reversed");
          }
          const rot = cardElement.dataset.rotation;
          cardElement.style.transform = `translateY(-20px) scale(1.1) rotate(${rot}deg)`;
          // Додаємо до selectedCards
          selectedCards.push({
            name: savedCard.name,
            index: index,
            reversed: savedCard.reversed,
          });
        }
      });
      updateSelectedCardsDisplay();
      updateSubmitButton();
      updateCardsState();
    }, 250);
  });
});
