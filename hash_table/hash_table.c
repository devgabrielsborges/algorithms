#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 53

typedef struct Entry {
    char* key;
    char* value;
    struct Entry* next;
} Entry;

typedef struct HashTable {
    Entry* table[TABLE_SIZE];
} HashTable;

// Hash function (djb2 algorithm)
unsigned long hash(char* str) {
    unsigned long hash = 5381;
    int c;

    while ((c = *str++))
        hash = ((hash << 5) + hash) + c; /* hash * 33 + c */

    return hash % TABLE_SIZE;
}

// Create a new hash table
HashTable* createHashTable() {
    HashTable* ht = (HashTable*)malloc(sizeof(HashTable));
    if (ht == NULL) {
        perror("Failed to allocate memory for hash table");
        exit(EXIT_FAILURE);
    }
    for (int i = 0; i < TABLE_SIZE; i++) {
        ht->table[i] = NULL;
    }
    return ht;
}

// Insert a key-value pair into the hash table
void insert(HashTable* ht, char* key, char* value) {
    unsigned long index = hash(key);
    Entry* newEntry = (Entry*)malloc(sizeof(Entry));

    if (newEntry == NULL) {
        perror("Failed to allocate memory for new entry");
        exit(EXIT_FAILURE);
    }

    newEntry->key = strdup(key); // Duplicate the key
    newEntry->value = strdup(value); // Duplicate the value
    newEntry->next = NULL;

    if (ht->table[index] == NULL) {
        ht->table[index] = newEntry;
    } else {
        // Handle collision (separate chaining)
        Entry* current = ht->table[index];
        while (current->next != NULL) {
            current = current->next;
        }
        current->next = newEntry;
    }
}

// Search for a value by key
char* search(HashTable* ht, char* key) {
    unsigned long index = hash(key);
    Entry* current = ht->table[index];

    while (current != NULL) {
        if (strcmp(current->key, key) == 0) {
            return current->value;
        }
        current = current->next;
    }

    return NULL; // Key not found
}

// Free the memory used by the hash table
void freeHashTable(HashTable* ht) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        Entry* current = ht->table[i];
        while (current != NULL) {
            Entry* temp = current;
            current = current->next;
            free(temp->key);
            free(temp->value);
            free(temp);
        }
    }
    free(ht);
}

int main() {
    HashTable* ht = createHashTable();

    insert(ht, "name", "John");
    insert(ht, "age", "30");
    insert(ht, "city", "New York");

    printf("Name: %s\n", search(ht, "name"));
    printf("Age: %s\n", search(ht, "age"));
    printf("City: %s\n", search(ht, "city"));
    printf("Nonexistent: %s\n", search(ht, "nonexistent")); // Output: (null)

    freeHashTable(ht);

    return 0;
}