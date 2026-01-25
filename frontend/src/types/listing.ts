export type Listing = {
  id: number;
  name: string;
  price: string;
  size: string;
  condition: string;
  brand: string;
  created_at: string;
  description?: string | undefined;
  image_url?: string | undefined; 
  profilephoto_url?: string | undefined; 
  username: string;
};
