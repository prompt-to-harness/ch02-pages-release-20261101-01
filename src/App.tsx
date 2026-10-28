type TimelineEntry = {
  period: string
  org: string
  role: string
  detail?: string
}

const focusAreas = [
  '机器人系统交付',
  '具身模型微调与真机适配',
  '数据评测',
  '受控 Agent 执行',
]

const education: TimelineEntry[] = [
  {
    period: '2016–2018',
    org: '天津大学',
    role: '软件工程硕士',
    detail: '主动视觉与机器人方向',
  },
  {
    period: '2012–2016',
    org: '西安电子科技大学',
    role: '软件工程本科',
  },
]

const experience: TimelineEntry[] = [
  {
    period: '2025.03–2026.10',
    org: '小米汽车机器人实验室',
    role: '高级算法工程师',
    detail: '整机系统集成、模型部署与真机适配',
  },
  {
    period: '2021.08–2025.03',
    org: '小米汽车自动驾驶部',
    role: '感知系统团队负责人',
    detail: '从 0 到 1 组建感知系统团队，负责量产交付',
  },
  {
    period: '2019.03–2021.07',
    org: 'DeepMotion.ai',
    role: '算法工程师',
    detail: '自动驾驶与泊车算法，泊车合作项目交付负责人',
  },
]

const projects = [
  {
    name: 'RoboClaws',
    description: '面向机器人开放任务的受控执行框架',
  },
  {
    name: 'RoboHarness',
    description: '面向机器人研发 Agent 的仿真测试与验收框架',
  },
  {
    name: 'intuitive-flow',
    description: '把 Agent 软件工程方法整理成稳定流程的开源总结',
  },
]

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="timeline">
      {entries.map((entry) => (
        <li className="timeline__item" key={`${entry.period}-${entry.org}`}>
          <p className="timeline__period">{entry.period}</p>
          <div className="timeline__body">
            <p className="timeline__org">{entry.org}</p>
            <p className="timeline__role">{entry.role}</p>
            {entry.detail ? <p className="timeline__detail">{entry.detail}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function App() {
  return (
    <>
      <header className="hero">
        <h1 className="hero__name">
          缪东旭
          <span className="hero__alias">MiaoDX</span>
        </h1>
        <p className="hero__intro">机器人系统技术负责人，从自动驾驶量产系统走到机器人完整任务。</p>
        <a className="hero__action" href="#projects">
          查看项目
        </a>
      </header>

      <section className="section" aria-labelledby="basic-title">
        <h2 className="section__title" id="basic-title">
          基本信息
        </h2>
        <p className="section__subtitle">现在关注</p>
        <ul className="focus">
          {focusAreas.map((area) => (
            <li className="focus__item" key={area}>
              {area}
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="education-title">
        <h2 className="section__title" id="education-title">
          教育
        </h2>
        <Timeline entries={education} />
      </section>

      <section className="section" aria-labelledby="experience-title">
        <h2 className="section__title" id="experience-title">
          工作经历
        </h2>
        <Timeline entries={experience} />
      </section>

      <section className="section projects" id="projects" aria-labelledby="projects-title">
        <h2 className="section__title" id="projects-title">
          项目与开源
        </h2>
        <ul className="projects__list">
          {projects.map((project) => (
            <li className="project-card" key={project.name}>
              <h3 className="project-card__name">{project.name}</h3>
              <p className="project-card__description">{project.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
