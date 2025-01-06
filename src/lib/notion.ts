import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export interface Task {
	id: string;
	Name: string;
	DueDate: string | null;
	Priority: string | null;
	Status: string | null;
}

interface NotionProperties {
	Name: {
		title: Array<{
			plain_text: string;
		}>;
	};
	"Due Date": {
		date: {
			start: string;
		} | null;
	};
	Priority: {
		select: {
			name: string;
		} | null;
	};
	Status: {
		status: {
			name: string;
		} | null;
	};
}

export const getTasks = async (databaseId: string): Promise<Task[]> => {
	const response = await notion.databases.query({
		database_id: databaseId,
	});

	return response.results
		.filter((task): task is PageObjectResponse => "properties" in task)
		.map((task: PageObjectResponse) => ({
			id: task.id,
			Name:
				(task.properties as unknown as NotionProperties).Name?.title[0]
					?.plain_text || "Untitled",
			DueDate:
				(task.properties as unknown as NotionProperties)["Due Date"]?.date
					?.start || null,
			Priority:
				(task.properties as unknown as NotionProperties).Priority?.select
					?.name || null,
			Status:
				(task.properties as unknown as NotionProperties).Status?.status?.name ||
				null,
		}));
};

export interface SessionLog {
	Name: string;
	StartTime: string;
	EndTime: string;
	WorkDuration: number;
	ShortBreakDuration: number;
	LongBreakDuration: number;
	WorkRounds: number;
	TotalSessionDuration: number;
}

export const saveSessionLog = async (
	databaseId: string,
	log: SessionLog
): Promise<void> => {
	await notion.pages.create({
		parent: { database_id: databaseId },
		properties: {
			Name: { title: [{ text: { content: log.Name } }] },
			StartTime: { date: { start: log.StartTime } },
			EndTime: { date: { start: log.EndTime } },
			WorkDuration: { number: log.WorkDuration },
			ShortBreakDuration: { number: log.ShortBreakDuration },
			LongBreakDuration: { number: log.LongBreakDuration },
			WorkRounds: { number: log.WorkRounds },
			TotalSessionDuration: { number: log.TotalSessionDuration },
		},
	});
};
