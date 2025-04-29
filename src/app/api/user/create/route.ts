import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();


const createUserSchema = z.object({
  username: z.string().min(3).max(50),
  walletAddress: z.string().min(42).max(42), 
  avatar: z.string().url().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = createUserSchema.parse(body);
    
    
    const user = await prisma.user.create({
      data: {
        username: validatedData.username,
        walletAddress: validatedData.walletAddress,
        avatar: validatedData.avatar,
      },
    });

   
    const { passwordHash, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error : any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    // Handle unique constraint violations
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Username or wallet address already exists' },
        { status: 409 }
      );
    }

    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 