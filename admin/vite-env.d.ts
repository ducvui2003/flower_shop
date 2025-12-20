interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_R2_PUBLIC_DOMAIN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
