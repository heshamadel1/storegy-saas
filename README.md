# 🛒 Storegy

**A Multi-Tenant E-Commerce SaaS Platform** built with **Laravel 13**, **Next.js**, **TypeScript**, **PostgreSQL**, and **Docker**.

[![Laravel](https://img.shields.io/badge/Laravel-13.x-FF2D20?style=flat&logo=laravel)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.5-777BB4?style=flat&logo=php)](https://php.net)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?style=flat&logo=postgresql)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat&logo=docker)](https://docker.com)

---

## 📖 Overview

Storegy is a multi-tenant e-commerce SaaS platform designed to enable multiple stores to operate within a shared application while maintaining store-level data isolation and access control [**documentions & rules**](https://github.com/heshamadel1/storegy-saas/blob/main/docs/application-logic.md)

The platform follows an **API-first architecture**, with a Laravel backend powering a Next.js dashboard. This separation provides a foundation for additional clients, such as mobile applications, without requiring a complete backend rewrite.

## 🏗️ Architecture

**API-First, Decoupled Architecture**

- **Backend:** Laravel REST API.
- **Frontend:** Next.js with React and TypeScript.
- **Database:** PostgreSQL.
- **Infrastructure:** Docker Compose and Nginx.
- **Authentication:** Laravel Sanctum personal access tokens.
- **Debugging:** Xdebug with Visual Studio Code.

### Multi-Tenancy

The platform is designed to support users who belong to multiple stores. Users can select a current store, and API requests can operate within that store's context, subject to authorization and tenant-isolation rules.

---

## 🛠️ Tech Stack

### Backend & Database

| Technology      | Version | Purpose                               |
| --------------- | ------- | ------------------------------------- |
| PHP             | 8.5.11  | Runtime                               |
| Laravel         | 13.33.0 | Backend framework and REST API        |
| PostgreSQL      | 18.6    | Primary relational database           |
| Laravel Sanctum | 4.3.3   | API token authentication              |
| Redis           | 8.10    | Caching and supporting infrastructure |
| Predis          | 3.6.1   | Redis client                          |

### DevOps & Infrastructure

| Technology     | Version           | Purpose                       |
| -------------- | ----------------- | ----------------------------- |
| Docker Engine  | Installed version | Container runtime             |
| Docker Compose | Installed version | Multi-container orchestration |
| Nginx          | 1.30.5            | Reverse proxy and web server  |
| Xdebug         | 3.5.3             | PHP debugging                 |

### Frontend

| Technology   | Version                  | Purpose                        |
| ------------ | ------------------------ | ------------------------------ |
| Next.js      | Verify in `package.json` | React framework and App Router |
| React        | Verify in `package.json` | UI library                     |
| TypeScript   | Verify in `package.json` | Static typing                  |
| Tailwind CSS | Verify in `package.json` | Styling                        |
| shadcn/ui    | Project configuration    | UI components                  |

---

## 📁 Project Structure

```text
storegy-saas/
├── .vscode/
│   └── launch.json
├── docker/
│   ├── development/
│   │   └── workspace/
│   │       ├── Dockerfile
│   │       └── xdebug.ini
│   ├── php/
│   │   └── Dockerfile
│   └── nginx/
│       └── default.conf
├── src/
│   ├── backend/
│   │   ├── app/
│   │   ├── bootstrap/
│   │   ├── config/
│   │   ├── database/
│   │   ├── public/
│   │   ├── resources/
│   │   ├── routes/
│   │   ├── storage/
│   │   ├── tests/
│   │   ├── artisan
│   │   └── composer.json
│   └── frontend/
│       ├── app/
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       ├── public/
│       ├── utils/
│       ├── type/
│       ├── package.json
│       ├── next.config.ts
│       └── tsconfig.json
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- Docker Engine
- Docker Compose
- Git

### Installation

```bash
# 1. Clone the repository
git clone git@github.com:heshamadel1/storegy-sass.git
   cd storegy-saas

# 2. Copy environment file
cp src/backend/.env.example src/backend/.env

# 3. Build and start containers
docker compose up -d --build

# 4. Install Composer dependencies
docker compose exec workspace composer install

# 5. Generate application key
docker compose exec workspace php artisan key:generate

# 6. Run database migrations
docker compose exec workspace php artisan migrate
```

> **Note:** Exact service names, environment variables, and frontend startup commands depend on the current Docker Compose and package configuration.

## 📌 Project Status

**Active Development**

Storegy is being developed incrementally, with an emphasis on API design, tenant isolation, maintainable architecture, automated testing, and practical development workflows.

---

## 🎮 Available & Useful Commands

The project uses a `Makefile` to simplify common Docker and Laravel operations.

> **Note:** All `make` commands must be run from the project root (`~/Code/Projects/Storgy-sass/`).

### 📋 Quick Reference

Run `make help` to see all available commands.

| Command       | Description                                   | Equivalent |
| ------------- | --------------------------------------------- | ---------- |
| `make help`   | Show all available commands                   | —          |
| `make health` | Full health check (Docker + PHP + Redis + DB) | —          |

---

### 🐳 Docker Commands

| Command        | Description                              | Equivalent                                      |
| -------------- | ---------------------------------------- | ----------------------------------------------- |
| `make up`      | Start all containers                     | `docker compose up -d`                          |
| `make down`    | Stop all containers                      | `docker compose down`                           |
| `make restart` | Restart all containers                   | `docker compose restart`                        |
| `make ps`      | Show container status                    | `docker compose ps`                             |
| `make logs`    | Follow logs                              | `docker compose logs -f`                        |
| `make build`   | Rebuild `app` and `workspace` containers | `docker compose build --no-cache app workspace` |

---

### Artisan Commands

| Command              | Description                | Equivalent                         |
| -------------------- | -------------------------- | ---------------------------------- |
| `make art CMD="..."` | Run any Artisan command    | `php artisan ...`                  |
| `make migrate`       | Run migrations             | `php artisan migrate`              |
| `make fresh`         | Fresh migration with seed  | `php artisan migrate:fresh --seed` |
| `make tinker`        | Open Laravel Tinker REPL   | `php artisan tinker`               |
| `make make routes`   | List all registered routes | `php artisan route:list`           |

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.
