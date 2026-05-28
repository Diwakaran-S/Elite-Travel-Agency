import React from 'react';

export default function AiAgentSection() {
  // In development: VITE_AGENT_URL = http://localhost:5000
  // In production (Render): VITE_AGENT_URL is empty → uses same origin /agent
  const agentUrl = import.meta.env.VITE_AGENT_URL
    ? `${import.meta.env.VITE_AGENT_URL}/agent`
    : '/agent';

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 80px)' }}>
      <iframe
        src={agentUrl}
        title="Elite AI Travel Agent"
        className="w-full h-full border-0"
        allow="clipboard-write"
      />
    </div>
  );
}
