FROM php:8.5-cli

ARG UID=1000
ARG GID=1000
ARG NODE_VERSION=22

# ─── System deps ───────────────────────────────
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    unzip \
    zip \
    sudo \
    nano \
    vim \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    libzip-dev \
    libpng-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# ─── Extensions ──────────────
RUN docker-php-ext-install -j$(nproc) pdo_pgsql
RUN docker-php-ext-install -j$(nproc) pgsql
RUN docker-php-ext-install -j$(nproc) intl
RUN docker-php-ext-install -j$(nproc) zip
RUN docker-php-ext-install -j$(nproc) bcmath
RUN docker-php-ext-install -j$(nproc) pcntl
RUN docker-php-ext-install -j$(nproc) mbstring
RUN docker-php-ext-install -j$(nproc) exif
RUN docker-php-ext-install -j$(nproc) gd

# ─── Redis ─────────────────────────────────────
RUN pecl install redis && docker-php-ext-enable redis

# ─── Composer ──────────────────────────────────
COPY --from=composer:2.10 /usr/bin/composer /usr/bin/composer

# ─── Xdebug (اختياري) ──────────────────────────
ARG XDEBUG_ENABLED=true
ARG XDEBUG_MODE=debug
ARG XDEBUG_HOST=host.docker.internal
ARG XDEBUG_IDE_KEY=VSCODE
ARG XDEBUG_LOG=/var/www/xdebug.log
ARG XDEBUG_LOG_LEVEL=1

RUN if [ "${XDEBUG_ENABLED}" = "true" ]; then \
    pecl install xdebug && \
    docker-php-ext-enable xdebug && \
    { \
    echo "xdebug.mode=${XDEBUG_MODE}"; \
    echo "xdebug.client_host=${XDEBUG_HOST}"; \
    echo "xdebug.client_port=9003"; \
    echo "xdebug.idekey=${XDEBUG_IDE_KEY}"; \
    echo "xdebug.log=${XDEBUG_LOG}"; \
    echo "xdebug.log_level=${XDEBUG_LOG_LEVEL}"; \
    echo "xdebug.start_with_request=yes"; \
    } >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini; \
    fi

# ─── User www ──────────────────────────────────
RUN if getent group ${GID} > /dev/null; then \
    group_name=$(getent group ${GID} | cut -d: -f1); \
    else \
    groupadd -g ${GID} www; \
    group_name=www; \
    fi && \
    useradd -m -u ${UID} -g ${group_name} -s /bin/bash www && \
    usermod -aG sudo www && \
    echo 'www ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# ─── Node.js via NVM ───────────────────────────
USER www
ENV NVM_DIR=/home/www/.nvm

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash && \
    . "$NVM_DIR/nvm.sh" && \
    nvm install ${NODE_VERSION} && \
    nvm alias default ${NODE_VERSION} && \
    nvm use default

RUN echo 'export NVM_DIR="$HOME/.nvm"' >> /home/www/.bashrc && \
    echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> /home/www/.bashrc && \
    echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> /home/www/.bashrc && \
    echo '[ -s "$HOME/.bashrc" ] && \. "$HOME/.bashrc"' >> /home/www/.bash_profile

WORKDIR /var/www

ENTRYPOINT []
CMD ["bash"]