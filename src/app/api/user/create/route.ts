import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { username, walletAddress, avatar } = await request.json();

    if (!username || !walletAddress || !avatar) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Username, walletAddress, and avatar are all required' 
        },
        { status: 400 }
      );
    }

    // Create the anonymous user
    const anonymousUser = await prisma.anonymousUser.create({
      data: {
        username,
        walletAddress,
        avatar
      }
    });

    return NextResponse.json(
      { 
        success: true, 
        data: anonymousUser 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error creating user:', error);

    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0];
      return NextResponse.json(
        { 
          success: false, 
          message: `This ${field} is already registered` 
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}