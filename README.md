# LDAP Connection Test

Простой Node.js-скрипт на базе `ldapjs` для проверки подключения (bind) и поиска в LDAP-сервере.

---

## 📦 Установка

1. Склонируй или скачай проект.
2. Перейди в папку проекта:

   ```bash
   cd test-ldapjs
   ```

3. Установи зависимости:

   ```bash
   npm install
   ```

---

## ⚙️ Настройка

Открой файл `index.js` и отредактируй параметры вверху:

```js
const LDAP_URL = 'ldap://localhost:389';
const LDAP_BIND_DN = 'cn=admin,dc=example,dc=com';
const LDAP_BIND_PASSWORD = 'adminpassword';
const LDAP_SEARCH_BASE = 'dc=example,dc=com';
const LDAP_SEARCH_FILTER = '(objectClass=*)';
```

---

## 🚀 Запуск

Для запуска скрипта выполни:

```bash
npm run start
```

---

## ✅ Что делает этот скрипт

- Подключается к LDAP-серверу по указанному URL.
- Выполняет bind с заданным DN и паролем.
- Делает поиск с заданным фильтром.
- Выводит найденные DN в консоль.

---

## 💡 Примечания

- Убедись, что LDAP-сервер доступен по указанному адресу и порту.
- Проверь правильность DN и пароля.
- Для LDAPS (SSL) используй `ldaps://` в `LDAP_URL`.
