import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body;

        if(!user || !user.id || !user.firstName) {
            return new NextResponse("Unauth", { status: 401});
        }

        if(!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse("Missing required fields", {status: 400});
        }

        const friend = await prismadb.friend.create({
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                seed,
                name,
                description,
                instructions
            }
        });
        return NextResponse.json(friend);
    } catch (error) {
        console.log("Friend post", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}