using System;

public class Node
{
    public int value;
    public Node next;

    public Node(int value)
    {
        this.value = value;
        this.next = null;
    }
}

public class LinkedList
{
    public Node head;

    public LinkedList()
    {
        this.head = null;
    }

    // Function to insert a new node at the beginning of the list
    public void InsertAtBeginning(int value)
    {
        Node newNode = new Node(value);
        newNode.next = head;
        head = newNode;
    }

    // Function to insert a new node at the end of the list
    public void InsertAtEnd(int value)
    {
        Node newNode = new Node(value);

        if (head == null)
        {
            head = newNode;
            return;
        }

        Node current = head;
        while (current.next != null)
        {
            current = current.next;
        }
        current.next = newNode;
    }

    // Function to print the linked list
    public void PrintList()
    {
        Node current = head;
        while (current != null)
        {
            Console.Write(current.value + " -> ");
            current = current.next;
        }
        Console.WriteLine("null");
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        LinkedList linkedList = new LinkedList();

        linkedList.InsertAtBeginning(3);
        linkedList.InsertAtBeginning(2);
        linkedList.InsertAtBeginning(1);

        linkedList.InsertAtEnd(4);
        linkedList.InsertAtEnd(5);

        Console.Write("Linked list: ");
        linkedList.PrintList();
    }
}