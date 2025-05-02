import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { z, ZodError } from 'zod';

const prisma = new PrismaClient();

const createUserSchema = z.object({
  username: z.string().min(3).max(50),
  walletAddress: z.string().length(42), 
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

    // Return only relevant user fields (exclude sensitive fields manually if needed)
    return NextResponse.json(user, { status: 201 });

  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error && 
        error.constructor.name === 'PrismaClientKnownRequestError' && 
        (error as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
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
