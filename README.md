# AI Productivity Hub

Project Title: AI Workplace Productivity Hub

Create a modern, responsive web application called AI Workplace Productivity Hub, an AI-powered productivity dashboard that helps employees automate workplace tasks using artificial intelligence. The application must look professional, intuitive, and suitable for a corporate environment.

Objective

The application should solve a real workplace productivity problem by combining three AI-powered tools into one integrated platform instead of separate applications.

The three AI features are:

 AI Task Planner & Scheduler

 AI Research Assistant

 AI Workplace Chatbot

Use a clean dashboard layout with excellent UI/UX and responsive design.

Design Requirements

Use a modern corporate design with:

 Blue and white color palette

 Rounded cards

 Soft shadows

 Modern typography

 Plenty of whitespace

 Smooth hover animations

 Professional icons

 Mobile-first responsive design

Layout

Create a dashboard containing:

Left Sidebar

Include navigation links:

 Dashboard

 Task Planner

 Research Assistant

 AI Chatbot

 Settings

At the bottom include:

 User profile

 Logout button

Top Navigation

Include:

 Application logo

 Search bar

 Notification icon

 User avatar

Main Dashboard

Display three feature cards showing:

 AI Task Planner

 AI Research Assistant

 AI Chatbot

Each card should contain:

 icon

 short description

 "Open Tool" button

Feature 1 — AI Task Planner & Scheduler

Create an interface where users can enter:

 Task name

 Description

 Priority (High, Medium, Low)

 Due date

 Working hours available

Include a button:

Generate Smart Schedule

Display generated results inside a professional output card showing:

 Prioritized task list

 Suggested daily schedule

 Estimated completion times

 Productivity recommendations

Include a progress indicator and task status badges.

Feature 2 — AI Research Assistant

Create a research workspace.

Input fields:

 Research topic

 Optional article or text input

Buttons:

 Summarize

 Generate Insights

 Recommend Next Steps

Output should display:

Summary

Concise explanation.

Key Insights

Bullet list.

Recommendations

Actionable recommendations.

Related Questions

AI-generated follow-up questions.

Display results inside attractive cards.

Feature 3 — AI Workplace Chatbot

Create a chatbot interface similar to ChatGPT.

Include:

 Chat history

 User messages

 AI responses

 Message timestamps

 Input box

 Send button

 Clear conversation button

Provide example prompts such as:

 Plan my workday

 Explain Agile methodology

 Summarize this project

 Improve my productivity

 Help prepare for a meeting

Dashboard Widgets

At the top of the dashboard display summary cards:

 Tasks Planned

 Research Sessions

 AI Chats

 Productivity Score

Use simple charts or progress bars for visual feedback.

Responsible AI Section

Include a clearly visible Responsible AI card stating:

Responsible AI Notice

This application provides AI-generated suggestions intended to assist users with workplace productivity. Users should review all AI-generated content before making business decisions. Sensitive, confidential, or personal information should not be shared with the AI.

Footer

Include:

 Version number

 Privacy Notice

 Responsible AI link

 Contact Support

User Experience

Implement:

 Loading animations

 Empty states

 Success notifications

 Error handling

 Responsive layouts

 Smooth transitions

 Accessible buttons and forms

Technical Requirements

Build using:

 React

 TypeScript

 Tailwind CSS

 shadcn/ui components

 Lucide icons

Organize the project with reusable components and clean code.

For AI functionality, create placeholder functions and clearly mark where an OpenAI API key can be added later. The UI should work even without a live API by displaying realistic sample AI responses.

Deliverable

Produce a polished, professional single-page dashboard application demonstrating:

 AI Task Planner & Scheduler

 AI Research Assistant

 AI Workplace Chatbot

The website should be visually impressive, responsive on desktop and mobile, easy to navigate, and ready for future OpenAI API integration. It should feel like a real enterprise productivity platform rather than a student prototype.

Appearance & Theme Customization

Add an Appearance section in Settings that allows users to personalize the application's look and feel.

Theme Mode

Provide a theme selector with three options:

Light

Dark

System Default (automatically follows the user's operating system preference)

The selected theme should apply across the entire application and persist between sessions.

Color Themes

Allow users to choose one of five professionally designed accent color themes. These themes should appeal to a variety of preferences without stereotyping users.

Available options:

Ocean Blue – Professional blue accents for a clean corporate look (default).

Forest Green – Calm and productivity-focused with green accents.

Royal Purple – Modern purple accents for a creative feel.

Rose Pink – Soft pink accents with a polished, elegant appearance.

Slate Gray – Neutral gray accents for a minimalist aesthetic.

Changing the color theme should update the application's primary buttons, links, highlights, cards, icons, progress bars, and other accent elements while maintaining readability, accessibility, and sufficient color contrast.

User Experience

 Display each color option as a preview swatch with its name.

 Show a live preview immediately when a theme is selected.

 Save the user's selected theme and color preference using local storage so it is automatically restored on future visits.

 Ensure all themes work correctly in both Light and Dark modes.

 Include smooth transitions when switching between themes.

 Maintain WCAG-compliant color contrast for accessibility.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://work-genie-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b5903912-4e38-4d1c-b6fc-c0309b291580).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
