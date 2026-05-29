const ENV_HINT =
  "Copy .env.example to .env.local and fill in Supabase project values.";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}. ${ENV_HINT}`);
  }
  return value;
}

export function getSupabaseUrl(): string {
  return requireEnv("NEXT_PUBLIC_SUPABASE_URL");
}

export function getSupabasePublishableKey(): string {
  return requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
}

export function getSupabaseServiceRoleKey(): string {
  return requireEnv("SUPABASE_SERVICE_ROLE_KEY");
}
