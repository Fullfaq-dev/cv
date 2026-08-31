import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { experience, metrics, platinum, principles, profile, projects, resume, skillGroups, type Project } from './data'
import './styles.css'

const navItems = [
  ['#top', '00 / Intro'],
  ['#projects', '01 / Projects'],
  ['#metrics', '02 / Metrics'],
  ['#experience', '03 / Experience'],
  ['#resume', '04 / Resume'],
  ['#stack', '05 / Stack'],
  ['#contact', '06 / Contact'],
]

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <article className="project-card">
      <div className="card-topline">
        <span>{project.eyebrow}</span>
        <span className={`project-mark ${project.kind}`}>{project.kind === 'public' ? 'Live' : 'NDA'}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-metrics" aria-label="Проектные ориентиры">
        {project.metrics.slice(0, 2).map((metric) => <span key={metric}>{metric}</span>)}
      </div>
      <div className="tag-list">
        {project.stack.slice(0, 6).map((item) => <span key={item}>{item}</span>)}
        {project.stack.length > 6 && <span>+{project.stack.length - 6}</span>}
      </div>
      <button className="text-button" onClick={() => onOpen(project)}>
        {project.kind === 'public' ? 'Открыть кейс ↗' : 'Подробнее о подходе →'}
      </button>
    </article>
  )
}

const IPHONE_WIDTH = 390
const IPHONE_HEIGHT = 844

function ShowcaseCarousel({ project }: { project: Project }) {
  const images = project.gallery ?? []
  const hasPhone = Boolean(project.phonePreview)
  const total = images.length + (hasPhone ? 1 : 0)
  const [index, setIndex] = useState(0)
  const startX = useRef(0)
  const dragging = useRef(false)
  const phoneSlide = images.length
  const isWide = project.galleryLayout === 'wide'

  const go = (delta: number) => {
    setIndex((current) => (current + delta + total) % total)
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button, a')) return
    dragging.current = true
    startX.current = event.clientX
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    dragging.current = false
    const delta = event.clientX - startX.current
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1)
  }

  return (
    <div className={`showcase-carousel ${isWide ? 'wide' : ''} ${total < 2 ? 'single' : ''}`} aria-roledescription="carousel" aria-label={`Галерея ${project.title}`}>
      <div
        className="showcase-viewport"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="showcase-track" style={{ transform: `translateX(calc(-${index} * var(--slide-width)))` }}>
          {images.map((image) => (
            <figure className="showcase-slide" key={image.src}>
              <div className="screenshot-slide">
                <img src={image.src} alt={image.alt} draggable={false} />
              </div>
            </figure>
          ))}
          {hasPhone && (
            <figure className="showcase-slide">
              <div className="iphone">
                <span className="iphone-island" aria-hidden="true" />
                <div className="iphone-screen">
                  <iframe
                    title={`Превью ${project.title}`}
                    src={project.phonePreview}
                    width={IPHONE_WIDTH}
                    height={IPHONE_HEIGHT}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                </div>
              </div>
            </figure>
          )}
        </div>
      </div>
      {total > 1 && (
        <>
          <button className="showcase-nav prev" onClick={() => go(-1)} aria-label="Предыдущий слайд" type="button">‹</button>
          <button className="showcase-nav next" onClick={() => go(1)} aria-label="Следующий слайд" type="button">›</button>
          <div className="showcase-dots" role="tablist" aria-label="Слайды галереи">
            {Array.from({ length: total }, (_, slide) => (
              <button
                key={slide}
                className={slide === index ? 'active' : ''}
                onClick={() => setIndex(slide)}
                type="button"
                role="tab"
                aria-selected={slide === index}
                aria-label={slide === phoneSlide ? 'Live-страница в iPhone' : `Скриншот ${slide + 1}`}
              />
            ))}
          </div>
        </>
      )}
      {index === phoneSlide && project.url ? (
        <a href={project.url} target="_blank" rel="noreferrer">Открыть live-пример ↗</a>
      ) : total > 1 ? (
        <span>{index + 1} / {total}</span>
      ) : null}
    </div>
  )
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const isPresentation = project.id === 'seo-magic' && project.embed

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section className={`project-dialog ${isPresentation ? 'presentation-dialog' : ''} ${project.gallery ? 'gallery-dialog' : ''} ${project.galleryLayout === 'wide' ? 'wide-gallery' : ''}`} role="dialog" aria-modal="true" aria-labelledby="project-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Закрыть">×</button>
        {isPresentation ? (
          <div className="presentation-frame">
            <h2 id="project-title" className="sr-only">Презентация {project.title}</h2>
            <iframe title={`Презентация ${project.title}`} src={project.embed} loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups" />
            <a href={project.url} target="_blank" rel="noreferrer">Открыть презентацию в новой вкладке ↗</a>
          </div>
        ) : (
          <>
            <span className="eyebrow">{project.eyebrow}</span>
            <h2 id="project-title">{project.title}</h2>
            <p className="dialog-description">{project.description}</p>
            <div className={`case-layout ${project.gallery ? 'with-gallery' : ''} ${project.galleryLayout === 'wide' ? 'wide' : ''}`}>
              <div>
                <h3>Что сделано</h3>
                <ul className="impact-list">{project.impact.map((item) => <li key={item}>{item}</li>)}</ul>
                <h3 className="dialog-subtitle">Проектные ориентиры</h3>
                <ul className="project-metrics full">{project.metrics.map((metric) => <li key={metric}>{metric}</li>)}</ul>
                <h3 className="dialog-subtitle">Полный стек</h3>
                <div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
              {project.gallery ? (
                <ShowcaseCarousel project={project} />
              ) : project.embed ? (
                <div className="embed-wrap">
                  <iframe title={`Превью ${project.title}`} src={project.embed} loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups" />
                  <a href={project.url} target="_blank" rel="noreferrer">Открыть сайт в новой вкладке ↗</a>
                </div>
              ) : (
                <div className="screenshot-placeholder">
                  <p>Внешний вид и данные намеренно скрыты условиями NDA.</p>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

function ResumeDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="project-dialog presentation-dialog resume-dialog" role="dialog" aria-modal="true" aria-labelledby="resume-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Закрыть">×</button>
        <div className="presentation-frame">
          <h2 id="resume-title" className="sr-only">Резюме Максима Кочергина</h2>
          <iframe title="Резюме Максима Кочергина" src={resume.preview} />
          <div className="resume-actions">
            <a href={resume.pdf} download={resume.downloadName}>Скачать PDF ↓</a>
            <a href={resume.preview} target="_blank" rel="noreferrer">Открыть в новой вкладке ↗</a>
          </div>
        </div>
      </section>
    </div>
  )
}

function AnimatedValue({ value, unit }: { value: number; unit: string }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const duration = 700
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setDisplay(value * (1 - (1 - progress) ** 3))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])

  const formatted = Number.isInteger(value) ? Math.round(display) : display.toFixed(2)
  return <strong>{formatted}<small>{unit}</small></strong>
}

