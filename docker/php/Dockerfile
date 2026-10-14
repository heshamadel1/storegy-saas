FROM php:8.5-fpm

# ─── System deps ───────────────────────────────

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    libpq-dev \
    libicu-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# ─── Extensions ────────────────────────────────

RUN docker-php-ext-install -j$(nproc) pdo_pgsql
RUN docker-php-ext-install -j$(nproc) pgsql
RUN docker-php-ext-install -j$(nproc) mbstring
RUN docker-php-ext-install -j$(nproc) exif
RUN docker-php-ext-install -j$(nproc) pcntl
RUN docker-php-ext-install -j$(nproc) bcmath
RUN docker-php-ext-install -j$(nproc) gd
RUN docker-php-ext-install -j$(nproc) zip
RUN docker-php-ext-install -j$(nproc) intl

# ─── Redis ─────────────────────────────────────

RUN pecl install redis \
    && docker-php-ext-enable redis

# ─── Xdebug ────────────────────────────────────

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

RUN printf '%s\n' \
    'zend_extension=xdebug.so' \
    'xdebug.mode=debug' \
    'xdebug.start_with_request=yes' \
    'xdebug.client_host=host.docker.internal' \
    'xdebug.client_port=9003' \
    'xdebug.idekey=VSCODE' \
    'xdebug.log=/var/www/xdebug.log' \
    'xdebug.log_level=1' \
    > /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# ─── Composer ──────────────────────────────────

COPY --from=composer:2.10 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

RUN chown -R www-data:www-data /var/www

RUN usermod -u 1000 www-data

EXPOSE 9000

CMD ["php-fpm"]