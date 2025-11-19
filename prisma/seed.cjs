const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function main() {
	// Configure your default user here
	const email = process.env.SEED_DEFAULT_EMAIL || "admin@example.com"
	const password = process.env.SEED_DEFAULT_PASSWORD || "P@ssw0rd"
	const name = process.env.SEED_DEFAULT_NAME || "Admin"

	// Hash password
	const passwordHash = await bcrypt.hash(password, 12)

	// Upsert user
	const user = await prisma.user.upsert({
		where: { email },
		update: { name },
		create: {
			email,
			name,
			emailVerified: true,
		},
	})

	// Ensure an account for email/password auth exists
	// Better Auth Prisma adapter uses providerId/accountId. For email+password, providerId="email" and accountId=email.
	const existingAccount = await prisma.account.findFirst({
		where: { providerId: "credential", accountId: email, userId: user.id },
	})

	if (!existingAccount) {
		await prisma.account.create({
			data: {
				id: globalThis.crypto?.randomUUID?.() || require("node:crypto").randomUUID(),
				providerId: "credential",
				accountId: email,
				userId: user.id,
				password: passwordHash,
			},
		})
	}

	console.log(`Seeded default user: ${email} with password: ${password}`)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
