import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";

export async function POST(req: NextRequest) {
  try {
    const { name, description, image, price } = await req.json();

    if (!name || !description || !image || !price) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const productsCollection = dbConnect("storeProduct");
    const result = await productsCollection.insertOne({
      name,
      description,
      image,
      price,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Product added", productId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ message: "Error adding product" }, { status: 500 });
  }
}
