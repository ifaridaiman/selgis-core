import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();


export async function POST(request: Request) {
  const { id } = await request.json();

  // Ensure the `id` parameter is provided and convert it to an integer
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return NextResponse.json({ message: "Invalid id provided" });
  }

  // Fetch the `Projek` record based on the exact `id`
  const projek = await prisma.projek.findUnique({
    where: { id: numericId }, // Use the integer `id`
  });

  // Check if a projek was found and respond accordingly
  if (!projek) {
    return NextResponse.json({ message: "No projek found" });
  }

  // Fetch `Ulasan` entries based on the `projekId` from the found `Projek`
  const ulasan = await prisma.ulasan.findMany({
    where: {
      projekId: projek.id, // Filter `Ulasan` records by `projekId`
    },
  });

  const result = {
    projek,
    ulasan,
  };
  
  return NextResponse.json(result);
}
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    // Check if `id` is provided
    if (!id) {
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    // Delete the Projek record by ID
    const deletedProjek = await prisma.projek.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Projek deleted successfully", deletedProjek });
  } catch (error) {
    console.error("Error deleting Projek:", error);
    return NextResponse.json({ error: "Failed to delete Projek" }, { status: 500 });
  }
}