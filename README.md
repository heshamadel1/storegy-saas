# 🛒 Storegy

**A Multi-Tenant E-Commerce SaaS Platform** built with **Laravel 13**, **Next.js**, **TypeScript**, **PostgreSQL**, and **Docker**.

[![Laravel](https://img.shields.io/badge/Laravel-13.x-FF2D20?style=flat&logo=laravel)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.5-777BB4?style=flat&logo=php)](https://php.net)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?style=flat&logo=postgresql)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat&logo=docker)](https://docker.com)

---

## 📖 Overview

Storegy is a multi-tenant e-commerce SaaS platform designed to enable multiple stores to operate within a shared application while maintaining store-level data isolation and access control.

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

| Technology      | Version | Purpose                        |
| --------------- | ------- | ------------------------------ |
| PHP             | 8.5.11  | Runtime                        |
| Laravel         | 13.33.0 | Backend framework and REST API |
| PostgreSQL      | 18.6    | Primary relational database    |
| Laravel Sanctum | 4.3.3   | API token authentication       |

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

1. Clone the repository.

   ```bash
   git clone https://github.com/heshamadel1/storegy-sass.git
   cd storegy-saas
   ```

2. Configure the environment files according to the project setup and the provided `.env.example` files.

3. Build and start the development environment.

   ```bash
   docker compose up -d --build
   ```

4. Run database migrations from the appropriate application container.

   ```bash
   docker compose exec workspace bash
   php artisan migrate
   ```

5. Start the frontend using the project's configured development workflow.

> **Note:** Exact service names, environment variables, and frontend startup commands depend on the current Docker Compose and package configuration.

## 📌 Project Status

**Active Development**

Storegy is being developed incrementally, with an emphasis on API design, tenant isolation, maintainable architecture, automated testing, and practical development workflows.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.
