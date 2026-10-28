# BrowseBack — Browser History Simulator

A beginner-friendly Data Structures and Algorithms (DSA) mini project that demonstrates how a **stack** can be used to model browser history.

## Project overview

BrowseBack has two parts:

1. **Website demo** — a small, responsive HTML/CSS/JavaScript interface. Enter a domain or click a quick link, then use Back and Forward to explore a simulated browsing session.
2. **C console program** — the DSA implementation using a stack built with an array. It supports visiting a website, going back, viewing the current page, showing the stack, and clearing history.

> The website is a front-end simulation and does not open or fetch real websites. The C program is the main DSA implementation.

## DSA concept: Stack

A stack follows **LIFO (Last In, First Out)**. The most recently visited page is at the top.

Example:
- Visit `google.com` → push it onto the stack
- Visit `wikipedia.org` → push it onto the stack
- Press Back → pop `wikipedia.org`; `google.com` becomes the current page

### Operations and time complexity

| Operation | Description | Time |
|---|---|---:|
| Push | Add a visited page | O(1) |
| Pop | Remove the current page when going back | O(1) |
| Peek/current page | Read the top page | O(1) |
| Display history | Print all pages | O(n) |

The C version uses a fixed-size array with a maximum of 100 pages to keep the implementation beginner-friendly.

## Files

```text
browser_history_simulator/
├── index.html        # Website structure
├── style.css         # Styling and responsive layout
├── script.js         # Interactive browser-history simulation
├── browser_history.c # Main DSA program in C
└── README.md         # Project explanation and setup guide
```

## Run the website

1. Download or clone this project.
2. Open `index.html` in a web browser.
3. Type a domain such as `google.com`, or click a quick link.
4. Try the Back and Forward buttons and watch the history stack update.

No installation or server is required for this basic version.

## Compile and run the C program

### Windows (GCC / MinGW)

Open Command Prompt or the VS Code terminal in this folder:

```bash
gcc browser_history.c -o browser_history.exe
browser_history.exe
```

### Linux / macOS

```bash
gcc browser_history.c -o browser_history
./browser_history
```

If `gcc` is not installed, install a C compiler first.

## Upload to GitHub

1. Sign in at [GitHub](https://github.com/) and create a new repository, for example `browser-history-simulator`.
2. Keep it **Public** if you want to show it as a portfolio project.
3. Upload the five files in this folder, or use Git from the project folder:

```bash
git init
git add .
git commit -m "Add browser history simulator using stack"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/browser-history-simulator.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. Run the Git commands only after creating the empty repository on GitHub.

## Possible improvements for later

- Store a timestamp for each visit.
- Add a separate Forward stack to the C program.
- Save history to a file so it remains after closing the program.
- Add a search box to filter history.

## Learning outcomes

- Understand stack push and pop operations.
- Apply LIFO to a familiar real-world example.
- Use arrays and functions in C.
- Connect a DSA idea to a simple, responsive website.
