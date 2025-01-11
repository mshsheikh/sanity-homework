import { client } from "@/sanity/lib/client";
import Image from "next/image";

// Define a type for the data
interface Gadget {
  _id: string;
  productName: string;
  productPrice: number;
  imageUrl: string;
}

export default async function Home() {
  const mshStoreData: Gadget[] = await client.fetch(`
    *[_type == "gadgets"] {
      _id,
      productName,
      productPrice,
      "imageUrl": productImage.asset->url
    }
  `);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">MSH Gadgets Store</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mshStoreData.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all p-4"
            >
              <Image
                src={item.imageUrl}
                alt={item.productName}
                className="w-full h-60 object-cover rounded-t-lg"
                height={260}
                width={400}
              />
              <div className="mt-4">
                <h2 className="text-lg font-medium text-gray-700">{item.productName}</h2>
                <p className="text-gray-500 mt-2 text-sm">${item.productPrice}</p>
                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
