import Link from "next/link";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiBuildingOffice2, HiSparkles } from "react-icons/hi2";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DottedSeperator } from "@/components/user-ui/dotted-seperator";

import { signUpSchema } from "../schemas";

export const SignUpCard = () => {
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
    <Card className="border-border/50 bg-card/95 h-full w-full border shadow-2xl backdrop-blur-sm md:w-[500px]">
      <CardHeader className="flex items-center justify-center p-6 pb-4 text-center">
        <div className="space-y-3">
          <div className="from-primary/20 via-primary/10 to-primary/5 border-primary/20 mx-auto flex h-16 w-16 items-center justify-center rounded-xl border bg-gradient-to-br shadow-lg">
            {userType === "creator" ? (
              <HiSparkles className="text-primary h-8 w-8 drop-shadow-sm" />
            ) : (
              <HiBuildingOffice2 className="text-primary h-8 w-8 drop-shadow-sm" />
            )}
          </div>
          <div className="space-y-1">
            <CardTitle className="from-foreground via-foreground/90 to-foreground/70 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
              Sign Up
            </CardTitle>
            <p className="text-muted-foreground text-sm font-medium">
              Create your {userType === "creator" ? "creator" : "brand"} account
            </p>
          </div>
        </div>
      </CardHeader>

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

      <div className="px-8">
        <DottedSeperator />
      </div>

      <CardContent className="p-6 pt-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            {userType === "brand" && (
              <FormField
                name="brandName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-sm font-semibold">
                      Brand Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your brand name"
                        className="border-border/50 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-lg transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-semibold">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email address"
                      className="border-border/50 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-lg transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Create a strong password"
                      className="border-border/50 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-lg transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground text-sm font-semibold">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm your password"
                      className="border-border/50 focus:border-primary/50 focus:ring-primary/20 h-12 rounded-lg transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-3">
              <Button
                variant="emerald"
                type="submit"
                size="lg"
                className="h-10 w-full rounded-lg font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                Create Account
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <div className="px-8">
        <DottedSeperator />
        <CardContent className="flex flex-col gap-y-2 p-6 pt-4">
          <Button
            variant="outline"
            size="lg"
            className="border-border/50 hover:border-primary/30 hover:bg-primary/5 h-12 w-full rounded-lg font-medium transition-all duration-200"
          >
            <FcGoogle className="mr-3 h-5 w-5" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border/50 hover:border-primary/30 hover:bg-primary/5 h-12 w-full rounded-lg font-medium transition-all duration-200"
          >
            <FaGithub className="mr-3 h-5 w-5" />
            Continue with GitHub
          </Button>
        </CardContent>
      </div>

      <div className="px-8">
        <DottedSeperator />
        <CardContent className="flex items-center justify-center p-6 pt-4">
          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200"
            >
              Sign In
            </Link>
          </p>
        </CardContent>
      </div>

      <div className="px-6 pb-6">
        <CardDescription className="text-muted-foreground text-center text-xs leading-relaxed">
          By signing up, you agree to our{" "}
          <Link
            href="/privacy"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/terms"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Terms of Service
          </Link>
        </CardDescription>
      </div>
    </Card>
  );
};
