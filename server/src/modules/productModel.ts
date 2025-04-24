import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  quantity: { type: Number, require: true },
  description: { type: String, require: false },
  brand: { type: String, require: true },
  type: { type: String, require: true },
  image_url: { type: String, default: 'no-image.png' },
  createdAt: { type: Date, require: true, default: Date.now() },
});
 
export interface IProduct extends mongoose.Document{
  id: string;
  title: string;
  price: number;
  description?: string;
  brand: string;
  type: string;
  image_url?: string;
}

export default mongoose.model<IProduct>('Product', ProductSchema);
