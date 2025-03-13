package hash_table;

import java.util.Map;
import java.util.HashMap;

public class DomainNameServer {
    private Map<String, String> urls;
    public static void main(String[] args) {
        DomainNameServer dns = new DomainNameServer();

        dns.insertDomain("google.com", "172.217.160.142");
        dns.insertDomain("borges.io", "93.184.216.34");

        System.out.println("google.com: " + dns.getUrls().get("google.com"));
        System.out.println("borges.io: " + dns.getUrls().get("borges.io"));
        System.out.println("test.com: " + dns.getUrls().get("test.com")); // null

        System.out.println("Contains google.com: " + dns.isDomainInUrls("google.com"));
        System.out.println("Contains test.com: " + dns.isDomainInUrls("test.com"));
    }

    protected DomainNameServer() {
        urls = new HashMap<>();
    }

    public Map<String, String> getUrls() { return this.urls; }

    public void insertDomain(String domainName, String address) {
        if (!isDomainInUrls(domainName)) {
            urls.put(domainName, address);
        }
    }

    public boolean isDomainInUrls(String domainName) {
        return urls.containsKey(domainName);
    }
}