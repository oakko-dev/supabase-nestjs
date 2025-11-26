import { Inject, Injectable } from "@nestjs/common"
import { SupabaseClient } from "@supabase/supabase-js"
import { Database as DatabaseExperimental } from "./supabase/db1.types"
import { Database as DatabaseDentist } from "./supabase/db2.types"

@Injectable()
export class AppService {
	constructor(
	// Inject the specific client for DB 1
		@Inject("SUPABASE_CLIENT_1")
		private readonly supabaseExperimental: SupabaseClient<DatabaseExperimental>,
		@Inject("SUPABASE_CLIENT_2")
		private readonly supabaseDentist: SupabaseClient<DatabaseDentist>,
	) {}

	getHello(): string {
		return "Hello World!"
	}

	async getHealthCheck() {
		// 1. COPY CODE FROM DOCS
		// The docs say:
		// const { data } = await supabase.from('orders').select('*')

		// 2. PASTE & ADAPT
		const { data: dataExperimental, error: errorExperimental } = await this.supabaseExperimental
			.from("healthcheck") // TypeScript now auto-completes table names!
			.select("*")

		const { data: dataDentist, error: errorDentist } = await this.supabaseDentist
			.from("healthcheck") // TypeScript now auto-completes table names!
			.select("*")

		const combinedError = errorExperimental || errorDentist
		if (combinedError) {
			throw new Error(
				[errorExperimental?.message, errorDentist?.message].filter(Boolean).join("; "),
			)
		}

		return { dataExperimental, dataDentist }
	}

	async incrementHealthCheck(id = 1) {
		const { data: dataExperimentalGet, error: errorExperimentalGet } = await this.supabaseExperimental
			.from("healthcheck")
			.select("count")
			.eq("id", id)
			.single()

		if (errorExperimentalGet) {
			throw new Error(errorExperimentalGet.message)
		}

		const nextCount = (dataExperimentalGet?.count ?? 0) + 1

		const { data: dataExperimental, error: errorExperimental } = await this.supabaseExperimental
			.from("healthcheck")
			.update({ count: nextCount, updated_at: new Date().toISOString() })
			.eq("id", id)
			.select()
			.single()

		if (errorExperimental) {
			throw new Error(errorExperimental.message)
		}

		const { data: currentRowDentist, error: fetchErrorDentist } = await this.supabaseDentist
			.from("healthcheck")
			.select("count")
			.eq("id", id)
			.single()

		if (fetchErrorDentist) {
			throw new Error(fetchErrorDentist.message)
		}

		const nextCountDentist = (currentRowDentist?.count ?? 0) + 1

		const { data: dataDentist, error: errorDentist } = await this.supabaseDentist
			.from("healthcheck")
			.update({ count: nextCountDentist, updated_at: new Date().toISOString() })
			.eq("id", id)
			.select()
			.single()

		if (errorDentist) {
			throw new Error(errorDentist.message)
		}

		return { dataExperimental, dataDentist }
	}
}
