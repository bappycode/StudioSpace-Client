'use client'
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

export function LoginForm({
  className,
  redirectTo = "/",
  ...props
}: React.ComponentProps<"div"> & { redirectTo?: string }) {
  const router = useRouter()

  const onFormSubmit = async (e:React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const submittedData = Object.fromEntries(formData.entries()) as {
          email: string,
          password: string
        }
        const { data , error } = await authClient.signIn.email({
          ...submittedData
        })
        if(data){
          toast.success("Logged in successfully")
          router.push(redirectTo)
        }
        if(error){
          toast.error(error.message)
        }
  }
  const onClickGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    })
  }

  const onClickGitHub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: redirectTo,
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onFormSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button onClick={onClickGoogle} variant="outline" type="button">
                  Login with Google
                </Button>
                <Button onClick={onClickGitHub} variant="outline" type="button">
                  Login with GitHub
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/register">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
