/*
 * Browser History Simulator - DSA mini project in C
 * Concept: Stack (Last In, First Out)
 *
 * Compile: gcc browser_history.c -o browser_history
 * Run:     ./browser_history       (Linux/macOS)
 *          browser_history.exe    (Windows after compiling)
 */
#include <stdio.h>
#include <string.h>

#define MAX_PAGES 100
#define URL_SIZE 100

typedef struct {
    char pages[MAX_PAGES][URL_SIZE];
    int top;
} Stack;

void initStack(Stack *s) {
    s->top = -1;
}

int isEmpty(Stack *s) {
    return s->top == -1;
}

int isFull(Stack *s) {
    return s->top == MAX_PAGES - 1;
}

int push(Stack *s, const char *url) {
    if (isFull(s)) {
        printf("History is full. Cannot visit more pages.\n");
        return 0;
    }
    s->top++;
    strcpy(s->pages[s->top], url);
    return 1;
}

int pop(Stack *s, char *removedPage) {
    if (isEmpty(s)) {
        printf("No previous page in history.\n");
        return 0;
    }
    strcpy(removedPage, s->pages[s->top]);
    s->top--;
    return 1;
}

void showCurrentPage(Stack *history) {
    if (isEmpty(history)) {
        printf("No page is currently open.\n");
    } else {
        printf("Current page: %s\n", history->pages[history->top]);
    }
}

void showHistory(Stack *history) {
    int i;
    if (isEmpty(history)) {
        printf("History is empty.\n");
        return;
    }
    printf("\n--- Browser History (top to bottom) ---\n");
    for (i = history->top; i >= 0; i--) {
        if (i == history->top)
            printf("TOP -> %s\n", history->pages[i]);
        else
            printf("       %s\n", history->pages[i]);
    }
}

int main(void) {
    Stack history;
    char url[URL_SIZE];
    char current[URL_SIZE];
    int choice;

    initStack(&history);

    printf("====================================\n");
    printf("     BROWSER HISTORY SIMULATOR\n");
    printf("         Stack using C\n");
    printf("====================================\n");

    do {
        printf("\n1. Visit a new website\n");
        printf("2. Go Back\n");
        printf("3. Show current page\n");
        printf("4. Show history stack\n");
        printf("5. Clear history\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please restart and enter a number.\n");
            return 1;
        }
        getchar(); /* consume newline */

        switch (choice) {
            case 1:
                printf("Enter website address (e.g. google.com): ");
                if (fgets(url, sizeof(url), stdin) == NULL) {
                    printf("Could not read website address.\n");
                    break;
                }
                url[strcspn(url, "\n")] = '\0';
                if (url[0] == '\0') {
                    printf("Website address cannot be empty.\n");
                } else if (push(&history, url)) {
                    printf("Visited: %s\n", url);
                }
                break;

            case 2:
                if (pop(&history, current)) {
                    printf("Going back from: %s\n", current);
                    showCurrentPage(&history);
                }
                break;

            case 3:
                showCurrentPage(&history);
                break;

            case 4:
                showHistory(&history);
                break;

            case 5:
                initStack(&history);
                printf("Browser history cleared.\n");
                break;

            case 0:
                printf("Thank you for using the simulator!\n");
                break;

            default:
                printf("Invalid choice. Please select a listed option.\n");
        }
    } while (choice != 0);

    return 0;
}
