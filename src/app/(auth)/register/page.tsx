import Image from "next/image"

import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?w=1400&q=80"
          alt="Photo studio with softboxes and a white backdrop"
          fill
          sizes="50vw"
          className="object-cover dark:brightness-[0.4]"
        />
      </div>
    </div>
  )
}
