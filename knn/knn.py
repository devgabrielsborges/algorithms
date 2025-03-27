import math
import random
from collections import Counter


def euclidean_distance(point1, point2):
    """Calculate the Euclidean distance between two points."""
    squared_sum = sum((a - b) ** 2 for a, b in zip(point1, point2))
    return math.sqrt(squared_sum)


class KNN:
    def __init__(self, k=3):
        """Initialize KNN with k neighbors."""
        self.k = k
        self.X_train = None
        self.y_train = None
    
    def fit(self, X, y):
        """Store the training data."""
        self.X_train = X
        self.y_train = y
    
    def predict(self, X):
        """Predict the class or value for each instance in X."""
        return [self._predict_single(x) for x in X]
    
    def _predict_single(self, x):
        """Predict the class or value for a single instance."""
        # Calculate distances to all training instances
        distances = [euclidean_distance(x, x_train) for x_train in self.X_train]
        
        # Find indices of k nearest neighbors
        k_indices = sorted(range(len(distances)), key=lambda i: distances[i])[:self.k]
        
        # Get the labels of the k nearest neighbors
        k_nearest_labels = [self.y_train[i] for i in k_indices]
        
        # For classification: return most common label
        most_common = Counter(k_nearest_labels).most_common(1)
        return most_common[0][0]


# Example usage for classification
if __name__ == "__main__":
    # Simple 2D dataset: [(x, y), class]
    # Class 0: points near (0, 0)
    # Class 1: points near (1, 1)
    dataset = []
    
    # Generate some random points for class 0
    for _ in range(20):
        x = random.uniform(-0.5, 0.5)
        y = random.uniform(-0.5, 0.5)
        dataset.append(((x, y), 0))
    
    # Generate some random points for class 1
    for _ in range(20):
        x = random.uniform(0.5, 1.5)
        y = random.uniform(0.5, 1.5)
        dataset.append(((x, y), 1))
    
    # Shuffle the dataset
    random.shuffle(dataset)
    
    # Split into training (80%) and test (20%) sets
    split_idx = int(0.8 * len(dataset))
    train_data = dataset[:split_idx]
    test_data = dataset[split_idx:]
    
    # Prepare training data
    X_train = [data[0] for data in train_data]
    y_train = [data[1] for data in train_data]
    
    # Prepare test data
    X_test = [data[0] for data in test_data]
    y_test = [data[1] for data in test_data]
    
    # Create and train KNN classifier
    knn = KNN(k=3)
    knn.fit(X_train, y_train)
    
    # Make predictions
    predictions = knn.predict(X_test)
    
    # Calculate accuracy
    correct = sum(pred == actual for pred, actual in zip(predictions, y_test))
    accuracy = correct / len(y_test)
    
    print(f"KNN Accuracy: {accuracy:.2f}")
    
    # Test some specific points
    test_points = [
        (0, 0),     # Should be class 0
        (1, 1),     # Should be class 1
        (0.5, 0.5), # This is the boundary, could go either way
    ]
    
    test_predictions = knn.predict(test_points)
    for point, pred in zip(test_points, test_predictions):
        print(f"Point {point} classified as Class {pred}")2