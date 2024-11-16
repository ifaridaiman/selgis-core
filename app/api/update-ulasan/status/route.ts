import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();


export async function PUT(request: Request) {
    try {
      // Parse the request body
      const { id, status } = await request.json();
        
      console.log(id,status, "Data from PUT")
      // Validate the `id` and `status` parameters
      const numericId = parseInt(id, 10);
      if (isNaN(numericId) || typeof status !== "string") {
        return NextResponse.json(
          { message: "Invalid id or status provided" },
          { status: 400 }
        );
      }
  
      // Update the `status` field for the specified `Projek` record
      const updatedProjek = await prisma.projek.update({
        where: { id: numericId },
        data: { status },
      });
  
      // Respond with the updated record
      return NextResponse.json(updatedProjek);
    } catch (error:any) {
      console.error("Error updating projek status:", error);
  
      // Handle specific errors (e.g., record not found)
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Projek not found or no changes made" },
          { status: 404 }
        );
      }
  
      // General error response
      return NextResponse.json(
        { message: "An error occurred while updating projek status" },
        { status: 500 }
      );
    }
  }

