create table public.daycares (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  constraint daycares_name_not_blank
    check (btrim(name) <> '')
);

alter table public.daycares enable row level security;

insert into public.daycares (name)
select seed.name
from (
  values
    ('Guardería Sala Soles'),
    ('Guardería Arcoíris'),
    ('Guardería Semillitas'),
    ('Guardería Estrellitas')
) as seed(name)
where not exists (
  select 1
  from public.daycares as daycare
  where daycare.name = seed.name
);
