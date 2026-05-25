import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {FaEnvelope, FaPhone, FaGithub, FaInstagram} from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import './styles.css';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const desktopIcons = [
  { id: 'myComputer', label: 'Meu Computador', icon: 'my-computer', image: asset('icons/mc.png') },
  { id: 'about', label: 'Sobre', icon: 'folder', image: asset('icons/sobre.png') },
  { id: 'internet', label: 'Internet Explorer', icon: 'internet', image: asset('icons/ie.png') },
  { id: 'projects', label: 'Projetos', icon: 'computer', image: asset('icons/projetos.png') },
  { id: 'network', label: 'Network Neighborhood', icon: 'network', image: asset('icons/networkneighborhood.jpg') },
  { id: 'contact', label: 'Contato', icon: 'mail', image: asset('icons/contato.png') },
  { id: 'trash', label: 'Lixeira', icon: 'trash', image: asset('icons/lixeira.png') },
];

const initialWindows = {
  about: { open: true, x: 270, y: 58, z: 2 },
  projects: { open: false, x: 520, y: 74, z: 1 },
  contact: { open: false, x: 250, y: 80, z: 1 },
};

const projectItems = [
  {
    title: 'Sistema de finanças pessoais',
    body: 'Sistema que permite o usuário cadastrar seus gastos por categorias, trazendo dashboard estatísticos informativos e organizados.',
    screenshot: asset('screenshots/financaspessoais.png'),
  },
  {
    title: 'Dashboard de análise de dados do Brasileirão',
    body: 'Apresenta uma visualização da classificação, jogos do mês vigente e estatísticas separadas por time do Brasileirão.',
    screenshot: asset('screenshots/brasileirao.png'),
  },
  {
    title: 'App de diário pessoal com calendário',
    body: 'Vinculado a um banco de dados, o app permite registro diários de anotações e eventos em um calendário, como um planner.',
    screenshot: asset('screenshots/diariocalendario.png'),
  },
  {
    title: 'Sistema de Atualização de Prontuários',
    body: 'Projetado para permitir que usuários façam anotações baseado em turnos de trabalho, disponibilizando-as para aprovação posterior.',
    screenshot: asset('screenshots/atualizacaodeplantao.png'),
  },
];

function App() {
  const [windows, setWindows] = useState(initialWindows);
  const [topZ, setTopZ] = useState(3);

  function openWindow(id) {
    if (!windows[id]) return;
    setWindows((current) => ({
      ...current,
      [id]: { ...current[id], open: true, z: topZ + 1 },
    }));
    setTopZ((current) => current + 1);
  }

  function closeWindow(id) {
    setWindows((current) => ({
      ...current,
      [id]: { ...current[id], open: false },
    }));
  }

  function focusWindow(id) {
    setWindows((current) => ({
      ...current,
      [id]: { ...current[id], z: topZ + 1 },
    }));
    setTopZ((current) => current + 1);
  }

  const openWindows = Object.entries(windows).filter(([, value]) => value.open);

  return (
    <main className="desktop" aria-label="Portfolio desktop estilo Windows 95">
      <section className="icon-column" aria-label="Ícones da área de trabalho">
        {desktopIcons.map((item) => (
          <button
            className="desktop-icon"
            type="button"
            key={item.id}
            onClick={() => openWindow(item.id)}
          >
            <PixelIcon type={item.icon} image={item.image} />
            <span>{item.label}</span>
          </button>
        ))}
      </section>

      <Window
        id="about"
        title="Sobre"
        icon="folder"
        state={windows.about}
        onFocus={focusWindow}
        onClose={closeWindow}
      >
        <AboutContent />
      </Window>

      <Window
        id="projects"
        title="Projetos"
        icon="computer"
        state={windows.projects}
        onFocus={focusWindow}
        onClose={closeWindow}
        large
      >
        <ProjectsContent />
      </Window>

      <Window
        id="contact"
        title="Contato"
        icon="mail"
        state={windows.contact}
        onFocus={focusWindow}
        onClose={closeWindow}
      >
        <ContactContent />
      </Window>

      <Taskbar openWindows={openWindows} onOpen={openWindow} />
    </main>
  );
}

