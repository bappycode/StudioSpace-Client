"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const validatePassword = (password: string) => {
  if (password.length < 6) return "Password must be at least 6 characters"
  if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter"
  if (!/[a-z]/.test(password)) return "Password must have a lowercase letter"
  return ""
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const submittedData = Object.fromEntries(form.entries()) as {
      email: string,
      password: string,
      name: string,
      photo: string,
    }
    const password = form.get("password") as string

    const message = validatePassword(password)
    if (message) return setError(message)

    if (password !== form.get("confirm-password")) {
      return setError("Passwords do not match")
    }

    setError("")
    const { data, error } = await authClient.signUp.email({
      email: submittedData.email,
      password: submittedData.password,
      name: submittedData.name,
      image: submittedData.photo,
    })

    if (data) {
      toast.success("Account created! Please log in.")
      router.push("/login")
    }
    if (error) {
      toast.error(error.message)
    }
  }

  const onClickGoogle = async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      })
    }
  
    const onClickGitHub = async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      })
    }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background"
          />
        </Field>
         <Field>
          <FieldLabel htmlFor="photo">Photo URL</FieldLabel>
          <Input
            id="photo"
            name="photo"
            type="url"
            placeholder="Use A live Photo Url"
            required
            className="bg-background"
          />
        </Field>
        <Field data-invalid={!!error}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            required
            aria-invalid={!!error}
            className="bg-background"
          />
          {error ? (
            <FieldError>{error}</FieldError>
          ) : (
            <FieldDescription>
              At least 6 characters, with an uppercase and a lowercase letter.
            </FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            className="bg-background"
          />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button onClick={onClickGoogle} variant="outline" type="button">
            Sign up with Google
          </Button>
          <Button onClick={onClickGitHub} variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Sign up with GitHub
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
