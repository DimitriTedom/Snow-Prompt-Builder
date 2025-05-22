# Snow Prompt Builder

An open‑source AI prompting tool to discover, create and share creative prompts. Snow Prompt Builder leverages Next.js, NextAuth, MongoDB and the Groq LLM API (llama-3.3-70b-versatile) to let users auto‑generate and save AI prompts with tags

<p align="center">
  <img src="./public/assets/images/preview.png" alt="Snow Prompt Builder preview" />
</p>

---

## 🛠️ Features

- **User Authentication** via NextAuth (Google)
- **Generate Prompts** by describing what you want—AI returns a fully‑crafted prompt + suggested tags
- **Create & Save** prompts to your personal profile
- **Browse & Search** community‑shared prompts
- **Responsive**, dark‑mode‑inspired UI built with Tailwind CSS

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/DimitriTedom/Snow-Prompt-Builder.git
cd Snow-Prompt-Builder
````

### 2. Install dependencies

Use your favorite package manager:

```bash
# npm
npm install

# Yarn
yarn install

# pnpm
pnpm install

# bun
bun install
```

### 3. Set up your environment

Create a `.env.local` file in the project root and populate it with:

```dotenv
# NextAuth (Google OAuth)
GOOGLE_ID=
GOOGLE_CLIENT_SECRET=

# MongoDB (Atlas)
MONGODB_URL=

# NextAuth secret & URLs
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXTAUTH_URL_INTERNAL=

# Groq LLM API Key
GROQ_API_KEY=
```

> **⚠️ Security:** Never commit your `.env.local` to source control.

### 4. Run in development

```bash
# npm
npm run dev

# Yarn
yarn dev

# pnpm
pnpm dev

# bun
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build & Production

```bash
# npm
npm run build
npm start

# Yarn
yarn build
yarn start

# pnpm
pnpm build
pnpm start

# bun
bun build
bun start
```

---

## 📁 Project Structure

```
.
├── app/                   # Next.js App Router pages & layouts
│   ├── api/               # API routes (Groq integration, prompt CRUD)
│   └── layout.jsx         # Root layout (Providers, nav, footer)
├── components/            # Reusable React components
│   ├── Form.jsx
│   ├── Footer.jsx
│   ├── Nav.jsx
│   └── PromptCard.jsx
├── context/               # Loading & UI context providers
├── lib/                   # Database adapters, helpers
├── public/                # Static assets (logo, icons)
├── styles/                # Global CSS & Tailwind config
└── package.json
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/YourFeature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to your branch (`git push origin feat/YourFeature`)
5. Open a Pull Request

Please follow the [conventional commits](https://www.conventionalcommits.org/) style.

---

## 📜 License

This project is open source under the [MIT License](./LICENSE).

---

> Built with ❤️ by Dimitri Tedom


Feel free to adapt or extend this README to match your team’s workflow and add any additional sections (e.g., testing, CI/CD) as needed.