function Window({ id, title, icon, state, onFocus, onClose, children, large, compact }) {
  if (!state.open) return null;

  return (
    <section
      className={`win-window ${large ? 'large' : ''} ${compact ? 'compact' : ''}`}
      style={{ left: state.x, top: state.y, zIndex: state.z }}
      onMouseDown={() => onFocus(id)}
      aria-label={title}
    >
      <header className="title-bar">
        <div>
          <PixelIcon type={icon} small />
          <span>{title}</span>
        </div>
        <div className="window-controls">
          <button type="button" aria-label="Minimizar" onClick={() => onClose(id)}>_</button>
          <button type="button" aria-label="Maximizar">□</button>
          <button type="button" aria-label="Fechar" onClick={() => onClose(id)}>×</button>
        </div>
      </header>
      <div className="window-body">{children}</div>
     {/* <footer className="status-bar">
        <span>Pronto</span>
        <span>{large ? '3 objetos' : '1 objeto'}</span>
      </footer> */}
    </section>
  );
}

function AboutContent() {
  return (
    <div className="about-content">
      <div className="avatar-box">
        <img src={asset('icons/user-win95.ico')} alt="Ícone de usuário" />
      </div>
      <div className="intro-copy">
        <h1>Olá! Eu sou Mylena</h1>
        <h2>Desenvolvedora de Software</h2>
      </div>
      <div className="window-rule" />
      <p>
        Sou formada em Análise e Desenvolvimento de Sistemas pela Faesa.
        Atuo de forma freelancer como desenvolvedora de sites, landing pages e soluções web.
      </p>
      <p>
        Precisa de alguma solução web para seu negócio ou para simplificar algum processo? Entre em contato.
      </p>
      <div className="stack-box">
        {/*<PixelIcon type="computer" /> */}
        <img src={asset('icons/sobre.png')} alt="Ícone de usuário" />
        <p>
          <strong>Stacks principais: </strong>
          React, JavaScript, TypeScript, HTML, CSS.
        </p>
      </div>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="projects-content">
      <h2>Projetos já desenvolvidos:</h2>
      <div className="window-rule" />
      {projectItems.map((project) => (
        <article className="project-row" key={project.title}>
          <ProjectPreview title={project.title} screenshot={project.screenshot} />
          <div>
            <h3>{project.title}</h3>
            <p>{project.body}</p>
            {/*<button type="button" className="win-button">Ver detalhes</button> */}
          </div>
        </article>
      ))}
    </div>
  );
}

function ContactContent() {
  return (
    <div className="contact-content">
      <div className="contact-heading">
        {/*<PixelIcon type="mail" /> */}
        <img src={asset('icons/contato.png')} alt="Ícone de usuário" />
        <div>
          <h2>Vamos conversar!</h2>
          <p>Entre em contato.</p>
        </div>
      </div>
      <div className="window-rule" />
      <ul>
        {/*<li><span>✉</span> mylenalb.dev@gmail.com</li> */}
        <li><FaEnvelope/>  mylenalb.dev@gmail.com</li>
        {/*<li><FaPhone/>     (27)99715-0373</li> */}
        <li><HiHome/>      Vitória, ES - Brasil</li>
        <li><FaGithub/>    github.com/mylenaleiteb</li>
        <li><FaInstagram/> @mylenalbdev</li>
      </ul>
    </div>
  );
}

function ProjectPreview({ title, screenshot }) {
  return (
    <div className="project-preview">
      <img src={screenshot} alt={`Screenshot do projeto ${title}`} />
    </div>
  );
}

function Taskbar({ openWindows, onOpen }) {
  const time = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

  return (
    <footer className="taskbar">
      <button type="button" className="start-button" aria-label="Start">
        <img className="start-mark" src={asset('icons/starticon.png')} alt="" />
        Start
      </button>
      <div className="task-items">
        {openWindows.map(([id]) => (
          <button type="button" key={id} onClick={() => onOpen(id)}>
            {id === 'about' && 'Sobre'}
            {id === 'projects' && 'Projetos'}
            {id === 'contact' && 'Contato'}
          </button>
        ))}
      </div>
      <div className="tray">
        <span>🔊</span>
        <time>{time}</time>
      </div>
    </footer>
  );
}

function PixelIcon({ type, image, small = false }) {
  if (image) {
    return <img className={`pixel-image ${small ? 'small' : ''}`} src={image} alt="" aria-hidden="true" />;
  }

  return <span className={`pixel-icon ${type} ${small ? 'small' : ''}`} aria-hidden="true" />;
}

createRoot(document.getElementById('root')).render(<App />);
