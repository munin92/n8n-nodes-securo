/**
 * ERZEUGT - nicht von Hand aendern.
 *
 * Quelle: Securo OpenAPI 0.1.0 (235 Operationen,
 * 33 Ressourcen).
 * Neu erzeugen mit: npm run generate -- --url https://<host>/api/openapi.json
 */

export interface SecuroOperation {
	resource: string;
	resourceName: string;
	operation: string;
	operationName: string;
	description: string;
	method: string;
	path: string;
	pathParams: string[];
	queryParams: { name: string; required: boolean; description: string }[];
	hasBody: boolean;
	bodyRequired: boolean;
}

export const OPERATIONS: SecuroOperation[] = [
	{
		"resource": "accounts",
		"resourceName": "Accounts",
		"operation": "postCloseAccount",
		"operationName": "Close Account",
		"description": "",
		"method": "POST",
		"path": "/api/accounts/{account_id}/close",
		"pathParams": [
			"account_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "accounts",
		"resourceName": "Accounts",
		"operation": "postCreateAccount",
		"operationName": "Create Account",
		"description": "",
		"method": "POST",
		"path": "/api/accounts",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "accounts",
		"resourceName": "Accounts",
		"operation": "deleteDeleteAccount",
		"operationName": "Delete Account",
		"description": "",
		"method": "DELETE",
		"path": "/api/accounts/{account_id}",
		"pathParams": [
			"account_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "accounts",
		"resourceName": "Accounts",
		"operation": "getGetAccount",
		"operationName": "Get Account",
		"description": "",
		"method": "GET",
		"path": "/api/accounts/{account_id}",
		"pathParams": [
			"account_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "accounts",
		"resourceName": "Accounts",
		"operation": "getGetAccountBalanceHistory",
		"operationName": "Get Account Balance History",
		"description": "",
		"method": "GET",
		"path": "/api/accounts/{account_id}/balance-history",
		"pathParams": [
			"account_id"
		],
		"queryParams": [
			{
				"name": "from",
				"required": false,
				"description": "YYYY-MM-DD"
			},
			{
				"name": "to",
				"required": false,
				"description": "YYYY-MM-DD"
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "accounts",
		"resourceName": "Accounts",
		"operation": "getGetAccountBills",
		"operationName": "Get Account Bills",
		"description": "List credit-card bills for an account, newest due_date first.",
		"method": "GET",
		"path": "/api/accounts/{account_id}/bills",
		"pathParams": [
			"account_id"
		],
		"queryParams": [
			{
				"name": "limit",
				"required": false,
				"description": "Max bills to return, newest due_date first"
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "accounts",
		"resourceName": "Accounts",
		"operation": "getGetAccountSummary",
		"operationName": "Get Account Summary",
		"description": "",
		"method": "GET",
		"path": "/api/accounts/{account_id}/summary",
		"pathParams": [
			"account_id"
		],
		"queryParams": [
			{
				"name": "from",
				"required": false,
				"description": "YYYY-MM-DD"
			},
			{
				"name": "to",
				"required": false,
				"description": "YYYY-MM-DD"
			},
			{
				"name": "bill_id",
				"required": false,
				"description": "Aggregate by bill_id (issue #92); takes precedence over from/to"
			},
			{
				"name": "unbilled_only",
				"required": false,
				"description": "Cycle-math fallback only: exclude txs already linked to any bill"
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "accounts",
		"resourceName": "Accounts",
		"operation": "getListAccounts",
		"operationName": "List Accounts",
		"description": "",
		"method": "GET",
		"path": "/api/accounts",
		"pathParams": [],
		"queryParams": [
			{
				"name": "include_closed",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "accounts",
		"resourceName": "Accounts",
		"operation": "postReopenAccount",
		"operationName": "Reopen Account",
		"description": "",
		"method": "POST",
		"path": "/api/accounts/{account_id}/reopen",
		"pathParams": [
			"account_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "accounts",
		"resourceName": "Accounts",
		"operation": "patchUpdateAccount",
		"operationName": "Update Account",
		"description": "",
		"method": "PATCH",
		"path": "/api/accounts/{account_id}",
		"pathParams": [
			"account_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "admin",
		"resourceName": "Admin",
		"operation": "getAccountingMode",
		"operationName": "Accounting Mode",
		"description": "",
		"method": "GET",
		"path": "/api/admin/accounting-mode",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "admin",
		"resourceName": "Admin",
		"operation": "postCreateUser",
		"operationName": "Create User",
		"description": "",
		"method": "POST",
		"path": "/api/admin/users",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "admin",
		"resourceName": "Admin",
		"operation": "getDateFormat",
		"operationName": "Date Format",
		"description": "Global display format for dates. Readable by any signed-in user.",
		"method": "GET",
		"path": "/api/admin/date-format",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "admin",
		"resourceName": "Admin",
		"operation": "getDefaultColors",
		"operationName": "Default Colors",
		"description": "",
		"method": "GET",
		"path": "/api/admin/default-colors",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "admin",
		"resourceName": "Admin",
		"operation": "deleteDeleteUser",
		"operationName": "Delete User",
		"description": "",
		"method": "DELETE",
		"path": "/api/admin/users/{user_id}",
		"pathParams": [
			"user_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "admin",
		"resourceName": "Admin",
		"operation": "getGetSetting",
		"operationName": "Get Setting",
		"description": "",
		"method": "GET",
		"path": "/api/admin/settings/{key}",
		"pathParams": [
			"key"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "admin",
		"resourceName": "Admin",
		"operation": "getGetUser",
		"operationName": "Get User",
		"description": "",
		"method": "GET",
		"path": "/api/admin/users/{user_id}",
		"pathParams": [
			"user_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "admin",
		"resourceName": "Admin",
		"operation": "getListUsers",
		"operationName": "List Users",
		"description": "",
		"method": "GET",
		"path": "/api/admin/users",
		"pathParams": [],
		"queryParams": [
			{
				"name": "search",
				"required": false,
				"description": ""
			},
			{
				"name": "page",
				"required": false,
				"description": ""
			},
			{
				"name": "limit",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "admin",
		"resourceName": "Admin",
		"operation": "getNumberFormat",
		"operationName": "Number Format",
		"description": "Global display format for numbers and dates. Readable by any signed-in",
		"method": "GET",
		"path": "/api/admin/number-format",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "admin",
		"resourceName": "Admin",
		"operation": "getRegistrationStatus",
		"operationName": "Registration Status",
		"description": "",
		"method": "GET",
		"path": "/api/admin/registration-status",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "admin",
		"resourceName": "Admin",
		"operation": "patchUpdateSetting",
		"operationName": "Update Setting",
		"description": "",
		"method": "PATCH",
		"path": "/api/admin/settings/{key}",
		"pathParams": [
			"key"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "admin",
		"resourceName": "Admin",
		"operation": "patchUpdateUser",
		"operationName": "Update User",
		"description": "",
		"method": "PATCH",
		"path": "/api/admin/users/{user_id}",
		"pathParams": [
			"user_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "postChat",
		"operationName": "Chat",
		"description": "",
		"method": "POST",
		"path": "/api/agents/{agent_id}/chat",
		"pathParams": [
			"agent_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "postCreateAgent",
		"operationName": "Create Agent",
		"description": "",
		"method": "POST",
		"path": "/api/agents",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "postCreateConnection",
		"operationName": "Create Connection",
		"description": "",
		"method": "POST",
		"path": "/api/agents/connections",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "postCreateMcpToken",
		"operationName": "Create Mcp Token",
		"description": "Mint a long-lived MCP token for an external client.",
		"method": "POST",
		"path": "/api/agents/mcp-tokens",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "deleteDeleteAgent",
		"operationName": "Delete Agent",
		"description": "",
		"method": "DELETE",
		"path": "/api/agents/{agent_id}",
		"pathParams": [
			"agent_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "deleteDeleteConnection",
		"operationName": "Delete Connection",
		"description": "",
		"method": "DELETE",
		"path": "/api/agents/connections/{conn_id}",
		"pathParams": [
			"conn_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "deleteDeleteConversation",
		"operationName": "Delete Conversation",
		"description": "",
		"method": "DELETE",
		"path": "/api/agents/conversations/{conversation_id}",
		"pathParams": [
			"conversation_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "deleteDeleteKnowledge",
		"operationName": "Delete Knowledge",
		"description": "",
		"method": "DELETE",
		"path": "/api/agents/{agent_id}/knowledge/{doc_id}",
		"pathParams": [
			"agent_id",
			"doc_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "postGenerateTitle",
		"operationName": "Generate Title",
		"description": "Ask the conversation's agent's LLM to summarize the chat into a",
		"method": "POST",
		"path": "/api/agents/conversations/{conversation_id}/generate-title",
		"pathParams": [
			"conversation_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "getGetAgent",
		"operationName": "Get Agent",
		"description": "",
		"method": "GET",
		"path": "/api/agents/{agent_id}",
		"pathParams": [
			"agent_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "getGetAgentTools",
		"operationName": "Get Agent Tools",
		"description": "Discover all tools from registered MCP servers and merge with the",
		"method": "GET",
		"path": "/api/agents/{agent_id}/tools",
		"pathParams": [
			"agent_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "getGetAgentsInfo",
		"operationName": "Get Agents Info",
		"description": "Capability discovery for the frontend. Always available when the",
		"method": "GET",
		"path": "/api/agents/info",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "getGetConnection",
		"operationName": "Get Connection",
		"description": "",
		"method": "GET",
		"path": "/api/agents/connections/{conn_id}",
		"pathParams": [
			"conn_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "getGetConversation",
		"operationName": "Get Conversation",
		"description": "",
		"method": "GET",
		"path": "/api/agents/conversations/{conversation_id}",
		"pathParams": [
			"conversation_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "getGetDefaultAgent",
		"operationName": "Get Default Agent",
		"description": "Used by the global slide-over chat panel. Returns the workspace's",
		"method": "GET",
		"path": "/api/agents/default",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "getListAgents",
		"operationName": "List Agents",
		"description": "",
		"method": "GET",
		"path": "/api/agents",
		"pathParams": [],
		"queryParams": [
			{
				"name": "include_archived",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "getListConnections",
		"operationName": "List Connections",
		"description": "",
		"method": "GET",
		"path": "/api/agents/connections",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "getListConversations",
		"operationName": "List Conversations",
		"description": "",
		"method": "GET",
		"path": "/api/agents/conversations",
		"pathParams": [],
		"queryParams": [
			{
				"name": "agent_id",
				"required": false,
				"description": ""
			},
			{
				"name": "limit",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "getListKnowledge",
		"operationName": "List Knowledge",
		"description": "",
		"method": "GET",
		"path": "/api/agents/{agent_id}/knowledge",
		"pathParams": [
			"agent_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "getListMessages",
		"operationName": "List Messages",
		"description": "",
		"method": "GET",
		"path": "/api/agents/conversations/{conversation_id}/messages",
		"pathParams": [
			"conversation_id"
		],
		"queryParams": [
			{
				"name": "limit",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "putPutAgentTools",
		"operationName": "Put Agent Tools",
		"description": "",
		"method": "PUT",
		"path": "/api/agents/{agent_id}/tools",
		"pathParams": [
			"agent_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "patchRenameConversation",
		"operationName": "Rename Conversation",
		"description": "",
		"method": "PATCH",
		"path": "/api/agents/conversations/{conversation_id}",
		"pathParams": [
			"conversation_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "postTestConnection",
		"operationName": "Test Connection",
		"description": "",
		"method": "POST",
		"path": "/api/agents/connections/{conn_id}/test",
		"pathParams": [
			"conn_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "patchTogglePin",
		"operationName": "Toggle Pin",
		"description": "",
		"method": "PATCH",
		"path": "/api/agents/{agent_id}/knowledge/{doc_id}/pin",
		"pathParams": [
			"agent_id",
			"doc_id"
		],
		"queryParams": [
			{
				"name": "pinned",
				"required": true,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "patchUpdateAgent",
		"operationName": "Update Agent",
		"description": "",
		"method": "PATCH",
		"path": "/api/agents/{agent_id}",
		"pathParams": [
			"agent_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "patchUpdateConnection",
		"operationName": "Update Connection",
		"description": "",
		"method": "PATCH",
		"path": "/api/agents/connections/{conn_id}",
		"pathParams": [
			"conn_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "agents",
		"resourceName": "Agents",
		"operation": "postUploadKnowledge",
		"operationName": "Upload Knowledge",
		"description": "",
		"method": "POST",
		"path": "/api/agents/{agent_id}/knowledge",
		"pathParams": [
			"agent_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "assetGroups",
		"resourceName": "Asset Groups",
		"operation": "postCreateGroup",
		"operationName": "Create Group",
		"description": "",
		"method": "POST",
		"path": "/api/asset-groups",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "assetGroups",
		"resourceName": "Asset Groups",
		"operation": "deleteDeleteGroup",
		"operationName": "Delete Group",
		"description": "",
		"method": "DELETE",
		"path": "/api/asset-groups/{group_id}",
		"pathParams": [
			"group_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assetGroups",
		"resourceName": "Asset Groups",
		"operation": "getListGroups",
		"operationName": "List Groups",
		"description": "",
		"method": "GET",
		"path": "/api/asset-groups",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assetGroups",
		"resourceName": "Asset Groups",
		"operation": "patchUpdateGroup",
		"operationName": "Update Group",
		"description": "",
		"method": "PATCH",
		"path": "/api/asset-groups/{group_id}",
		"pathParams": [
			"group_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "postAddAssetTransaction",
		"operationName": "Add Asset Transaction",
		"description": "",
		"method": "POST",
		"path": "/api/assets/{asset_id}/transactions",
		"pathParams": [
			"asset_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "postAddAssetValue",
		"operationName": "Add Asset Value",
		"description": "",
		"method": "POST",
		"path": "/api/assets/{asset_id}/values",
		"pathParams": [
			"asset_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "getAssetImportTemplate",
		"operationName": "Asset Import Template",
		"description": "A starter CSV, so the first upload is a fill-in rather than a guess.",
		"method": "GET",
		"path": "/api/assets/import/template",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "postBuyIntoHolding",
		"operationName": "Buy Into Holding",
		"description": "Record a buy, consolidating onto the existing ticker holding (in the",
		"method": "POST",
		"path": "/api/assets/buy",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "postCreateAsset",
		"operationName": "Create Asset",
		"description": "",
		"method": "POST",
		"path": "/api/assets",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "deleteDeleteAsset",
		"operationName": "Delete Asset",
		"description": "",
		"method": "DELETE",
		"path": "/api/assets/{asset_id}",
		"pathParams": [
			"asset_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "deleteDeleteAssetTransaction",
		"operationName": "Delete Asset Transaction",
		"description": "",
		"method": "DELETE",
		"path": "/api/assets/transactions/{tx_id}",
		"pathParams": [
			"tx_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "deleteDeleteAssetValue",
		"operationName": "Delete Asset Value",
		"description": "",
		"method": "DELETE",
		"path": "/api/assets/values/{value_id}",
		"pathParams": [
			"value_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "getGetAsset",
		"operationName": "Get Asset",
		"description": "",
		"method": "GET",
		"path": "/api/assets/{asset_id}",
		"pathParams": [
			"asset_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "getGetAssetValueTrend",
		"operationName": "Get Asset Value Trend",
		"description": "",
		"method": "GET",
		"path": "/api/assets/{asset_id}/value-trend",
		"pathParams": [
			"asset_id"
		],
		"queryParams": [
			{
				"name": "months",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "postImportAssetOrders",
		"operationName": "Import Asset Orders",
		"description": "Apply the previewed orders to the workspace's holdings.",
		"method": "POST",
		"path": "/api/assets/import",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "getListAssetTransactions",
		"operationName": "List Asset Transactions",
		"description": "",
		"method": "GET",
		"path": "/api/assets/{asset_id}/transactions",
		"pathParams": [
			"asset_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "getListAssetValues",
		"operationName": "List Asset Values",
		"description": "",
		"method": "GET",
		"path": "/api/assets/{asset_id}/values",
		"pathParams": [
			"asset_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "getListAssets",
		"operationName": "List Assets",
		"description": "",
		"method": "GET",
		"path": "/api/assets",
		"pathParams": [],
		"queryParams": [
			{
				"name": "include_archived",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "getListWorkspaceTransactions",
		"operationName": "List Workspace Transactions",
		"description": "All buy/sell transactions in the workspace — powers the Transactions tab.",
		"method": "GET",
		"path": "/api/assets/transactions",
		"pathParams": [],
		"queryParams": [
			{
				"name": "ticker",
				"required": false,
				"description": ""
			},
			{
				"name": "kind",
				"required": false,
				"description": ""
			},
			{
				"name": "limit",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "getMarketQuote",
		"operationName": "Market Quote",
		"description": "Fetch a single live quote — used to preview value before saving an asset.",
		"method": "GET",
		"path": "/api/assets/market/quote",
		"pathParams": [],
		"queryParams": [
			{
				"name": "symbol",
				"required": true,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "getMarketSearch",
		"operationName": "Market Search",
		"description": "Autocomplete ticker symbols for the Add-Asset form.",
		"method": "GET",
		"path": "/api/assets/market/search",
		"pathParams": [],
		"queryParams": [
			{
				"name": "q",
				"required": true,
				"description": "Ticker or company name"
			},
			{
				"name": "limit",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "getPortfolioTrend",
		"operationName": "Portfolio Trend",
		"description": "",
		"method": "GET",
		"path": "/api/assets/portfolio-trend",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "postPreviewAssetImport",
		"operationName": "Preview Asset Import",
		"description": "Read the file and say what importing it would do. Writes nothing.",
		"method": "POST",
		"path": "/api/assets/import/preview",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "postRefreshAssetPrice",
		"operationName": "Refresh Asset Price",
		"description": "Trigger an immediate price refresh for a single market-priced asset.",
		"method": "POST",
		"path": "/api/assets/{asset_id}/refresh-price",
		"pathParams": [
			"asset_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "patchUpdateAsset",
		"operationName": "Update Asset",
		"description": "",
		"method": "PATCH",
		"path": "/api/assets/{asset_id}",
		"pathParams": [
			"asset_id"
		],
		"queryParams": [
			{
				"name": "regenerate_growth",
				"required": false,
				"description": ""
			}
		],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "assets",
		"resourceName": "Assets",
		"operation": "patchUpdateAssetTransaction",
		"operationName": "Update Asset Transaction",
		"description": "",
		"method": "PATCH",
		"path": "/api/assets/transactions/{tx_id}",
		"pathParams": [
			"tx_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "attachments",
		"resourceName": "Attachments",
		"operation": "deleteDeleteAttachment",
		"operationName": "Delete Attachment",
		"description": "",
		"method": "DELETE",
		"path": "/api/transactions/{transaction_id}/attachments/{attachment_id}",
		"pathParams": [
			"transaction_id",
			"attachment_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "attachments",
		"resourceName": "Attachments",
		"operation": "getDownloadAttachment",
		"operationName": "Download Attachment",
		"description": "",
		"method": "GET",
		"path": "/api/transactions/{transaction_id}/attachments/{attachment_id}",
		"pathParams": [
			"transaction_id",
			"attachment_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "attachments",
		"resourceName": "Attachments",
		"operation": "getListAttachments",
		"operationName": "List Attachments",
		"description": "",
		"method": "GET",
		"path": "/api/transactions/{transaction_id}/attachments",
		"pathParams": [
			"transaction_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "attachments",
		"resourceName": "Attachments",
		"operation": "patchRenameAttachment",
		"operationName": "Rename Attachment",
		"description": "",
		"method": "PATCH",
		"path": "/api/transactions/{transaction_id}/attachments/{attachment_id}",
		"pathParams": [
			"transaction_id",
			"attachment_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "attachments",
		"resourceName": "Attachments",
		"operation": "postUploadAttachment",
		"operationName": "Upload Attachment",
		"description": "",
		"method": "POST",
		"path": "/api/transactions/{transaction_id}/attachments",
		"pathParams": [
			"transaction_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "deleteDeletePasskey",
		"operationName": "Delete Passkey",
		"description": "",
		"method": "DELETE",
		"path": "/api/auth/passkeys/{passkey_id}",
		"pathParams": [
			"passkey_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "postDisable2Fa",
		"operationName": "Disable 2Fa",
		"description": "",
		"method": "POST",
		"path": "/api/auth/2fa/disable",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "postEnable2Fa",
		"operationName": "Enable 2Fa",
		"description": "",
		"method": "POST",
		"path": "/api/auth/2fa/enable",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "getListPasskeys",
		"operationName": "List Passkeys",
		"description": "",
		"method": "GET",
		"path": "/api/auth/passkeys",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "postLogin",
		"operationName": "Login",
		"description": "",
		"method": "POST",
		"path": "/api/auth/login",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "postLogout",
		"operationName": "Logout",
		"description": "",
		"method": "POST",
		"path": "/api/auth/logout",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "getOidcCallback",
		"operationName": "Oidc Callback",
		"description": "",
		"method": "GET",
		"path": "/api/auth/oidc/callback",
		"pathParams": [],
		"queryParams": [
			{
				"name": "code",
				"required": true,
				"description": ""
			},
			{
				"name": "state",
				"required": true,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "getOidcConfig",
		"operationName": "Oidc Config",
		"description": "",
		"method": "GET",
		"path": "/api/auth/oidc/config",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "getOidcLogin",
		"operationName": "Oidc Login",
		"description": "",
		"method": "GET",
		"path": "/api/auth/oidc/login",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "postPasskeyAuthenticationOptions",
		"operationName": "Passkey Authentication Options",
		"description": "",
		"method": "POST",
		"path": "/api/auth/passkeys/authenticate/options",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "postPasskeyRegistrationOptions",
		"operationName": "Passkey Registration Options",
		"description": "",
		"method": "POST",
		"path": "/api/auth/passkeys/register/options",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "postPasskeySecondFactorOptions",
		"operationName": "Passkey Second Factor Options",
		"description": "",
		"method": "POST",
		"path": "/api/auth/passkeys/2fa/options",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "postRegister:Register",
		"operationName": "Register:Register",
		"description": "",
		"method": "POST",
		"path": "/api/auth/register",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "postReset:ForgotPassword",
		"operationName": "Reset:Forgot Password",
		"description": "",
		"method": "POST",
		"path": "/api/auth/forgot-password",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "postReset:ResetPassword",
		"operationName": "Reset:Reset Password",
		"description": "",
		"method": "POST",
		"path": "/api/auth/reset-password",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "postSetup2Fa",
		"operationName": "Setup 2Fa",
		"description": "",
		"method": "POST",
		"path": "/api/auth/2fa/setup",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "postVerify2Fa",
		"operationName": "Verify 2Fa",
		"description": "",
		"method": "POST",
		"path": "/api/auth/2fa/verify",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "postVerifyPasskeyAuthentication",
		"operationName": "Verify Passkey Authentication",
		"description": "",
		"method": "POST",
		"path": "/api/auth/passkeys/authenticate/verify",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "postVerifyPasskeyRegistration",
		"operationName": "Verify Passkey Registration",
		"description": "",
		"method": "POST",
		"path": "/api/auth/passkeys/register/verify",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "auth",
		"resourceName": "Auth",
		"operation": "postVerifyPasskeySecondFactor",
		"operationName": "Verify Passkey Second Factor",
		"description": "",
		"method": "POST",
		"path": "/api/auth/passkeys/2fa/verify",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "budgets",
		"resourceName": "Budgets",
		"operation": "getBudgetComparison",
		"operationName": "Budget Comparison",
		"description": "",
		"method": "GET",
		"path": "/api/budgets/comparison",
		"pathParams": [],
		"queryParams": [
			{
				"name": "month",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "budgets",
		"resourceName": "Budgets",
		"operation": "postCreateBudget",
		"operationName": "Create Budget",
		"description": "",
		"method": "POST",
		"path": "/api/budgets",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "budgets",
		"resourceName": "Budgets",
		"operation": "deleteDeleteBudget",
		"operationName": "Delete Budget",
		"description": "",
		"method": "DELETE",
		"path": "/api/budgets/{budget_id}",
		"pathParams": [
			"budget_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "budgets",
		"resourceName": "Budgets",
		"operation": "getListBudgets",
		"operationName": "List Budgets",
		"description": "",
		"method": "GET",
		"path": "/api/budgets",
		"pathParams": [],
		"queryParams": [
			{
				"name": "month",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "budgets",
		"resourceName": "Budgets",
		"operation": "patchUpdateBudget",
		"operationName": "Update Budget",
		"description": "",
		"method": "PATCH",
		"path": "/api/budgets/{budget_id}",
		"pathParams": [
			"budget_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "categories",
		"resourceName": "Categories",
		"operation": "postCreateCategory",
		"operationName": "Create Category",
		"description": "",
		"method": "POST",
		"path": "/api/categories",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "categories",
		"resourceName": "Categories",
		"operation": "deleteDeleteCategory",
		"operationName": "Delete Category",
		"description": "",
		"method": "DELETE",
		"path": "/api/categories/{category_id}",
		"pathParams": [
			"category_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "categories",
		"resourceName": "Categories",
		"operation": "getListCategories",
		"operationName": "List Categories",
		"description": "",
		"method": "GET",
		"path": "/api/categories",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "categories",
		"resourceName": "Categories",
		"operation": "patchUpdateCategory",
		"operationName": "Update Category",
		"description": "",
		"method": "PATCH",
		"path": "/api/categories/{category_id}",
		"pathParams": [
			"category_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "categoryGroups",
		"resourceName": "Category Groups",
		"operation": "postCreateGroup",
		"operationName": "Create Group",
		"description": "",
		"method": "POST",
		"path": "/api/category-groups",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "categoryGroups",
		"resourceName": "Category Groups",
		"operation": "deleteDeleteGroup",
		"operationName": "Delete Group",
		"description": "",
		"method": "DELETE",
		"path": "/api/category-groups/{group_id}",
		"pathParams": [
			"group_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "categoryGroups",
		"resourceName": "Category Groups",
		"operation": "getListGroups",
		"operationName": "List Groups",
		"description": "",
		"method": "GET",
		"path": "/api/category-groups",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "categoryGroups",
		"resourceName": "Category Groups",
		"operation": "patchUpdateGroup",
		"operationName": "Update Group",
		"description": "",
		"method": "PATCH",
		"path": "/api/category-groups/{group_id}",
		"pathParams": [
			"group_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "collections",
		"resourceName": "Collections",
		"operation": "postCreateCollection",
		"operationName": "Create Collection",
		"description": "",
		"method": "POST",
		"path": "/api/collections",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "collections",
		"resourceName": "Collections",
		"operation": "deleteDeleteCollection",
		"operationName": "Delete Collection",
		"description": "",
		"method": "DELETE",
		"path": "/api/collections/{collection_id}",
		"pathParams": [
			"collection_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "collections",
		"resourceName": "Collections",
		"operation": "getListCollections",
		"operationName": "List Collections",
		"description": "",
		"method": "GET",
		"path": "/api/collections",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "collections",
		"resourceName": "Collections",
		"operation": "patchUpdateCollection",
		"operationName": "Update Collection",
		"description": "",
		"method": "PATCH",
		"path": "/api/collections/{collection_id}",
		"pathParams": [
			"collection_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "connections",
		"resourceName": "Connections",
		"operation": "postCreateConnectToken",
		"operationName": "Create Connect Token",
		"description": "Create a connect token for widget-based bank connection flows.",
		"method": "POST",
		"path": "/api/connections/connect-token",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "connections",
		"resourceName": "Connections",
		"operation": "deleteDeleteConnection",
		"operationName": "Delete Connection",
		"description": "",
		"method": "DELETE",
		"path": "/api/connections/{connection_id}",
		"pathParams": [
			"connection_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "connections",
		"resourceName": "Connections",
		"operation": "postDetectTransfers",
		"operationName": "Detect Transfers",
		"description": "One-time backfill scan: detect transfer pairs across all existing transactions in this workspace.",
		"method": "POST",
		"path": "/api/connections/transfers/detect",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "connections",
		"resourceName": "Connections",
		"operation": "getGetAvailableProviders",
		"operationName": "Get Available Providers",
		"description": "List all known open finance providers with configuration status.",
		"method": "GET",
		"path": "/api/connections/providers",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "connections",
		"resourceName": "Connections",
		"operation": "postGetOauthUrl",
		"operationName": "Get Oauth Url",
		"description": "",
		"method": "POST",
		"path": "/api/connections/oauth/url",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "connections",
		"resourceName": "Connections",
		"operation": "postGetReauthUrl",
		"operationName": "Get Reauth Url",
		"description": "",
		"method": "POST",
		"path": "/api/connections/{connection_id}/oauth/reauth-url",
		"pathParams": [
			"connection_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "connections",
		"resourceName": "Connections",
		"operation": "postGetReconnectToken",
		"operationName": "Get Reconnect Token",
		"description": "Get a connect token for reconnecting an errored/expired connection.",
		"method": "POST",
		"path": "/api/connections/{connection_id}/reconnect-token",
		"pathParams": [
			"connection_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "connections",
		"resourceName": "Connections",
		"operation": "getListConnections",
		"operationName": "List Connections",
		"description": "",
		"method": "GET",
		"path": "/api/connections",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "connections",
		"resourceName": "Connections",
		"operation": "getListProviderInstitutions",
		"operationName": "List Provider Institutions",
		"description": "",
		"method": "GET",
		"path": "/api/connections/{provider}/institutions",
		"pathParams": [
			"provider"
		],
		"queryParams": [
			{
				"name": "country",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "connections",
		"resourceName": "Connections",
		"operation": "postOauthCallback",
		"operationName": "Oauth Callback",
		"description": "",
		"method": "POST",
		"path": "/api/connections/oauth/callback",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "connections",
		"resourceName": "Connections",
		"operation": "postSyncConnection",
		"operationName": "Sync Connection",
		"description": "",
		"method": "POST",
		"path": "/api/connections/{connection_id}/sync",
		"pathParams": [
			"connection_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "connections",
		"resourceName": "Connections",
		"operation": "deleteUnlinkTransfer",
		"operationName": "Unlink Transfer",
		"description": "Manual unlink: remove a transfer pair link so both transactions are treated normally.",
		"method": "DELETE",
		"path": "/api/connections/transfers/{pair_id}",
		"pathParams": [
			"pair_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "connections",
		"resourceName": "Connections",
		"operation": "patchUpdateSettings",
		"operationName": "Update Settings",
		"description": "",
		"method": "PATCH",
		"path": "/api/connections/{connection_id}/settings",
		"pathParams": [
			"connection_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "currencies",
		"resourceName": "Currencies",
		"operation": "getListCurrencies",
		"operationName": "List Currencies",
		"description": "Return the list of supported currencies configured for this instance.",
		"method": "GET",
		"path": "/api/currencies",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "dashboard",
		"resourceName": "Dashboard",
		"operation": "getGetBalanceHistory",
		"operationName": "Get Balance History",
		"description": "",
		"method": "GET",
		"path": "/api/dashboard/balance-history",
		"pathParams": [],
		"queryParams": [
			{
				"name": "month",
				"required": false,
				"description": ""
			},
			{
				"name": "account_ids",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "dashboard",
		"resourceName": "Dashboard",
		"operation": "getGetMonthlyTrend",
		"operationName": "Get Monthly Trend",
		"description": "",
		"method": "GET",
		"path": "/api/dashboard/monthly-trend",
		"pathParams": [],
		"queryParams": [
			{
				"name": "months",
				"required": false,
				"description": ""
			},
			{
				"name": "account_ids",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "dashboard",
		"resourceName": "Dashboard",
		"operation": "getGetProjectedTransactions",
		"operationName": "Get Projected Transactions",
		"description": "",
		"method": "GET",
		"path": "/api/dashboard/projected-transactions",
		"pathParams": [],
		"queryParams": [
			{
				"name": "month",
				"required": false,
				"description": ""
			},
			{
				"name": "account_id",
				"required": false,
				"description": ""
			},
			{
				"name": "from",
				"required": false,
				"description": ""
			},
			{
				"name": "to",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "dashboard",
		"resourceName": "Dashboard",
		"operation": "getGetSpendingByCategory",
		"operationName": "Get Spending By Category",
		"description": "",
		"method": "GET",
		"path": "/api/dashboard/spending-by-category",
		"pathParams": [],
		"queryParams": [
			{
				"name": "month",
				"required": false,
				"description": ""
			},
			{
				"name": "account_ids",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "dashboard",
		"resourceName": "Dashboard",
		"operation": "getGetSummary",
		"operationName": "Get Summary",
		"description": "",
		"method": "GET",
		"path": "/api/dashboard/summary",
		"pathParams": [],
		"queryParams": [
			{
				"name": "month",
				"required": false,
				"description": ""
			},
			{
				"name": "balance_date",
				"required": false,
				"description": ""
			},
			{
				"name": "account_ids",
				"required": false,
				"description": ""
			},
			{
				"name": "asset_group_ids",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "export",
		"resourceName": "Export",
		"operation": "getBackup",
		"operationName": "Backup",
		"description": "Export every entity in the current workspace as a JSON zip.",
		"method": "GET",
		"path": "/api/export/backup",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "export",
		"resourceName": "Export",
		"operation": "postBackupProtected",
		"operationName": "Backup Protected",
		"description": "The same archive, encrypted with AES-256 when a password is given.",
		"method": "POST",
		"path": "/api/export/backup",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "fiscal",
		"resourceName": "Fiscal",
		"operation": "getListJurisdictions",
		"operationName": "List Jurisdictions",
		"description": "Codes a pack ships for, for the workspace settings selector.",
		"method": "GET",
		"path": "/api/fiscal/jurisdictions",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "fiscal",
		"resourceName": "Fiscal",
		"operation": "getListTaxIdKinds",
		"operationName": "List Tax Id Kinds",
		"description": "Document kinds for the active workspace, plus which country uses what.",
		"method": "GET",
		"path": "/api/fiscal/tax-id-kinds",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "fxRates",
		"resourceName": "Fx Rates",
		"operation": "getRatesStatus",
		"operationName": "Rates Status",
		"description": "Return last sync date and total stored rates.",
		"method": "GET",
		"path": "/api/fx-rates/status",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "fxRates",
		"resourceName": "Fx Rates",
		"operation": "postRefreshRates",
		"operationName": "Refresh Rates",
		"description": "Trigger immediate FX rate sync.",
		"method": "POST",
		"path": "/api/fx-rates/refresh",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "goals",
		"resourceName": "Goals",
		"operation": "postCreateGoal",
		"operationName": "Create Goal",
		"description": "",
		"method": "POST",
		"path": "/api/goals",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "goals",
		"resourceName": "Goals",
		"operation": "deleteDeleteGoal",
		"operationName": "Delete Goal",
		"description": "",
		"method": "DELETE",
		"path": "/api/goals/{goal_id}",
		"pathParams": [
			"goal_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "goals",
		"resourceName": "Goals",
		"operation": "getGetGoal",
		"operationName": "Get Goal",
		"description": "",
		"method": "GET",
		"path": "/api/goals/{goal_id}",
		"pathParams": [
			"goal_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "goals",
		"resourceName": "Goals",
		"operation": "getGoalSummary",
		"operationName": "Goal Summary",
		"description": "",
		"method": "GET",
		"path": "/api/goals/summary",
		"pathParams": [],
		"queryParams": [
			{
				"name": "limit",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "goals",
		"resourceName": "Goals",
		"operation": "getListGoals",
		"operationName": "List Goals",
		"description": "",
		"method": "GET",
		"path": "/api/goals",
		"pathParams": [],
		"queryParams": [
			{
				"name": "status",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "goals",
		"resourceName": "Goals",
		"operation": "patchUpdateGoal",
		"operationName": "Update Goal",
		"description": "",
		"method": "PATCH",
		"path": "/api/goals/{goal_id}",
		"pathParams": [
			"goal_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "groups",
		"resourceName": "Groups",
		"operation": "postCreateGroup",
		"operationName": "Create Group",
		"description": "",
		"method": "POST",
		"path": "/api/groups",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "groups",
		"resourceName": "Groups",
		"operation": "postCreateMember",
		"operationName": "Create Member",
		"description": "",
		"method": "POST",
		"path": "/api/groups/{group_id}/members",
		"pathParams": [
			"group_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "groups",
		"resourceName": "Groups",
		"operation": "postCreateSettlement",
		"operationName": "Create Settlement",
		"description": "",
		"method": "POST",
		"path": "/api/groups/{group_id}/settlements",
		"pathParams": [
			"group_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "groups",
		"resourceName": "Groups",
		"operation": "deleteDeleteGroup",
		"operationName": "Delete Group",
		"description": "",
		"method": "DELETE",
		"path": "/api/groups/{group_id}",
		"pathParams": [
			"group_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "groups",
		"resourceName": "Groups",
		"operation": "deleteDeleteMember",
		"operationName": "Delete Member",
		"description": "",
		"method": "DELETE",
		"path": "/api/groups/{group_id}/members/{member_id}",
		"pathParams": [
			"group_id",
			"member_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "groups",
		"resourceName": "Groups",
		"operation": "deleteDeleteSettlement",
		"operationName": "Delete Settlement",
		"description": "",
		"method": "DELETE",
		"path": "/api/groups/{group_id}/settlements/{settlement_id}",
		"pathParams": [
			"group_id",
			"settlement_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "groups",
		"resourceName": "Groups",
		"operation": "getGetBalances",
		"operationName": "Get Balances",
		"description": "",
		"method": "GET",
		"path": "/api/groups/{group_id}/balances",
		"pathParams": [
			"group_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "groups",
		"resourceName": "Groups",
		"operation": "getGetGroup",
		"operationName": "Get Group",
		"description": "",
		"method": "GET",
		"path": "/api/groups/{group_id}",
		"pathParams": [
			"group_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "groups",
		"resourceName": "Groups",
		"operation": "getListGroupTransactions",
		"operationName": "List Group Transactions",
		"description": "",
		"method": "GET",
		"path": "/api/groups/{group_id}/transactions",
		"pathParams": [
			"group_id"
		],
		"queryParams": [
			{
				"name": "limit",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "groups",
		"resourceName": "Groups",
		"operation": "getListGroups",
		"operationName": "List Groups",
		"description": "",
		"method": "GET",
		"path": "/api/groups",
		"pathParams": [],
		"queryParams": [
			{
				"name": "include_archived",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "groups",
		"resourceName": "Groups",
		"operation": "getListMembers",
		"operationName": "List Members",
		"description": "",
		"method": "GET",
		"path": "/api/groups/{group_id}/members",
		"pathParams": [
			"group_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "groups",
		"resourceName": "Groups",
		"operation": "getListSettlements",
		"operationName": "List Settlements",
		"description": "",
		"method": "GET",
		"path": "/api/groups/{group_id}/settlements",
		"pathParams": [
			"group_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "groups",
		"resourceName": "Groups",
		"operation": "patchUpdateGroup",
		"operationName": "Update Group",
		"description": "",
		"method": "PATCH",
		"path": "/api/groups/{group_id}",
		"pathParams": [
			"group_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "groups",
		"resourceName": "Groups",
		"operation": "patchUpdateMember",
		"operationName": "Update Member",
		"description": "",
		"method": "PATCH",
		"path": "/api/groups/{group_id}/members/{member_id}",
		"pathParams": [
			"group_id",
			"member_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "groups",
		"resourceName": "Groups",
		"operation": "patchUpdateSettlement",
		"operationName": "Update Settlement",
		"description": "",
		"method": "PATCH",
		"path": "/api/groups/{group_id}/settlements/{settlement_id}",
		"pathParams": [
			"group_id",
			"settlement_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "import",
		"resourceName": "Import",
		"operation": "postImportTransactions",
		"operationName": "Import Transactions",
		"description": "",
		"method": "POST",
		"path": "/api/transactions/import",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "import",
		"resourceName": "Import",
		"operation": "postPreviewImport",
		"operationName": "Preview Import",
		"description": "",
		"method": "POST",
		"path": "/api/transactions/import/preview",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "importLogs",
		"resourceName": "Import Logs",
		"operation": "deleteDeleteImportLog",
		"operationName": "Delete Import Log",
		"description": "",
		"method": "DELETE",
		"path": "/api/import-logs/{import_log_id}",
		"pathParams": [
			"import_log_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "importLogs",
		"resourceName": "Import Logs",
		"operation": "getListImportLogs",
		"operationName": "List Import Logs",
		"description": "",
		"method": "GET",
		"path": "/api/import-logs",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "info",
		"resourceName": "Info",
		"operation": "getGetAppInfo",
		"operationName": "Get App Info",
		"description": "",
		"method": "GET",
		"path": "/api/info",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "misc",
		"resourceName": "Misc",
		"operation": "getHealthCheck",
		"operationName": "Health Check",
		"description": "",
		"method": "GET",
		"path": "/api/health",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "payees",
		"resourceName": "Payees",
		"operation": "postBulkDeletePayees",
		"operationName": "Bulk Delete Payees",
		"description": "",
		"method": "POST",
		"path": "/api/payees/bulk-delete",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "payees",
		"resourceName": "Payees",
		"operation": "postCreatePayee",
		"operationName": "Create Payee",
		"description": "",
		"method": "POST",
		"path": "/api/payees",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "payees",
		"resourceName": "Payees",
		"operation": "deleteDeletePayee",
		"operationName": "Delete Payee",
		"description": "",
		"method": "DELETE",
		"path": "/api/payees/{payee_id}",
		"pathParams": [
			"payee_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "payees",
		"resourceName": "Payees",
		"operation": "getGetPayee",
		"operationName": "Get Payee",
		"description": "",
		"method": "GET",
		"path": "/api/payees/{payee_id}",
		"pathParams": [
			"payee_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "payees",
		"resourceName": "Payees",
		"operation": "getGetPayeeSummary",
		"operationName": "Get Payee Summary",
		"description": "",
		"method": "GET",
		"path": "/api/payees/{payee_id}/summary",
		"pathParams": [
			"payee_id"
		],
		"queryParams": [
			{
				"name": "from",
				"required": false,
				"description": ""
			},
			{
				"name": "to",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "payees",
		"resourceName": "Payees",
		"operation": "getListPayees",
		"operationName": "List Payees",
		"description": "",
		"method": "GET",
		"path": "/api/payees",
		"pathParams": [],
		"queryParams": [
			{
				"name": "q",
				"required": false,
				"description": ""
			},
			{
				"name": "type",
				"required": false,
				"description": ""
			},
			{
				"name": "is_favorite",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "payees",
		"resourceName": "Payees",
		"operation": "postMergePayees",
		"operationName": "Merge Payees",
		"description": "",
		"method": "POST",
		"path": "/api/payees/merge",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "payees",
		"resourceName": "Payees",
		"operation": "patchUpdatePayee",
		"operationName": "Update Payee",
		"description": "",
		"method": "PATCH",
		"path": "/api/payees/{payee_id}",
		"pathParams": [
			"payee_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "recurringTransactions",
		"resourceName": "Recurring Transactions",
		"operation": "postCreateRecurringTransaction",
		"operationName": "Create Recurring Transaction",
		"description": "",
		"method": "POST",
		"path": "/api/recurring-transactions",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "recurringTransactions",
		"resourceName": "Recurring Transactions",
		"operation": "deleteDeleteRecurringTransaction",
		"operationName": "Delete Recurring Transaction",
		"description": "",
		"method": "DELETE",
		"path": "/api/recurring-transactions/{recurring_id}",
		"pathParams": [
			"recurring_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "recurringTransactions",
		"resourceName": "Recurring Transactions",
		"operation": "postGenerateRecurringTransactions",
		"operationName": "Generate Recurring Transactions",
		"description": "",
		"method": "POST",
		"path": "/api/recurring-transactions/generate",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "recurringTransactions",
		"resourceName": "Recurring Transactions",
		"operation": "getListRecurringTransactions",
		"operationName": "List Recurring Transactions",
		"description": "",
		"method": "GET",
		"path": "/api/recurring-transactions",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "recurringTransactions",
		"resourceName": "Recurring Transactions",
		"operation": "patchUpdateRecurringTransaction",
		"operationName": "Update Recurring Transaction",
		"description": "",
		"method": "PATCH",
		"path": "/api/recurring-transactions/{recurring_id}",
		"pathParams": [
			"recurring_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "reports",
		"resourceName": "Reports",
		"operation": "getGetCashFlow",
		"operationName": "Get Cash Flow",
		"description": "",
		"method": "GET",
		"path": "/api/reports/cash-flow",
		"pathParams": [],
		"queryParams": [
			{
				"name": "months",
				"required": false,
				"description": ""
			},
			{
				"name": "interval",
				"required": false,
				"description": ""
			},
			{
				"name": "baseline",
				"required": false,
				"description": ""
			},
			{
				"name": "account_ids",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "reports",
		"resourceName": "Reports",
		"operation": "getGetIncomeExpenses",
		"operationName": "Get Income Expenses",
		"description": "`days` overrides `months` with an exact rolling window ending today.",
		"method": "GET",
		"path": "/api/reports/income-expenses",
		"pathParams": [],
		"queryParams": [
			{
				"name": "months",
				"required": false,
				"description": ""
			},
			{
				"name": "interval",
				"required": false,
				"description": ""
			},
			{
				"name": "account_ids",
				"required": false,
				"description": ""
			},
			{
				"name": "period",
				"required": false,
				"description": ""
			},
			{
				"name": "days",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "reports",
		"resourceName": "Reports",
		"operation": "getGetNetWorth",
		"operationName": "Get Net Worth",
		"description": "",
		"method": "GET",
		"path": "/api/reports/net-worth",
		"pathParams": [],
		"queryParams": [
			{
				"name": "months",
				"required": false,
				"description": ""
			},
			{
				"name": "interval",
				"required": false,
				"description": ""
			},
			{
				"name": "account_ids",
				"required": false,
				"description": ""
			},
			{
				"name": "asset_group_ids",
				"required": false,
				"description": ""
			},
			{
				"name": "period",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "rules",
		"resourceName": "Rules",
		"operation": "postApplyAllRules",
		"operationName": "Apply All Rules",
		"description": "Re-apply all active rules to all existing transactions.",
		"method": "POST",
		"path": "/api/rules/apply-all",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "rules",
		"resourceName": "Rules",
		"operation": "postCreateRule",
		"operationName": "Create Rule",
		"description": "",
		"method": "POST",
		"path": "/api/rules",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "rules",
		"resourceName": "Rules",
		"operation": "deleteDeleteRule",
		"operationName": "Delete Rule",
		"description": "",
		"method": "DELETE",
		"path": "/api/rules/{rule_id}",
		"pathParams": [
			"rule_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "rules",
		"resourceName": "Rules",
		"operation": "getExportRules",
		"operationName": "Export Rules",
		"description": "",
		"method": "GET",
		"path": "/api/rules/export",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "rules",
		"resourceName": "Rules",
		"operation": "postImportRules",
		"operationName": "Import Rules",
		"description": "",
		"method": "POST",
		"path": "/api/rules/import",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "rules",
		"resourceName": "Rules",
		"operation": "postInstallRulePack",
		"operationName": "Install Rule Pack",
		"description": "Install a country-specific rule pack.",
		"method": "POST",
		"path": "/api/rules/packs/{pack_code}/install",
		"pathParams": [
			"pack_code"
		],
		"queryParams": [
			{
				"name": "create_missing_categories",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "rules",
		"resourceName": "Rules",
		"operation": "getListRulePacks",
		"operationName": "List Rule Packs",
		"description": "List available country-specific rule packs with installed status.",
		"method": "GET",
		"path": "/api/rules/packs",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "rules",
		"resourceName": "Rules",
		"operation": "getListRules",
		"operationName": "List Rules",
		"description": "",
		"method": "GET",
		"path": "/api/rules",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "rules",
		"resourceName": "Rules",
		"operation": "patchUpdateRule",
		"operationName": "Update Rule",
		"description": "",
		"method": "PATCH",
		"path": "/api/rules/{rule_id}",
		"pathParams": [
			"rule_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "search",
		"resourceName": "Search",
		"operation": "getGlobalSearch",
		"operationName": "Global Search",
		"description": "Global search across transactions, accounts, payees, categories, goals and assets.",
		"method": "GET",
		"path": "/api/search",
		"pathParams": [],
		"queryParams": [
			{
				"name": "q",
				"required": false,
				"description": ""
			},
			{
				"name": "limit",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "settings",
		"resourceName": "Settings",
		"operation": "getGetAttachmentSettings",
		"operationName": "Get Attachment Settings",
		"description": "Return attachment configuration for this instance.",
		"method": "GET",
		"path": "/api/settings/attachments",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "setup",
		"resourceName": "Setup",
		"operation": "postCreateAdmin",
		"operationName": "Create Admin",
		"description": "",
		"method": "POST",
		"path": "/api/setup/create-admin",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "setup",
		"resourceName": "Setup",
		"operation": "getGetSetupStatus",
		"operationName": "Get Setup Status",
		"description": "",
		"method": "GET",
		"path": "/api/setup/status",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "patchBulkAddTags",
		"operationName": "Bulk Add Tags",
		"description": "",
		"method": "PATCH",
		"path": "/api/transactions/bulk-add-tags",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "patchBulkAddToGroup",
		"operationName": "Bulk Add To Group",
		"description": "",
		"method": "PATCH",
		"path": "/api/transactions/bulk-add-to-group",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "patchBulkCategorize",
		"operationName": "Bulk Categorize",
		"description": "",
		"method": "PATCH",
		"path": "/api/transactions/bulk-categorize",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "postBulkDeleteTransactions",
		"operationName": "Bulk Delete Transactions",
		"description": "",
		"method": "POST",
		"path": "/api/transactions/bulk-delete",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "patchBulkRemoveTags",
		"operationName": "Bulk Remove Tags",
		"description": "",
		"method": "PATCH",
		"path": "/api/transactions/bulk-remove-tags",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "postCreateCounterpart",
		"operationName": "Create Counterpart",
		"description": "Mark a transaction as a transfer by auto-creating its counterpart in",
		"method": "POST",
		"path": "/api/transactions/{transaction_id}/create-counterpart",
		"pathParams": [
			"transaction_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "postCreateInstallmentSeries",
		"operationName": "Create Installment Series",
		"description": "Create a manual installment series: repeats the base transaction",
		"method": "POST",
		"path": "/api/transactions/installments",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "postCreateTransaction",
		"operationName": "Create Transaction",
		"description": "",
		"method": "POST",
		"path": "/api/transactions",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "postCreateTransfer",
		"operationName": "Create Transfer",
		"description": "",
		"method": "POST",
		"path": "/api/transactions/transfer",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "deleteDeleteTransaction",
		"operationName": "Delete Transaction",
		"description": "",
		"method": "DELETE",
		"path": "/api/transactions/{transaction_id}",
		"pathParams": [
			"transaction_id"
		],
		"queryParams": [
			{
				"name": "apply_to",
				"required": false,
				"description": "Installment-series scope: this row only (default), this + later installments, or the whole series. I"
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "getExportTransactions",
		"operationName": "Export Transactions",
		"description": "",
		"method": "GET",
		"path": "/api/transactions/export",
		"pathParams": [],
		"queryParams": [
			{
				"name": "account_id",
				"required": false,
				"description": ""
			},
			{
				"name": "account_ids",
				"required": false,
				"description": ""
			},
			{
				"name": "category_id",
				"required": false,
				"description": ""
			},
			{
				"name": "category_ids",
				"required": false,
				"description": ""
			},
			{
				"name": "payee_id",
				"required": false,
				"description": ""
			},
			{
				"name": "from",
				"required": false,
				"description": ""
			},
			{
				"name": "to",
				"required": false,
				"description": ""
			},
			{
				"name": "q",
				"required": false,
				"description": ""
			},
			{
				"name": "uncategorized",
				"required": false,
				"description": ""
			},
			{
				"name": "type",
				"required": false,
				"description": ""
			},
			{
				"name": "status",
				"required": false,
				"description": ""
			},
			{
				"name": "exclude_ignored",
				"required": false,
				"description": "Drop rows the user marked ignored, or whose category is ignored"
			},
			{
				"name": "tags",
				"required": false,
				"description": ""
			},
			{
				"name": "transaction_ids",
				"required": false,
				"description": "If set, exports exactly these rows (scoped to the workspace); other filters are ignored."
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "getGetTransaction",
		"operationName": "Get Transaction",
		"description": "",
		"method": "GET",
		"path": "/api/transactions/{transaction_id}",
		"pathParams": [
			"transaction_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "getGetTransferCandidates",
		"operationName": "Get Transfer Candidates",
		"description": "Return ranked candidate transactions to link as a transfer counterpart.",
		"method": "GET",
		"path": "/api/transactions/{transaction_id}/transfer-candidates",
		"pathParams": [
			"transaction_id"
		],
		"queryParams": [
			{
				"name": "limit",
				"required": false,
				"description": ""
			},
			{
				"name": "window_days",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "getGetTransferPair",
		"operationName": "Get Transfer Pair",
		"description": "Return the counterpart leg of a transfer, or null when not linked.",
		"method": "GET",
		"path": "/api/transactions/{transaction_id}/transfer-pair",
		"pathParams": [
			"transaction_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "postLinkTransfer",
		"operationName": "Link Transfer",
		"description": "Link two existing transactions as an inter-account transfer pair.",
		"method": "POST",
		"path": "/api/transactions/link-transfer",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "getListTransactions",
		"operationName": "List Transactions",
		"description": "",
		"method": "GET",
		"path": "/api/transactions",
		"pathParams": [],
		"queryParams": [
			{
				"name": "account_id",
				"required": false,
				"description": ""
			},
			{
				"name": "account_ids",
				"required": false,
				"description": ""
			},
			{
				"name": "category_id",
				"required": false,
				"description": ""
			},
			{
				"name": "category_ids",
				"required": false,
				"description": ""
			},
			{
				"name": "payee_id",
				"required": false,
				"description": ""
			},
			{
				"name": "from",
				"required": false,
				"description": ""
			},
			{
				"name": "to",
				"required": false,
				"description": ""
			},
			{
				"name": "bill_id",
				"required": false,
				"description": "Filter by credit-card bill (issue #92); takes precedence over from/to"
			},
			{
				"name": "group_id",
				"required": false,
				"description": "Filter to transactions split through this group; widens visibility for linked members"
			},
			{
				"name": "unbilled_only",
				"required": false,
				"description": "Cycle-math fallback only: exclude txs already linked to any bill (used for in-progress CC cycles)"
			},
			{
				"name": "q",
				"required": false,
				"description": ""
			},
			{
				"name": "uncategorized",
				"required": false,
				"description": ""
			},
			{
				"name": "type",
				"required": false,
				"description": ""
			},
			{
				"name": "status",
				"required": false,
				"description": "Filter by transaction status (posted|pending)"
			},
			{
				"name": "page",
				"required": false,
				"description": ""
			},
			{
				"name": "limit",
				"required": false,
				"description": ""
			},
			{
				"name": "include_opening_balance",
				"required": false,
				"description": ""
			},
			{
				"name": "exclude_transfers",
				"required": false,
				"description": ""
			},
			{
				"name": "user_pnl_only",
				"required": false,
				"description": "Return only rows that count toward dashboard/user income/expense totals"
			},
			{
				"name": "exclude_ignored",
				"required": false,
				"description": "Drop rows the user marked ignored, or whose category is ignored"
			},
			{
				"name": "tags",
				"required": false,
				"description": ""
			},
			{
				"name": "min_amount",
				"required": false,
				"description": "Filter to transactions with absolute amount >= this value (primary currency)."
			},
			{
				"name": "max_amount",
				"required": false,
				"description": "Filter to transactions with absolute amount <= this value (primary currency)."
			},
			{
				"name": "sort_by",
				"required": false,
				"description": "Column to sort by (date|amount|description|payee|category|account|type|status). Default: date desc."
			},
			{
				"name": "sort_dir",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "patchToggleIgnoreTransaction",
		"operationName": "Toggle Ignore Transaction",
		"description": "",
		"method": "PATCH",
		"path": "/api/transactions/{transaction_id}/ignore",
		"pathParams": [
			"transaction_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "getTransactionCalendar",
		"operationName": "Transaction Calendar",
		"description": "",
		"method": "GET",
		"path": "/api/transactions/calendar",
		"pathParams": [],
		"queryParams": [
			{
				"name": "month",
				"required": false,
				"description": ""
			},
			{
				"name": "account_id",
				"required": false,
				"description": ""
			},
			{
				"name": "account_ids",
				"required": false,
				"description": ""
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "patchUnlinkRecurringTransaction",
		"operationName": "Unlink Recurring Transaction",
		"description": "",
		"method": "PATCH",
		"path": "/api/transactions/{transaction_id}/unlink-recurring",
		"pathParams": [
			"transaction_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "transactions",
		"resourceName": "Transactions",
		"operation": "patchUpdateTransaction",
		"operationName": "Update Transaction",
		"description": "",
		"method": "PATCH",
		"path": "/api/transactions/{transaction_id}",
		"pathParams": [
			"transaction_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "users",
		"resourceName": "Users",
		"operation": "getListUsersDirectory",
		"operationName": "List Users Directory",
		"description": "List every user on the instance — for the member-picker dropdown.",
		"method": "GET",
		"path": "/api/users/directory",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "users",
		"resourceName": "Users",
		"operation": "getLookupUserByEmail",
		"operationName": "Lookup User By Email",
		"description": "",
		"method": "GET",
		"path": "/api/users/lookup",
		"pathParams": [],
		"queryParams": [
			{
				"name": "email",
				"required": true,
				"description": "Exact email to look up"
			}
		],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "users",
		"resourceName": "Users",
		"operation": "getUsers:CurrentUser",
		"operationName": "Users:Current User",
		"description": "",
		"method": "GET",
		"path": "/api/users/me",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "users",
		"resourceName": "Users",
		"operation": "deleteUsers:DeleteUser",
		"operationName": "Users:Delete User",
		"description": "",
		"method": "DELETE",
		"path": "/api/users/{id}",
		"pathParams": [
			"id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "users",
		"resourceName": "Users",
		"operation": "patchUsers:PatchCurrentUser",
		"operationName": "Users:Patch Current User",
		"description": "",
		"method": "PATCH",
		"path": "/api/users/me",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "users",
		"resourceName": "Users",
		"operation": "patchUsers:PatchUser",
		"operationName": "Users:Patch User",
		"description": "",
		"method": "PATCH",
		"path": "/api/users/{id}",
		"pathParams": [
			"id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "users",
		"resourceName": "Users",
		"operation": "getUsers:User",
		"operationName": "Users:User",
		"description": "",
		"method": "GET",
		"path": "/api/users/{id}",
		"pathParams": [
			"id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "workspaces",
		"resourceName": "Workspaces",
		"operation": "postArchiveWorkspaceEndpoint",
		"operationName": "Archive Workspace Endpoint",
		"description": "Soft-delete: flips is_archived. Requires owner role. Refuses to",
		"method": "POST",
		"path": "/api/workspaces/{workspace_id}/archive",
		"pathParams": [
			"workspace_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "workspaces",
		"resourceName": "Workspaces",
		"operation": "patchChangeMemberRole",
		"operationName": "Change Member Role",
		"description": "",
		"method": "PATCH",
		"path": "/api/workspaces/{workspace_id}/members/{member_user_id}",
		"pathParams": [
			"workspace_id",
			"member_user_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "workspaces",
		"resourceName": "Workspaces",
		"operation": "postCreateWorkspaceEndpoint",
		"operationName": "Create Workspace Endpoint",
		"description": "Create a new workspace; the caller becomes its manager.",
		"method": "POST",
		"path": "/api/workspaces",
		"pathParams": [],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "workspaces",
		"resourceName": "Workspaces",
		"operation": "getGetCurrentWorkspace",
		"operationName": "Get Current Workspace",
		"description": "Return the workspace resolved from X-Workspace-Id (or the default).",
		"method": "GET",
		"path": "/api/workspaces/current",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "workspaces",
		"resourceName": "Workspaces",
		"operation": "postInviteMember",
		"operationName": "Invite Member",
		"description": "",
		"method": "POST",
		"path": "/api/workspaces/{workspace_id}/members",
		"pathParams": [
			"workspace_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "workspaces",
		"resourceName": "Workspaces",
		"operation": "getListMyWorkspaces",
		"operationName": "List My Workspaces",
		"description": "Return every workspace the current user can access.",
		"method": "GET",
		"path": "/api/workspaces",
		"pathParams": [],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "workspaces",
		"resourceName": "Workspaces",
		"operation": "getListWorkspaceMembers",
		"operationName": "List Workspace Members",
		"description": "",
		"method": "GET",
		"path": "/api/workspaces/{workspace_id}/members",
		"pathParams": [
			"workspace_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "workspaces",
		"resourceName": "Workspaces",
		"operation": "deleteRemoveWorkspaceMember",
		"operationName": "Remove Workspace Member",
		"description": "",
		"method": "DELETE",
		"path": "/api/workspaces/{workspace_id}/members/{member_user_id}",
		"pathParams": [
			"workspace_id",
			"member_user_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	},
	{
		"resource": "workspaces",
		"resourceName": "Workspaces",
		"operation": "patchUpdateWorkspace",
		"operationName": "Update Workspace",
		"description": "",
		"method": "PATCH",
		"path": "/api/workspaces/{workspace_id}",
		"pathParams": [
			"workspace_id"
		],
		"queryParams": [],
		"hasBody": true,
		"bodyRequired": true
	},
	{
		"resource": "workspaces",
		"resourceName": "Workspaces",
		"operation": "getWorkspaceStats",
		"operationName": "Workspace Stats",
		"description": "KPIs surfaced on the settings page (members / accounts / transactions).",
		"method": "GET",
		"path": "/api/workspaces/{workspace_id}/stats",
		"pathParams": [
			"workspace_id"
		],
		"queryParams": [],
		"hasBody": false,
		"bodyRequired": false
	}
];
