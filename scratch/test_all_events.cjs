const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9232',
  '--remote-allow-origins=*',
  '--window-size=1280,720',
  'about:blank'
]);

const artifactDir = 'C:\\Users\\Yash\\.gemini\\antigravity-ide\\brain\\60fd5c65-49f3-4ee2-bb7a-33e1e2a9bbda';

setTimeout(async () => {
  try {
    const list = await (await fetch('http://127.0.0.1:9232/json/list')).json();
    const page = list.find(t => t.type === 'page') || list[0];
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    let id = 1;
    const pending = new Map();

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        pending.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    ws.addEventListener('message', event => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve } = pending.get(msg.id);
        pending.delete(msg.id);
        resolve(msg.result);
      }
    });

    ws.addEventListener('open', async () => {
      await send('Runtime.enable');
      await send('Page.enable');
      await send('Page.navigate', { url: 'http://localhost:5173' });

      await new Promise(r => setTimeout(r, 4500));
      await send('Runtime.evaluate', {
        expression: `document.querySelector('#preloader')?.remove();`
      });

      // Scroll to #missions
      await send('Runtime.evaluate', {
        expression: `document.querySelector('#missions').scrollIntoView({ behavior: 'instant' });`
      });
      await new Promise(r => setTimeout(r, 600));

      const records = [1, 2, 3, 4, 5];
      for (const idx of records) {
        // Switch to record idx
        const evalRes = await send('Runtime.evaluate', {
          expression: `(() => {
            const allRecords = document.querySelectorAll('.mission-record');
            allRecords.forEach((r, i) => {
              if (i === ${idx - 1}) {
                r.style.opacity = '1';
                r.style.visibility = 'visible';
                r.style.transform = 'none';
                r.classList.add('mission-record-active');
              } else {
                r.style.opacity = '0';
                r.style.visibility = 'hidden';
                r.classList.remove('mission-record-active');
              }
            });
            document.querySelector('.mission-current').textContent = String(${idx}).padStart(2, '0');
            const fill = document.querySelector('.mission-counter-fill');
            if (fill) fill.style.width = (${idx} / 5 * 100) + '%';
            
            const active = allRecords[${idx - 1}];
            const poster = active.querySelector('.mission-poster');
            const rect = poster ? poster.getBoundingClientRect() : null;
            return {
              index: ${idx},
              src: poster ? poster.src : null,
              loaded: poster ? (poster.complete && poster.naturalWidth > 0) : false,
              dims: poster ? { naturalW: poster.naturalWidth, naturalH: poster.naturalHeight } : null,
              rect: rect ? { top: rect.top, bottom: rect.bottom, height: rect.height } : null,
              fitsVertically: rect ? (rect.top >= 0 && rect.bottom <= window.innerHeight) : false
            };
          })()`,
          returnByValue: true
        });

        console.log(`EVENT ${idx} CHECK:`, JSON.stringify(evalRes.result.value));

        await new Promise(r => setTimeout(r, 200));
        const shot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(artifactDir, `screenshot_event_0${idx}_1280x720.png`), Buffer.from(shot.data, 'base64'));
        console.log(`SAVED screenshot_event_0${idx}_1280x720.png`);
      }

      chrome.kill();
      process.exit(0);
    });
  } catch(e) {
    console.error('Error:', e);
    chrome.kill();
    process.exit(1);
  }
}, 1000);
