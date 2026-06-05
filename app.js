
(function(){

  var KEY='scholar_demo_v2';
  var Store={
    data:null,
    load:function(){
      if(this.data)return this.data;
      try{this.data=JSON.parse(localStorage.getItem(KEY))||{};}catch(e){this.data={};}
      this.data.students=this.data.students||[];
      this.data.teachers=this.data.teachers||[];
      this.data.classes=this.data.classes||[];
      this.data.announcements=this.data.announcements||[];
      this.data.attendance=this.data.attendance||{};
      this.data.grades=this.data.grades||{};

      if(!this.data._seeded){
        this.data.tasks=[
          {title:'حل تمارين صفحة 45 - 47',subject:'الرياضيات',cls:'السادس الابتدائي - شعبة أ',due:'غدًا',done:false,by:'أ. سارة المالكي'},
          {title:'حفظ قصيدة (الأبيات 1-10)',subject:'اللغة العربية',cls:'السادس الابتدائي - شعبة أ',due:'غدًا',done:false,by:'أ. منى خليل'},
          {title:'تلوين الخريطة العربية',subject:'الاجتماعيات',cls:'السادس الابتدائي - شعبة أ',due:'غدًا',done:false,by:'أ. عمّار الدليمي'},
          {title:'تقرير عن دورة الماء',subject:'العلوم',cls:'السادس الابتدائي - شعبة أ',due:'بعد يومين',done:false,by:'أ. خالد عمر'},
          {title:'كتابة كلمات الوحدة 5',subject:'اللغة الإنكليزية',cls:'السادس الابتدائي - شعبة أ',due:'بعد يومين',done:false,by:'أ. رنا السعدي'}
        ];
        this.data.exams=[
          {title:'امتحان الوحدة الرابعة',subject:'الرياضيات',cls:'السادس الابتدائي - شعبة أ',date:'4 حزيران',type:'امتحان',total:100,by:'أ. سارة المالكي'},
          {title:'كويز الكائنات الحية',subject:'العلوم',cls:'السادس الابتدائي - شعبة أ',date:'6 حزيران',type:'كويز',total:10,by:'أ. خالد عمر'},
          {title:'إملاء النصوص',subject:'اللغة العربية',cls:'السادس الابتدائي - شعبة أ',date:'8 حزيران',type:'امتحان',total:20,by:'أ. منى خليل'}
        ];
        this.data._seeded=true;
      }
      this.data.tasks=this.data.tasks||[];
      this.data.exams=this.data.exams||[];
      return this.data;
    },
    save:function(){try{localStorage.setItem(KEY,JSON.stringify(this.load()));}catch(e){}},
    push:function(k,v){this.load()[k].push(v);this.save();},
    set:function(k,id,v){this.load()[k][id]=v;this.save();},
    reset:function(){try{localStorage.removeItem(KEY);}catch(e){}this.data=null;}
  };
  window.ScholarStore=Store;
  function initials(name){var p=(name||'').trim().split(/\s+/);return ((p[0]||'').slice(0,1)+(p[1]||'').slice(0,1))||'؟';}
  function avColor(seed){var c=['#0F766E','#10A99B','#F59E0B','#F43F5E','#0B5A53'];var n=0;for(var i=0;i<seed.length;i++)n+=seed.charCodeAt(i);return c[n%c.length];}

  var IRAQI={
    male:['أحمد','محمد','علي','حسين','حسن','مصطفى','يوسف','عبدالله','كرار','مرتضى','زيد','عمر','إبراهيم','حيدر','جعفر','سيف','أمير','نور','باقر','عباس','مهند','وليد','رضا','منتظر','حمزة','طه','صادق','ياسين','أنس','كاظم'],
    female:['فاطمة','زينب','مريم','نور','رقية','سارة','زهراء','آية','هدى','رؤى','دعاء','إسراء','بتول','تبارك','شهد','مروة','رند','ميس','زهور','غُفران','رحمة','بنين','حوراء','نرجس','ريام','تقى','ضحى','جنّة','لينا','سُجى'],
    family:['الجبوري','العبيدي','الدليمي','التميمي','الزيدي','الساعدي','الربيعي','الخفاجي','الموسوي','الحسيني','الكناني','العزاوي','المالكي','الشمري','الكعبي','البدري','الجنابي','العامري','الطائي','الفهداوي','اللامي','الغراوي','الياسري','الركابي','الحلفي']
  };
  function rnd(seed){var x=Math.sin(seed)*10000;return x-Math.floor(x);}
  function pick(arr,seed){return arr[Math.floor(rnd(seed)*arr.length)%arr.length];}
  var GRADES=['الأول','الثاني','الثالث','الرابع','الخامس','السادس'];
  var SECTIONS=['أ','ب'];
  function buildStudents(){
    var out=[],n=0;
    for(var g=0;g<GRADES.length;g++){
      for(var s=0;s<SECTIONS.length;s++){
        var per=18+Math.floor(rnd((g+1)*(s+3))*6);
        for(var i=0;i<per;i++){
          n++;
          var seed=n*7.13+g*3.7+s*1.9;
          var isM=rnd(seed)>0.48;
          var first=isM?pick(IRAQI.male,seed*1.1):pick(IRAQI.female,seed*1.1);
          var father=pick(IRAQI.male,seed*2.3);
          var fam=pick(IRAQI.family,seed*3.7);
          var avg=55+Math.floor(rnd(seed*5)*43);
          var att=78+Math.floor(rnd(seed*6)*21);

          var feeTotal=[2000000,2000000,2250000,2250000,2500000,2500000][g];
          var inst=Math.round(feeTotal/2);
          var st=rnd(seed*9);
          var paid = st>0.7?feeTotal : st>0.4?inst : st>0.2?Math.round(inst*0.6) : 0;
          out.push({
            id:'2026'+(1000+n),
            name:first+' '+father+' '+fam,
            sex:isM?'m':'f',
            grade:GRADES[g]+' الابتدائي - شعبة '+SECTIONS[s],
            gradeShort:GRADES[g]+' '+SECTIONS[s],
            avg:avg, att:att,
            feeTotal:feeTotal, feePaid:paid, feeRem:feeTotal-paid, inst1:inst, inst2:feeTotal-inst
          });
        }
      }
    }
    return out;
  }
  var ROSTER=null;
  function roster(){if(!ROSTER)ROSTER=buildStudents();return ROSTER;}
  window.ScholarRoster=roster;
  function bandAr(v){return v>=90?'امتياز':v>=80?'جيد جدًا':v>=70?'جيد':v>=60?'متوسط':v>=50?'مقبول':'ضعيف';}
  function bandCls(v){return v>=80?'g-hi':v>=60?'g-mid':'g-lo';}
  function fmt(n){return (n||0).toLocaleString('en-US');}
  function feeStatus(r){if(r.feeRem<=0)return {ar:'مكتملة',cls:'p-ok'};if(r.feePaid<=0)return {ar:'غير مدفوعة',cls:'p-bad'};return {ar:'جزئية',cls:'p-warn'};}

  function paginate(opts){

    var page=0, per=opts.perPage||15, rows=opts.rows;
    function draw(){
      var total=Math.ceil(rows.length/per)||1;
      if(page>=total)page=total-1; if(page<0)page=0;
      opts.body.innerHTML='';
      rows.slice(page*per,page*per+per).forEach(function(r){
        var tr=document.createElement('tr');tr.innerHTML=opts.render(r);
        if(opts.onRow)opts.onRow(tr,r);
        opts.body.appendChild(tr);
      });
      if(opts.pager){
        opts.pager.innerHTML='<button class="pgbtn" '+(page===0?'disabled':'')+' data-pg="prev">السابق</button>'+
          '<span class="pginfo">صفحة '+(page+1)+' من '+total+' · '+rows.length+' سجل</span>'+
          '<button class="pgbtn" '+(page>=total-1?'disabled':'')+' data-pg="next">التالي</button>';
        opts.pager.querySelectorAll('.pgbtn').forEach(function(b){
          b.addEventListener('click',function(){if(b.dataset.pg==='next')page++;else page--;draw();});
        });
      }
    }
    draw();
    return {refilter:function(newRows){rows=newRows;page=0;draw();}};
  }
  window.__paginate=paginate;

  var css = `
  .toast-wrap{position:fixed;top:18px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:10px;align-items:center;}
  .toast{background:#0E1020;color:#fff;font-family:"Tajawal",sans-serif;font-weight:700;font-size:14px;padding:12px 18px;border-radius:13px;box-shadow:0 12px 32px -8px rgba(20,22,55,.5);display:flex;align-items:center;gap:10px;opacity:0;transform:translateY(-12px);transition:.3s cubic-bezier(.2,.8,.2,1);max-width:90vw;}
  .toast.show{opacity:1;transform:none;}
  .toast .tic{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font-size:13px;flex:0 0 22px;}
  .toast.ok .tic{background:#16A34A;}.toast.info .tic{background:#0F766E;}.toast.warn .tic{background:#D97706;}.toast.err .tic{background:#E11D48;}
  .modal-back{position:fixed;inset:0;background:rgba(14,16,32,.5);backdrop-filter:blur(4px);z-index:9000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:.25s;padding:20px;}
  .modal-back.show{opacity:1;pointer-events:auto;}
  .modal{background:#fff;border-radius:20px;max-width:440px;width:100%;padding:26px;box-shadow:0 30px 80px -20px rgba(20,22,55,.5);transform:scale(.94) translateY(10px);transition:.25s cubic-bezier(.2,.8,.2,1);font-family:"Tajawal",sans-serif;text-align:right;max-height:88vh;overflow:auto;}
  .modal-back.show .modal{transform:none;}
  .modal h3{font-size:19px;font-weight:900;letter-spacing:-.02em;margin-bottom:6px;color:#0E1020;}
  .modal .msub{color:#7A7E96;font-size:13.5px;font-weight:500;margin-bottom:18px;}
  .modal .mfield{margin-bottom:14px;}
  .modal .mfield label{display:block;font-size:13px;font-weight:700;margin-bottom:7px;color:#3A3D52;}
  .modal .mfield input,.modal .mfield select,.modal .mfield textarea{width:100%;font-family:"Tajawal",sans-serif;font-size:14px;font-weight:500;border:0;border-radius:11px;padding:12px 14px;background:#F1F5F3;box-shadow:inset 0 0 0 1px rgba(20,22,55,.06);outline:0;color:#0E1020;text-align:right;}
  .modal .mfield input:focus,.modal .mfield select:focus,.modal .mfield textarea:focus{box-shadow:inset 0 0 0 1.5px #0F766E,0 0 0 4px rgba(15,118,110,.12);background:#fff;}
  .modal .mrow{display:flex;gap:10px;margin-top:22px;}
  .modal .mrow button{flex:1;font-family:"Tajawal",sans-serif;font-weight:800;font-size:14px;border:0;cursor:pointer;padding:12px;border-radius:12px;transition:.18s;}
  .modal .mrow .primary{color:#fff;background:linear-gradient(135deg,#0F766E,#10A99B);box-shadow:0 8px 24px -6px rgba(15,118,110,.42);}
  .modal .mrow .primary:hover{transform:translateY(-2px);filter:brightness(1.05);}
  .modal .mrow .cancel{background:#F1F5F3;color:#3A3D52;}
  .modal .mrow .cancel:hover{background:#e6ece9;}
  [data-pressable]{transition:transform .08s;}[data-pressable]:active{transform:scale(.96);}
  .seg{position:relative;}
  .seg .seg-glider{position:absolute;top:3px;bottom:3px;border-radius:7px;background:#fff;box-shadow:0 0 0 1px rgba(20,22,55,.05),0 1px 2px rgba(20,22,55,.06);transition:right .25s cubic-bezier(.4,0,.2,1),width .25s cubic-bezier(.4,0,.2,1);z-index:0;}
  .seg button{position:relative;z-index:1;}
  .seg button.on{background:transparent!important;box-shadow:none!important;}
  .att{display:flex;gap:6px;}
  .att button{border:0;background:#F1F5F3;border-radius:9px;width:38px;height:36px;font-size:15px;cursor:pointer;transition:.15s;box-shadow:inset 0 0 0 1px rgba(20,22,55,.06);}
  .att button:hover{transform:translateY(-1px);}
  .att button.on.pres{background:#16A34A;color:#fff;box-shadow:none;}
  .att button.on.late{background:#D97706;color:#fff;box-shadow:none;}
  .att button.on.abs{background:#E11D48;color:#fff;box-shadow:none;}
  .att-badge{display:inline-flex;align-items:center;gap:7px;padding:5px 12px;border-radius:20px;font-family:"Tajawal",sans-serif;font-weight:800;font-size:12.5px;}
  .att-badge .adot{width:7px;height:7px;border-radius:50%;}
  .att-badge.b-pres{background:rgba(22,163,74,.1);color:#16A34A;}.att-badge.b-pres .adot{background:#16A34A;}
  .att-badge.b-late{background:rgba(217,119,6,.12);color:#D97706;}.att-badge.b-late .adot{background:#D97706;}
  .att-badge.b-abs{background:rgba(225,29,72,.1);color:#E11D48;}.att-badge.b-abs .adot{background:#E11D48;}
  .trend,.badge-g,.kpi .num{direction:ltr;}
  .pager{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 4px 2px;margin-top:6px;}
  .pgbtn{font-family:"Tajawal",sans-serif;font-weight:700;font-size:13px;border:1px solid #E7ECEA;background:#fff;color:#3F4A47;padding:8px 16px;border-radius:10px;cursor:pointer;transition:.16s;}
  .pgbtn:hover:not([disabled]){border-color:#0F766E;color:#0F766E;}
  .pgbtn[disabled]{opacity:.4;cursor:not-allowed;}
  .pginfo{font-size:12.5px;font-weight:600;color:#6B7672;}
  `;
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  var tw;
  function toast(msg,type){
    type=type||'ok';
    if(!tw){tw=document.createElement('div');tw.className='toast-wrap';document.body.appendChild(tw);}
    var icons={ok:'✓',info:'i',warn:'!',err:'×'};
    var t=document.createElement('div');t.className='toast '+type;
    t.innerHTML='<span class="tic">'+(icons[type]||'✓')+'</span>'+msg;
    tw.appendChild(t);requestAnimationFrame(function(){t.classList.add('show');});
    setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove();},300);},2600);
  }
  window.toast=toast;

  function mi(id,color){
    return '<svg class="mi" viewBox="0 0 24 24" width="15" height="15" fill="none" '+
      'stroke="'+(color||'#0F766E')+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" '+
      'style="vertical-align:-2px;margin-left:6px"><use href="#i-'+id+'"/></svg>';
  }

  function mdot(color){
    return '<span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:'+color+';margin-left:7px;vertical-align:1px"></span>';
  }

  var mb;
  function modal(opts){
    opts=opts||{};
    if(!mb){mb=document.createElement('div');mb.className='modal-back';mb.innerHTML='<div class="modal"></div>';document.body.appendChild(mb);
      mb.addEventListener('click',function(e){if(e.target===mb)closeModal();});}
    var box=mb.querySelector('.modal');
    box.innerHTML='<h3>'+(opts.title||'')+'</h3>'+(opts.sub?'<div class="msub">'+opts.sub+'</div>':'')+(opts.body||'')+
      '<div class="mrow">'+(opts.cancel===false?'':'<button class="cancel">'+(opts.cancelText||'إلغاء')+'</button>')+
      '<button class="primary">'+(opts.okText||'تأكيد')+'</button></div>';
    box.querySelector('.primary').onclick=function(){if(opts.onOk)opts.onOk(box);closeModal();if(opts.toast)toast(opts.toast,opts.toastType||'ok');};
    var c=box.querySelector('.cancel');if(c)c.onclick=closeModal;
    requestAnimationFrame(function(){mb.classList.add('show');});
  }
  function closeModal(){if(mb)mb.classList.remove('show');}
  window.modal=modal;window.closeModal=closeModal;
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});

  function studentRow(s){
    var tb=document.querySelector('#students table tbody, .page#students table tbody');
    if(!tb){tb=findTbodyAfter('الطالب');}
    if(!tb)return;
    var tr=document.createElement('tr');tr.style.cursor='pointer';tr.setAttribute('onclick',"location.href='student.html'");
    tr.innerHTML='<td><div class="person"><span class="av" style="background:'+avColor(s.name)+'">'+initials(s.name)+'</span><div>'+s.name+
      '<div class="av-sub">ولي الأمر: '+(s.guardian||'—')+'</div></div></div></td>'+
      '<td>'+(s.id||'—')+'</td><td>'+(s.grade||'—')+'</td><td><span class="badge-g g-mid">جديد</span></td><td>—</td>'+
      '<td><a href="student.html" class="btn ghost" style="padding:6px 13px" onclick="event.stopPropagation()">عرض الملف</a></td>';
    tb.insertBefore(tr,tb.firstChild);
  }
  function teacherRow(t){
    var tb=findTbodyInSection('teachers');if(!tb)return;
    var tr=document.createElement('tr');
    tr.innerHTML='<td><div class="person"><span class="av" style="background:'+avColor(t.name)+'">'+initials(t.name)+'</span><div>'+t.name+
      '<div class="av-sub">عضو جديد</div></div></div></td><td>'+(t.subject||'—')+'</td><td>—</td><td>—</td><td><span class="pill p-ok">نشط</span></td>';
    tb.insertBefore(tr,tb.firstChild);
  }
  function classCard(c){
    var wrap=document.querySelector('#classes .ccards');if(!wrap)return;
    var d=document.createElement('div');d.className='ccard';
    d.innerHTML='<h3>'+c.name+'</h3><div class="t">المشرف: '+(c.teacher||'—')+'</div>'+
      '<div class="stat"><span>عدد الطلاب</span><b>0</b></div><div class="stat"><span>المواد</span><b>6</b></div>'+
      '<div class="stat"><span>متوسط الأداء</span><b style="color:var(--muted)">جديد</b></div><div class="prog"><i style="width:0%"></i></div>';
    wrap.appendChild(d);
  }
  function findTbodyInSection(id){var s=document.getElementById(id);return s?s.querySelector('table tbody'):null;}
  function findTbodyAfter(headText){
    var ths=document.querySelectorAll('th');for(var i=0;i<ths.length;i++){if(ths[i].textContent.trim()===headText){var tb=ths[i].closest('table').querySelector('tbody');return tb;}}return null;
  }

  function addStudentModal(){modal({title:'تسجيل طالب جديد',sub:'أدخل بيانات الطالب لإضافته إلى المدرسة.',
    body:'<div class="mfield"><label>اسم الطالب</label><input id="m-sn" placeholder="مثال: سارة أحمد"></div>'+
         '<div class="mfield"><label>الصف</label><select id="m-sg"><option>السادس الابتدائي - شعبة أ</option><option>السادس الابتدائي - شعبة ب</option><option>الخامس الابتدائي - شعبة أ</option></select></div>'+
         '<div class="mfield"><label>اسم ولي الأمر</label><input id="m-sgd" placeholder="مثال: أحمد علي"></div>'+
         '<div class="mfield"><label>جوال ولي الأمر</label><input id="m-sp" placeholder="0770 000 0000"></div>',
    okText:'إضافة الطالب',onOk:function(box){
      var name=(box.querySelector('#m-sn').value||'').trim();if(!name){return;}
      var s={name:name,grade:box.querySelector('#m-sg').value,guardian:(box.querySelector('#m-sgd').value||'').trim(),id:'2026'+(100+Store.load().students.length+(''+name.length))};
      Store.push('students',s);studentRow(s);
    },toast:'تمت إضافة الطالب وحُفِظ ✓'});}
  function addTeacherModal(){modal({title:'إضافة معلم',sub:'أضف عضو هيئة تدريس جديد.',
    body:'<div class="mfield"><label>اسم المعلم</label><input id="m-tn" placeholder="مثال: أ. حسن علي"></div>'+
         '<div class="mfield"><label>المادة</label><select id="m-ts"><option>الرياضيات</option><option>العلوم</option><option>اللغة العربية</option><option>اللغة الإنكليزية</option></select></div>',
    okText:'إضافة',onOk:function(box){var name=(box.querySelector('#m-tn').value||'').trim();if(!name)return;var t={name:name,subject:box.querySelector('#m-ts').value};Store.push('teachers',t);teacherRow(t);},toast:'تمت إضافة المعلم وحُفِظ ✓'});}
  function addClassModal(){modal({title:'إضافة صف',sub:'أنشئ صفًا دراسيًا جديدًا.',
    body:'<div class="mfield"><label>اسم الصف</label><input id="m-cn" placeholder="مثال: السابع الابتدائي - شعبة أ"></div>'+
         '<div class="mfield"><label>المعلم المشرف</label><select id="m-ct"><option>أ. سارة المالكي</option><option>أ. منى خليل</option><option>أ. خالد عمر</option></select></div>',
    okText:'إنشاء الصف',onOk:function(box){var name=(box.querySelector('#m-cn').value||'').trim();if(!name)return;var c={name:name,teacher:box.querySelector('#m-ct').value};Store.push('classes',c);classCard(c);},toast:'تم إنشاء الصف وحُفِظ ✓'});}

  var CLASS_OPTS='<option>السادس الابتدائي - شعبة أ</option><option>السادس الابتدائي - شعبة ب</option><option>الخامس الابتدائي - شعبة أ</option>';
  var SUBJ_OPTS='<option>الرياضيات</option><option>اللغة العربية</option><option>العلوم</option><option>اللغة الإنكليزية</option>';
  function createTaskModal(){modal({title:'تكليف واجب جديد',sub:'سيظهر الواجب مباشرةً في واجهة الطالب.',
    body:'<div class="mfield"><label>عنوان الواجب</label><input id="tk-t" placeholder="مثال: حل تمارين صفحة 50"></div>'+
         '<div class="mfield"><label>المادة</label><select id="tk-s">'+SUBJ_OPTS+'</select></div>'+
         '<div class="mfield"><label>الصف</label><select id="tk-c">'+CLASS_OPTS+'</select></div>'+
         '<div class="mfield"><label>تاريخ الاستحقاق</label><select id="tk-d"><option>غدًا</option><option>بعد يومين</option><option>الخميس</option><option>نهاية الأسبوع</option></select></div>',
    okText:'تكليف الواجب',onOk:function(box){
      var title=(box.querySelector('#tk-t').value||'').trim();if(!title)return;
      var t={title:title,subject:box.querySelector('#tk-s').value,cls:box.querySelector('#tk-c').value,due:box.querySelector('#tk-d').value,done:false,by:'أ. سارة المالكي'};
      Store.push('tasks',t);renderTeacherTasks();
    },toast:'تم تكليف الواجب — وصل للطلاب ✓'});}
  function createExamModal(){modal({title:'إنشاء اختبار / كويز',sub:'سيظهر ضمن «اختباراتي القادمة» لدى الطالب.',
    body:'<div class="mfield"><label>العنوان</label><input id="ex-t" placeholder="مثال: امتحان الوحدة الخامسة"></div>'+
         '<div class="mfield"><label>النوع</label><select id="ex-y"><option>امتحان</option><option>كويز</option></select></div>'+
         '<div class="mfield"><label>المادة</label><select id="ex-s">'+SUBJ_OPTS+'</select></div>'+
         '<div class="mfield"><label>الصف</label><select id="ex-c">'+CLASS_OPTS+'</select></div>'+
         '<div class="mfield"><label>التاريخ</label><input id="ex-d" placeholder="مثال: 10 حزيران"></div>'+
         '<div class="mfield"><label>الدرجة الكلية</label><input id="ex-m" type="number" placeholder="100"></div>',
    okText:'إنشاء',onOk:function(box){
      var title=(box.querySelector('#ex-t').value||'').trim();if(!title)return;
      var ex={title:title,type:box.querySelector('#ex-y').value,subject:box.querySelector('#ex-s').value,cls:box.querySelector('#ex-c').value,date:(box.querySelector('#ex-d').value||'قريبًا'),total:box.querySelector('#ex-m').value||100,by:'أ. سارة المالكي'};
      Store.push('exams',ex);renderTeacherExams();
    },toast:'تم إنشاء الاختبار — ظهر لدى الطلاب ✓'});}
  function renderTeacherTasks(){
    var body=document.getElementById('t-tasks-body');if(!body)return;
    var d=Store.load().tasks;body.innerHTML='';
    var empty=document.getElementById('t-tasks-empty');if(empty)empty.hidden=d.length>0;
    d.slice().reverse().forEach(function(t){
      var tr=document.createElement('tr');
      tr.innerHTML='<td style="font-weight:700">'+t.title+'</td><td>'+t.subject+'</td><td>'+t.cls+'</td><td>'+t.due+'</td>'+
        '<td><span class="pill '+(t.done?'p-ok':'p-warn')+'">'+(t.done?'مكتمل':'مُكلَّف')+'</span></td>';
      body.appendChild(tr);
    });
  }
  function renderTeacherExams(){
    var wrap=document.getElementById('t-exams-wrap');if(!wrap)return;
    var d=Store.load().exams;wrap.innerHTML='';
    d.slice().reverse().forEach(function(ex){
      var card=document.createElement('div');card.className='ecard';
      var isQuiz=ex.type==='كويز';
      card.innerHTML='<div class="top"><div class="em '+(isQuiz?'i-gold':'i-indigo')+'"><svg class="ico"><use href="#'+(isQuiz?'i-doc':'i-grid')+'"/></svg></div>'+
        '<span class="pill '+(isQuiz?'p-warn':'p-ok')+'">'+ex.type+'</span></div>'+
        '<h3>'+ex.title+'</h3><div class="t">'+ex.subject+' · '+ex.cls+'</div>'+
        '<div class="r"><span>التاريخ</span><b>'+ex.date+'</b></div><div class="r"><span>الدرجة الكلية</span><b>'+ex.total+'</b></div>';
      wrap.appendChild(card);
    });
  }

  function dueColor(due){if(/مكتمل/.test(due))return '#16A34A';if(/غد|اليوم/.test(due))return '#F43F5E';return '#F59E0B';}

  // emoji per subject so a young kid recognizes it at a glance
  function subjEmoji(s){
    s=s||'';
    if(/رياضي/.test(s))return '➗';
    if(/علوم/.test(s))return '🔬';
    if(/عرب/.test(s))return '📖';
    if(/إنكلي|انكلي|إنجلي/.test(s))return '🔤';
    if(/إسلام|دين|قرآن/.test(s))return '🕌';
    if(/اجتماع|تاريخ|جغراف/.test(s))return '🗺️';
    if(/حاسو|حاسب|كمبيو/.test(s))return '💻';
    if(/فن/.test(s))return '🎨';
    if(/رياضة|بدني/.test(s))return '⚽';
    return '📚';
  }
  // order days so TOMORROW comes first, then later days, then today, completed last
  function dayRank(due){
    if(/غد/.test(due))return 0;            // غدًا
    if(/يومين/.test(due))return 1;          // بعد يومين
    if(/مكتمل|تم التسليم/.test(due))return 99;
    if(/اليوم/.test(due))return 90;
    return 5;                               // named weekday etc.
  }
  // friendly header color/icon per bucket
  function dayStyle(due){
    if(/غد/.test(due))   return {bg:'#F43F5E',ic:'i-bell',  tag:'غدًا'};
    if(/يومين/.test(due))return {bg:'#F59E0B',ic:'i-clock', tag:'بعد يومين'};
    if(/مكتمل|تم التسليم/.test(due))return {bg:'#16A34A',ic:'i-check',tag:'مكتمل'};
    if(/اليوم/.test(due))return {bg:'#0F766E',ic:'i-clock', tag:'اليوم'};
    return {bg:'#7C3AED',ic:'i-cal', tag:due};               // a weekday name
  }

  // action word that fits the task type (not always "حلّه")
  function taskAction(t){
    var s=(t.title||'')+' '+(t.subject||'');
    if(/حفظ|احفظ/.test(s))      return 'عليك حفظه';
    if(/تقرير|اكتب|كتابة|إنشاء|موضوع|بحث/.test(s)) return 'عليك كتابته';
    if(/تلوين|ارسم|رسم|لوّن/.test(s)) return 'عليك إنجازه';
    if(/قراءة|اقرأ/.test(s))     return 'عليك قراءته';
    if(/حل|تمارين|تمرين|مسائل/.test(s)) return 'عليك حلّه';
    return 'عليك إنجازه';
  }

  function hwStateHTML(t,idx){
    if(t.done) return '<button class="hw-check" data-hw="'+idx+'" title="تمّ — اضغط للتراجع"><svg class="ico"><use href="#i-check"/></svg></button>';
    return '<button class="hw-state hw-todo" data-hw="'+idx+'"><svg class="ico"><use href="#i-doc"/></svg> '+taskAction(t)+'</button>';
  }

  function renderStudentTasks(){
    var list=document.getElementById('s-tasks-list');if(!list)return;
    var d=Store.load().tasks;list.innerHTML='';
    var empty=document.getElementById('s-tasks-empty');if(empty)empty.hidden=d.length>0;

    // bucket tasks by their due label, keeping each task's real store index
    var buckets={};
    d.forEach(function(t,i){(buckets[t.due]=buckets[t.due]||[]).push({t:t,i:i});});
    // sorted unique due labels — tomorrow first
    var keys=Object.keys(buckets).sort(function(a,b){return dayRank(a)-dayRank(b);});

    keys.forEach(function(due){
      var st=dayStyle(due);
      var group=document.createElement('div');group.className='daygroup';
      var count=buckets[due].length;
      group.innerHTML=
        '<div class="day-head">'+
          '<div class="dh-ic" style="background:'+st.bg+'"><svg class="ico"><use href="#'+st.ic+'"/></svg></div>'+
          '<div class="dh-t">'+st.tag+'</div>'+
          '<div class="dh-c" style="background:'+st.bg+'">'+count+' '+(count===1?'واجب':'واجبات')+'</div>'+
        '</div>';
      buckets[due].forEach(function(o){
        var t=o.t;
        var row=document.createElement('div');row.className='hw'+(t.done?' is-done':'');
        row.style.setProperty('--hwc', st.bg);
        row.innerHTML=
          '<div class="hw-em">'+subjEmoji(t.subject)+'</div>'+
          '<div class="hw-mid"><b>'+t.title+'</b><div class="hw-sub">'+t.subject+(t.by?' <span class="by">· '+t.by+'</span>':'')+'</div></div>'+
          hwStateHTML(t,o.i);
        group.appendChild(row);
      });
      list.appendChild(group);
    });

    // wire the tappable status -> green checkmark (toggle)
    list.querySelectorAll('[data-hw]').forEach(function(btn){
      btn.addEventListener('click',function(){
        var data=Store.load(); var idx=+btn.dataset.hw;
        var task=data.tasks[idx]; if(!task)return;
        task.done=!task.done; Store.save();
        renderStudentTasks();
      });
    });
  }
  function renderStudentExams(){
    var wrap=document.getElementById('s-exams-list');if(!wrap)return;
    var d=Store.load().exams;wrap.innerHTML='';
    // soonest exam first
    d.slice().sort(function(a,b){return (parseInt(a.date)||99)-(parseInt(b.date)||99);}).forEach(function(ex){
      var isQuiz=ex.type==='كويز';
      var card=document.createElement('div');card.className='ecard';
      card.style.setProperty('--ec', isQuiz?'#F59E0B':'#0F766E');
      card.innerHTML='<div class="em">'+subjEmoji(ex.subject)+'</div>'+
        '<h3>'+ex.title+'</h3><div class="t">'+ex.subject+'</div>'+
        '<div class="r"><span>📅 موعده</span><span class="pillD">'+ex.date+'</span></div>'+
        '<div class="r"><span>'+(isQuiz?'كويز قصير':'امتحان')+'</span><b>'+ex.total+' درجة</b></div>';
      wrap.appendChild(card);
    });
  }

  var rosterPager=null;
  function studentTr(r){
    return '<td><div class="person"><span class="av" style="background:'+avColor(r.name)+'">'+initials(r.name)+'</span><div>'+r.name+
      '<div class="av-sub">'+r.id+'</div></div></div></td>'+
      '<td>'+r.id+'</td><td>'+r.grade+'</td>'+
      '<td><span class="badge-g '+bandCls(r.avg)+'">'+r.avg+'</span></td><td>'+r.att+'%</td>'+
      '<td><a href="student.html" class="btn ghost" style="padding:6px 13px" onclick="event.stopPropagation()">عرض الملف</a></td>';
  }
  function renderRoster(){
    var body=document.getElementById('students-body');if(!body)return;
    var all=roster();

    var gf=document.getElementById('grade-filter');
    if(gf&&!gf.__filled){gf.__filled=1;
      var grades=[];all.forEach(function(r){if(grades.indexOf(r.grade)<0)grades.push(r.grade);});
      grades.forEach(function(g){var o=document.createElement('option');o.value=g;o.textContent=g;gf.appendChild(o);});
      gf.addEventListener('change',applyRosterFilter);
    }
    var cnt=document.getElementById('students-count');if(cnt)cnt.textContent=all.length+' طالبًا مسجلًا';
    rosterPager=paginate({body:body,pager:document.getElementById('students-pager'),rows:all,perPage:15,render:studentTr,
      onRow:function(tr,r){tr.style.cursor='pointer';tr.addEventListener('click',function(e){if(e.target.closest('a'))return;location.href='student.html';});}});
  }
  function applyRosterFilter(){
    if(!rosterPager)return;
    var gf=document.getElementById('grade-filter');var g=gf?gf.value:'';
    var sb=document.querySelector('#students.show')?document.querySelector('.search input'):null;
    var q=(sb&&sb.value||'').trim();
    var rows=roster().filter(function(r){
      return (!g||r.grade===g)&&(!q||r.name.indexOf(q)>=0||r.id.indexOf(q)>=0);
    });
    rosterPager.refilter(rows);
    var cnt=document.getElementById('students-count');if(cnt)cnt.textContent=rows.length+' من '+roster().length+' طالب';
  }
  window.__applyRosterFilter=applyRosterFilter;

  var feesPager=null;
  function feeTr(r){
    var s=feeStatus(r);
    return '<td><div class="person"><span class="av" style="background:'+avColor(r.name)+'">'+initials(r.name)+'</span> '+r.name+'</div></td>'+
      '<td>'+r.gradeShort+'</td>'+
      '<td>'+fmt(r.feeTotal)+' د.ع</td><td>'+fmt(r.feePaid)+'</td><td>'+fmt(r.feeRem)+'</td>'+
      '<td><span class="pill '+s.cls+'">'+s.ar+'</span></td>';
  }
  function renderFees(){
    var body=document.getElementById('fees-body');if(!body)return;
    var all=roster();
    var totalDue=0,totalPaid=0,full=0,part=0,over=0;
    all.forEach(function(r){totalDue+=r.feeTotal;totalPaid+=r.feePaid;
      if(r.feeRem<=0)full++;else if(r.feePaid<=0)over++;else part++;});
    var rate=Math.round(totalPaid/totalDue*100);
    var set=function(id,v){var e=document.getElementById(id);if(e)e.textContent=v;};
    set('fee-rate',rate+'%');set('fee-full',full);set('fee-part',part);set('fee-over',over);
    set('fee-collected','تم تحصيل '+fmt(totalPaid)+' من '+fmt(totalDue)+' د.ع');
    var gf=document.getElementById('fee-filter');
    if(gf&&!gf.__w){gf.__w=1;gf.addEventListener('change',function(){
      var v=gf.value;var rows=roster().filter(function(r){var st=feeStatus(r);return !v||st.cls==='p-'+v;});
      if(feesPager)feesPager.refilter(rows);
    });}
    feesPager=paginate({body:body,pager:document.getElementById('fees-pager'),rows:all,perPage:15,render:feeTr});
  }

  var SUBJECTS=['الرياضيات','اللغة العربية','العلوم','اللغة الإنكليزية','التربية الإسلامية','الاجتماعيات','الحاسوب','التربية الفنية','الرياضة'];
  var STAFF=null;
  function buildStaff(){
    var out=[],names=[],n=0;

    for(var i=0;i<24;i++){
      var seed=i*4.7+1;
      var isM=rnd(seed)>0.5;
      var first=isM?pick(IRAQI.male,seed):pick(IRAQI.female,seed);
      var fam=pick(IRAQI.family,seed*2.1);
      var subj=SUBJECTS[i%SUBJECTS.length];
      var classesPerDay=4+Math.floor(rnd(seed*3)*4);
      var sections=2+Math.floor(rnd(seed*5)*4);
      var students=sections*(18+Math.floor(rnd(seed*6)*6));
      var exp=3+Math.floor(rnd(seed*7)*18);
      var onLeave=rnd(seed*9)>0.9;
      out.push({name:'أ. '+first+' '+fam,subject:subj,sections:sections,perDay:classesPerDay,students:students,exp:exp,status:onLeave?'إجازة':'نشط'});
    }
    return out;
  }
  function staff(){if(!STAFF)STAFF=buildStaff();return STAFF;}
  var staffPager=null;
  function teacherTr(t){
    return '<td><div class="person"><span class="av" style="background:'+avColor(t.name)+'">'+initials(t.name.replace('أ. ',''))+'</span><div>'+t.name+
      '<div class="av-sub">'+t.exp+' سنة خبرة</div></div></div></td>'+
      '<td>'+t.subject+'</td><td>'+t.sections+' شعب</td><td><b style="direction:ltr">'+t.perDay+'</b></td><td>'+t.students+'</td>'+
      '<td><span class="pill '+(t.status==='نشط'?'p-ok':'p-warn')+'">'+t.status+'</span></td>';
  }
  function renderTeachersTable(){
    var body=document.getElementById('teachers-body');if(!body)return;
    var all=staff();
    var cnt=document.getElementById('teachers-count');if(cnt)cnt.textContent=all.length+' عضو هيئة تدريس';
    staffPager=paginate({body:body,pager:document.getElementById('teachers-pager'),rows:all,perPage:12,render:teacherTr,
      onRow:function(tr,t){tr.style.cursor='pointer';tr.addEventListener('click',function(){
        modal({title:t.name,sub:'ملف عضو هيئة التدريس',cancel:false,okText:'إغلاق',
          body:'<div style="font-size:13.5px;color:#3F4A47;line-height:2.1;text-align:right">المادة: <b>'+t.subject+'</b><br>عدد الشعب: <b>'+t.sections+'</b><br>الحصص يوميًا: <b>'+t.perDay+'</b><br>إجمالي الطلاب: <b>'+t.students+'</b><br>سنوات الخبرة: <b>'+t.exp+'</b></div>'});});}});
  }

  var SUPERVISORS=['أ. سارة المالكي','أ. منى خليل','أ. خالد عمر','أ. لينا سامي','أ. حسن كريم','أ. رنا عماد','أ. علي ناصر','أ. هدى فاضل','أ. مصطفى وليد','أ. زينب جواد','أ. عمر حاتم','أ. دعاء سالم'];
  function renderClasses(){
    var wrap=document.getElementById('classes-wrap');if(!wrap)return;
    var all=roster(),byCls={};
    all.forEach(function(r){(byCls[r.grade]=byCls[r.grade]||[]).push(r);});
    wrap.innerHTML='';var idx=0;
    Object.keys(byCls).forEach(function(cls){
      var arr=byCls[cls];var avg=Math.round(arr.reduce(function(a,b){return a+b.avg;},0)/arr.length);
      var col=avg>=80?'var(--green)':avg>=65?'var(--amber)':'var(--red)';
      var sup=SUPERVISORS[idx%SUPERVISORS.length];idx++;
      var d=document.createElement('div');d.className='ccard';d.style.cursor='pointer';
      d.innerHTML='<h3>'+cls+'</h3><div class="t">المشرف: '+sup+'</div>'+
        '<div class="stat"><span>عدد الطلاب</span><b>'+arr.length+'</b></div>'+
        '<div class="stat"><span>المواد</span><b>6</b></div>'+
        '<div class="stat"><span>متوسط الأداء</span><b style="color:'+col+'">'+avg+'%</b></div>'+
        '<div class="prog"><i style="width:'+avg+'%'+(avg<65?';background:var(--mint)':'')+'"></i></div>';
      d.addEventListener('click',function(){
        var top=arr.slice().sort(function(a,b){return b.avg-a.avg;})[0];
        modal({title:cls,sub:'المشرف: '+sup,cancel:false,okText:'إغلاق',
          body:'<div style="font-size:13.5px;color:#3F4A47;line-height:2.1;text-align:right">عدد الطلاب: <b>'+arr.length+'</b><br>المواد: <b>6</b><br>متوسط الصف: <b>'+avg+'%</b><br>أعلى طالب: <b>'+top.name+' ('+top.avg+')</b></div>'});
      });
      wrap.appendChild(d);
    });
  }

  function restore(){
    var d=Store.load();
    d.students.forEach(studentRow);
    d.teachers.forEach(teacherRow);
    d.classes.forEach(classCard);
    (d.announcements||[]).forEach(function(a){renderAnnounce(a,true);});
    renderTeacherTasks();renderTeacherExams();
    if(typeof renderStudentTasks==='function')renderStudentTasks();
    if(typeof renderStudentExams==='function')renderStudentExams();
    renderRoster();renderClasses();renderTeachersTable();renderFees();
  }
  function addEventModal(){modal({title:'إضافة فعالية',sub:'أضف موعدًا إلى التقويم المدرسي.',
    body:'<div class="mfield"><label>عنوان الفعالية</label><input placeholder="مثال: يوم رياضي"></div>'+
         '<div class="mfield"><label>التاريخ</label><input type="date"></div>',
    okText:'إضافة',toast:'تمت إضافة الفعالية إلى التقويم'});}
  function renderAnnounce(a,silent){
    var list=document.querySelector('#announce .card .card-head');
    var card=document.querySelector('#announce .card');
    if(!card)return;
    var row=document.createElement('div');row.className='ann';
    row.innerHTML='<div class="aic a-em"><svg class="ico"><use href="#i-mega"/></svg></div>'+
      '<div style="flex:1"><b>'+(a.title||'إعلان جديد')+'</b><p>'+a.text+'</p></div><time>الآن</time>';

    if(list&&list.nextSibling)card.insertBefore(row,list.nextSibling);else card.appendChild(row);
  }
  function publishAnnounce(){
    var ta=document.querySelector('.compose textarea');
    if(ta&&!ta.value.trim()){toast('اكتب نص الإعلان أولًا','warn');ta.focus();return;}
    var a={text:ta?ta.value.trim():'',title:'إعلان من الإدارة'};
    Store.push('announcements',a);renderAnnounce(a);
    if(ta)ta.value='';toast('تم نشر الإعلان وحُفِظ ✓','ok');
  }
  function notifModal(){modal({title:'الإشعارات',cancel:false,okText:'تم',
    body:'<div style="text-align:right;font-size:13.5px;color:#3F4A47;line-height:2">'+
      '<span style="color:#E11D48">●</span> <b>34</b> ولي أمر متأخر في الرسوم<br>'+
      '<span style="color:#D97706">●</span> <b>12</b> طلب تسجيل بانتظار الموافقة<br>'+
      '<span style="color:#16A34A">●</span> تم اعتماد جدول اختبارات الفصل الثاني<br>'+
      '<span style="color:#0F766E">●</span> اجتماع أولياء الأمور غدًا الساعة 5 مساءً'+
      '</div>'});}

  function wireCharts(){
    document.querySelectorAll('[data-chart]').forEach(function(wrap){
      if(wrap.__wired)return;wrap.__wired=1;
      var tip=wrap.querySelector('.chart-tip');var svg=wrap.querySelector('svg');
      if(!tip||!svg)return;
      wrap.querySelectorAll('.pts circle').forEach(function(pt){
        pt.addEventListener('mouseenter',function(){
          var box=svg.getBoundingClientRect();var vb=svg.viewBox.baseVal;
          var cx=+pt.getAttribute('cx'),cy=+pt.getAttribute('cy');
          var x=box.left+ (cx/vb.width)*box.width - wrap.getBoundingClientRect().left;
          var y=box.top + (cy/vb.height)*box.height - wrap.getBoundingClientRect().top;
          tip.innerHTML='<span style="opacity:.7">'+pt.getAttribute('data-x')+'</span><b>'+pt.getAttribute('data-v')+'</b>'+
            (pt.getAttribute('data-prev')?'<span class="tprev">الماضي: '+pt.getAttribute('data-prev')+'</span>':'');
          tip.style.left=x+'px';tip.style.top=y+'px';tip.hidden=false;
        });
        pt.addEventListener('mouseleave',function(){tip.hidden=true;});
      });
    });
  }

  function wireSectionSwitch(){
    document.querySelectorAll('.nav-item[data-p]').forEach(function(it){
      if(it.__sw)return;it.__sw=1;
      it.addEventListener('click',function(){wireCharts();});
    });
  }

  function wire(){
    document.querySelectorAll('button,.btn,.hbtn,.ibtn').forEach(function(b){b.setAttribute('data-pressable','');});
    wireCharts();wireSectionSwitch();restore();

    document.querySelectorAll('.seg').forEach(function(s){
      if(s.__wired)return;s.__wired=1;
      var b=s.querySelectorAll('button');
      var glider=document.createElement('span');glider.className='seg-glider';s.insertBefore(glider,s.firstChild);
      function move(btn){
        var sr=s.getBoundingClientRect(),br=btn.getBoundingClientRect();
        glider.style.width=br.width+'px';
        glider.style.right=(br.right>sr.right?0:(sr.right-br.right))+'px';
      }
      var on=s.querySelector('button.on')||b[0];
      requestAnimationFrame(function(){move(on);});
      b.forEach(function(x){x.addEventListener('click',function(){b.forEach(function(y){y.classList.remove('on');});x.classList.add('on');move(x);});});
    });

    document.querySelectorAll('.ibtn').forEach(function(b){
      if(b.__wired)return;if(!b.querySelector('use[href="#i-bell"]'))return;b.__wired=1;
      b.addEventListener('click',function(e){e.preventDefault();notifModal();});
    });

    document.addEventListener('click',function(e){
      var b=e.target.closest('button,.btn,.hbtn'); if(!b)return;
      var href=b.getAttribute&&b.getAttribute('href');
      if(href&&href!=='#'&&href!=='')return;
      var label=(b.textContent||'').trim();
      var act=b.getAttribute('data-act');

      if(act==='create-task'){e.preventDefault();createTaskModal();return;}
      if(act==='create-exam'){e.preventDefault();createExamModal();return;}
      if(act==='print-report'){e.preventDefault();toast('جارٍ تجهيز الكشف للطباعة…','info');setTimeout(function(){window.print();},300);return;}
      if(act==='submit-att'){e.preventDefault();
        if(window.__setAttMode)window.__setAttMode('view');
        var sb=document.getElementById('att-submit-btn'),eb=document.getElementById('att-edit-btn');
        if(sb)sb.hidden=true; if(eb)eb.hidden=false;
        toast('تم اعتماد كشف الحضور وإشعار أولياء الأمور','ok');return;}
      if(act==='att-edit'){e.preventDefault();
        var at=document.getElementById('att-table');
        var sb2=document.getElementById('att-submit-btn'),eb2=document.getElementById('att-edit-btn');
        if(sb2){
          if(window.__setAttMode)window.__setAttMode('edit');
          sb2.hidden=false; if(eb2)eb2.hidden=true;
          toast('يمكنك الآن تعديل الحضور','info');return;
        }

        var editing=at&&at.getAttribute('data-mode')==='edit';
        if(window.__setAttMode)window.__setAttMode(editing?'view':'edit');
        if(eb2)eb2.innerHTML=editing
          ? '<svg class="ico"><use href="#i-doc"/></svg> تعديل'
          : '<svg class="ico"><use href="#i-check"/></svg> حفظ';
        toast(editing?'تم حفظ التعديلات على الحضور':'يمكنك الآن تعديل الحضور','info');return;}
      if(act==='brief-details'){e.preventDefault();modal({title:'ملخّص اليوم',sub:'أبرز ما يحتاج انتباهك الآن',cancel:false,okText:'حسنًا',
        body:'<div style="text-align:right;font-size:13.5px;color:#3A3D52;line-height:2.1">'+
          mdot('#16A34A')+' الحضور اليوم <b>93%</b> — أعلى بـ 1.8% عن أمس<br>'+
          mdot('#D97706')+' <b>12</b> طلب تسجيل بانتظار موافقتك<br>'+
          mdot('#E11D48')+' <b>34</b> ولي أمر متأخر في الرسوم<br>'+
          mi('chart')+' نتائج اختبارات السادس جاهزة للاعتماد<br>'+
          mi('cal')+' اجتماع أولياء الأمور غدًا 5 مساءً</div>'});return;}
      if(act==='edit-student'){e.preventDefault();editStudentModal();return;}
      if(act==='send-report'){e.preventDefault();sendReportModal();return;}
      if(act==='add-note'){e.preventDefault();addNoteModal();return;}
      if(act==='message-guardian'){e.preventDefault();msgGuardianModal();return;}

      if(/تسجيل طالب|إضافة طالب/.test(label)){e.preventDefault();addStudentModal();}
      else if(/إضافة معلم/.test(label)){e.preventDefault();addTeacherModal();}
      else if(/إضافة صف/.test(label)){e.preventDefault();addClassModal();}
      else if(/نشر الإعلان/.test(label)){e.preventDefault();publishAnnounce();}
      else if(/إرسال تذكير/.test(label)){e.preventDefault();toast('تم إرسال تذكير الدفع لأولياء الأمور','ok');}
      else if(/تصدير|PDF/.test(label)){e.preventDefault();toast('جارٍ تجهيز ملف PDF…','info');setTimeout(function(){toast('تم تصدير التقرير بنجاح','ok');},1100);}
      else if(/فعالية/.test(label)){e.preventDefault();addEventModal();}
      else if(/اعتماد|الكشف/.test(label)){e.preventDefault();toast('تم اعتماد الكشف','ok');}
      else if(/تفعيل/.test(label)){e.preventDefault();toast('تم إرسال طلب التفعيل','ok');}
    });

    function currentTables(){var shown=document.querySelector('.page.show');return (shown||document).querySelectorAll('table tbody');}
    document.querySelectorAll('.search input').forEach(function(inp){
      if(inp.__wired)return;inp.__wired=1;
      inp.addEventListener('input',function(){

        if(document.querySelector('#students.show')&&typeof window.__applyRosterFilter==='function'){window.__applyRosterFilter();return;}
        var q=inp.value.trim().toLowerCase(),matches=0;
        currentTables().forEach(function(tb){tb.querySelectorAll('tr').forEach(function(r){
          var hit=!q||r.textContent.toLowerCase().indexOf(q)>=0;r.style.display=hit?'':'none';if(hit&&q)matches++;});});
        if(q&&matches===0)toast('لا توجد نتائج مطابقة','warn');
      });
    });

    document.querySelectorAll('.selectbox').forEach(function(sel){
      if(sel.__wired)return;sel.__wired=1;
      sel.addEventListener('change',function(){
        var v=sel.value.trim(),all=/كل|الكل|جميع/.test(v);
        currentTables().forEach(function(tb){tb.querySelectorAll('tr').forEach(function(r){
          r.style.display=(all||r.textContent.indexOf(v)>=0)?'':'none';});});
        toast('تمت التصفية: '+v,'info');
      });
    });

    document.querySelectorAll('.kpi .num, .ms b').forEach(function(el){
      if(el.__counted||el.id&&el.id.indexOf('cnt-')===0)return;el.__counted=1;
      var raw=el.textContent.trim();
      var m=raw.match(/^([0-9]+)(.*)$/);
      if(!m)return;
      var target=parseInt(m[1],10),suffix=m[2]||'';
      if(target<=0||target>100000)return;
      var dur=750,start=null;
      function step(ts){
        if(!start)start=ts;var p=Math.min((ts-start)/dur,1);
        var eased=1-Math.pow(1-p,3);
        el.textContent=Math.round(target*eased)+suffix;
        if(p<1)requestAnimationFrame(step);
      }
      el.textContent='0'+suffix;requestAnimationFrame(step);
    });

    var gtables=document.querySelectorAll('table');
    gtables.forEach(function(tbl,ti){
      tbl.querySelectorAll('tbody tr').forEach(function(row,ri){
        row.querySelectorAll('.ginput').forEach(function(inp,ci){
          if(inp.__wired)return;inp.__wired=1;
          var key=ti+'_'+ri+'_'+ci;
          var saved=Store.load().grades[key];
          if(saved!==undefined&&saved!=='')inp.value=saved;
          function recalc(){
            var sum=0;row.querySelectorAll('.ginput').forEach(function(x){sum+=parseInt(x.value||0,10)||0;});
            var tc=row.querySelector('td:nth-last-child(2) b');if(tc)tc.textContent=sum;
          }
          inp.addEventListener('input',function(){Store.set('grades',key,inp.value);recalc();});
          recalc();
        });
      });
    });

    var clockSvg='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';
    var labels={pres:'✓',late:clockSvg,abs:'✕'};
    var attBadge={pres:'<span class="att-badge b-pres"><span class="adot"></span>حاضر</span>',
                  late:'<span class="att-badge b-late"><span class="adot"></span>متأخر</span>',
                  abs:'<span class="att-badge b-abs"><span class="adot"></span>غائب</span>'};
    var attTable=document.getElementById('att-table');
    function attState(g){
      var on=g.querySelector('button.on');
      if(on)return on.getAttribute('data-s');
      return g.getAttribute('data-cur')||g.getAttribute('data-st')||'pres';
    }
    function recount(){
      if(!attTable)return;
      var p=0,l=0,a=0;
      attTable.querySelectorAll('.att').forEach(function(g){
        var s=attState(g);if(s==='pres')p++;else if(s==='late')l++;else if(s==='abs')a++;
      });
      var set=function(id,v){var e=document.getElementById(id);if(e)e.textContent=v;};
      set('cnt-pres',p);set('cnt-late',l);set('cnt-abs',a);
    }
    function renderBadge(g){
      var cur=attState(g);g.setAttribute('data-cur',cur);g.innerHTML=attBadge[cur]||'';
    }
    function renderToggles(g,idx){
      var saved=Store.load().attendance[idx];
      var cur=saved||attState(g);g.setAttribute('data-cur',cur);g.innerHTML='';
      ['pres','late','abs'].forEach(function(s){
        var b=document.createElement('button');b.className=s+(s===cur?' on':'');b.setAttribute('data-s',s);b.innerHTML=labels[s];
        b.addEventListener('click',function(){g.querySelectorAll('button').forEach(function(x){x.classList.remove('on');});b.classList.add('on');g.setAttribute('data-cur',s);Store.set('attendance',idx,s);recount();});
        g.appendChild(b);
      });
    }
    function setAttMode(mode){
      if(!attTable)return;
      attTable.setAttribute('data-mode',mode);
      attTable.querySelectorAll('.att').forEach(function(g,idx){
        if(mode==='edit')renderToggles(g,idx);else renderBadge(g);
      });
      recount();
    }
    if(attTable){

      var startMode=attTable.getAttribute('data-readonly')==='1'?'view':'edit';
      setAttMode(startMode);
      window.__setAttMode=setAttMode;
    }

    var tsec=document.getElementById('teachers');
    if(tsec)tsec.querySelectorAll('tbody tr').forEach(function(r){
      if(r.__wired)return;r.__wired=1;r.style.cursor='pointer';
      r.addEventListener('click',function(){
        var nameEl=r.querySelector('.person div div');var name=nameEl?nameEl.textContent:'المعلم';
        var c=r.querySelectorAll('td');
        modal({title:name,sub:'ملف عضو هيئة التدريس',cancel:false,okText:'إغلاق',
          body:'<div style="font-size:13.5px;color:#3A3D52;line-height:2.1;text-align:right">'+
            mi('cap')+' المادة: <b>'+(c[1]?c[1].textContent:'')+'</b><br>'+
            mi('building')+' الصفوف: <b>'+(c[2]?c[2].textContent:'')+'</b><br>'+
            mi('users')+' عدد الطلاب: <b>'+(c[3]?c[3].textContent:'')+'</b><br>'+
            mi('chart')+' متوسط أداء صفوفه: <b>82%</b><br>'+mi('cal')+' الحضور: <b>منتظم</b></div>'});
      });
    });

    var csec=document.getElementById('classes');
    if(csec)csec.querySelectorAll('.ccard').forEach(function(card){
      if(card.__wired)return;card.__wired=1;card.style.cursor='pointer';
      card.addEventListener('click',function(){
        var h=card.querySelector('h3');var sb=card.querySelector('.t');var st=card.querySelector('.stat b');
        modal({title:h?h.textContent:'الصف',sub:sb?sb.textContent:'',cancel:false,okText:'إغلاق',
          body:'<div style="font-size:13.5px;color:#3A3D52;line-height:2.1;text-align:right">'+
            mi('users')+' عدد الطلاب: <b>'+(st?st.textContent:'')+'</b><br>'+mi('cap')+' عدد المواد: <b>6</b><br>'+
            mi('trophy','#D97706')+' أعلى طالب: <b>نور الدين (95)</b><br>'+mi('spark','#E11D48')+' يحتاج متابعة: <b>3 طلاب</b><br>'+mi('cal')+' نسبة الحضور: <b>93%</b></div>'});
      });
    });

    var pnav=document.querySelector('[data-parentnav]');
    if(pnav&&!pnav.__wired){pnav.__wired=1;
      var pl=pnav.querySelectorAll('a');
      pl.forEach(function(a){a.addEventListener('click',function(e){
        e.preventDefault();pl.forEach(function(x){x.classList.remove('on');});a.classList.add('on');
        toast('عرض: '+a.textContent.trim(),'info');
      });});
    }

    document.querySelectorAll('.switch').forEach(function(b){
      if(b.__wired)return;b.__wired=1;
      b.addEventListener('click',function(e){e.preventDefault();
        modal({title:'اختر الابن',cancel:false,okText:'تم',
          body:'<div style="text-align:right;font-size:14px;color:#3A3D52;line-height:2.4">'+
            mi('users')+' <b>أحمد محمود</b> — السادس / أ ✓<br>'+mi('users')+' سارة محمود — الثالث / ب</div>'});
      });
    });

    var calsec=document.getElementById('calendar');
    if(calsec)calsec.querySelectorAll('.day').forEach(function(d){
      var ev=d.querySelector('.ev');if(!ev||d.__wired)return;d.__wired=1;d.style.cursor='pointer';
      d.addEventListener('click',function(){
        modal({title:ev.textContent.trim(),sub:'فعالية في التقويم المدرسي',cancel:false,okText:'إغلاق',
          body:'<div style="font-size:13.5px;color:#3A3D52;line-height:2;text-align:right">'+mi('cal')+' اليوم: <b>'+d.firstChild.textContent.trim()+' حزيران</b><br>'+mi('bell')+' سيتم تذكير المعنيين تلقائيًا.</div>'});
      });
    });
  }

  function editStudentModal(){modal({title:'تعديل بيانات الطالب',sub:'حدّث المعلومات الأساسية.',
    body:'<div class="mfield"><label>الاسم</label><input value="أحمد محمود علي"></div>'+
         '<div class="mfield"><label>الصف</label><select><option>السادس / أ</option><option>السادس / ب</option></select></div>'+
         '<div class="mfield"><label>الحالة</label><select><option>نشط</option><option>موقوف</option><option>متخرّج</option></select></div>',
    okText:'حفظ التعديلات',toast:'تم حفظ بيانات الطالب'});}
  function sendReportModal(){modal({title:'إرسال تقرير لولي الأمر',sub:'سيُرسل ملخص أداء الطالب إلى ولي الأمر.',
    body:'<div class="mfield"><label>طريقة الإرسال</label><select><option>تطبيق ولي الأمر</option><option>رسالة SMS</option><option>بريد إلكتروني</option></select></div>'+
         '<div class="mfield"><label>ملاحظة (اختياري)</label><textarea placeholder="رسالة قصيرة لولي الأمر…"></textarea></div>',
    okText:'إرسال التقرير',toast:'تم إرسال التقرير إلى ولي الأمر'});}
  function addNoteModal(){modal({title:'إضافة ملاحظة',sub:'أضف ملاحظة إلى سجل الطالب.',
    body:'<div class="mfield"><label>نوع الملاحظة</label><select><option>تميّز</option><option>سلوك</option><option>حضور</option></select></div>'+
         '<div class="mfield"><label>النص</label><textarea id="ntext" placeholder="اكتب الملاحظة…"></textarea></div>',
    okText:'إضافة',onOk:function(box){
      var txt=(box.querySelector('#ntext').value||'').trim()||'ملاحظة جديدة';
      var tl=document.querySelector('.tl');
      if(tl){var it=document.createElement('div');it.className='item i';
        it.innerHTML='<b>'+txt+'</b><p>أضافها: أ. حسن يوسف</p><time>اليوم</time>';
        tl.insertBefore(it,tl.firstChild);}
    },toast:'تمت إضافة الملاحظة إلى السجل'});}
  function msgGuardianModal(){modal({title:'مراسلة ولي الأمر',sub:'محمود علي · 0770 123 4567',
    body:'<div class="mfield"><label>الرسالة</label><textarea placeholder="اكتب رسالتك…"></textarea></div>',
    okText:'إرسال',toast:'تم إرسال الرسالة إلى ولي الأمر'});}

  function labelTables(){
    document.querySelectorAll('table').forEach(function(tbl){
      if(tbl.classList.contains('tt')||tbl.classList.contains('report'))return;
      var ths=tbl.querySelectorAll('thead th');
      if(!ths.length)return;
      var heads=Array.prototype.map.call(ths,function(th){return th.textContent.trim();});
      tbl.querySelectorAll('tbody tr').forEach(function(tr){
        Array.prototype.forEach.call(tr.children,function(td,i){
          if(heads[i])td.setAttribute('data-label',heads[i]);
        });
      });
    });
  }
  window.__labelTables=labelTables;

  function observeTables(){
    document.querySelectorAll('table tbody').forEach(function(tb){
      if(tb.__obs)return;tb.__obs=1;
      new MutationObserver(function(){labelTables();}).observe(tb,{childList:true});
    });
  }

  function boot(){wire();labelTables();observeTables();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
