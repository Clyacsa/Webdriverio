WebdriverIO Test Project 
  Цей проєкт містить автоматизовані тести, написані на WebdriverIO.

Вимоги перед стартом:
Перед запуском проєкту потрібно встановити:
- [Node.js](https://nodejs.org/) (рекомендована версія 18 або вище)
- [Git](https://git-scm.com/)

Як запустити проєкт
1. Склонуйте репозиторій:
   ```bash
   git clone https://github.com/Clyacsa/Webdriverio.git
   cd Webdriverio
2. Встановіть залежності:
   npm install
3. Запустіть тести:
   npm test
4. Запуск WebdriverIO в інтерактивному режимі:
   npx wdio run wdio.conf.js
5. Запуск конкретного тесту:
   npx wdio run wdio.conf.js --spec ./test/specs/example.spec.js 
