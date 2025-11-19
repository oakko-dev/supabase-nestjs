import { Injectable } from "@nestjs/common"
import { PrismaService } from "prisma/prisma.service"

@Injectable()
export class AppService {
	constructor(private readonly prisma: PrismaService) {}

	getHello(): string {
		return "Hello World!"
	}

	async getCountHealthCheck(): Promise<number> {
		const healthCheck = await this.prisma.healthCheck.findFirst()
		return healthCheck?.count ?? 0
	}

	async incrementCountHealthCheck(): Promise<number> {
		await this.prisma.healthCheck.update({
			where: { id: 1 },
			data: { count: { increment: 1 } },
		})

		return await this.getCountHealthCheck()
	}
}
