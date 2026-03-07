import { z } from "zod";

const configSchema = z.object({
  BACKEND_URL: z.string(),
  R2_PUBLIC_DOMAIN: z.string(),
});

const configProject = configSchema.safeParse({
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  R2_PUBLIC_DOMAIN: import.meta.env.VITE_R2_PUBLIC_DOMAIN,
});

if (!configProject.success) {
  console.log(configProject.error.issues);
  throw new Error("Các giá trị khai báo trong file .env không hợp lệ");
}

const envConfig = configProject.data;
export default envConfig;
