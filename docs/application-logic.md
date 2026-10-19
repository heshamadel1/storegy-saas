# Application logic structure

## Eloquent is the data layer. Code is organized as follows (Actions and Query classes)

| Concern                                                | Where it lives                                                               |
| ------------------------------------------------------ | ---------------------------------------------------------------------------- |
| A complete business operation (e.g., placing an order) | Action class                                                                 |
| A read with filters, sorting, and pagination           | Query class named by purpose                                                 |
| Reusable filters                                       | Eloquent scopes                                                              |
| Store isolation                                        | Relations from the Store, plus a BelongsToStore global scope as a safety net |
| Validation                                             | Form Request                                                                 |
| Authorization                                          | Policy                                                                       |
| Response shape                                         | API Resource                                                                 |
| Fixed sets of values (statuses, permissions, roles)    | Backed PHP Enums                                                             |
| Money                                                  | Money value object with an Eloquent cast                                     |
| Replaceable external systems                           | Interface (e.g., PaymentGateway) with a Fake for tests                       |
| Side effects after an operation (email, audit entry)   | Domain events and listeners                                                  |
| Duplicate protection                                   | Idempotency middleware using an Idempotency-Key header                       |

### Rules

1. Work that must succeed or fail together (e.g., reserving stock and creating an order) runs inside one Action and one database transaction, not through events. A listener can fail on its own and leave partial data.
2. A module does not read another module's tables directly. It calls an Action exposed by that module.
3. Controllers stay thin: they receive a Form Request, call one Action or Query class, and return an API Resource.

## Authentication Architecture

- Use Laravel Sanctum personal access tokens.

1. the browser authenticates with Next.js, which securely stores the token in an **HttpOnly cookie**, proxying subsequent API requests to Laravel with a Bearer token. JavaScript cannot access the cookie.
2. Mobile apps will consume the Laravel API directly using Bearer tokens.

### Rules

1. Tokens must have an explicit expiration configured.
2. One token per device with a clear name (e.g., `web`, `ios`) for targeted revocation.
3. Logout revokes the current token and clears the cookie.
4. Token abilities are **not** a substitute for Policies and store membership checks.
5. Login endpoints must be rate-limited.
6. Tokens must **never** be logged.
