import { PrismaClient, Ulasan } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface CreateUlasanRequest {
  id: string; // The `Projek` id to associate the `Ulasan` with
  ulasan: string; // The content (review) for the `Ulasan`
  folderPath?: string; // Optional folder path for attachments or additional data
}

interface ErrorResponse {
  message: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Parse the request body
    const body: CreateUlasanRequest = await request.json();
    const { id, ulasan, folderPath } = body;

    // Convert `id` to number and validate
    const numericId = parseInt(id, 10);
    if (isNaN(numericId) || !ulasan.trim()) {
      return NextResponse.json<ErrorResponse>(
        { message: "Invalid id or ulasan content provided" },
        { status: 400 }
      );
    }

    // Fetch the `Projek` record based on `id`
    const projek = await prisma.projek.findUnique({
      where: { id: numericId },
    });

    // If no `Projek` found, return an error
    if (!projek) {
      return NextResponse.json<ErrorResponse>(
        { message: "No projek found with the provided id" },
        { status: 404 }
      );
    }

    // Create the new `Ulasan` linked to the `Projek`
    const ulasanRecord: Ulasan = await prisma.ulasan.create({
      data: {
        projekId: projek.id, // Associate the `Ulasan` with the `Projek`
        ulasan: ulasan, // The content of the review
        folderPath: folderPath ?? null, // Optional folderPath for the review
      },
    });

    // Return the created `Ulasan` object
    return NextResponse.json<Ulasan>(ulasanRecord);
  } catch (error: any) {
    console.error("Error creating ulasan:", error);

    // Handle unexpected errors
    return NextResponse.json<ErrorResponse>(
      { message: "An error occurred while creating ulasan" },
      { status: 500 }
    );
  }
}
