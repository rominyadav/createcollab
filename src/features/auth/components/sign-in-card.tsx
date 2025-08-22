import Link from "next/link";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiBuildingOffice2, HiSparkles } from "react-icons/hi2";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

import { loginSchema } from "../schemas";

export const SignInCard = () => {
  const [userType, setUserType] = useState<"creator" | "brand">("creator");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log({ ...values, userType });
  };

  return (
    <Card className="border-border/50 bg-card/95 h-full w-full border shadow-2xl backdrop-blur-sm md:w-[500px]">
      <CardHeader className="flex items-center justify-center p-8 pb-6 text-center">
        <div className="space-y-4">
          <div className="from-primary/20 via-primary/10 to-primary/5 border-primary/20 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border bg-gradient-to-br shadow-lg">
            {userType === "creator" ? (
              <HiSparkles className="text-primary h-10 w-10 drop-shadow-sm" />
            ) : (
              <HiBuildingOffice2 className="text-primary h-10 w-10 drop-shadow-sm" />
            )}
          </div>
          <div className="space-y-2">
            <CardTitle className="from-foreground via-foreground/90 to-foreground/70 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
              Welcome Back!
            </CardTitle>
            <p className="text-muted-foreground text-sm font-medium">
              Sign in to your {userType === "creator" ? "creator" : "brand"}{" "}
              account
            </p>
          </div>
        </div>
      </CardHeader>

      {/* User Type Toggle */}
      <div className="px-8 pb-6">
        <div className="space-y-3">
          <p className="text-muted-foreground text-center text-sm font-medium">
            Choose your account type
          </p>
          <ToggleGroup
            type="single"
            value={userType}
            onValueChange={(value: string | undefined) =>
              value && setUserType(value as "creator" | "brand")
            }
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

      <CardContent className="p-8 pt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
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
                      placeholder="Enter your password"
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
                className="h-12 w-full rounded-lg font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                Sign In
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <div className="px-8">
        <DottedSeperator />
        <CardContent className="flex flex-col gap-y-3 p-8 pt-6">
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
        <CardContent className="flex items-center justify-center p-8 pt-6">
          <p className="text-muted-foreground text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200"
            >
              Sign Up
            </Link>
          </p>
        </CardContent>
      </div>
    </Card>
  );
};
