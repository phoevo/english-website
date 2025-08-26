"use client";

import { useState } from "react";
import { Client, AppwriteException } from "appwrite";

export default function AppwritePing() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [logs, setLogs] = useState<
    {
      date: Date;
      method: string;
      path: string;
      status: number;
      response: string;
      project: string;
    }[]
  >([]);

  // Initialize Appwrite Client
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_FUNCTION_API_ENDPOINT!) // your main project endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // your main project ID

  const projectName = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME || "Unknown Project";

  async function sendPing() {
    if (status === "loading") return;
    setStatus("loading");

    try {
      const result = await client.ping();
      const log = {
        date: new Date(),
        method: "GET",
        path: "/v1/ping",
        status: 200,
        response: JSON.stringify(result),
        project: projectName,
      };
      setLogs((prev) => [log, ...prev]);
      setStatus("success");
    } catch (err) {
      const log = {
        date: new Date(),
        method: "GET",
        path: "/v1/ping",
        status: err instanceof AppwriteException ? err.code : 500,
        response: err instanceof AppwriteException ? err.message : "Unknown error",
        project: projectName,
      };
      setLogs((prev) => [log, ...prev]);
      setStatus("error");
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ping Appwrite Project</h1>
      <p className="mb-6">
        Project: <strong>{projectName}</strong> | Endpoint: <strong>{process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}</strong>
      </p>

      <button
        onClick={sendPing}
        className={`px-4 py-2 rounded text-white ${
          status === "loading" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Pinging..." : "Send Ping"}
      </button>

      <p className="mt-4">
        Status:{" "}
        <span className={`font-semibold ${
          status === "success" ? "text-green-600" :
          status === "error" ? "text-red-600" : "text-gray-700"
        }`}>
          {status.toUpperCase()}
        </span>
      </p>

      {logs.length > 0 && (
        <table className="w-full mt-6 border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Method</th>
              <th className="p-2 border">Path</th>
              <th className="p-2 border">Response</th>
              <th className="p-2 border">Project</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className="text-sm">
                <td className="p-2 border">{log.date.toLocaleString()}</td>
                <td className={`p-2 border font-semibold ${log.status >= 400 ? "text-red-600" : "text-green-600"}`}>{log.status}</td>
                <td className="p-2 border">{log.method}</td>
                <td className="p-2 border">{log.path}</td>
                <td className="p-2 border font-mono truncate max-w-xs">{log.response}</td>
                <td className="p-2 border">{log.project}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
