import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-primary-container flex items-center justify-center">
          <p className="text-white">Loading...</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
