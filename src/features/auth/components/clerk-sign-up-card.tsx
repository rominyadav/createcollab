import { useState } from "react";

import { SignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiBuildingOffice2, HiSparkles } from "react-icons/hi2";
import { z } from "zod";

import { Card } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { signUpSchema } from "../schemas";

export const ClerkSignUpCard = () => {
  const [userType, setUserType] = useState<"creator" | "brand">("creator");

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      brandName: "",
    },
  });

  // Update form when user type changes
  const handleUserTypeChange = (value: string | undefined) => {
    if (value) {
      setUserType(value as "creator" | "brand");
      // Clear brand name when switching to creator
      if (value === "creator") {
        form.setValue("brandName", "");
      }
    }
  };

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    // Custom validation for brand name
    if (userType === "brand") {
      if (!values.brandName || values.brandName.trim() === "") {
        form.setError("brandName", {
          type: "manual",
          message: "Brand name is required for brand accounts",
        });
        return;
      }

      // Check if brand name has at least one word (not just spaces or special characters)
      const trimmedBrandName = values.brandName.trim();
      if (
        trimmedBrandName.length < 2 ||
        !/^[a-zA-Z0-9\s\-&.]+$/.test(trimmedBrandName)
      ) {
        form.setError("brandName", {
          type: "manual",
          message:
            "Brand name must be at least 2 characters and contain valid characters",
        });
        return;
      }
    }

    console.log({ ...values, userType });
  };

  return (
    <Card className="flex h-full w-full items-center justify-center border-0 md:w-[500px]">
      {/* User Type Toggle */}
      <div className="px-6 pb-4">
        <div className="space-y-3">
          <p className="text-muted-foreground text-center text-sm font-medium">
            Choose your account type
          </p>
          <ToggleGroup
            type="single"
            value={userType}
            onValueChange={handleUserTypeChange}
            className="bg-muted/30 border-border/30 grid w-full grid-cols-2 gap-3 rounded-xl border p-1"
          >
            <ToggleGroupItem
              value="creator"
              className="data-[state=off]:text-muted-foreground data-[state=off]:hover:text-foreground flex items-center gap-3 rounded-lg border-0 px-6 py-4 font-medium transition-all duration-300 ease-out data-[state=on]:scale-[1.02] data-[state=on]:bg-gradient-to-r data-[state=on]:from-emerald-500 data-[state=on]:to-teal-600 data-[state=on]:text-white data-[state=on]:shadow-lg"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100/50 transition-colors duration-200 data-[state=on]:bg-white/20">
                <HiSparkles className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold">Creator</span>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="brand"
              className="data-[state=off]:text-muted-foreground data-[state=off]:hover:text-foreground flex items-center gap-3 rounded-lg border-0 px-6 py-4 font-medium transition-all duration-300 ease-out data-[state=on]:scale-[1.02] data-[state=on]:bg-gradient-to-r data-[state=on]:from-emerald-500 data-[state=on]:to-teal-600 data-[state=on]:text-white data-[state=on]:shadow-lg"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100/50 transition-colors duration-200 data-[state=on]:bg-white/20">
                <HiBuildingOffice2 className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold">Brand</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <SignUp
        fallbackRedirectUrl={
          userType === "creator" ? "/creator/onboarding" : "/brand/onboarding"
        }
      />
    </Card>
  );
};
