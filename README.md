# Pharmserv-UI

Angular frontend for the Pharmserv pharmaceutical entry management application.

## Built With

- ![Angular](https://img.shields.io/badge/angular-0F0F11?style=for-the-badge&logo=angular&logoColor=FFFFFF)
- Docker
- Node.js

## Prerequisites

For local development:

- Node.js 22+
- npm

For Docker development and production:

- Docker
- Docker Compose

---

# Installation

Clone the repository:

```sh
git clone https://github.com/RinzlerN26/Pharmserv-UI.git
cd Pharmserv-UI
```

Install dependencies:

```sh
npm install
```

---

# Local Development

To run Angular directly on your machine:

```sh
npm start
```

The application will be available at:

```text
http://localhost:4200
```

Angular provides hot reload automatically while developing.

---

# Docker Development

The Pharmserv project provides a Docker development environment in which the Angular application runs inside a Docker container with hot reload enabled.

The UI repository should be cloned next to the Pharmserv backend repository:

```text
ParentFolder/
├── Pharmserv/
└── Pharmserv-UI/
```

The Docker development environment is started from the `Pharmserv` repository:

```powershell
cd ../Pharmserv

docker compose --env-file .env -f docker-compose.dev.yml up --build
```

Caddy exposes the application at:

```text
http://localhost
```

Angular runs inside the Docker container using the Angular development server on port `4200`.

Source files are mounted into the container, so changes to the Angular source code are automatically detected and reflected through hot reload.

---

# Docker Production

The production Docker configuration builds the Angular application into a production-ready static build.

The production environment is started from the `Pharmserv` backend repository:

```powershell
cd ../Pharmserv

docker compose --env-file .env up --build
```

The Angular application is built using:

```sh
npm run build
```

The generated files are then served by Caddy.

The application is available at:

```text
http://localhost
```

Unlike Docker development, the production configuration does not use the Angular development server or hot reload.

---

# Development Modes

| Mode               | Angular                  | Hot Reload | Started From   |
| ------------------ | ------------------------ | ---------- | -------------- |
| Local Development  | `ng serve`               | Yes        | `Pharmserv-UI` |
| Docker Development | `ng serve` in Docker     | Yes        | `Pharmserv`    |
| Docker Production  | Angular production build | No         | `Pharmserv`    |

---

# Repository Relationship

Pharmserv-UI is the frontend repository for the Pharmserv backend.

For Docker-based development and production, both repositories should be located next to each other:

```text
ParentFolder/
├── Pharmserv/
└── Pharmserv-UI/
```

The Pharmserv Docker Compose configuration expects the UI repository at:

```text
../Pharmserv-UI
```

relative to the Pharmserv repository.
