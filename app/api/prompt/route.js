import { prisma } from "@/lib/prisma";

export const GET = async (req) => {
    try {
        // Test database connection first
        await prisma.$connect();
        
        const prompts = await prisma.prompt.findMany({
            include: {
                creator: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        image: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return new Response(JSON.stringify(prompts), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error("Error fetching prompts:", error);
        
        // Handle specific Prisma errors
        if (error.code === 'P1001') {
            return new Response(JSON.stringify({ 
                error: "Database connection failed" 
            }), { 
                status: 503,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        if (error.code === 'P2025') {
            return new Response(JSON.stringify({ 
                error: "Database not found" 
            }), { 
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ 
            error: "Failed to fetch prompts",
            details: error.message 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    } finally {
        await prisma.$disconnect();
    }
}