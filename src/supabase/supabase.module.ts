import { Global, Module } from "@nestjs/common"
import { createClient } from "@supabase/supabase-js"
import { Database as DB1 } from "./db1.types" // Your generated types
import { Database as DB2 } from "./db2.types"
import "dotenv/config"

@Global() // Makes these available everywhere without importing the module again
@Module({
	providers: [
		{
			provide: "SUPABASE_CLIENT_1",
			useFactory: () => {
				const url = process.env.SUPABASE_URL_1
				const key = process.env.SUPABASE_KEY_1

				if (!url) {
					throw new Error("SUPABASE_URL_1 env value is missing")
				}

				if (!key) {
					throw new Error("SUPABASE_KEY_1 env value is missing")
				}

				return createClient<DB1>(url, key)
			},
		},
		{
			provide: "SUPABASE_CLIENT_2",
			useFactory: () => {
				const url = process.env.SUPABASE_URL_2
				const key = process.env.SUPABASE_KEY_2

				if (!url) {
					throw new Error("SUPABASE_URL_2 env value is missing")
				}

				if (!key) {
					throw new Error("SUPABASE_KEY_2 env value is missing")
				}

				return createClient<DB2>(url, key)
			},
		},
	],
	exports: ["SUPABASE_CLIENT_1", "SUPABASE_CLIENT_2"],
})
export class SupabaseModule {}
