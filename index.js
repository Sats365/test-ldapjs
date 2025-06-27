/**
 * LDAP CONNECTION TEST SCRIPT
 * Run with: node ldap_test.js
 */

// ===== CONFIG SECTION =====
const LDAP_URL = "ldap://localhost:389";
const LDAP_ADMIN_DN = "cn=admin,dc=example,dc=com";
const LDAP_ADMIN_PASSWORD = "adminpassword";
const LDAP_SEARCH_BASE = "dc=example,dc=com";
const LDAP_SEARCH_FILTER = "(objectClass=*)";

// ===========================

const ldap = require("ldapjs");

async function testLdapConnection() {
  const client = ldap.createClient({
    url: LDAP_URL,
    reconnect: false,
    timeout: 5000,
    connectTimeout: 5000,
  });

  client.on("error", (err) => {
    console.error("Client error event:", err);
  });

  console.log("Connecting to LDAP server:", LDAP_URL);

  client.bind(LDAP_ADMIN_DN, LDAP_ADMIN_PASSWORD, (err) => {
    if (err) {
      console.error("Bind failed:", err.message);
      client.unbind();
      process.exit(1);
    } else {
      console.log("Bind successful!");

      console.log(
        `Searching base "${LDAP_SEARCH_BASE}" with filter "${LDAP_SEARCH_FILTER}"`
      );
      const opts = {
        filter: LDAP_SEARCH_FILTER,
        scope: "sub",
        attributes: ["dn"],
      };

      client.search(LDAP_SEARCH_BASE, opts, (err, res) => {
        if (err) {
          console.error("Search failed:", err.message);
          client.unbind();
          process.exit(1);
        }

        res.on("searchEntry", (entry) => {
          console.log("Entry:", entry.objectName);
        });

        res.on("searchReference", (referral) => {
          console.log("Referral:", referral.uris.join());
        });

        res.on("error", (err) => {
          console.error("Search error:", err.message);
        });

        res.on("end", (result) => {
          console.log("Search finished with status:", result.status);
          client.unbind();
        });
      });
    }
  });
}

testLdapConnection();
