import { Controller, Get } from "@nestjs/common"
import { PrismaService } from "prisma/prisma.service"
import { AppService } from "./app.service"

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, private readonly prisma: PrismaService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}

	@Get("healthcheck")
	async getHealthCheck(): Promise<number> {
		return await this.appService.getCountHealthCheck()
	}

	@Get("healthcheck/ping")
	async incrementCountHealthCheck(): Promise<number> {
		return await this.appService.incrementCountHealthCheck()
	}
}
