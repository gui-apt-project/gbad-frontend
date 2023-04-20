export interface Country {
  id: number;
  name: string;
}

export interface Industry {
  id: number;
  name: string;
}

export interface Target {
  countries: Country[];
  industries: Industry[];
}

export interface Software {
  software_id: number;
  name: string;
  mitre_id: string | null;
  description: string;
}

export interface Source {
  id: number;
  name: string;
  description: string;
  url: string;
  json_url: string;
  copyright: string;
  group_id: number;
}

export interface Operation {
  id: number;
  name: string;
  description: string;
  url: string;
  date: string;
  group_id: number;
}

export interface Technique {
  id: number;
  procedure: string;
  technique_id: string;
  technique_name: string;
  sub_technique_id: string | null;
  sub_technique_name: string | null;
}

export interface Tactic {
  tactic_id: string;
  name: string;
  description: string;
  type: string;
}

export default interface Group {
  id: number;
  name: string;
  mitre_id: string;
  location: number;
  targets: Target;
  associated_groups: string;
  aliases: string[];
  sponsor: string;
  motivation: string;
  description: string;
  tactics: Tactic[];
  techniques: Technique[];
  softwares: Software[];
  sources: Source[];
  operations: Operation[];
}
