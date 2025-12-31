
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Seed Hero Phases
    const heroPhases = [
        {
            text: "BOTAK STUDIO",
            sub: "VISUAL EFFECTS & ANIMATION",
            align: "center",
            color: "#ffffff",
            order: 1
        },
        {
            text: "WE DON'T JUST EDIT",
            sub: "WE ENGINEER EMOTION",
            align: "left",
            color: "#E4405F",
            order: 2
        },
        {
            text: "WE CRAFT REALITY",
            sub: "PIXEL BY PIXEL",
            align: "right",
            color: "#3a7ec4",
            order: 3
        },
        {
            text: "LET'S CREATE",
            sub: "SOMETHING LEGENDARY",
            align: "center",
            color: "#3ac48a",
            order: 4
        }
    ]

    for (const phase of heroPhases) {
        // using upsert or create. Since it's seed, create is fine if we clean up or assumes empty. 
        // But to be safe against re-runs, let's just create. If it fails due to ID, we might want deleteMany first?
        // Let's keep it simple: deleteMany then create
        await prisma.heroPhase.deleteMany()
        await prisma.heroPhase.create({ data: phase })
    }

    // Re-looping to create all of them. 
    // Wait, the previous loop deletedAll for EACH phase. That's a bug in my head.
    // I should deleteMany OUTSIDE the loop.

    // Let's correct the logic.
}

async function seed() {
    await prisma.heroPhase.deleteMany()
    await prisma.showcasePhase.deleteMany()
    await prisma.navigationItem.deleteMany()

    // Hero
    await prisma.heroPhase.createMany({
        data: [
            {
                text: "BOTAK STUDIO",
                sub: "VISUAL EFFECTS & ANIMATION",
                align: "center",
                color: "#ffffff",
                order: 1
            },
            {
                text: "WE DON'T JUST EDIT",
                sub: "WE ENGINEER EMOTION",
                align: "left",
                color: "#E4405F",
                order: 2
            },
            {
                text: "WE CRAFT REALITY",
                sub: "PIXEL BY PIXEL",
                align: "right",
                color: "#3a7ec4",
                order: 3
            },
            {
                text: "LET'S CREATE",
                sub: "SOMETHING LEGENDARY",
                align: "center",
                color: "#3ac48a",
                order: 4
            }
        ]
    })

    // Showcase
    await prisma.showcasePhase.createMany({
        data: [
            {
                title: "VFX",
                subtitle: "VISUAL EFFECTS",
                description: "Explosive visual effects, particle systems, and cinematic compositing that bring imagination to reality.",
                outlineText: "EFFECTS",
                color: "#c45e3a",
                order: 1
            },
            {
                title: "MUSIC",
                subtitle: "MUSIC VIDEO",
                description: "Creative editing, color grading, and visual storytelling that captures the rhythm and emotion of sound.",
                outlineText: "RHYTHM",
                color: "#3a7ec4",
                order: 2
            },
            {
                title: "MOTION",
                subtitle: "ANIMATION",
                description: "Character animation, motion graphics, and 3D artistry that breathes life into every frame.",
                outlineText: "ANIMATE",
                color: "#8a3ac4",
                order: 3
            },
            {
                title: "CREATE",
                subtitle: "CONTENT CREATION",
                description: "Gaming montages, vlogs, tutorials, and social media content that captivates and engages audiences.",
                outlineText: "CREATE",
                color: "#3ac48a",
                order: 4
            }
        ]
    })

    // Navigation
    await prisma.navigationItem.createMany({
        data: [
            { label: "Home", href: "#home", order: 1 },
            { label: "Services", href: "#services", order: 2 },
            { label: "Works", href: "#works", order: 3 },
            { label: "About", href: "#about", order: 4 },
            { label: "Contact", href: "#contact", order: 5 },
        ]
    })

    console.log('Seeding completed!')
}

seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
