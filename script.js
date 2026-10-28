const pages = {
  "welcome.local": { title: "Welcome to BrowseBack", description: "Type a website above or choose a quick link below to start building your browsing history.", icon: "⌂" },
  "google.com": { title: "Search anything", description: "Imagine searching for answers, images, news, and useful information from one place.", icon: "G" },
  "wikipedia.org": { title: "The free encyclopedia", description: "Explore a world of knowledge with articles about people, places, science, and history.", icon: "W" },
  "github.com": { title: "Build something great", description: "A home for your code, projects, collaboration, and open-source learning.", icon: "⌘" },
  "youtube.com": { title: "Watch and discover", description: "Find tutorials, music, learning videos, and entertainment in this simulated page.", icon: "▶" },
  "stackoverflow.com": { title: "Learn from developers", description: "Browse programming questions and answers from a community of developers.", icon: "S" },
  "example.com": { title: "Example Domain", description: "This domain is for use in illustrative examples in documents and tutorials.", icon: "E" },
  "openai.com": { title: "Ideas and intelligence", description: "A sample landing page representing an AI research and technology website.", icon: "O" }
};

let historyStack = ["welcome.local"];
let forwardStack = [];
let totalVisits = 1;

const $ = (id) => document.getElementById(id);
const urlInput = $("urlInput");

function normalizeUrl(value) {
  let url = value.trim().toLowerCase();
  url = url.replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[/?#]/)[0];
  if (!url || !/^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}$/.test(url)) return null;
  return url;
}

function getPage(url) {
  if (pages[url]) return pages[url];
  const label = url.split(".")[0].replace(/[-_]/g, " ");
  return {
    title: label.charAt(0).toUpperCase() + label.slice(1),
    description: `You are viewing a demo page for ${url}. This simulator records the visit in its history stack.`,
    icon: label.charAt(0).toUpperCase() || "•"
  };
}

function visit(rawUrl) {
  const url = normalizeUrl(rawUrl);
  if (!url) {
    urlInput.setCustomValidity("Enter a valid address, such as example.com");
    urlInput.reportValidity();
    return;
  }
  urlInput.setCustomValidity("");
  if (historyStack[historyStack.length - 1] !== url) {
    historyStack.push(url);
    totalVisits++;
  }
  forwardStack = [];
  render();
}

function goBack() {
  if (historyStack.length <= 1) return;
  forwardStack.push(historyStack.pop());
  render();
}

function goForward() {
  if (!forwardStack.length) return;
  historyStack.push(forwardStack.pop());
  render();
}

function render() {
  const current = historyStack.length ? historyStack[historyStack.length - 1] : null;
  const page = current ? getPage(current) : {
    title: "History cleared",
    description: "Your stack is empty. Enter a website above to begin a new browsing session.",
    icon: "↶"
  };
  $("pageDomain").textContent = current || "no-page.local";
  $("pageTitle").textContent = page.title;
  $("pageDescription").textContent = page.description;
  $("pageIcon").textContent = page.icon;
  urlInput.value = !current || current === "welcome.local" ? "" : current;
  $("backBtn").disabled = historyStack.length <= 1;
  $("forwardBtn").disabled = forwardStack.length === 0;
  $("visitedCount").textContent = totalVisits;
  $("historyCount").textContent = historyStack.length;

  const stackList = $("stackList");
  stackList.innerHTML = "";
  $("emptyState").hidden = historyStack.length > 0;
  [...historyStack].reverse().forEach((url, index) => {
    const data = getPage(url);
    const item = document.createElement("div");
    item.className = "stack-item" + (index === 0 ? " top" : "");
    const favicon = document.createElement("div");
    favicon.className = "stack-favicon";
    favicon.textContent = data.icon;
    const details = document.createElement("div");
    details.className = "stack-details";
    const title = document.createElement("strong");
    title.textContent = data.title;
    const domain = document.createElement("span");
    domain.textContent = url;
    details.append(title, domain);
    item.append(favicon, details);
    if (index === 0) {
      const label = document.createElement("span");
      label.className = "top-label";
      label.textContent = "TOP";
      item.append(label);
    }
    stackList.append(item);
  });

  $("stackStatus").textContent = historyStack.length > 1
    ? `${historyStack.length} page${historyStack.length === 1 ? "" : "s"} in stack · LIFO`
    : "Stack is ready";
}

$("addressForm").addEventListener("submit", (event) => {
  event.preventDefault();
  visit(urlInput.value);
});
$("backBtn").addEventListener("click", goBack);
$("forwardBtn").addEventListener("click", goForward);
$("refreshBtn").addEventListener("click", () => {
  const current = historyStack[historyStack.length - 1];
  $("stackStatus").textContent = `${current} refreshed (demo)`;
});
$("clearBtn").addEventListener("click", () => {
  historyStack = [];
  forwardStack = [];
  render();
  $("pageDomain").textContent = "no-page.local";
  $("pageTitle").textContent = "History cleared";
  $("pageDescription").textContent = "Your stack is empty. Enter a website above to begin a new browsing session.";
  $("pageIcon").textContent = "↶";
  urlInput.value = "";
  $("stackStatus").textContent = "Stack cleared";
});
document.querySelectorAll("[data-url]").forEach((button) => {
  button.addEventListener("click", () => visit(button.dataset.url));
});
render();
