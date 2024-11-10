import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();


export async function POST(request:Request) {

    const { no_lot } = await request.json();
    
    // Filter data based on lotNumber, if provided
    const ulasans = await prisma.projek.findMany({
      where: no_lot ? { lotNumber: { contains: no_lot } } : {}
    });
  
    return NextResponse.json({ ulasans });
}
export async function DELETE(request: Request) { }