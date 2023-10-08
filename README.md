# movies-explorer-api

Репозиторий для приложения проекта `movies-explorer`, включающий бэкенд часть приложения со следующими возможностями: авторизации и регистрации пользователей, операции с фильмами и пользователями. Это первый этап моего дипломного проекта по курсу веб-разработчик Яндекс Практикум
___
## Технологии
* Node JS
* Express
* MongoDB
___
## Endpoints

* __GET /users/me__  - Возвращает информацию о пользователе (email и имя).

* __PATCH /users/me__ - Обновляет информацию о пользователе (email и имя).

* __POST /signup__ - Создаёт пользователя с переданными в теле
    * email
    * password
    * name
* __POST /signin__ - Проверяет переданные в теле почту и пароль и возвращает __JWT__

* __GET /movies__ - Возвращает все сохранённые текущим пользователем фильмы.

* __POST /movies__ - Создаёт фильм с переданными в теле
  * country
  * director
  * duration
  * year
  * description
  * image
  * trailer
  * nameRU
  * nameEN
  * thumbnail
  * movieId

* __DELETE /movies/id__ - Удаляет сохранённый фильм по id.
___
## Ссылка на проект

IP 62.84.123.141

Backend https://api.sudarkinvmovies.nomoredomainsicu.ru