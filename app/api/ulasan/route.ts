import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function GET() {
  const ulasans = await prisma.projek.findMany({});

  return NextResponse.json({
    ulasans
  })
}

export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    const formData = await req.formData();
    console.log("FormData entries:", Array.from(formData.entries()));

    // Extract file and ensure it's present
    const file = formData.get("file") as File | null;
    let folderPath: string | null = null;

    if (file) {
      // Process the file if it exists
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replaceAll(" ", "_");

      // Save the file to the specified directory
      await writeFile(
        path.join(process.cwd(), "public/uploads/" + filename),
        buffer
      );

      // Set the file path to save in the database
      folderPath = `/assets/${filename}`;
    }

    // Extract form fields and cast them to appropriate types
    const lotNumber = formData.get("lotNumber") as string;
    const daerah = formData.get("daerah") as string;
    const mukim = formData.get("mukim") as string;
    const koordinat_x = parseFloat(formData.get("koordinat_x") as string);
    const koordinat_y = parseFloat(formData.get("koordinat_y") as string);
    const tajukProjek = formData.get("tajukProjek") as string;
    const jenisPermohonan = formData.get("jenisPermohonan") as string;
    const noFail = formData.get("noFail") as string;
    const status = formData.get("status") as string;
    const bahagian = formData.get("bahagian") as string;
    const rings = formData.get("rings") as string;
    const panjang = formData.get("panjang") as string;
    const luas = formData.get("luas") as string;
    const ulasan = formData.get("ulasan") as string;
    const tajukSurat = formData.get("tajukSurat") as string;
    const tarikhUlasan = new Date(formData.get("tarikhUlasan") as string);

    if (
      !lotNumber ||
      !daerah ||
      !mukim ||
      !koordinat_x ||
      !koordinat_y ||
      !tajukProjek ||
      !jenisPermohonan ||
      !noFail ||
      !status ||
      !bahagian ||
      !rings ||
      !ulasan ||
      !tajukSurat ||
      !tarikhUlasan
    ) {
      return NextResponse.json({ error: "Mandatory fields missing." }, { status: 400 });
    }

    

    // Create the project in the database
    const projek = await prisma.projek.create({
      data: {
        lotNumber,
        daerah,
        mukim,
        koordinat_x,
        koordinat_y,
        tajukProjek,
        jenisPermohonan,
        noFail,
        status,
        bahagian,
        rings,
        panjang,
        luas,
        tajukSurat,
        tarikhUlasan,
      },
    });

    // Create the ulasan with a reference to the project and file path
    await prisma.ulasan.create({
      data: {
        projekId: projek.id,
        ulasan,
        folderPath,
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