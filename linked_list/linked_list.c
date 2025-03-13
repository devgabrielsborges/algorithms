#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int value;
    struct node *next;
} Node;

// Function to insert a new node at the beginning of the list
Node* insertAtBeginning(Node* head, int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\n");
        exit(1);
    }
    newNode->value = value;
    newNode->next = head;
    return newNode;
}

// Function to insert a new node at the end of the list
Node* insertAtEnd(Node* head, int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\n");
        exit(1);
    }
    newNode->value = value;
    newNode->next = NULL;

    if (head == NULL) {
        return newNode;
    }

    Node* current = head;
    while (current->next != NULL) {
        current = current->next;
    }
    current->next = newNode;
    return head;
}

// Function to print the linked list
void printList(Node* head) {
    Node* current = head;
    while (current != NULL) {
        printf("%d -> ", current->value);
        current = current->next;   // Loop
    }
    printf("NULL\n");
}

// Function to free the memory allocated for the linked list
void freeList(Node* head) {
    Node* current = head;
    Node* next;
    while (current != NULL) {
        next = current->next;
        free(current);
        current = next;
    }
}

int main() {
    Node* head = NULL;

    head = insertAtBeginning(head, 3);
    head = insertAtBeginning(head, 2);
    head = insertAtBeginning(head, 1);

    head = insertAtEnd(head, 4);
    head = insertAtEnd(head, 5);

    printf("Linked list: ");
    printList(head);

    freeList(head); // Free the allocated memory
    return 0;
}