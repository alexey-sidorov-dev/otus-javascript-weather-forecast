# Домашнее задание курса [OTUS JavaScript Developer. Basic](https://otus.ru/lessons/javascript-basic/)

Приложение "Прогноз погоды".

[![Actions Status](https://github.com/alexey-sidorov-dev/otus-javascript-weather-forecast/workflows/PR%20Sanity%20Check/badge.svg)](https://github.com/alexey-sidorov-dev/otus-javascript-weather-forecast/actions)
[![Actions Status](https://github.com/alexey-sidorov-dev/otus-javascript-weather-forecast/workflows/Add%20CodeSandbox%20link/badge.svg)](https://github.com/alexey-sidorov-dev/otus-javascript-weather-forecast/actions)
[![Actions Status](https://github.com/alexey-sidorov-dev/otus-javascript-weather-forecast/workflows/Coverage/badge.svg)](https://github.com/alexey-sidorov-dev/otus-javascript-weather-forecast/actions)
[![Actions Status](https://github.com/alexey-sidorov-dev/otus-javascript-weather-forecast/workflows/Deploy%20to%20Github%20Pages/badge.svg)](https://alexey-sidorov-dev.github.io/otus-javascript-weather-forecast/)
[![LICENSE](https://img.shields.io/badge/license-ISC-brightgreen.svg)](ISC)

## Описание приложения

## Возможности приложения

## Публикация приложения

## Работа с репозиторием

## Цель

В задании тренируются навыки:

- работы с тестовыми системами;
- использования базового синтаксиса JS;
- публикации кода с помощью сервиса GitHub Pages;
- применения знаний по созданию базовых страниц для отображения информации;
- использования основных инструментов, упрощающих жизнь разработчикаю

## Описание/пошаговая инструкция выполнения домашнего задания

- Создайте страницу:
  - при открытии страницы пользователь видит погоду (город, температуру и иконку) в своей местности;
  - он может ввести имя города в поле ввода и увидеть погоду в выбранном городе;
  - введенные города сохраняются у пользователя в браузере, так что он видит последние 10 городов, где он смотрел погоду;
  - при клике по строчке города в списке он видит погоду в выбранном городе;
  - кроме информации о погоде покажите в центре страницы карту для введенного адреса;
- Проверить покрытие кода тестами, добавить проверку покрытия при запуске test скрипта. Покрытие должно быть не ниже 60%.

## Критерии оценки

- создан репозиторий на GitHub, проект c package.json, настроены линтеры, husky, GitHub Actions - 2 балла;
- настроены dev и build скрипты, сборка делается с использованием Webpack - 2 балла;
- при открытии страницы пользователь видит свой город и прогноз погоды в своем городе - 2 балла;
- пользователь может ввести адрес/город и увидеть прогноз погоды - 2 балла;
- введенные города сохраняются у пользователя в браузере, так что он видит последние 10 городов, где смотрел погоду (записи в истории не повторяются) - 2 балла;
- при клике по строчке города в списке истории он видит погоду в выбранном городе - 2 балла;
- вместе с погодой показывается картинка карты местности для точки - 2 балла;
- сделана публикация на GitHub Pages (с помощью GitHub Actions) - 2 балла;
- покрытие кода выше 60 %, покрытие проверяется на CI - 2 балла;
- ссылка на страницу для просмотра погоды добавлена на страницу репозитория - 1 балл;
- в репозитории есть README.md, который содержит описание проекта (что делается, зачем, где смотреть) и описывает структуру проекта - 1 балл;
- в README.md есть badge для отображения статуса проверок на основной ветке (линтеры и тесты) - 1 балл.

Задание считается принятым при 18 баллах.
