import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import PageHeader from "../components/PageHeader";

const overview = [
  {
    label: "Eventos",
    detail: "Atividades cadastradas",
    path: "/eventos",
    mark: "EV",
    tone: "coral"
  },
  {
    label: "Turmas",
    detail: "Grupos participantes",
    path: "/turmas",
    mark: "TU",
    tone: "violet"
  },
  {
    label: "Estudantes",
    detail: "Participantes registrados",
    path: "/estudantes",
    mark: "ES",
    tone: "amber"
  },
  {
    label: "Pesquisas",
    detail: "Registros de campo",
    path: "/pesquisas",
    mark: "PC",
    tone: "blue"
  }
];

const steps = [
  {
    number: "01",
    title: "Organize um evento",
    description: "Cadastre a atividade e defina as informações principais.",
    path: "/eventos"
  },
  {
    number: "02",
    title: "Prepare as turmas",
    description: "Agrupe as turmas e mantenha os participantes organizados.",
    path: "/turmas"
  },
  {
    number: "03",
    title: "Registre estudantes",
    description: "Inclua os estudantes que participarão da atividade.",
    path: "/estudantes"
  },
  {
    number: "04",
    title: "Acompanhe a pesquisa",
    description: "Consulte e atualize os registros feitos em campo.",
    path: "/pesquisas"
  }
];

export default function Dashboard() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasLoadError, setHasLoadError] = useState(false);

  useEffect(() => {
    Promise.allSettled(
      ["/eventos", "/turmas", "/estudantes", "/pesquisas"].map((path) =>
        api.get(path)
      )
    ).then((results) => {
      setCounts((currentCounts) =>
        results.map((result, index) =>
          result.status === "fulfilled" ? result.value.data.length : currentCounts[index]
        )
      );
      setHasLoadError(results.some((result) => result.status === "rejected"));
    });
  }, []);

  return (
    <div className="dashboard">
      <PageHeader
        title="Visão geral"
        description="Acompanhe os dados e organize suas pesquisas de campo."
      />

      {hasLoadError && (
        <div className="error" role="status">
          Alguns dados não puderam ser carregados. Atualize a página para tentar novamente.
        </div>
      )}

      <section className="dashboard-welcome">
        <div>
          <span className="dashboard-eyebrow">PAINEL DE CONTROLE</span>
          <h2>Seu trabalho, em perspectiva.</h2>
          <p>
            Acompanhe eventos, turmas e participantes em um só lugar.
          </p>
        </div>
        <div className="welcome-stamp" aria-hidden="true">
          <span>CAMPO</span>
          <strong>01</strong>
          <span>Fundação Bradesco</span>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-eyebrow">RESUMO</span>
            <h2>Seu sistema em números</h2>
          </div>
          <span className="dashboard-live"><i /> Dados do sistema</span>
        </div>
        <div className="stats">
          {overview.map((item, index) => (
            <Link
              className={`dashboard-stat stat-${item.tone}`}
              to={item.path}
              key={item.label}
            >
              <span className="stat-topline">
                <span className="stat-mark">{item.mark}</span>
                <span className="stat-arrow" aria-hidden="true">↗</span>
              </span>
              <span className="stat-value">{counts[index]}</span>
              <span className="stat-label">{item.label}</span>
              <span className="stat-detail">{item.detail}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboard-section workflow">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-eyebrow">COMO COMEÇAR</span>
            <h2>Etapas do acompanhamento</h2>
          </div>
          <Link className="workflow-all" to="/pesquisas">
            Ir para pesquisas <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="workflow-grid">
          {steps.map((step) => (
            <Link className="workflow-step" to={step.path} key={step.number}>
              <span className="workflow-number">{step.number}</span>
              <span className="workflow-copy">
                <strong>{step.title}</strong>
                <span>{step.description}</span>
              </span>
              <span className="workflow-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
