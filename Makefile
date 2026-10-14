# ═══════════════════════════════════════════════
#  E-Commerce SaaS — Makefile
# ═══════════════════════════════════════════════

DC = docker compose

.PHONY: help up down restart ps logs shell

help: ## Show this help
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

## ─── Docker ───────────────────────────────────
up: ## Start all containers
	$(DC) up -d

down: ## Stop all containers
	$(DC) down

restart: ## Restart all containers
	$(DC) restart

ps: ## Show container status
	$(DC) ps

logs: ## Follow logs
	$(DC) logs -f

build: ## Rebuild containers
	$(DC) build --no-cache app workspace

## ─── Shells ───────────────────────────────────
shell: ## Enter workspace shell
	$(DC) exec workspace bash

shell-root: ## Enter workspace shell as root
	$(DC) exec -u root workspace bash

## ─── Artisan ──────────────────────────────────
art: ## Run artisan command (make art CMD="migrate")
	$(DC) exec workspace php artisan $(CMD)

migrate: ## Run migrations
	$(DC) exec workspace php artisan migrate

fresh: ## Fresh migration with seed
	$(DC) exec workspace php artisan migrate:fresh --seed

tinker: ## Open tinker
	$(DC) exec workspace php artisan tinker

routes: ## List routes
	$(DC) exec workspace php artisan route:list

## ─── Composer ─────────────────────────────────
comp: ## Run composer (make comp CMD="require laravel/sanctum")
	$(DC) exec workspace composer $(CMD)

install: ## Install composer deps
	$(DC) exec workspace composer install

## ─── Testing ──────────────────────────────────
test: ## Run Pest
	$(DC) exec workspace ./vendor/bin/pest

test-filter: ## Run Pest filtered (make test-filter F=AuthTest)
	$(DC) exec workspace ./vendor/bin/pest --filter=$(F)

stan: ## Run PHPStan
	$(DC) exec workspace ./vendor/bin/phpstan analyse

pint: ## Run Pint
	$(DC) exec workspace ./vendor/bin/pint

## ─── Health ───────────────────────────────────
health: ## Full health check
	@echo "═══ Docker ═══"
	@$(DC) ps
	@echo "\n═══ PHP ═══"
	@$(DC) exec workspace php -v | head -1
	@echo "\n═══ Redis ═══"
	@$(DC) exec redis redis-cli ping
	@echo "\n═══ Database ═══"
	@$(DC) exec workspace php artisan db:show 2>/dev/null | head -8