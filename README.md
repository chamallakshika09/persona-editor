# Collaborative Persona Editor

This is a collaborative persona editor built with Next.js, Yjs, and Tailwind CSS. The application allows multiple users to collaboratively edit persona information, including text and image cards, in real-time.

## Features

- **Real-time Collaboration:** Multiple users can edit the persona simultaneously.
- **Rich Text Editing:** Supports rich text formatting options such as bold, italic, underline, and more.
- **Image Upload:** Allows users to upload images and display them within the editor.
- **Dynamic Card Management:** Users can add and manage text and image cards.
- **Responsive Design:** The application is designed to be responsive and user-friendly.

## Technologies Used

- **Next.js:** A React framework for building modern web applications.
- **Yjs:** A CRDT implementation for building collaborative applications.
- **Tailwind CSS:** A utility-first CSS framework for styling.
- **Vercel Blob:** For handling image uploads.
- **WebRTC:** For peer-to-peer communication in the collaborative environment.

## Getting Started

### Prerequisites

- Node.js (>= 18.17)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/chamallakshika09/persona-editor.git
cd persona-editor
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Running the Application

1. Start the development server:

```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to `http://localhost:3000`.

### Building for Production

To create an optimized production build, run:

```bash
npm run build
# or
yarn build
```

### Folder Structure

```
persona-editor
├── app
│   ├── page.tsx
│   ├── error.tsx
│   ├── global-error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── route.ts
├── assets
│   ├── icons
│   └── images
├── components
│   ├── AddCardMenu.tsx
│   ├── Card.tsx
│   ├── CardColumn.tsx
│   ├── CardFactory.tsx
│   ├── CustomEditor.tsx
│   ├── Header.tsx
│   ├── HtmlRenderer.tsx
│   ├── ImageCard.tsx
│   ├── Loader.tsx
│   ├── Modal.tsx
│   ├── NameCard.tsx
│   ├── PersonaBadge.tsx
│   ├── PersonaContent.tsx
│   ├── PersonaHeader.tsx
│   ├── QuickEditButton.tsx
│   ├── QuickEditModal.tsx
│   ├── QuickEditOptionsSection.tsx
│   ├── SvgIcon.tsx
│   ├── TextCard.tsx
├── data
│   └── colors.ts
├── hooks
│   └── useOutsideClick.tsx
├── libs
│   └── yjsInstance.ts
├── types
│   └── ui.ts
├── utils
│   ├── cards.ts
│   └── conversions.ts
```

### Key Components

- **PersonaHeader:** Displays the persona header with avatar, name, and edit button.
- **PersonaContent:** Manages and displays the text and image cards for the persona.
- **TextCard:** A card component for rich text editing.
- **ImageCard:** A card component for image uploads and display.
- **CustomEditor:** A custom rich text editor built with Quill.
- **QuickEditModal:** A modal for quickly editing persona details like name, avatar, and color.
- **Loader:** A component to display a loading spinner during initialization.

### Collaboration with Yjs

The application uses Yjs for real-time collaboration. The Yjs document is initialized in the `yjsInstance.ts` file, and the state is managed using Yjs maps and arrays. The `initializeYjs` function sets up the WebRTC provider and initializes the document. The `useY` hook from `react-yjs` is used to sync the state with Yjs.

### Error Handling

- **Error Boundary:** Implemented in `error.tsx` and `global-error.tsx` to catch errors and display user-friendly messages.

### Deployment

The application can be deployed to any static hosting provider. For example, to deploy to Vercel:

1. Install the Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy the application:

```bash
vercel
```

Follow the prompts to deploy the application.
