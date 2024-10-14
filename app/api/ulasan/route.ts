import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
    const listOfLotUlasan = await prisma.projek.findMany({
        include: {
            ulasans: true,
        },
    });

    return NextResponse.json({ listOfLotUlasan });
};

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const {
            lotNumber,
            daerah,
            mukim,
            koordinat_x,
            koordinat_y,
            xMin,
            yMin,
            xMax,
            yMax,
            tajukProjek,
            jenisPermohonan,
            noFail,
            status,
            bahagian,
            ulasans // This will be an array of Ulasan objects
        } = body;

        const newProjek = await prisma.projek.create({
            data: {
                lotNumber,
                daerah,
                mukim,
                koordinat_x,
                koordinat_y,
                xMin,
                yMin,
                xMax,
                yMax,
                tajukProjek,
                jenisPermohonan,
                noFail,
                status,
                bahagian,
                ulasans: {
                    create: ulasans.map((ulasan: { ulasan: string, folderPath: string }) => ({
                        ulasan: ulasan.ulasan,
                        folderPath: ulasan.folderPath,
                    }))
                }
            },
            include: {
                ulasans: true, // Include the related Ulasan objects in the response
            }
        });

        return NextResponse.json(newProjek);
    } catch (err) {
        console.error('Error creating projek and ulasans:', err);
        return NextResponse.json({ error: 'Failed to create projek and ulasans' }, { status: 500 });
    }

}