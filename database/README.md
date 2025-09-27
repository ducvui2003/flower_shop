# Database Service

This project provides a **database migration service** for MySQL using Go and `golang-migrate`. It allows you to create new migration files and apply or roll back migrations easily.

---

## Prerequisites

- Go installed (1.20+ recommended)
- MySQL server running
- `.env` file configured with database connection, for example:

```env
DATABASE_URL=root:123@tcp(localhost:3306)/flower_shop
```

## Migration Workflow

| Command             | Script Location                  | Action                                   | Result                                                                                   |
| ------------------- | -------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| `make migrate-new`  | `cmd/migrate_new/migrate_new.go` | Create new migration files interactively | Generates `<timestamp>_<name>.up.sql` and `<timestamp>_<name>.down.sql` in `migrations/` |
| `make migrate-up`   | `cmd/migrate/migrate.go`         | Apply all unapplied `.up.sql` migrations | Updates the database schema, records versions in `schema_migrations` table               |
| `make migrate-down` | `cmd/migrate/migrate.go`         | Rollback the last applied migration      | Reverts the last migration using `.down.sql`                                             |
| Manual run          | `cmd/migrate/*.go`               | Run scripts with `go run` directly       | Same as above without using Makefile                                                     |

## Notes

- The migration system tracks applied migrations in a schema_migrations table in MySQL.

- Naming convention is important: <timestamp>_<description>.up.sql / <timestamp>_<description>.down.sql.

- Always apply .up.sql files via make migrate-up or the Go script — do not run SQL manually to keep tracking consistent.

---

You can save this directly as `README.md` in your project root.

I can also **add a visual workflow diagram** showing `Makefile → Go scripts → migrations folder → database` if you want, which is very beginner-friendly.

Do you want me to do that?
