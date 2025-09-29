import { prisma } from "@/lib/prisma";

//GET
export const GET = async (req, { params }) => {
    try {
        const { id } = params;
        const prompt = await prisma.prompt.findUnique({
            where: { id },
            include: {
                creator: true
            }
        });
        if (!prompt) {
            return new Response("Prompt not found", { status: 404 });
        }
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompt", { status: 500 })
    }
}

//PATCH TO UPDATE

export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    
    try {
        const updatedPrompt = await prisma.prompt.update({
            where: { id: params.id },
            data: {
                prompt,
                tag
            },
            include: {
                creator: true
            }
        });
        
        return new Response(JSON.stringify(updatedPrompt), { status: 200 })
    } catch (error) {
        if (error.code === 'P2025') {
            return new Response("Prompt not found", { status: 404 })
        }
        return new Response("Failed to update prompt", { status: 500 })
    }
}

//to delete controller

export const DELETE = async (req, context) => {
    const { params } = context;
    try {
        await prisma.prompt.delete({
            where: { id: params.id }
        });
        return new Response("Prompt deleted successfully", { status: 200 })
    } catch (error) {
        if (error.code === 'P2025') {
            return new Response("Prompt not found", { status: 404 })
        }
        return new Response("Failed to delete Prompt", { status: 500 });
    }
}