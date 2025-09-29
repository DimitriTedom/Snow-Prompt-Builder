import { prisma } from "@/lib/prisma";

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json()
    try {
        const newPrompt = await prisma.prompt.create({
            data: {
                creatorId: userId,
                prompt,
                tag
            },
            include: {
                creator: true
            }
        });
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 })
    }
}