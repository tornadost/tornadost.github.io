const PER_PAGE = 6;
let postsList = [], page = 1, currentTag = '', q = '';
const grid    = document.getElementById('grid'),
      pager   = document.getElementById('pager'),
      tagWrap = document.getElementById('tag-wrap'),
      searchIn= document.getElementById('search'),
      clearBtn= document.getElementById('clear');

// IntersectionObservers for cards & images
const ioCard = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); ioCard.unobserve(e.target); }
  });
},{ threshold:0.3 });
const ioImg = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const img=e.target;
      img.src=img.dataset.src;
      img.onload=()=>img.classList.remove('skeleton');
      ioImg.unobserve(img);
    }
  });
},{ rootMargin:'200px' });

async function loadPosts(){
  const owner='tornadost', repo='tornadost.github.io', path='posts/feed';
  const apiUrl=`https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const listRes=await fetch(apiUrl);
  if(!listRes.ok) throw new Error(`Could not list posts: ${listRes.status}`);
  const entries=await listRes.json();
  const dirs = entries.filter(e=>e.type==='dir'&&/^\d+$/.test(e.name))
                      .map(e=>e.name).sort((a,b)=>+a-+b);
  const posts=[];
  for(const id of dirs){
    try {
      const res=await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/${path}/${id}/${id}.json`);
      if(!res.ok) continue;
      const j=await res.json();
      posts.push({
        id:      +id,
        title:   j.title,
        excerpt: j.excerpt,
        date:    j.date,
        read:    j.read,
        tags:    j.tags,
        img:     `/posts/assets/cover/${id}.png`
      });
    } catch{} 
  }
  return posts;
}

function cardHTML(p){
  return `
    <article class="post-card lazy">
      <a href="/posts/feed/${p.id}/${p.id}.html">
        <div class="post-thumbnail">
          <img data-src="${p.img}" alt="${p.title}" class="skeleton" loading="lazy">
        </div>
        <div class="post-content">
          <h2 class="post-title">${p.title}</h2>
          <p class="post-excerpt">${p.excerpt}</p>
          <span class="post-meta">${p.date} • ${p.read} min read</span>
        </div>
      </a>
    </article>`;
}

function renderTags(){
  tagWrap.innerHTML='';
  [...new Set(postsList.flatMap(p=>p.tags))].sort().forEach(t=>{
    const btn=document.createElement('button');
    btn.textContent=t;
    btn.onclick=()=>{
      currentTag=(currentTag===t?'':t);
      page=1; draw();
      tagWrap.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.textContent===currentTag));
      clearBtn.classList.toggle('hidden',!currentTag);
    };
    tagWrap.appendChild(btn);
  });
}

function filterList(){
  let lst=postsList;
  if(currentTag) lst=lst.filter(p=>p.tags.includes(currentTag));
  if(q) lst=lst.filter(p=>p.title.toLowerCase().includes(q)||p.excerpt.toLowerCase().includes(q));
  return lst;
}

function draw(){
  const list=filterList();
  const slice=list.slice((page-1)*PER_PAGE, page*PER_PAGE);
  document.querySelectorAll('.post-card').forEach(c=>c.classList.add('hidden'));
  setTimeout(()=>{
    grid.innerHTML=slice.map(cardHTML).join('');
    grid.querySelectorAll('.lazy').forEach(card=>{
      ioCard.observe(card);
      ioImg.observe(card.querySelector('img'));
    });
  },200);
  pager.innerHTML=
    (page>1?`<a href="#" class="prev">« Newer</a>`:'')+
    `<span> Page ${page} </span>`+
    (page*PER_PAGE<list.length?`<a href="#" class="next">Older »</a>`:'');
  pager.querySelectorAll('a').forEach(a=>{
    a.style.opacity='0';
    setTimeout(()=>a.style.opacity='1',200);
  });
  pager.onclick=e=>{
    if(e.target.matches('.prev')){ e.preventDefault(); page--; draw(); }
    if(e.target.matches('.next')){ e.preventDefault(); page++; draw(); }
  };
}

// Initialize posts grid
loadPosts()
  .then(a=>{ postsList=a; renderTags(); draw(); })
  .catch(err=>{ grid.innerHTML='<p style="color:red">Unable to load posts.</p>'; console.error(err); });

// Search & clear
searchIn.addEventListener('input',()=>{
  q=searchIn.value.trim().toLowerCase();
  page=1; draw();
});
clearBtn.addEventListener('click',()=>{
  currentTag=''; page=1; draw();
  clearBtn.classList.add('hidden');
  tagWrap.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
});

// Set footer year
document.getElementById('yr').textContent=new Date().getFullYear();