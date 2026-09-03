// ===== Sonidos de interacción =====
let audioContext;
function beep(freq=520,duration=.08){try{audioContext=audioContext||new(window.AudioContext||window.webkitAudioContext)();const o=audioContext.createOscillator(),g=audioContext.createGain();o.frequency.value=freq;o.type='sine';g.gain.setValueAtTime(.035,audioContext.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+duration);o.connect(g);g.connect(audioContext.destination);o.start();o.stop(audioContext.currentTime+duration)}catch(e){}}
document.addEventListener('click',e=>{if(e.target.closest('button,.btn,a'))beep(500,.045)});

// ===== Registro / login demostrativo =====
const registerForm=document.getElementById('registerForm');
if(registerForm)registerForm.addEventListener('submit',e=>{e.preventDefault();localStorage.setItem('codelearnUser',document.getElementById('name').value);alert('🎉 Cuenta creada correctamente. ¡Bienvenido a CodeLearn!');location.href='index.html'});
const loginForm=document.getElementById('loginForm');
if(loginForm)loginForm.addEventListener('submit',e=>{e.preventDefault();localStorage.setItem('codelearnUser',document.getElementById('email').value.split('@')[0]);alert('✅ Sesión iniciada.');location.href='index.html'});
const googleBtn=document.getElementById('googleBtn');
if(googleBtn)googleBtn.addEventListener('click',()=>{alert('🔵 Demo: aquí se conectaría Google OAuth. Para hacerlo real necesitamos configurar un proyecto de Google Cloud y un backend.');});

// ===== Coding challenge =====
const runBtn=document.getElementById('runBtn');
if(runBtn)runBtn.addEventListener('click',()=>{const code=document.getElementById('codeEditor').value;const out=document.getElementById('output');if(code.includes('def greet')&&code.includes('print')&&code.includes('Hello, student!')){out.textContent='✓ Hello, student!  |  ¡Reto completado! +10 puntos';out.style.color='#9ee6bb';beep(760,.12)}else{out.textContent='✗ Revisa tu código. Necesitas crear greet() y mostrar Hello, student!';out.style.color='#ffb4b4';beep(180,.15)}});

// ===== Quiz con 10 preguntas =====
const quizBox=document.getElementById('quizBox');
if(quizBox){const questions=[
['¿Qué significa UML?',['Unified Modeling Language','Universal Machine Language','User Method Logic','Unified Modern Library'],0],
['¿Cuál es el objetivo principal del diseño de software?',['Hacer el programa más largo','Definir una solución estructurada al problema','Eliminar todas las bases de datos','Evitar documentar'],1],
['¿Qué principio SOLID indica que una clase debe tener una sola razón para cambiar?',['Open/Closed','Single Responsibility','Liskov Substitution','Dependency Inversion'],1],
['¿Qué es una variable?',['Un espacio que almacena un valor','Una base de datos completa','Un servidor','Un diagrama UML'],0],
['¿Qué estructura repite instrucciones?',['Loop','Database','Class','Commit'],0],
['¿Qué herramienta se usa para controlar versiones?',['Git','HTML','SQL','UML'],0],
['What does “bug” mean?',['Feature','Error in software','Database','Developer'],1],
['What does “deploy” mean?',['Delete code','Put software into use/production','Draw a diagram','Create a variable'],1],
['¿Qué es una base de datos?',['Un conjunto organizado de información','Un lenguaje de programación','Un tipo de monitor','Un patrón SOLID'],0],
['What is a function?',['A reusable block of code','A computer screen','A database table','An operating system'],0]
];let score=0,answered=0;quizBox.innerHTML=questions.map((q,i)=>`<div class="question"><h3>${i+1}. ${q[0]}</h3><div class="answers">${q[1].map((a,j)=>`<button class="answer" data-q="${i}" data-a="${j}">${a}</button>`).join('')}</div></div>`).join('')+'<div id="quizResult" class="quiz-result">Responde todas las preguntas para ver tu resultado.</div>';
quizBox.querySelectorAll('.answer').forEach(b=>b.addEventListener('click',()=>{const q=Number(b.dataset.q),a=Number(b.dataset.a);if(b.parentElement.dataset.done)return;b.parentElement.dataset.done='1';answered++;if(a===questions[q][2]){score++;b.classList.add('correct');beep(760,.1)}else{b.classList.add('wrong');b.parentElement.children[questions[q][2]].classList.add('correct');beep(180,.12)}if(answered===questions.length){document.getElementById('quizResult').innerHTML=`<strong>🎉 Resultado: ${score}/${questions.length}</strong><br>${score>=8?'¡Excelente trabajo!':score>=5?'¡Vas muy bien!':'Sigue practicando, tú puedes.'}`}}));}

// ===== Pronunciación =====
const speakBtn=document.getElementById('speakBtn');
if(speakBtn)speakBtn.addEventListener('click',()=>{if('speechSynthesis'in window){const u=new SpeechSynthesisUtterance('Function');u.lang='en-US';u.rate=.75;speechSynthesis.speak(u)}else alert('Tu navegador no soporta síntesis de voz.')});
