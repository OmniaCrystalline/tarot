/** @format */

// Простий in-memory store для зберігання запитів по IP
// У продакшні краще використовувати Netlify KV Store або базу даних
const requestStore = new Map();

// Очищення старих записів (старіше 24 годин)
function cleanOldEntries() {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  for (const [ip, data] of requestStore.entries()) {
    if (now - data.firstRequest > oneDay) {
      requestStore.delete(ip);
    }
  }
}

// Перевірка ліміту запитів
function checkRateLimit(ip) {
  cleanOldEntries();

  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const maxRequests = 5;

  if (!requestStore.has(ip)) {
    requestStore.set(ip, {
      firstRequest: now,
      requests: [now],
    });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  const data = requestStore.get(ip);

  // Якщо пройшло більше доби - скидаємо лічильник
  if (now - data.firstRequest > oneDay) {
    requestStore.set(ip, {
      firstRequest: now,
      requests: [now],
    });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  // Фільтруємо запити за останню добу
  data.requests = data.requests.filter((timestamp) => now - timestamp < oneDay);

  if (data.requests.length >= maxRequests) {
    const resetTime = new Date(data.firstRequest + oneDay);
    return {
      allowed: false,
      remaining: 0,
      resetTime: resetTime.toISOString(),
    };
  }

  data.requests.push(now);
  return {
    allowed: true,
    remaining: maxRequests - data.requests.length,
  };
}

exports.handler = async (event, context) => {
  // Перевірка методу
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: { message: "Метод не дозволено" } }),
    };
  }

  // Отримання IP адреси
  const clientIP =
    event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    event.headers["x-nf-client-connection-ip"] ||
    event.headers["client-ip"] ||
    "unknown";

  // Перевірка ліміту запитів
  const rateLimit = checkRateLimit(clientIP);

  if (!rateLimit.allowed) {
    return {
      statusCode: 429,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "X-RateLimit-Limit": "5",
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": rateLimit.resetTime || "",
      },
      body: JSON.stringify({
        error: {
          message: "rate_limit_exceeded",
          code: 429,
        },
      }),
    };
  }

  // Отримання API ключа з змінних середовища Netlify
  const apiKey = process.env.OPENROUTER_API_KEY;

  // Автоматичне визначення URL сайту
  // Спочатку з змінних середовища, потім з headers, потім дефолт
  let siteUrl = process.env.SITE_URL;
  if (!siteUrl) {
    // Спробувати визначити з headers
    const host = event.headers.host;
    const protocol = event.headers["x-forwarded-proto"] || "https";
    if (host) {
      siteUrl = `${protocol}://${host}`;
    } else {
      siteUrl = "https://localhost";
    }
  }

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: { message: "API ключ не налаштовано на сервері" },
      }),
    };
  }

  try {
    // Парсинг даних з запиту
    const data = JSON.parse(event.body);

    if (!data || !data.model || !data.messages) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: { message: "Невірний формат запиту" } }),
      };
    }

    // Запит до OpenRouter API
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": siteUrl,
          "X-Title": "Tarot Reading",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: data.model,
          messages: data.messages,
        }),
      }
    );

    const responseData = await response.json();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "X-RateLimit-Limit": "5",
        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
      },
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    console.error("Помилка проксі:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: { message: "Помилка сервера при обробці запиту" },
      }),
    };
  }
};
