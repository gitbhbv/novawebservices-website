import ProjectForm from "./ProjectForm";

export const metadata = {
  title: "Start a Project",
  description:
    "Tell NOVA Web Services about your business and the website you want to build.",
};

const nextSteps = [
  "Share a few details about your business and what you need.",
  "I’ll review your project and reply personally by email.",
];

export default function StartProjectPage() {
  return (
    <main className="project-page">
      <section className="project-section section-dark">
        <div className="page-stars" aria-hidden="true" />
        <div className="container project-grid">
          <div className="project-intro">
            <span className="eyebrow eyebrow-dark">Start a project</span>
            <h1>Tell me about your business.</h1>
            <p className="project-lede">
              You don&apos;t need technical terms or a finished plan. A few useful details
              are enough to get the conversation started.
            </p>

            <ol className="project-steps" aria-label="What happens next">
              {nextSteps.map((step) => (
                <li key={step}>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <ProjectForm />
        </div>
      </section>
    </main>
  );
}
