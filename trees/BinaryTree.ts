import type { Node_ } from "./Node_";

export class BinaryTree<T> {
    private root: Node_<T> | null;

    constructor(key: T) {
        this.root = { value: key, left: null, right: null };
    }

    inOrderTraversal(node: Node_<T> | null): void {
        if (!node) return;
        this.inOrderTraversal(node.left);
        console.log(node.value);
        this.inOrderTraversal(node.right);
    }

    preOrderTraversal(node: Node_<T> | null): void {
        if (!node) return;
        console.log(node.value);
        this.preOrderTraversal(node.left);
        this.preOrderTraversal(node.right);
    }

    postOrderTraversal(node: Node_<T> | null): void {
        if (!node) return;
        this.postOrderTraversal(node.left);
        this.postOrderTraversal(node.right);
        console.log(node.value);
    }

    inOrder(): void {
        this.inOrderTraversal(this.root);
    }

    preOrder(): void {
        this.preOrderTraversal(this.root);
    }

    postOrder(): void {
        this.postOrderTraversal(this.root);
    }
}