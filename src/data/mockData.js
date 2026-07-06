export const LLM_MODELS = [
  { id: 'gpt-4o', name: 'OpenAI GPT-4o', provider: 'OpenAI', badgeColor: 'purple' },
  { id: 'claude-3-5', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', badgeColor: 'blue' },
  { id: 'gemini-1-5', name: 'Gemini 1.5 Pro', provider: 'Google', badgeColor: 'emerald' },
  { id: 'llama-3', name: 'Llama 3 70B', provider: 'Meta (Open Source)', badgeColor: 'orange' }
];

export const AVAILABLE_TOOLS = [
  { id: 'web_search', name: 'Google Search', description: 'Search the web for real-time information.' },
  { id: 'code_interpreter', name: 'Python Sandbox', description: 'Write and execute Python code dynamically.' },
  { id: 'file_reader', name: 'File Reader', description: 'Parse text, PDFs, and spreadsheets.' },
  { id: 'database_query', name: 'SQL Database Query', description: 'Run secure read queries on Postgres databases.' },
  { id: 'web_scraper', name: 'Scraper / Crawler', description: 'Extract clean markdown content from URLs.' }
];

export const DEFAULT_TEAMS = [
  {
    id: 'academic-researcher',
    name: 'Research & Synthesis Team',
    description: 'Performs deep web literature reviews and writes comprehensive analysis reports.',
    icon: 'search',
    agents: [
      {
        id: 'agent-1',
        name: 'Supervisor Agent',
        role: 'Orchestrator',
        goal: 'Deconstruct prompt requests, delegate research sections, and compile final responses.',
        backstory: 'An efficient manager expert in task routing and quality control.',
        model: 'gpt-4o',
        tools: []
      },
      {
        id: 'agent-2',
        name: 'Web Researcher',
        role: 'Data Miner',
        goal: 'Gather highly accurate sources and extract data from the web regarding the topic.',
        backstory: 'A meticulous investigator that values source credibility and fact-checking.',
        model: 'claude-3-5',
        tools: ['web_search', 'web_scraper']
      },
      {
        id: 'agent-3',
        name: 'Document Writer',
        role: 'Technical Writer',
        goal: 'Synthesize research data into structured, beautiful markdown papers with bibliographies.',
        backstory: 'An academic wordsmith focused on readability, flow, and professional formatting.',
        model: 'gemini-1-5',
        tools: ['file_reader']
      }
    ]
  },
  {
    id: 'marketing-squad',
    name: 'SaaS Launch Copywriters',
    description: 'Generates SEO-optimized landing page copy and social marketing materials.',
    icon: 'megaphone',
    agents: [
      {
        id: 'agent-4',
        name: 'SEO Strategist',
        role: 'Keyword Auditor',
        goal: 'Identify high-value keywords and define structural hierarchy to rank on search engines.',
        backstory: 'A growth hacker obsessed with algorithms, search intent, and structural design.',
        model: 'gpt-4o',
        tools: ['web_search']
      },
      {
        id: 'agent-5',
        name: 'Copywriter',
        role: 'Creative Writer',
        goal: 'Draft emotional, high-conversion landing page copy incorporating selected keywords.',
        backstory: 'A direct response copywriter trained on top-converting landing page formulas.',
        model: 'claude-3-5',
        tools: []
      }
    ]
  },
  {
    id: 'code-dev-qa',
    name: 'Autonome Software Engineers',
    description: 'Designs, implements, and tests algorithms and React interfaces.',
    icon: 'code',
    agents: [
      {
        id: 'agent-6',
        name: 'Software Architect',
        role: 'System Designer',
        goal: 'Outline component hierarchies and database schema guidelines for features.',
        backstory: 'Experienced designer specialized in design patterns and micro-architectures.',
        model: 'gpt-4o',
        tools: []
      },
      {
        id: 'agent-7',
        name: 'Developer Agent',
        role: 'Coder',
        goal: 'Implement fully working JavaScript code matching Architect specifications.',
        backstory: 'A fast developer focused on clean, optimized, and lint-free code.',
        model: 'claude-3-5',
        tools: ['code_interpreter']
      },
      {
        id: 'agent-8',
        name: 'QA Tester',
        role: 'Automated Tester',
        goal: 'Write unit tests, analyze code blocks for edge cases, and report issues.',
        backstory: 'An exhaustive critic dedicated to breaking software and ensuring reliability.',
        model: 'gemini-1-5',
        tools: ['code_interpreter']
      }
    ]
  }
];

export const MOCK_HISTORY = [
  {
    id: 'run-101',
    teamName: 'Research & Synthesis Team',
    prompt: 'Create a deep analysis of solid-state battery technology advancements for 2026.',
    status: 'completed',
    date: '2026-07-06 14:32',
    duration: '1m 24s',
    cost: '$0.1240',
    tokens: '24,500',
    result: `# Solid-State Battery Advancements (2026 Industry Report)

## Executive Summary
Solid-state batteries (SSBs) represent the next major evolution in energy storage. By replacing volatile organic liquid electrolytes with solid-state alternatives, SSBs offer double the energy density and enhanced thermal stability.

## Key Technological Milestones
1. **Sulfide-Based Solid Electrolytes**: Silicon anodes combined with sulfide electrolytes have reached ionic conductivity rates matching liquid systems.
2. **Anode-Free Formats**: Temporary copper-lithium plating has successfully reduced weight and volume, yielding cell-level energy densities exceeding **480 Wh/kg**.
3. **Polymer Hybrid Systems**: Commercial pilot lines have begun testing semi-solid polymer binders to alleviate stress fracture failures during cell swelling.

## Competitive Landscape
- **Toyota / Idemitsu**: Commencing pilot line trials with sulfide-based EV cells.
- **QuantumScape**: Delivering 24-layer solid-state prototypes to automotive partners.
- **Samsung SDI**: Transitioning test cells to target luxury EV architectures.

---
*Report compiled by Web Researcher & Document Writer agents under Supervisor routing.*`
  },
  {
    id: 'run-102',
    teamName: 'SaaS Launch Copywriters',
    prompt: 'Write landing page copy and Twitter launch campaign for a developer-first vector DB.',
    status: 'completed',
    date: '2026-07-05 18:10',
    duration: '48s',
    cost: '$0.0435',
    tokens: '9,120',
    result: `# VeloceDB: The Sub-Millisecond Vector Database

## Hero Section
**Headline:** Speed-of-Light Vector Search for AI-native Teams.
**Subheadline:** Embeddings search at scale with zero cold starts, single-digit microsecond latencies, and unified relational filtering.
**CTA:** Deploy Free Cluster → | Read Docs

## Twitter Launch Campaign
1. 🚀 Introducing VeloceDB: A vector database built in Rust, engineered for millisecond searches at petabyte scale. No more cold starts. No index drift. Thread 👇 (1/4)
2. Most databases choke when you mix vector cosine similarity with complex SQL joins. VeloceDB processes them in a single query engine pipeline. Up to 12x faster search times. (2/4)
3. Under the hood, we leverage a modified HNSW index with zero-copy binary serialization. It deploys instantly on edge nodes. Read the benchmark specs: velocedb.dev/blog/speed (3/4)
4. Start building today. Spin up a database cluster in 3 seconds. First 1GB is free. https://velocedb.dev (4/4)`
  },
  {
    id: 'run-103',
    teamName: 'Autonome Software Engineers',
    prompt: 'Implement a binary search tree in React representing file system directory routing.',
    status: 'failed',
    date: '2026-07-04 11:22',
    duration: '32s',
    cost: '$0.0150',
    tokens: '3,800',
    result: 'Error: Code Interpreter Sandbox connection timeout while executing QA tests. Output file generation aborted.'
  }
];

export const MOCK_SIMULATION_STEPS = {
  'academic-researcher': [
    {
      agent: 'Supervisor Agent',
      action: 'Deconstructing prompt request...',
      log: 'Analyzing user request: "Create a deep analysis of solid-state battery technology advancements for 2026."\nDecomposing task into segments:\n1. Literature search on SSB chemical progress.\n2. Commercial scaling timelines for key EV suppliers.\n3. Formatting and citation consolidation.',
      duration: '4s',
      status: 'completed'
    },
    {
      agent: 'Web Researcher',
      action: 'Searching web for literature and news...',
      log: 'Invoking tool: Google Search with query "solid state battery advancements 2026 EV commercial pilot"\nFound 8 sources:\n- MIT Tech Review: Solid state breakthroughs\n- Samsung SDI PR: Pilot line operations\n- Toyota / Idemitsu solid-state sulfide electrolyte progress updates (June 2026)\nExtracting main findings regarding energy densities (450+ Wh/kg) and interface fractures.',
      duration: '12s',
      status: 'completed'
    },
    {
      agent: 'Web Researcher',
      action: 'Scraping manufacturer tech specs...',
      log: 'Invoking tool: Scraper / Crawler with URL "https://samsung-sdi.com/solid-state-specs"\nParsed spec table:\n- Anode material: Ag-C (Silver-Carbon) nanocomposite\n- Target cycle life: 1,000 cycles at 80% SOH\n- Safety: Zero-thermal-runaway test certified under mechanical nail penetration.',
      duration: '8s',
      status: 'completed'
    },
    {
      agent: 'Supervisor Agent',
      action: 'Reviewing search data and routing to Writer...',
      log: 'Data verified. Information covers chemical composition, pilot schedules, and performance targets.\nForwarding research package (5.2KB raw markdown) to Document Writer.',
      duration: '3s',
      status: 'completed'
    },
    {
      agent: 'Document Writer',
      action: 'Synthesizing report structure and styling...',
      log: 'Synthesizing academic draft...\nStructuring sections:\n- Executive Summary\n- Key Technological Milestones\n- Competitive Landscape\nFormatting headers, bullet points, and markdown highlights.\nGenerating bibliography with linked sources.',
      duration: '14s',
      status: 'completed'
    },
    {
      agent: 'Supervisor Agent',
      action: 'Final validation check...',
      log: 'Checking output consistency. Length: 1,200 words. Quality checklist: Passed.\nPreparing result payload.',
      duration: '2s',
      status: 'completed'
    }
  ],
  'marketing-squad': [
    {
      agent: 'SEO Strategist',
      action: 'Analyzing keyword volume and competitors...',
      log: 'Invoking tool: Google Search with query "vector database developer keywords volume"\nIdentified target high-value search terms:\n- "fastest vector database"\n- "vector search latencies"\n- "SQL with vector joins"\nStructuring landing page content layout to prioritize these headings.',
      duration: '8s',
      status: 'completed'
    },
    {
      agent: 'Copywriter',
      action: 'Drafting landing page hero and campaign outline...',
      log: 'Drafting core pitch using direct conversion copy techniques.\nCreating Twitter campaign text matching product features: Rust implementation, speed, SQL joins, easy cluster scaling.',
      duration: '10s',
      status: 'completed'
    }
  ],
  'code-dev-qa': [
    {
      agent: 'Software Architect',
      action: 'Designing data structures...',
      log: 'Designing Binary Search Tree layout for directory nodes.\nNode format:\n{ name: string, path: string, left: Node, right: Node }\nSpecifying implementation requirements: insert(), search(), delete(), traverse() methods.',
      duration: '6s',
      status: 'completed'
    },
    {
      agent: 'Developer Agent',
      action: 'Writing JavaScript BST class and tests...',
      log: 'Writing code for React app. Creating class DirectoryBST.\nInvoking tool: Python Sandbox to run node verification tests.',
      duration: '12s',
      status: 'completed'
    },
    {
      agent: 'QA Tester',
      action: 'Running mock environment tests...',
      log: 'Running BST code with 1,000 files mock inserts.\nDetecting stack overflow boundary condition in Python Sandbox...\nFatal sandbox error: connection timed out.',
      duration: '10s',
      status: 'failed'
    }
  ]
};
