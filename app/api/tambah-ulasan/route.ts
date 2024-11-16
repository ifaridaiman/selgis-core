import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    const formData = await req.formData();
    console.log("FormData entries:", Array.from(formData.entries()));

    // Extract file and ensure it's present
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    // Convert file to buffer and set up the file path
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(" ", "_");

    // Extract form fields and cast them to appropriate types
    const id = formData.get("id") as string;
    const ulasan = formData.get("ulasan") as string;
    

    // Save the file to the specified directory
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );


    // Create the ulasan with a reference to the project and file path
    await prisma.ulasan.create({
      data: {
        projekId: projek.id,
        ulasan,
        folderPath: `/assets/${filename}`,
      },
    });

    return NextResponse.json({ message: "Success", status: 201 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ message: "Failed to create project", status: 500 });
  }
};

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    // Delete related Ulasan records first
    await prisma.ulasan.deleteMany({
      where: { projekId: id },
    });

    // Then delete the Projek record
    const deletedProjek = await prisma.projek.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Projek and related Ulasan records deleted successfully", deletedProjek });
  } catch (error) {
    console.error("Error deleting Projek:", error);
    return NextResponse.json({ error: "Failed to delete Projek" }, { status: 500 });
  }
}