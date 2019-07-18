# Digital Campaign

## Overview

No âmbito do projeto final de cada programa – **Digital Campaign 360º** – os alunos desenvolvem **campanhas digitais integradas para marcas de referência**, validando assim o processo de aprendizagem enquanto desenvolvem um projeto para a indústria digital.

Ao nível da metodologia de trabalho, após o **briefing apresentado pela marca**, os alunos são organizados em equipas. Com a **supervisão dos tutores da EDIT. e de profissionais das agências parceiras** desenvolvem o projeto direcionado para os objetivos apresentados.

O processo de aprendizagem culmina com a **apresentação de um pitch aos responsáveis de comunicação das marcas convidadas**, com todas as componentes estratégicas, criativas e de desenvolvimento.

This is a **Progressive Web App** responsive on different sized displays.

It uses a **service worker** to cache some assets for _offline_ use and includes a **web app manifest** to allow the instalation of the app on _mobile_ devices.

## Quickstart

To see it:

- click [here]()

or

- download the zip or clone the directory to your computer and:

  open the index.html file in a web browser (service worker does not work this way)

  or

  run "npm install" and then "node server.js" on the terminal and open localhost:8081/

## [Progressive Web Apps (PWAs)](https://en.wikipedia.org/wiki/Progressive_web_applications)

PWAs are a type of mobile app delivered through the web, built using common web technologies including HTML, CSS and JavaScript.

They are intended to work on any platform that uses a standards-compliant browser.

Functionality includes working offline, push notifications, and device hardware access, enabling creating user experiences similar to native applications on mobile devices.

Since they are a type of webpage or website known as a web application, there is no requirement for developers or users to install the web apps via digital distribution systems like Apple App Store or Google Play.

## [Application Programming Interfaces (APIs)](https://en.wikipedia.org/wiki/Web_API)

### [Service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

Service workers essentially act as proxy servers that sit between web applications, the browser, and the network (when available).

They are intended, among other things, to enable the creation of effective offline experiences, intercept network requests and take appropriate action based on whether the network is available, and update assets residing on the server.

They will also allow access to push notifications and background sync APIs.

- When available in the browser, the site uses a service worker to cache responses to requests for site assets.
- Visited pages are rendered when there is no network access.

Service workers require HTTPS, although to facilitate local testing, that policy does not apply to localhost. If the production web server does not support HTTPS, then the service worker registration will fail, but the rest of the app will remain functional.

### [Notifications](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) and [Push](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) APIs

The Notifications API allows web pages to control the display of system notifications to the end user.

The Push API gives web applications the ability to receive messages pushed to them from a server, whether or not the web app is in the foreground, or even currently loaded, on a user agent.

## Dependencies

### [Swiper](https://idangero.us/swiper/)



### [Web push](https://github.com/web-push-libs/web-push)

Web push requires that push messages triggered from a backend be done via the Web Push Protocol and if you want to send data with your push message, you must also encrypt that data according to the Message Encryption for Web Push spec.

The VAPID (Voluntary Application Server Identification) protocol (supported by Chrome and Firefox) was used to identify the app for the push service. This lets the push service contact the admin if anything goes wrong with the service.

In the command line, "web-push generate-vapid-keys [--json]" generates a public/private VAPID key pair (the keys are URL Safe Base64 encoded strings).

### [Express](https://expressjs.com/)

Express is a popular unopinionated web framework, written in JavaScript and hosted within the Node.js runtime environment.

Here, it was used to test push messages from a Node.js server.

### [Node-sass](https://github.com/sass/node-sass)

Compiles .scss to .css files.

### [PostCSS CLI](https://github.com/postcss/postcss-cli)

Necessary for Autoprefixer.

### [Autoprefixer](https://github.com/postcss/autoprefixer)

PostCSS plugin to parse CSS and add vendor prefixes to CSS rules. Used here with defaults browserslist.

### [clean-css](https://github.com/jakubpawlowicz/clean-css-cli)

Handle CSS minification.
