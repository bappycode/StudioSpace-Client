import { LoginForm } from "@/components/login-form"

export default async function Page({ searchParams }: PageProps<"/login">) {
  const { redirect } = await searchParams

  const redirectTo =
    typeof redirect === "string" && redirect.startsWith("/") && !redirect.startsWith("//")
      ? redirect
      : "/"

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  )
}
