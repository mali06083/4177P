import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Uygulamayı render et
const rootElement = document.getElementById("root");
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
} else {
    console.error("Root element bulunamadı!");
}

