/**
 * @param {{ symbol: string, title: string, description: string }} item
 * @returns {HTMLElement}
 */
function createRailCardElement(item) {
  const article = document.createElement("article");
  article.className = "rail-card";
  article.setAttribute("role", "listitem");
  const thumb = document.createElement("div");
  thumb.className = "rail-card-thumb";
  thumb.setAttribute("aria-hidden", "true");
  thumb.textContent = item.symbol;
  const body = document.createElement("div");
  body.className = "rail-card-body";
  const heading = document.createElement("h4");
  heading.textContent = item.title;
  const desc = document.createElement("p");
  desc.textContent = item.description;
  body.appendChild(heading);
  body.appendChild(desc);
  article.appendChild(thumb);
  article.appendChild(body);
  return article;
}

/**
 * @param {HTMLElement} container
 * @param {string} railId
 * @param {number | null} maxCount pass null for all items
 */
function mountRailCards(container, railId, maxCount) {
  const def = RAIL_DEFINITIONS[railId];
  if (!def) {
    return;
  }
  const items =
    maxCount === null || maxCount === undefined
      ? def.items
      : def.items.slice(0, maxCount);
  items.forEach(function (item) {
    container.appendChild(createRailCardElement(item));
  });
}
