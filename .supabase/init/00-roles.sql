do $$
begin
  if not exists (select from pg_roles where rolname = 'postgres') then
    create role postgres superuser login password 'postgres';
  end if;

  if not exists (select from pg_roles where rolname = 'anon') then
    create role anon nologin;
  end if;

  if not exists (select from pg_roles where rolname = 'authenticated') then
    create role authenticated nologin;
  end if;

  if not exists (select from pg_roles where rolname = 'service_role') then
    create role service_role nologin bypassrls;
  end if;

  if not exists (select from pg_roles where rolname = 'authenticator') then
    create role authenticator noinherit login password 'postgres';
  end if;

  if not exists (select from pg_roles where rolname = 'supabase_auth_admin') then
    create role supabase_auth_admin noinherit login password 'postgres';
  end if;
end $$;

grant anon, authenticated, service_role to authenticator;
grant usage on schema public to anon, authenticated, service_role;
grant usage, create on schema public to supabase_auth_admin;
grant all privileges on database postgres to supabase_auth_admin;
alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
alter default privileges in schema public grant all on routines to anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;

create schema if not exists auth authorization supabase_auth_admin;
grant usage, create on schema auth to supabase_auth_admin;

do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where n.nspname = 'auth' and t.typname = 'factor_type'
  ) then
    create type auth.factor_type as enum ('totp', 'webauthn');
    alter type auth.factor_type owner to supabase_auth_admin;
  end if;
end $$;
