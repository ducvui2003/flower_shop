import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authUtil } from "@/lib/auth.util";
import logger from "@/config/logger.util";
import httpService from "@/lib/http/http.service";
import { ResponseApi } from "@/lib/http/http.type";
import { tokenService } from "@/lib/token.service";
import { LoginFormInput, LoginFormSchema } from "@/pages/login/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const form = useForm<LoginFormInput>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Redirect to home if already authenticated
  useEffect(() => {
    if (authUtil.isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (value: LoginFormInput) => {
    const result = LoginFormSchema.safeParse(value);

    if (!result.success) {
      logger.error(result.error.flatten());
      toast.error("Invalid form data");
      return;
    }

    try {
      // TODO: Implement API call here
      const response = await httpService.post<
        ResponseApi<{
          access: {
            token: string;
            exp: number;
            expiresAt: number;
            iat: number;
          };
          refresh: {
            token: string;
            exp: number;
            expiresAt: number;
            iat: number;
          };
        }>,
        {
          email: string;
          password: string;
        }
      >("/auth/login", {
        email: result.data.email,
        password: result.data.password,
      });
      const accessToken = response.data.data.access.token;
      const refreshToken = response.data.data.refresh.token;

      // Save tokens to local storage
      tokenService.saveTokens(accessToken, refreshToken);

      toast.success("Login successful");
      navigate("/", { replace: true });
    } catch (e) {
      if (isAxiosError(e)) {
        toast.error(e.code);
      } else {
        toast.error("Login failed");
      }
      logger.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter your email"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
