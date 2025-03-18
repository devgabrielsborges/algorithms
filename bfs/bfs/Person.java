package bfs;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class Person {
    private final String name;
    private final int age;
    private final boolean hasCat;
    private final List<Person> knownPersons;
    
    // Constructor with all fields
    public Person(String name, int age, boolean hasCat, List<Person> knownPersons) {
        // Basic validation
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name cannot be null or blank");
        }
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
        
        this.name = name;
        this.age = age;
        this.hasCat = hasCat;
        
        // Defensive copy of the list to ensure immutability
        this.knownPersons = knownPersons != null ? 
            Collections.unmodifiableList(new ArrayList<>(knownPersons)) : 
            Collections.emptyList();
    }
    
    // Convenience constructor without known persons
    public Person(String name, int age, boolean hasCat) {
        this(name, age, hasCat, Collections.emptyList());
    }
    
    // Factory method
    public static Person create(String name, int age, boolean hasCat) {
        return new Person(name, age, hasCat);
    }
    
    // Getters
    public String name() {
        return name;
    }
    
    public int age() {
        return age;
    }
    
    public boolean hasCat() {
        return hasCat;
    }
    
    public List<Person> knownPersons() {
        return knownPersons;
    }
    
    // Method to add a known person (returns a new Person instance to maintain immutability)
    public Person addKnownPerson(Person person) {
        if (person == null) {
            throw new IllegalArgumentException("Person cannot be null");
        }
        
        List<Person> newKnownPersons = new ArrayList<>(knownPersons);
        newKnownPersons.add(person);
        return new Person(name, age, hasCat, newKnownPersons);
    }
    
    // Check if this person knows another person directly
    public boolean knows(Person person) {
        return knownPersons.contains(person);
    }
    
    // Check if this person knows another person by name
    public boolean knowsByName(String personName) {
        return knownPersons.stream()
            .anyMatch(p -> p.name().equals(personName));
    }
    
    @Override
    public String toString() {
        return name + " (" + age + ")" + (hasCat ? " has a cat" : "");
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age &&
               hasCat == person.hasCat &&
               Objects.equals(name, person.name);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name, age, hasCat);
    }
}