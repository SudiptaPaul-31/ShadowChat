export type Group = {
  id: number;
  name: string;
  members: number;
  created: string;
  avatar: string;
  isPrivate: boolean;
};

 export type UploadedFile = {
  id: number;
  name: string;
  type: "PDF" | "Video" | "Image" | "Code";
  size: string;
  uploaded: string;
  thumbnail: string;
};
