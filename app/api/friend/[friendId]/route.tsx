import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: { params: {friendId: string}}) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body;

        if(!params.friendId) {
            return new NextResponse("FriendId is required", {status: 401})
        }

        if(!user || !user.id || !user.firstName) {
            return new NextResponse("Unauth", { status: 401});
        }

        if(!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse("Missing required fields", {status: 400});
        }

        const friend = await prismadb.friend.update({
            where: {
                id: params.friendId
            },
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
        console.log("Friend patch", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}