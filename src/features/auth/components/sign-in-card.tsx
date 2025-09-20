import { SignIn } from "@clerk/nextjs";

export const SignInCard = () => {
  return (
    <div className="flex items-center justify-center">
      <SignIn
        routing="hash"
        appearance={{
          elements: {
            formButtonPrimary: "bg-emerald-600 hover:bg-emerald-700",
            card: "shadow-2xl",
          },
        }}
      />
    </div>
  );
};
