interface IProduct {
  id: string;
  title: string;
  price: number;
  description?: string;
  brand: string;
  type: string;
  image_url?: string;
}

export default IProduct;
