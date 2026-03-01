const experienceData = [
  {
    period: '2019 - 2024',
    title: '신한은행 여신서비스개발부 · 백엔드 개발자',
    description: '여신 코어 시스템 개발/유지보수, 배치 및 연계 프로세스 운영으로 금융 업무 안정성을 확보했습니다.'
  },
  {
    period: 'NOW',
    title: 'Kubernetes 클러스터 관리',
    description: '클러스터 리소스 운영, 장애 대응 표준화, 운영 가시성 개선을 중심으로 플랫폼 신뢰성을 높이고 있습니다.'
  },
  {
    period: 'NOW',
    title: 'CI/CD · 물리 서버 운영',
    description: '배포 자동화와 물리 서버 관리 체계를 병행하며 운영 효율과 배포 품질을 강화했습니다.'
  }
];

const projects = [
  {
    title: '생일 방명록 페이지',
    stack: 'Backend API · DB · Web',
    summary: '지인들이 메시지를 남길 수 있는 방명록 서비스',
    detail: '글 작성/조회/관리 흐름을 설계하고 간단한 운영 관리 기능까지 포함한 서비스로 구현했습니다.'
  },
  {
    title: '밴드부 운영 프로그램',
    stack: '관리 시스템',
    summary: '일정·멤버·운영 이력 관리 도구',
    detail: '밴드 운영에 필요한 반복 작업을 줄이기 위해 일정, 멤버 정보, 운영 기록을 한곳에서 관리하게 구성했습니다.'
  },
  {
    title: '바이낸스 연동 코인 자동 매매 프로그램',
    stack: 'Binance API · Bot',
    summary: 'API 연동 기반 자동 매매 실험 프로젝트',
    detail: '전략 기반 주문 실행, 실행 로그, 실패 복구 흐름을 구현하여 자동화 루프를 안정적으로 운영했습니다.'
  },
  {
    title: '개인 온라인 커머스 관리 프로그램',
    stack: 'Backoffice · Inventory',
    summary: '주문/재고/운영 통합 관리 툴',
    detail: '운영 관점에서 자주 발생하는 수작업을 자동화하고 데이터 조회 흐름을 단순화해 운영 속도를 개선했습니다.'
  }
];

const timeline = document.getElementById('timeline');
const projectList = document.getElementById('projectList');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

timeline.innerHTML = experienceData
  .map(
    (item) => `
      <article class="timeline-item">
        <small>${item.period}</small>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </article>
    `
  )
  .join('');

projectList.innerHTML = projects
  .map(
    (project, index) => `
      <article class="project-card" data-project-index="${index}" role="button" tabindex="0" aria-label="${project.title} 상세 보기">
        <small>${project.stack}</small>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
      </article>
    `
  )
  .join('');

const modal = document.getElementById('detailModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

function openProjectDetail(index) {
  const project = projects[index];
  if (!project) return;
  modalTitle.textContent = project.title;
  modalBody.textContent = project.detail;
  modal.showModal();
}

document.addEventListener('click', (event) => {
  const card = event.target.closest('[data-project-index]');
  if (card) {
    openProjectDetail(Number(card.dataset.projectIndex));
  }
});

document.addEventListener('keydown', (event) => {
  const card = event.target.closest('[data-project-index]');
  if (card && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    openProjectDetail(Number(card.dataset.projectIndex));
  }
});

document.getElementById('closeModal').addEventListener('click', () => modal.close());

menuBtn.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

document.querySelectorAll('.menu a').forEach((link) => {
  link.addEventListener('click', () => menu.classList.remove('open'));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));

const menuLinks = [...document.querySelectorAll('.menu a')];
const sections = menuLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      menuLinks.forEach((link) => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${entry.target.id}`);
      });
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => activeObserver.observe(section));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const end = Number(entry.target.dataset.counter);
      let cur = 0;
      const step = Math.max(1, Math.floor(end / 30));
      const timer = setInterval(() => {
        cur += step;
        if (cur >= end) {
          cur = end;
          clearInterval(timer);
        }
        entry.target.textContent = String(cur);
      }, 28);
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.7 }
);

document.querySelectorAll('[data-counter]').forEach((el) => counterObserver.observe(el));

const glow = document.querySelector('.cursor-glow');
document.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});
