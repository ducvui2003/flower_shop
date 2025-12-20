import { Button } from "@/components/ui/button";
import httpService from "@/lib/http/http.service";
import { ResponseApi } from "@/lib/http/http.type";
import { Upload } from "lucide-react";
import React, { useRef } from "react";
import { toast } from "sonner";

const ButtonUploadFile = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    await Promise.all(
      Array.from(files).map(async (file) => {
        // 1️⃣ Get presigned URL
        const presignRes = await httpService.post<
          ResponseApi<{ url: string; key: string }>,
          {
            key: string;
          }
        >("/media/sign-url", {
          key: file.name,
        });

        const { url } = presignRes.data.data;

        // 2️⃣ Upload to R2
        const uploadRes = await httpService.manual().put(url, file, {
          headers: {},
          withCredentials: false,
        });

        if (uploadRes.status === 200 || uploadRes.status === 204) {
          // 3️⃣ Notify backend
          await httpService.post("/media", {
            key: file.name,
            metadata: {},
          });
          toast.success("Upload file success", {
            description: file.name,
          });
        }
      })
    );

    // reset input
    event.target.value = "";
  };
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        onChange={handleUploadFile}
      />

      <Button onClick={() => inputRef.current?.click()}>
        <Upload className="mr-2" />
        Upload
      </Button>
    </>
  );
};

export default ButtonUploadFile;
