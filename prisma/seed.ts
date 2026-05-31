import prisma from "@/lib/prisma";

async function main() {
	console.log("🌱 Seeding database...");

	// 1. Clean old data
	await prisma.episode.deleteMany();
	await prisma.series.deleteMany();
	await prisma.genre.deleteMany();
	await prisma.user.deleteMany();

	// 2. Create Users
	const user = await prisma.user.create({
		data: {
			email: "alex@example.com",
			name: "Alex",
		},
	});

	// 3. Create Genres
	const action = await prisma.genre.create({
		data: {
			name: "Action",
			slug: "action",
		},
	});

	const drama = await prisma.genre.create({
		data: {
			name: "Drama",
			slug: "drama",
		},
	});

	const sciFi = await prisma.genre.create({
		data: {
			name: "Sci-Fi",
			slug: "sci-fi",
		},
	});

	// 4. Create Series
	const series = await prisma.series.create({
		data: {
			title: "Neon City",
			description: "A futuristic cyberpunk series about AI rebellion.",
			year: 2025,
			imageUrl: "/images/neon-city.jpg",
			posterUrl: "/images/neon-city-poster.jpg",
			ratingAgo: "8.9",
			slug: "neon-city",

			genres: {
				connect: [{ id: action.id }, { id: sciFi.id }],
			},
		},
	});

	const series2 = await prisma.series.create({
		data: {
			title: "Broken Souls",
			description: "A dark drama about human psychology and trauma.",
			year: 2024,
			imageUrl: "/images/broken-souls.jpg",
			posterUrl: "/images/broken-souls-poster.jpg",
			ratingAgo: "9.1",
			slug: "broken-souls",

			genres: {
				connect: [{ id: drama.id }],
			},
		},
	});

	// 5. Episodes for Series 1
	await prisma.episode.createMany({
		data: [
			{
				title: "Awakening",
				number: 1,
				slug: "awakening",
				durationSec: 3600,
				thumbnailUrl: "/thumbs/e1.jpg",
				videoUrl: "/videos/e1.mp4",
				seriesId: series.id,
			},
			{
				title: "The Signal",
				number: 2,
				slug: "the-signal",
				durationSec: 3700,
				thumbnailUrl: "/thumbs/e2.jpg",
				videoUrl: "/videos/e2.mp4",
				seriesId: series.id,
			},
		],
	});

	// 6. Episodes for Series 2
	await prisma.episode.createMany({
		data: [
			{
				title: "Broken Mind",
				number: 1,
				slug: "broken-mind",
				durationSec: 3400,
				thumbnailUrl: "/thumbs/b1.jpg",
				videoUrl: "/videos/b1.mp4",
				seriesId: series2.id,
			},
			{
				title: "Shadows",
				number: 2,
				slug: "shadows",
				durationSec: 3550,
				thumbnailUrl: "/thumbs/b2.jpg",
				videoUrl: "/videos/b2.mp4",
				seriesId: series2.id,
			},
		],
	});

	console.log("✅ Seeding completed!");
}

main()
	.catch(e => {
		console.error("❌ Seed error:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
