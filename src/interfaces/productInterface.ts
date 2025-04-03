interface IProduct {
  id: string;
  title: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export default IProduct;
