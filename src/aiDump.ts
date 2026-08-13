import { experience, metrics, principles, profile, projects, resume, skillGroups } from './data'

const NDAs =
  'NDA-кейсы описаны без клиентских названий, внутренних URL, ключей, персональных данных кандидатов и секретов. Ниже — публично допустимый инженерный слой: роль, стек, подход и результаты.'

function esc(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function buildAiDocument() {
  return {
    format: 'maxim-kochergin-portfolio-ai-dump',
    version: 1,
    language: 'ru',
    audience: 'AI recruiters, parsers, crawlers, LLM agents',
    javascript_required: false,
    nda: NDAs,
    person: {
      fullName: resume.fullName,
      name: profile.name,
      role: profile.role,
      grade: resume.grade,
      years: resume.years,
      intro: profile.intro,
      summary: resume.summary,
      location: profile.location,
      city: resume.city,
      citizenship: resume.citizenship,
      languages: resume.languages,
      availability: resume.availability,
      telegram: profile.telegram,
      approach: resume.approach,
    },
    files: {
      human_version: '/human.html',
      ai_html: '/ai.html',
      llms_txt: '/llms.txt',
      json: '/ai.json',
      resume_html: resume.preview,
      resume_pdf: resume.pdf,
      resume_download_name: resume.downloadName,
    },
    principles: principles.map(([id, title, text]) => ({ id, title, text })),
    skills: Object.fromEntries(skillGroups) as Record<string, string>,
    aiFocus: resume.aiFocus,
    education: resume.education,
    experience,
    detailedJobs: resume.detailedJobs,
    metrics,
    projects: projects.map((project) => ({
      ...project,
      gallery: project.gallery?.map((image) => ({
        ...image,
        src: image.src,
      })),
    })),
    notes: [
      'Метрики в проектах — проектные ориентиры, не аудированные KPI, кроме явно указанного FTE в Operational Recovery.',
      'Публичные продукты можно открывать по url/embed. NDA-проекты без публичного URL.',
    ],
  }
}

export function renderAiJson() {
  return `${JSON.stringify(buildAiDocument(), null, 2)}\n`
}

export function renderLlmsTxt() {
  const doc = buildAiDocument()
  const lines: string[] = [
    `# ${doc.person.fullName}`,
    `${doc.person.role} · ${doc.person.grade} · опыт ${doc.person.years}`,
    '',
    'Machine-readable portfolio dump. No JavaScript. Parse this file or /ai.html or /ai.json.',
    '',
    doc.nda,
    '',
    '## Person',
    `- Name: ${doc.person.name}`,
    `- Full name: ${doc.person.fullName}`,
    `- Role: ${doc.person.role}`,
    `- Location: ${doc.person.city}; ${doc.person.location}`,
    `- Citizenship: ${doc.person.citizenship}`,
    `- Languages: ${doc.person.languages.map((item) => `${item.name} (${item.level})`).join(', ')}`,
    `- Availability: ${doc.person.availability}`,
    `- Telegram: ${doc.person.telegram}`,
    '',
    '## Summary',
    doc.person.summary,
    '',
    '## Intro',
    doc.person.intro,
    '',
    '## Approach',
    doc.person.approach,
    '',
    '## Principles',
    ...doc.principles.flatMap((item) => [`- ${item.id} ${item.title}: ${item.text}`]),
    '',
    '## AI and automation',
    ...doc.aiFocus.map((item) => `- ${item}`),
    '',
    '## Skills',
    ...Object.entries(doc.skills).map(([group, skills]) => `- ${group}: ${skills}`),
    '',
    '## Education',
    ...doc.education.map((item) => `- ${item.year} — ${item.place}. ${item.degree}. ${item.field}`),
    '',
    '## Experience (detailed)',
  ]

  for (const job of doc.detailedJobs) {
    lines.push(`### ${job.company} — ${job.role} (${job.period})`)
    lines.push(job.summary)
    lines.push(...job.points.map((point) => `- ${point}`))
    lines.push(`Stack: ${job.stack.join(', ')}`)
    lines.push('')
  }

  lines.push('## Metrics note')
  lines.push(`${doc.metrics.law.title}: ${doc.metrics.law.quote}`)
  lines.push(doc.metrics.law.note)
  lines.push('')
  for (const scenario of doc.metrics.scenarios) {
    lines.push(`- ${scenario.label}: ${scenario.metric}. ${scenario.before} → ${scenario.after} ${scenario.unit} (${scenario.delta}). ${scenario.note}`)
  }

  lines.push('', '## Projects')
  for (const project of doc.projects) {
    lines.push(`### ${project.title}`)
    lines.push(`- id: ${project.id}`)
    lines.push(`- kind: ${project.kind}`)
    lines.push(`- eyebrow: ${project.eyebrow}`)
    lines.push(`- description: ${project.description}`)
    if (project.url) lines.push(`- url: ${project.url}`)
    if (project.embed) lines.push(`- embed: ${project.embed}`)
    if (project.phonePreview) lines.push(`- phonePreview: ${project.phonePreview}`)
    if (project.galleryLayout) lines.push(`- galleryLayout: ${project.galleryLayout}`)
    lines.push('- impact:')
    lines.push(...project.impact.map((item) => `  - ${item}`))
    lines.push(`- stack: ${project.stack.join(', ')}`)
    lines.push('- metrics:')
    lines.push(...project.metrics.map((item) => `  - ${item}`))
    if (project.gallery?.length) {
      lines.push('- gallery:')
      lines.push(...project.gallery.map((image) => `  - ${image.src} — ${image.alt}`))
    }
    if (project.mediaHint) lines.push(`- mediaHint: ${project.mediaHint}`)
    lines.push('')
  }

  lines.push('## Files')
  for (const [key, value] of Object.entries(doc.files)) {
    lines.push(`- ${key}: ${value}`)
  }
  lines.push('', '## Notes')
  lines.push(...doc.notes.map((item) => `- ${item}`))
  lines.push('')
  return lines.join('\n')
}

export function renderAiHtml() {
  const doc = buildAiDocument()
  const json = JSON.stringify(doc, null, 2)
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: doc.person.fullName,
    jobTitle: doc.person.role,
    url: '/ai.html',
    sameAs: [doc.person.telegram],
    knowsLanguage: doc.person.languages.map((item) => item.name),
    address: { '@type': 'PostalAddress', addressLocality: doc.person.city, addressCountry: 'RU' },
  }

  const projectHtml = doc.projects.map((project) => `
<article id="${esc(project.id)}">
<h3>${esc(project.title)}</h3>
<p>id: ${esc(project.id)}</p>
<p>kind: ${esc(project.kind)}</p>
<p>eyebrow: ${esc(project.eyebrow)}</p>
<p>${esc(project.description)}</p>
${project.url ? `<p>url: <a href="${esc(project.url)}">${esc(project.url)}</a></p>` : ''}
${project.embed ? `<p>embed: <a href="${esc(project.embed)}">${esc(project.embed)}</a></p>` : ''}
${project.phonePreview ? `<p>phonePreview: <a href="${esc(project.phonePreview)}">${esc(project.phonePreview)}</a></p>` : ''}
${project.galleryLayout ? `<p>galleryLayout: ${esc(project.galleryLayout)}</p>` : ''}
<p>impact:</p>
<ul>${project.impact.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
<p>stack: ${esc(project.stack.join(', '))}</p>
<p>metrics:</p>
<ul>${project.metrics.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
${project.gallery?.length ? `<p>gallery:</p><ul>${project.gallery.map((image) => `<li><a href="${esc(image.src)}">${esc(image.src)}</a> — ${esc(image.alt)}</li>`).join('')}</ul>` : ''}
${project.mediaHint ? `<p>mediaHint: ${esc(project.mediaHint)}</p>` : ''}
</article>`).join('\n')

  const jobsHtml = doc.detailedJobs.map((job) => `
<article>
<h3>${esc(job.company)} — ${esc(job.role)}</h3>
<p>${esc(job.period)}</p>
<p>${esc(job.summary)}</p>
<ul>${job.points.map((point) => `<li>${esc(point)}</li>`).join('')}</ul>
<p>stack: ${esc(job.stack.join(', '))}</p>
</article>`).join('\n')

  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="index,follow" />
<meta name="description" content="Machine-readable portfolio dump for Максим Кочергин. No JavaScript required." />
<link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
<link rel="alternate" type="application/json" href="/ai.json" title="JSON dump" />
<link rel="alternate" href="/human.html" title="Human version" />
<title>AI / parser version — ${esc(doc.person.fullName)}</title>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<p>This page is the AI / parser / recruiter-bot version. No visual design. JavaScript is not required.</p>
<p>Other copies of the same data: <a href="/llms.txt">/llms.txt</a>, <a href="/ai.json">/ai.json</a>. Human UI: <a href="/human.html">/human.html</a>.</p>
<p>${esc(doc.nda)}</p>

<h1>${esc(doc.person.fullName)}</h1>
<p>${esc(doc.person.role)} · ${esc(doc.person.grade)} · опыт ${esc(doc.person.years)}</p>
<dl>
<dt>Name</dt><dd>${esc(doc.person.name)}</dd>
<dt>Location</dt><dd>${esc(doc.person.city)}; ${esc(doc.person.location)}</dd>
<dt>Citizenship</dt><dd>${esc(doc.person.citizenship)}</dd>
<dt>Languages</dt><dd>${esc(doc.person.languages.map((item) => `${item.name} (${item.level})`).join(', '))}</dd>
<dt>Availability</dt><dd>${esc(doc.person.availability)}</dd>
<dt>Telegram</dt><dd><a href="${esc(doc.person.telegram)}">${esc(doc.person.telegram)}</a></dd>
<dt>Resume PDF</dt><dd><a href="${esc(doc.files.resume_pdf)}">${esc(doc.files.resume_pdf)}</a></dd>
<dt>Resume HTML</dt><dd><a href="${esc(doc.files.resume_html)}">${esc(doc.files.resume_html)}</a></dd>
</dl>

<h2>Summary</h2>
<p>${esc(doc.person.summary)}</p>
<h2>Intro</h2>
<p>${esc(doc.person.intro)}</p>
<h2>Approach</h2>
<p>${esc(doc.person.approach)}</p>

<h2>Principles</h2>
<ul>${doc.principles.map((item) => `<li>${esc(item.id)} ${esc(item.title)}: ${esc(item.text)}</li>`).join('')}</ul>

<h2>AI and automation</h2>
<ul>${doc.aiFocus.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>

<h2>Skills</h2>
<dl>${Object.entries(doc.skills).map(([group, skills]) => `<dt>${esc(group)}</dt><dd>${esc(skills)}</dd>`).join('')}</dl>

<h2>Education</h2>
<ul>${doc.education.map((item) => `<li>${esc(item.year)} — ${esc(item.place)}. ${esc(item.degree)}. ${esc(item.field)}</li>`).join('')}</ul>

<h2>Experience</h2>
${jobsHtml}

<h2>Metrics</h2>
<p>${esc(doc.metrics.law.title)}: ${esc(doc.metrics.law.quote)}</p>
<p>${esc(doc.metrics.law.note)}</p>
<ul>${doc.metrics.scenarios.map((scenario) => `<li>${esc(scenario.label)}: ${esc(scenario.metric)}. ${scenario.before} → ${scenario.after} ${esc(scenario.unit)} (${esc(scenario.delta)}). ${esc(scenario.note)}</li>`).join('')}</ul>

<h2>Projects</h2>
${projectHtml}

<h2>Notes</h2>
<ul>${doc.notes.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>

<h2>Raw JSON</h2>
<p>Same payload as <a href="/ai.json">/ai.json</a>.</p>
<script type="application/json" id="portfolio-data">${json}</script>
<pre>${esc(json)}</pre>
</body>
</html>
`
}
