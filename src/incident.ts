/** Fictional teaching incident. All identities, timestamps, evidence and outcomes are synthetic. */
export const incident = {
  label: "Illustrative incident · synthetic data",
  date: "2026-10-13",
  timezone: "UTC",
  user: "svc-backup",
  windows: "WIN-FIN-07",
  linux: "LNX-DB-03",
  directory: "AD-DC-01",
  external: "203.0.113.44", // TEST-NET-3 documentation address; not a real indicator.
  caseId: "SEC-042",
  uncertainty:
    "Outbound connection observed; successful data transfer and impact remain unverified.",
} as const;

export const incidentEvents = [
  {
    time: "09:12",
    source: "Directory",
    host: incident.directory,
    user: incident.user,
    title: "Unusual authentication",
    evidence: "Service credentials used from an unfamiliar workstation.",
    status: "Observed",
  },
  {
    time: "09:17",
    source: "Endpoint",
    host: incident.windows,
    user: incident.user,
    title: "Encoded PowerShell",
    evidence:
      "A process event records an encoded command outside the approved backup job.",
    status: "Observed",
  },
  {
    time: "09:24",
    source: "Linux session",
    host: incident.linux,
    user: incident.user,
    title: "Cross-host SSH activity",
    evidence:
      "Authentication and process events link the Windows origin to a Linux session.",
    status: "Observed",
  },
  {
    time: "09:31",
    source: "File / process",
    host: incident.linux,
    user: incident.user,
    title: "Archive staged",
    evidence: "The Linux session creates an archive in a temporary directory.",
    status: "Observed",
  },
  {
    time: "09:36",
    source: "Network",
    host: incident.linux,
    user: incident.user,
    title: "Outbound connection",
    evidence: `A connection to ${incident.external} follows archive creation. Transfer is suspected, not established.`,
    status: "Unverified impact",
  },
  {
    time: "09:44",
    source: "Analyst",
    host: incident.windows,
    user: incident.user,
    title: "Unauthorized activity verified",
    evidence:
      "Source events and the account owner confirm the commands were not an approved change.",
    status: "Verified",
  },
  {
    time: "09:52",
    source: "Response owner",
    host: incident.windows,
    user: incident.user,
    title: "Containment approved",
    evidence:
      "The incident owner approves isolation of both affected endpoints and a configured directory-account action.",
    status: "Approved",
  },
  {
    time: "09:54",
    source: "Response results",
    host: incident.windows,
    user: incident.user,
    title: "Containment confirmed",
    evidence:
      "Native isolation of WIN-FIN-07 and LNX-DB-03 plus a configured account-disable integration return success. Impact review continues.",
    status: "Contained",
  },
] as const;

/** A teaching query, not a production detection rule or a query executed by this site. */
export const incidentQuery = `FROM logs-*
| WHERE user.name == "${incident.user}"
| SORT @timestamp ASC
| KEEP @timestamp, host.name, event.category, process.name
| LIMIT 50`;
