package bfs;

import java.util.*;

public class Main {
    
    public static void main(String[] args) {
        // Create a network of people
        Person alice = new Person("Alice", 28, false);
        Person bob = new Person("Bob", 32, false);
        Person charlie = new Person("Charlie", 25, true);  // Has a cat
        Person diana = new Person("Diana", 30, false);
        Person edward = new Person("Edward", 40, true);   // Has a cat
        Person frank = new Person("Frank", 45, false);
        
        // Build the social network connections
        // Note: We need to create the leaf nodes first, then work our way up
        bob = bob.addKnownPerson(charlie);
        bob = bob.addKnownPerson(frank);
        
        diana = diana.addKnownPerson(edward);
        
        // Now add the updated bob and diana to alice
        alice = alice.addKnownPerson(bob);
        alice = alice.addKnownPerson(diana);
        
        // Debug output to check the network
        System.out.println("Network structure:");
        System.out.println("Alice knows: " + alice.knownPersons().size() + " people");
        for (Person p : alice.knownPersons()) {
            System.out.println("  - " + p.name());
            if (p.name().equals("Bob")) {
                System.out.println("    Bob knows: " + p.knownPersons().size() + " people");
                for (Person bp : p.knownPersons()) {
                    System.out.println("      - " + bp.name());
                }
            }
            if (p.name().equals("Diana")) {
                System.out.println("    Diana knows: " + p.knownPersons().size() + " people");
                for (Person dp : p.knownPersons()) {
                    System.out.println("      - " + dp.name());
                }
            }
        }
        
        // Find the first person with a cat using BFS
        Person catOwner = findFirstPersonWithCat(alice);
        
        if (catOwner != null) {
            System.out.println("First person with a cat found: " + catOwner);
        } else {
            System.out.println("No one in the network has a cat.");
        }
    }
    
    public static Person findFirstPersonWithCat(Person start) {
        if (start == null) {
            return null;
        }
        
        // Check if the starting person has a cat
        if (start.hasCat()) {
            return start;
        }
        
        // Queue for BFS traversal
        Queue<Person> queue = new LinkedList<>();
        queue.add(start);
        
        // Set to keep track of visited people
        Set<Person> visited = new HashSet<>();
        visited.add(start);
        
        // BFS loop
        while (!queue.isEmpty()) {
            Person current = queue.poll();
            
            // Check each person known by the current person
            for (Person knownPerson : current.knownPersons()) {
                if (!visited.contains(knownPerson)) {
                    // If this person has a cat, we found our target
                    if (knownPerson.hasCat()) {
                        return knownPerson;
                    }
                    
                    // Otherwise add to visited and queue
                    visited.add(knownPerson);
                    queue.add(knownPerson);
                }
            }
        }
        
        // If we've searched the entire connected component and found no cat owners
        return null;
    }
}