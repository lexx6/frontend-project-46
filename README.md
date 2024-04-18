### Hexlet tests and linter status:
[![Actions Status](https://github.com/lexx6/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/lexx6/frontend-project-46/actions)

### Maintainability Badge:
[![Maintainability](https://api.codeclimate.com/v1/badges/d167f3e98d5684b79c13/maintainability)](https://codeclimate.com/github/lexx6/frontend-project-46/maintainability)

### Test Coverage Badge:
[![Test Coverage](https://api.codeclimate.com/v1/badges/d167f3e98d5684b79c13/test_coverage)](https://codeclimate.com/github/lexx6/frontend-project-46/test_coverage)

### Требования

NodeJS v21.1.0 и новее
npm v10.2.0 и новее

## Описание
Консольное приложение для вычисления разницы структуры файлов в форматах JSON и YAML.

### Установка

1. Скопировать репозиторий 
   ```sh
   git clone git@github.com:lexx6/frontend-project-46.git
   ```
2. Установить все необходимые пакеты
   ```sh
   make install
   ```
3. Установить локальные пакеты
   ```sh
   npm link
   ```

### Посмотреть документацию

   Команда:

   ```sh
   gendiff -h
   ```

[![asciicast](https://asciinema.org/a/HK3Gvaz9N9x7VQyz1qahx0iz9.svg)](https://asciinema.org/a/HK3Gvaz9N9x7VQyz1qahx0iz9)

### Рекурсивное сравнение json файлов

Команда:

   ```sh
   gendiff __fixtures__/file1.json __fixtures__/file2.json
   ```
[![asciicast](https://asciinema.org/a/QMjKs18uitxA9xyQFDEBHLonr.svg)](https://asciinema.org/a/QMjKs18uitxA9xyQFDEBHLonr)

### Рекурсивное сравнение yaml файлов

Команда:

   ```sh
   gendiff __fixtures__/file1.yml __fixtures__/file2.yml
   ```
[![asciicast](https://asciinema.org/a/m5d58fkqwBM0sm2FU8YaYiHC3.svg)](https://asciinema.org/a/m5d58fkqwBM0sm2FU8YaYiHC3)

### Плоское сравнение json файлов

Команда:

   ```sh
   gendiff -f plain __fixtures__/file1.json __fixtures__/file2.json
   ```
[![asciicast](https://asciinema.org/a/PFyer1QSLglupHU1ji06w575m.svg)](https://asciinema.org/a/PFyer1QSLglupHU1ji06w575m)

### Плоское сравнение yml файлов

Команда:

   ```sh
   gendiff -f plain __fixtures__/file1.yml __fixtures__/file2.yml
   ```
[![asciicast](https://asciinema.org/a/4pJOsejYNIxXdzfozYtaOyaLd.svg)](https://asciinema.org/a/4pJOsejYNIxXdzfozYtaOyaLd)

### Вывод в формате json

Команда:

   ```sh
   gendiff -f json __fixtures__/file1.json __fixtures__/file2.json
   ```
[![asciicast](https://asciinema.org/a/rAGLkXl0Qx5Uos4aQC3URptyd.svg)](https://asciinema.org/a/rAGLkXl0Qx5Uos4aQC3URptyd)

### Вывод в формате yml

Команда:

   ```sh
   gendiff -f json __fixtures__/file1.yml __fixtures__/file2.yml
   ```
[![asciicast](https://asciinema.org/a/5GWFBIwRq8ZxjheMv2qb2FJEG.svg)](https://asciinema.org/a/5GWFBIwRq8ZxjheMv2qb2FJEG)