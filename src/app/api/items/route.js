import dbConnect from"@/lib/dbconnect"
import { NextResponse } from "next/server";

export async function GET() {
  
  const data = await dbConnect("storeProduct").find({}).toArray()
 
  return Response.json(data)
}


export async function POST(req) {
  const postedData = await req.json();
  const result = await dbConnect("storeProduct").insertOne(postedData);
  return NextResponse.json(result);
}