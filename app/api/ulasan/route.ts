import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {}
export async function POST(request: Request) {
   const formData = await request.formData();
   const tajukProjek = formData.get('tajukProjek')
}
export async function DELETE(request: Request) {}