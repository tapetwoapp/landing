import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({ component: TestPage });

function TestPage() {
	return <main className="min-h-screen bg-background">test</main>;
}
