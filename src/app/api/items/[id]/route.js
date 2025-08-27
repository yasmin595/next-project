import dbConnect from"@/lib/dbconnect"
import { ObjectId } from "mongodb"

export async function GET(req, { params }) {
  const singleData = await dbConnect("storeProduct").findOne({ id: parseInt(params.id) });
  return new Response(JSON.stringify(singleData));
}



export async function DELETE(req, {params}) {
  
  const p= await params
  const singleData = await dbConnect("storeProduct").deleteOne({ _id: new ObjectId(p) });
 
  return Response.json(singleData)
}



export async function PATCH(req, params) {
  const postedData= await req.json()
  const updateDoc = { $set: postedData };
   const p= await params
   const filter={_id:new ObjectId(p.id)}
  const updatedResponse = await dbConnect("storeProduct").updateOne(filter,updateDoc,{upsert:true})
 
  return Response.json(updatedResponse)
}