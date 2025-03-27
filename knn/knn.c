#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>

// Structure to represent a single data point
typedef struct {
    double* features;  // Array of feature values
    int dimension;     // Number of features
} Point;

// Structure to represent the KNN model
typedef struct {
    Point* training_points;   // Array of training points
    int* labels;              // Array of labels for training points
    int n_samples;            // Number of training samples
    int k;                    // Number of neighbors to consider
    int dimension;            // Dimensionality of the data
} KNN;

// Structure to hold distance and index for sorting
typedef struct {
    double distance;
    int index;
} DistanceIndex;

// Calculate Euclidean distance between two points
double euclidean_distance(Point* p1, Point* p2) {
    double sum = 0.0;
    for (int i = 0; i < p1->dimension; i++) {
        double diff = p1->features[i] - p2->features[i];
        sum += diff * diff;
    }
    return sqrt(sum);
}

// Comparison function for qsort
int compare_distances(const void* a, const void* b) {
    const DistanceIndex* dist_a = (const DistanceIndex*)a;
    const DistanceIndex* dist_b = (const DistanceIndex*)b;
    
    if (dist_a->distance < dist_b->distance) return -1;
    if (dist_a->distance > dist_b->distance) return 1;
    return 0;
}

// Initialize a KNN model
KNN* knn_init(int k, int dimension) {
    KNN* model = (KNN*)malloc(sizeof(KNN));
    if (model == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        exit(1);
    }
    
    model->training_points = NULL;
    model->labels = NULL;
    model->n_samples = 0;
    model->k = k;
    model->dimension = dimension;
    
    return model;
}

// Free memory allocated for KNN model
void knn_free(KNN* model) {
    if (model->training_points != NULL) {
        for (int i = 0; i < model->n_samples; i++) {
            free(model->training_points[i].features);
        }
        free(model->training_points);
    }
    
    if (model->labels != NULL) {
        free(model->labels);
    }
    
    free(model);
}

// Fit the model with training data
void knn_fit(KNN* model, double** X, int* y, int n_samples) {
    model->n_samples = n_samples;
    
    // Allocate memory for training points and labels
    model->training_points = (Point*)malloc(n_samples * sizeof(Point));
    model->labels = (int*)malloc(n_samples * sizeof(int));
    
    if (model->training_points == NULL || model->labels == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        exit(1);
    }
    
    // Copy training data
    for (int i = 0; i < n_samples; i++) {
        model->training_points[i].dimension = model->dimension;
        model->training_points[i].features = (double*)malloc(model->dimension * sizeof(double));
        
        if (model->training_points[i].features == NULL) {
            fprintf(stderr, "Memory allocation failed\n");
            exit(1);
        }
        
        memcpy(model->training_points[i].features, X[i], model->dimension * sizeof(double));
        model->labels[i] = y[i];
    }
}

// Find the most frequent label among the k nearest neighbors
int most_frequent_label(int* neighbors, int k) {
    int max_count = 0;
    int max_label = -1;
    
    for (int i = 0; i < k; i++) {
        int count = 0;
        int current = neighbors[i];
        
        for (int j = 0; j < k; j++) {
            if (neighbors[j] == current) {
                count++;
            }
        }
        
        if (count > max_count) {
            max_count = count;
            max_label = current;
        }
    }
    
    return max_label;
}

// Predict the label for a single test point
int knn_predict_one(KNN* model, double* x) {
    Point test_point;
    test_point.features = x;
    test_point.dimension = model->dimension;
    
    // Calculate distances to all training points
    DistanceIndex* distances = (DistanceIndex*)malloc(model->n_samples * sizeof(DistanceIndex));
    
    if (distances == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        exit(1);
    }
    
    for (int i = 0; i < model->n_samples; i++) {
        distances[i].distance = euclidean_distance(&test_point, &model->training_points[i]);
        distances[i].index = i;
    }
    
    // Sort distances
    qsort(distances, model->n_samples, sizeof(DistanceIndex), compare_distances);
    
    // Get labels of k nearest neighbors
    int* neighbor_labels = (int*)malloc(model->k * sizeof(int));
    
    if (neighbor_labels == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        free(distances);
        exit(1);
    }
    
    for (int i = 0; i < model->k; i++) {
        neighbor_labels[i] = model->labels[distances[i].index];
    }
    
    // Find most frequent label
    int prediction = most_frequent_label(neighbor_labels, model->k);
    
    // Free memory
    free(distances);
    free(neighbor_labels);
    
    return prediction;
}

// Predict labels for multiple test points
void knn_predict(KNN* model, double** X, int* predictions, int n_samples) {
    for (int i = 0; i < n_samples; i++) {
        predictions[i] = knn_predict_one(model, X[i]);
    }
}

int main() {
    // Example dataset with 2D points
    // Class 0: points near (0, 0)
    // Class 1: points near (5, 5)
    int n_train = 10;
    
    double** X_train = (double**)malloc(n_train * sizeof(double*));
    int* y_train = (int*)malloc(n_train * sizeof(int));
    
    // Generate training data
    for (int i = 0; i < n_train; i++) {
        X_train[i] = (double*)malloc(2 * sizeof(double));
        
        if (i < n_train / 2) {
            // Class 0 points
            X_train[i][0] = (double)rand() / RAND_MAX - 0.5;  // Around 0
            X_train[i][1] = (double)rand() / RAND_MAX - 0.5;  // Around 0
            y_train[i] = 0;
        } else {
            // Class 1 points
            X_train[i][0] = (double)rand() / RAND_MAX + 4.5;  // Around 5
            X_train[i][1] = (double)rand() / RAND_MAX + 4.5;  // Around 5
            y_train[i] = 1;
        }
    }
    
    // Create and fit the KNN model
    KNN* model = knn_init(3, 2);  // k=3, dimension=2
    knn_fit(model, X_train, y_train, n_train);
    
    // Test points for prediction
    int n_test = 4;
    double** X_test = (double**)malloc(n_test * sizeof(double*));
    
    // Create test points
    X_test[0] = (double*)malloc(2 * sizeof(double));
    X_test[0][0] = 0.0;  // Should be class 0
    X_test[0][1] = 0.0;
    
    X_test[1] = (double*)malloc(2 * sizeof(double));
    X_test[1][0] = 5.0;  // Should be class 1
    X_test[1][1] = 5.0;
    
    X_test[2] = (double*)malloc(2 * sizeof(double));
    X_test[2][0] = 2.5;  // Boundary case
    X_test[2][1] = 2.5;
    
    X_test[3] = (double*)malloc(2 * sizeof(double));
    X_test[3][0] = -1.0;  // Should be class 0
    X_test[3][1] = -1.0;
    
    // Make predictions
    int* predictions = (int*)malloc(n_test * sizeof(int));
    knn_predict(model, X_test, predictions, n_test);
    
    // Print predictions
    printf("Predictions:\n");
    for (int i = 0; i < n_test; i++) {
        printf("Point (%.1f, %.1f): Class %d\n", X_test[i][0], X_test[i][1], predictions[i]);
    }
    
    // Free all allocated memory
    for (int i = 0; i < n_train; i++) {
        free(X_train[i]);
    }
    free(X_train);
    free(y_train);
    
    for (int i = 0; i < n_test; i++) {
        free(X_test[i]);
    }
    free(X_test);
    free(predictions);
    
    knn_free(model);
    
    return 0;
}