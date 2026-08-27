// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import "./App.css";
import Footer from "./components/Footer";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import Login from "./pages/admin/Login";
import ProjectList from "./pages/admin/ProjectList";
import ProjectForm from "./pages/admin/ProjectForm";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ProjectList />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/:id/edit" element={<ProjectForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
