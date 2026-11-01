import { useEffect, useState } from 'react'

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

const navItems = [
  { id: 'intro', label: '首页' },
  { id: 'basic', label: '基本信息' },
  { id: 'education', label: '教育' },
  { id: 'experience', label: '工作经历' },
  { id: 'projects', label: '项目与开源' },
]

/*
 * 首屏背景的斜线网络。
 * 参考页的纹样是「少量贯穿整幅画布的长直线」，角度各不相同、间距也不规则，
 * 交叉后形成大小不一的多边形——不是规整的菱形网格。
 * 这里用 [斜率, x=0 处的 y 截距] 描述每条线，角度取自参考页实测值。
 */
const heroPatternLines: Array<[number, number]> = [
  [-0.527, 250],
  [-0.527, 640],
  [-0.527, 969],
  [-0.527, 1526],
  [-0.527, 1926],
  [0.126, 756],
  [0.302, 290],
  [0.302, 640],
  [0.505, -245],
  [0.781, -979],
  [1.317, -2397],
  [3.006, -6866],
]

type FocusIconKind = 'delivery' | 'tuning' | 'evaluation' | 'agent'

const focusIconKinds: FocusIconKind[] = ['delivery', 'tuning', 'evaluation', 'agent']

function FocusIcon({ kind }: { kind: FocusIconKind }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {kind === 'delivery' && (
        <>
          <rect x="4" y="8" width="16" height="11" rx="2.5" />
          <circle cx="9.5" cy="13.5" r="1.3" />
          <circle cx="14.5" cy="13.5" r="1.3" />
          <path d="M12 4.6v3.4" />
          <circle cx="12" cy="3.2" r="1.2" />
          <path d="M2.5 13v3.5M21.5 13v3.5" />
        </>
      )}
      {kind === 'tuning' && (
        <>
          <rect x="7" y="7" width="10" height="10" rx="1.6" />
          <path d="M10 2.8v4.2M14 2.8v4.2M10 17v4.2M14 17v4.2M2.8 10H7M2.8 14H7M17 10h4.2M17 14h4.2" />
        </>
      )}
      {kind === 'evaluation' && (
        <>
          <path d="M3.4 17.6a9.2 9.2 0 1 1 17.2 0" />
          <path d="M12 17.6l4.2-5.4" />
          <circle cx="12" cy="17.6" r="1.4" />
        </>
      )}
      {kind === 'agent' && (
        <>
          <rect x="3" y="4.5" width="18" height="15" rx="2" />
          <path d="M7 10l2.5 2.5L7 15" />
          <path d="M12.5 15.5H17" />
        </>
      )}
    </svg>
  )
}

function EntryList({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ul className="entries">
      {entries.map((entry, index) => (
        <li
          className="entry reveal"
          key={`${entry.period}-${entry.org}`}
          style={{ transitionDelay: `${index * 0.08}s` }}
        >
          <p className="entry__period">{entry.period}</p>
          <div className="entry__body">
            <p className="entry__org">{entry.org}</p>
            <p className="entry__role">{entry.role}</p>
            {entry.detail ? <p className="entry__detail">{entry.detail}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState('intro')

  // 当前区块高亮：视口中线穿过哪个 section，哪个就是当前项
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))
    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue
          }
          const id = entry.target.getAttribute('data-section')
          if (id) {
            setActiveSection(id)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // 滚动进入视口的元素淡入
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (items.length === 0) {
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      items.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue
          }
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar__inner">
          <p className="sidebar__brand">缪东旭</p>
          <nav className="sidebar__nav" aria-label="主导航">
            <ul>
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <li key={item.id}>
                    <a
                      className={`sidebar__link${isActive ? ' is-active' : ''}`}
                      href={`#${item.id}`}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </aside>

      <main className="page">
        <section
          id="intro"
          data-section="intro"
          className="panel panel--style1 panel--fullscreen"
        >
          <svg
            className="hero__pattern"
            viewBox="0 0 2342 1058"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            focusable="false"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
              {heroPatternLines.map(([slope, intercept]) => (
                <path
                  key={`${slope}-${intercept}`}
                  d={`M -600 ${Math.round(intercept + slope * -600)} L 2942 ${Math.round(
                    intercept + slope * 2942,
                  )}`}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>
          </svg>
          <div className="panel__inner">
            <h1 className="panel__title reveal">
              缪东旭
              <span className="intro__alias">MiaoDX</span>
            </h1>
            <p className="intro__lead reveal" style={{ transitionDelay: '0.12s' }}>
              机器人系统技术负责人，从自动驾驶量产系统走到机器人完整任务。
            </p>
            <div className="intro__actions reveal" style={{ transitionDelay: '0.24s' }}>
              <a className="button" href="#projects">
                <span className="button__label">查看项目</span>
              </a>
            </div>
          </div>
        </section>

        <section id="basic" data-section="basic" className="panel panel--style2">
          <div className="panel__inner">
            <h2 className="panel__title reveal">基本信息</h2>
            <p className="panel__subtitle reveal">现在关注</p>
            <ul className="chips">
              {focusAreas.map((area, index) => (
                <li
                  className="chip reveal"
                  key={area}
                  style={{ transitionDelay: `${index * 0.08}s` }}
                >
                  <span className="chip__icon">
                    <FocusIcon kind={focusIconKinds[index]} />
                  </span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="education" data-section="education" className="panel panel--style3">
          <div className="panel__inner">
            <h2 className="panel__title reveal">教育</h2>
            <EntryList entries={education} />
          </div>
        </section>

        <section
          id="experience"
          data-section="experience"
          className="panel panel--style2-alt"
        >
          <div className="panel__inner">
            <h2 className="panel__title reveal">工作经历</h2>
            <EntryList entries={experience} />
          </div>
        </section>

        <section id="projects" data-section="projects" className="panel panel--style1-alt">
          <div className="panel__inner">
            <h2 className="panel__title reveal">项目与开源</h2>
            <ul className="projects">
              {projects.map((project, index) => (
                <li
                  className="project reveal"
                  key={project.name}
                  style={{ transitionDelay: `${index * 0.08}s` }}
                >
                  <h3 className="project__name">{project.name}</h3>
                  <p className="project__description">{project.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <ul className="menu">
            <li>© 缪东旭 · MiaoDX</li>
            <li>
              <a href="https://html5up.net/hyperspace" target="_blank" rel="noopener noreferrer">
                风格参考：Hyperspace by HTML5 UP
              </a>
            </li>
            <li>
              <a href="https://html5up.net/license" target="_blank" rel="noopener noreferrer">
                原模板基于 CCA 3.0 授权发布
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}