export default function App() {
  const [filter, setFilter] = useState<'all' | 'public' | 'nda'>('all')
  const [selected, setSelected] = useState<Project | null>(null)
  const [resumeOpen, setResumeOpen] = useState(false)
  const [metricId, setMetricId] = useState(metrics.scenarios[0].id)
  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === 'all' || project.kind === filter),
    [filter],
  )
  const activeScenario = metrics.scenarios.find((scenario) => scenario.id === metricId) ?? metrics.scenarios[0]

  useEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ''))
      if (!id) return
      if (id === 'top') {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        return
      }
      const node = document.getElementById(id)
      node?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }

    history.scrollRestoration = 'manual'
    const frame = requestAnimationFrame(scrollToHash)
    const timer = window.setTimeout(scrollToHash, 80)
    window.addEventListener('hashchange', scrollToHash)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [])

  return (
    <div className="site-shell" id="top">
      <aside className="sidebar">
        <a className="monogram" href="#top" aria-label="На главную">MK<span>.</span></a>
        <nav aria-label="Навигация">
          {navItems.map(([href, label]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <div className="sidebar-foot">
          <button className="theme-switch" type="button" aria-label="Переключить тему" aria-pressed="false">
            <span className="theme-switch-front">---</span>
            <span className="theme-switch-orb" aria-hidden="true"><i /></span>
            <span className="theme-switch-label">theme: <em data-theme-label>auto</em></span>
          </button>
          <p className="sidebar-status"><i /> available for work</p>
        </div>
      </aside>

      <main>
        <section className="hero section">
          <div className="hero-meta">
            <span>portfolio / 2026</span>
            <span>{profile.location}</span>
          </div>
          <p className="eyebrow">AI product engineering / {profile.specialization}</p>
          <h1>Делаю сложные<br /><em>AI-системы</em> понятными.</h1>
          <div className="hero-bottom">
            <p>{profile.intro}</p>
            <a className="primary-link" href="#projects">Смотреть проекты <span>↓</span></a>
          </div>
        </section>

        <section className="principles section">
          <p className="section-index">[ инженерный подход ]</p>
          <div className="principle-grid">
            {principles.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="section-heading">
            <div><p className="section-index">[ выбранные работы ]</p><h2>Проекты</h2></div>
            <div className="filter-group" aria-label="Фильтр проектов">
              {([['all', 'Все'], ['public', 'Public'], ['nda', 'NDA safe']] as const).map(([key, label]) => (
                <button className={filter === key ? 'active' : ''} onClick={() => setFilter(key)} key={key}>{label}</button>
              ))}
            </div>
          </div>
          <div className="projects-grid">
            {visibleProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelected} />)}
          </div>
          <p className="nda-note">NDA safe — описаны моя роль, инженерные решения и стек. Внутренние данные, клиенты и интерфейсы не публикуются.</p>
        </section>

        <section id="metrics" className="section metrics-section">
          <p className="section-index">[ measurement without cargo cult ]</p>
          <h2>Метрики</h2>
          <div className="metrics-dashboard">
            <div className="metric-control">
              <p className="eyebrow">{metrics.law.title}</p>
              <blockquote>«{metrics.law.quote}»</blockquote>
              <p>{metrics.law.note}</p>
              <div className="scenario-tabs" role="tablist" aria-label="Сценарии метрик">
                {metrics.scenarios.map((scenario) => (
                  <button
                    className={scenario.id === metricId ? 'active' : ''}
                    key={scenario.id}
                    onClick={() => setMetricId(scenario.id)}
                    role="tab"
                    aria-selected={scenario.id === metricId}
                  >
                    {scenario.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="metric-stage" key={activeScenario.id}>
              <p className="metric-title">{activeScenario.metric}</p>
              <div className="metric-comparison">
                <div className="metric-value before">
                  <span>До</span>
                  <AnimatedValue value={activeScenario.before} unit={activeScenario.unit} />
                </div>
                <div className="metric-arrow" aria-hidden="true">→</div>
                <div className="metric-value after">
                  <span>После</span>
                  <AnimatedValue value={activeScenario.after} unit={activeScenario.unit} />
                </div>
              </div>
              <div className="metric-delta">{activeScenario.delta}</div>
              <p className="metric-note">{activeScenario.note}</p>
            </div>
          </div>
        </section>

        <section id="experience" className="section experience-section">
          <p className="section-index">[ траектория ]</p>
          <h2>Опыт</h2>
          <div className="timeline">
            {experience.map((job) => (
              <article className="job" key={job.company}>
                <div className="job-date">{job.period}</div>
                <div>
                  <p className="job-company">{job.company}</p>
                  <h3>{job.role}</h3>
                  <p>{job.summary}</p>
                  <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="elden-ring" className="section platinum-section" aria-labelledby="platinum-title">
          <p className="section-index">[ off the clock ]</p>
          <article className="platinum-card">
            <img src={platinum.image} alt={platinum.imageAlt} width="390" height="844" />
            <div>
              <p className="eyebrow">{platinum.platform} · {platinum.kind}</p>
              <h2 id="platinum-title">Elden <em>Ring</em></h2>
              <p className="platinum-complete">{platinum.obtained} / {platinum.available} призов · {platinum.date}</p>
              <div className="platinum-copy">
                {platinum.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="platinum-stats" aria-label="Состав трофеев">
                <span>Platinum {platinum.platinum}</span>
                <span>Gold {platinum.gold}</span>
                <span>Silver {platinum.silver}</span>
                <span>Bronze {platinum.bronze}</span>
              </div>
            </div>
          </article>
        </section>

        <section id="resume" className="section resume-section">
          <p className="section-index">[ для заказчика ]</p>
          <h2>Резюме</h2>
          <p className="resume-lead">Короткое резюме для рекрутера: роль, результаты и стек. Подробные кейсы — на этом сайте.</p>
          <div className="resume-cta">
            <button type="button" className="resume-button" onClick={() => setResumeOpen(true)}>Смотреть резюме</button>
            <a className="resume-button ghost" href={resume.pdf} download={resume.downloadName}>Скачать PDF ↓</a>
          </div>
        </section>

        <section id="stack" className="section stack-section">
          <p className="section-index">[ toolbox ]</p>
          <h2>Стек и компетенции</h2>
          <div className="skill-list">
            {skillGroups.map(([group, skills]) => <div key={group}><strong>{group}</strong><span>{skills}</span></div>)}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <p className="section-index">[ давайте обсудим задачу ]</p>
          <h2>Есть продукт,<br />которому нужен <em>AI?</em></h2>
          <a href={profile.telegram} className="contact-link" target="_blank" rel="noreferrer">Написать в Telegram <span>↗</span></a>
          <footer>
            <span>© 2026 Максим Кочергин</span>
            <span>{profile.role}</span>
            <a href="/ai.html">AI / parser version</a>
          </footer>
        </section>
      </main>
      {selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}
      {resumeOpen && <ResumeDialog onClose={() => setResumeOpen(false)} />}
    </div>
  )
}
