// Mobile menu
var burger=document.getElementById('burger'),menu=document.getElementById('menu');
burger.onclick=function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
menu.addEventListener('click',function(e){if(e.target.tagName==='A'){menu.classList.remove('open')}});

// Diagnostic terminal (hero)
var items=[['CPU temperature','94°C','warn'],['Disk health','SMART OK','ok'],['RAM usage','91%','warn'],['Malware scan','2 threats','warn'],['Battery','82%','ok']];
var rows=document.getElementById('rows'),meter=document.getElementById('meter'),timers=[];
function scan(){
  timers.forEach(clearTimeout);timers=[];rows.innerHTML='';meter.style.transition='none';meter.style.width='0';
  void meter.offsetWidth;meter.style.transition='width 2.4s linear';meter.style.width='100%';
  items.forEach(function(it,i){
    var d=document.createElement('div');d.className='row';
    d.innerHTML='<span>'+it[0]+'</span><span class="'+it[2]+'">'+it[1]+'</span>';rows.appendChild(d);
    timers.push(setTimeout(function(){d.classList.add('show')},400+i*480));
  });
  var s=document.createElement('div');s.className='row warn';s.innerHTML='<span>Result</span><span>3 issues, fixable today</span>';rows.appendChild(s);
  timers.push(setTimeout(function(){s.classList.add('show')},400+items.length*480));
}
document.getElementById('rescan').onclick=scan;scan();

// Testimonials slider
var slides=document.querySelectorAll('.slide'),dots=document.getElementById('dots'),cur=0,auto;
slides.forEach(function(_,i){var b=document.createElement('button');b.setAttribute('aria-label','رأي '+(i+1));b.onclick=function(){show(i);restart()};dots.appendChild(b)});
function show(i){cur=i;slides.forEach(function(s,k){s.classList.toggle('on',k===i)});dots.childNodes.forEach(function(b,k){b.classList.toggle('on',k===i)})}
function restart(){clearInterval(auto);auto=setInterval(function(){show((cur+1)%slides.length)},6000)}
show(0);restart();

// Plan buttons fill the message box
document.querySelectorAll('[data-plan]').forEach(function(a){a.addEventListener('click',function(){document.getElementById('msg').value='أرغب في الباقة: '+a.dataset.plan})});

// Contact form: validate, then open WhatsApp with the message
var WA_NUMBER='201000000000'; // replace with the center's number
document.getElementById('form').addEventListener('submit',function(e){
  e.preventDefault();
  var n=document.getElementById('name'),p=document.getElementById('phone'),m=document.getElementById('msg'),ok=true;
  function chk(el,cond,txt){var er=el.parentNode.querySelector('.err');el.classList.toggle('bad',!cond);er.textContent=cond?'':txt;if(!cond)ok=false}
  chk(n,n.value.trim().length>=3,'اكتب اسمك (3 حروف على الأقل)');
  chk(p,/^(\+?20|0)?1[0125]\d{8}$/.test(p.value.replace(/\s/g,'')),'اكتب رقم موبايل مصري صحيح');
  chk(m,m.value.trim().length>=5,'اوصف المشكلة بجملة واحدة على الأقل');
  if(!ok)return;
  var text='الاسم: '+n.value.trim()+'\nالموبايل: '+p.value.trim()+'\nالخدمة: '+document.getElementById('service').value+'\nالمشكلة: '+m.value.trim();
  window.open('https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(text),'_blank','noopener');
  this.style.display='none';document.getElementById('done').classList.add('show');
});