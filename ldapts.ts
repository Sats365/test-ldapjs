/**
 * LDAP CONNECTION TEST SCRIPT USING LDAPTS
 * Run with: npx ts-node ldapts.ts
 */

import { Client } from "ldapts";

// ===== CONFIG SECTION =====
const LDAP_URL = "ldap://localhost:389";
const LDAP_ADMIN_DN = "cn=admin,dc=example,dc=com";
const LDAP_ADMIN_PASSWORD = "adminpassword";
const LDAP_SEARCH_BASE = "dc=example,dc=com";
const LDAP_SEARCH_FILTER = "(objectClass=*)";

// ===========================

async function testLdapConnection() {
  const client = new Client({
    url: LDAP_URL,
    timeout: 5000,
    connectTimeout: 5000,
  });

  try {
    console.log("Connecting to LDAP server:", LDAP_URL);

    // Подключение к серверу
    await client.bind(LDAP_ADMIN_DN, LDAP_ADMIN_PASSWORD);
    console.log("Bind successful!");

    console.log(
      `Searching base "${LDAP_SEARCH_BASE}" with filter "${LDAP_SEARCH_FILTER}"`
    );

    // Выполнение поиска
    const searchOptions = {
      filter: LDAP_SEARCH_FILTER,
      scope: "sub" as const,
      attributes: ["dn", "cn", "mail"],
    };

    const searchResult = await client.search(LDAP_SEARCH_BASE, searchOptions);

    console.log(`Found ${searchResult.searchEntries.length} entries:`);

    // Обработка результатов поиска
    for (const entry of searchResult.searchEntries) {
      console.log("Entry:", {
        dn: entry.dn,
        attributes: entry.attributes,
      });
    }

    // Обработка референсов, если есть
    if (
      searchResult.searchReferences &&
      searchResult.searchReferences.length > 0
    ) {
      console.log("Referrals found:");
      for (const referral of searchResult.searchReferences) {
        console.log("Referral:", referral);
      }
    }

    console.log("Search completed successfully");
  } catch (error) {
    console.error("LDAP operation failed:", error);
    process.exit(1);
  } finally {
    // Закрытие соединения
    await client.unbind();
    console.log("Connection closed");
  }
}

// Запуск теста
testLdapConnection().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
