export type FormContactType = {
  title: string;
  email: string;
  name: string;
  phone: string;
  message: string;
};

export type ContactTypeResponse = {
  id: number;
  name: string;
  email: string;
  title: string;
  phone: string;
  message: string;
  status: string;
  createdAt: Date;
};
