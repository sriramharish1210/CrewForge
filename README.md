# 🚀 CrewForge

> **Build, Configure & Orchestrate AI Agent Crews — Without Writing Code**

CrewForge is a visual no-code platform for creating and orchestrating AI agent teams. Instead of relying on a single AI assistant, users can assemble specialized AI crews where every agent has a dedicated role such as planning, researching, writing, reviewing, or analyzing.

The platform provides an intuitive interface to design agent workflows, execute tasks, monitor progress, and manage execution history—all from one place.

Built as a capstone project for the **Google × Kaggle 5-Day AI Agents Intensive Vibe Coding Course**.

---

# ✨ Features

### 🎯 Visual Crew Builder
- Create custom AI crews using an intuitive interface
- Configure agent roles and responsibilities
- Sequential workflow orchestration
- Local persistence using browser storage

---

### 📦 Pre-built Crew Templates

Choose from ready-made professional crews:

- 🚀 Startup Crew
- 📈 Marketing Crew
- 📚 Study Crew
- ✍️ Content Crew
- 🔬 Research Crew

Each template automatically populates the crew builder with predefined agents, making it easy to get started in seconds.

---

### ⚙️ Workflow Execution

- Select a crew
- Enter a task prompt
- Configure output preferences
- Simulate agent execution
- Generate structured output

---

### 📊 Dashboard

Monitor:

- Configured crews
- Workflow executions
- Success metrics
- Execution costs (UI simulation)
- Recent activity

---

### 📜 Execution History

- Search previous executions
- Filter workflow history
- Review completed tasks
- Track execution status

---

### ⚡ Settings

- Gemini API configuration
- Default model configuration
- Local configuration storage

---

# 🏗️ Project Architecture

CrewForge follows a modular multi-page architecture.

```
Landing Page
      │
      ▼
Dashboard
      │
      ▼
Crew Builder
      │
      ▼
Workflow Runner
      │
      ▼
Execution History
      │
      ▼
Settings
```

The project is designed to evolve into a fully functional multi-agent orchestration platform with real AI-powered execution.

---

# 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3

### State Management

- React Hooks
- Local Storage

### Development

- Node.js
- npm

### AI (Current)

- Gemini-ready UI architecture

---

# 📁 Project Structure

```
src/
│
├── assets/
├── components/
│   ├── Navbar
│   └── Sidebar
│
├── pages/
│   ├── Landing
│   ├── Dashboard
│   ├── Create Crew
│   ├── Run Workflow
│   ├── History
│   └── Settings
│
├── data/
│   └── Mock Data
│
├── App.jsx
└── main.jsx
```

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/sriramharish1210/CrewForge.git
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

---

# 🎯 Current MVP

The current version demonstrates the complete product workflow through a polished frontend experience.

✅ Multi-page application

✅ Crew creation interface

✅ Ready-made crew templates

✅ Workflow execution interface

✅ Execution history

✅ Settings management

✅ Local storage persistence

✅ Modular architecture for future AI integration

---

# 🔮 Future Roadmap

CrewForge has been intentionally designed with extensibility in mind. Planned enhancements include:

- 🤖 Real Gemini-powered multi-agent execution
- 🌐 Live web search integration
- 🧠 Advanced agent memory
- 🔄 Parallel and hierarchical workflows
- 📄 Rich Markdown & PDF report generation
- 📊 Token usage and cost analytics
- 🔌 Support for external tools and APIs
- 👥 Team collaboration and workspace sharing
- ☁️ Cloud synchronization
- 🔐 Secure user authentication
- 📚 Community template marketplace
- 🧩 Drag-and-drop workflow designer

---

# 💡 Inspiration

As AI agents become increasingly specialized, a single prompt is often not enough for solving complex tasks.

CrewForge explores a visual approach to multi-agent orchestration, enabling users to build collaborative AI workflows where specialized agents work together toward a shared objective.

---

# 👨‍💻 Author

**S. S. Sriram Harish**

Built for the **Google × Kaggle AI Agents Intensive Vibe Coding Capstone Project**.

---

# 📜 License

This project is created for educational and hackathon purposes.
