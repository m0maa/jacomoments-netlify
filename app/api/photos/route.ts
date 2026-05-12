import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET all photos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    const where: any = {}
    if (category) where.category = category
    if (featured === 'true') where.featured = true

    const photos = await prisma.photo.findMany({
      where,
      include: {
        tags: true,
      },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(photos)
  } catch (error) {
    console.error('Error fetching photos:', error)
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 })
  }
}

// POST new photo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { filename, url, thumbnail, title, description, category, tags, featured } = body

    const photo = await prisma.photo.create({
      data: {
        filename,
        url,
        thumbnail,
        title,
        description,
        category: category || 'nunta',
        featured: featured || false,
        tags: {
          connectOrCreate: tags?.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })) || [],
        },
      },
      include: { tags: true },
    })

    return NextResponse.json(photo)
  } catch (error) {
    console.error('Error creating photo:', error)
    return NextResponse.json({ error: 'Failed to create photo' }, { status: 500 })
  }
}
