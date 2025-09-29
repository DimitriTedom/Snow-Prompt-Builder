import { prisma } from "@/lib/prisma";

export const GET = async (req, { params }) => {
    try {
        const { id } = params;
        const prompts = await prisma.prompt.findMany({
            where: { creatorId: id },
            include: {
                creator: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch user prompts", { status: 500 })
    }
}