import { Controller, Get } from "@nestjs/common"
import { AppService } from "./app.service"

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}

	@Get("healthcheck")
	async getHealthCheck(): Promise<any> {
		return await this.appService.getHealthCheck()
	}

	@Get("healthcheck/ping")
	async incrementCountHealthCheck(): Promise<any> {
		return await this.appService.incrementHealthCheck()
	}
}
