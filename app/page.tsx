import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;
export default async function Home() {
	const series = await prisma.series.findMany({
		orderBy: {
			createdAt: "desc",
		},
		include: {
			genres: true,
		},
	});
	console.log(series);
	return (
		<main className='min-h-screen bg-black text-white px-6 py-10'>
			<header className='mb-10 flex items-center justify-between'>
				<h1 className='text-2xl font-bold tracking-wide text-red-500'>
					My Series
				</h1>
			</header>
			<div className='grid grid-col-5 md:grid-cols-4 gap-6'>
				{series.map(s => (
					<Link key={s.id} href={`/series/${s.slug}`} className='group'>
						<div className='relative aspect-2/3 overflow-hidden rounded-lg'>
							<Image
								// src="/images/broken-souls.jpg"
								src={s.imageUrl}
								alt={s.title}
								fill
								className='object-cover transition-transform duration-300 group-hover:scale-105'
							/>
						</div>
						<h2 className='mt-2 text-lg font-semibold'>{s.title}</h2>
						<p className='text-sm text-gray-500'>
							{s.year} + {s.genres.map(g => g.name).join(", ")}
						</p>
					</Link>
				))}
			</div>
		</main>
	);
}
