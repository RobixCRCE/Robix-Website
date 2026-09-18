const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9230',
  '--remote-allow-origins=*',
  '--window-size=1280,720',
  'about:blank'
]);

const artifactDir = 'C:\\Users\\Yash\\.gemini\\antigravity-ide\\brain\\60fd5c65-49f3-4ee2-bb7a-33e1e2a9bbda';
const resolutions = [
  { width: 1280, height: 720 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1600, height: 900 },
  { width: 1920, height: 1080 }
];

setTimeout(async () => {
  try {
    const list = await (await fetch('http://127.0.0.1:9230/json/list')).json();
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

      console.log('--- TESTING VIEWPORT HEIGHTS FOR FULL POSTER VISIBILITY ---');
      for (const res of resolutions) {
        await send('Emulation.setDeviceMetricsOverride', {
          width: res.width,
          height: res.height,
          deviceScaleFactor: 1,
          mobile: false
        });
        await new Promise(r => setTimeout(r, 300));
        await send('Runtime.evaluate', {
          expression: `document.querySelector('#missions').scrollIntoView({ behavior: 'instant' });`
        });
        await new Promise(r => setTimeout(r, 200));

        const check = await send('Runtime.evaluate', {
          expression: `(() => {
            const poster = document.querySelector('.mission-record-active .mission-poster');
            const frame = document.querySelector('.mission-record-active .mission-image-frame');
            const visual = document.querySelector('.mission-record-active .mission-visual');
            const header = document.querySelector('.missions-header');
            const copy = document.querySelector('.mission-record-active .mission-copy');

            const pRect = poster ? poster.getBoundingClientRect() : null;
            const fRect = frame ? frame.getBoundingClientRect() : null;
            const hRect = header ? header.getBoundingClientRect() : null;
            const cRect = copy ? copy.getBoundingClientRect() : null;

            return {
              viewport: { w: window.innerWidth, h: window.innerHeight },
              posterRect: pRect ? { top: pRect.top, bottom: pRect.bottom, height: pRect.height } : null,
              frameRect: fRect ? { top: fRect.top, bottom: fRect.bottom, height: fRect.height } : null,
              fullyVisibleVertically: pRect ? (pRect.top >= 0 && pRect.bottom <= window.innerHeight) : false,
              bottomGap: pRect ? (window.innerHeight - pRect.bottom) : null,
              topGap: pRect ? pRect.top : null,
              headerToCopySeparation: (cRect && hRect) ? (cRect.top - hRect.bottom) : null
            };
          })()`,
          returnByValue: true
        });

        console.log(`Resolution ${res.width}x${res.height}:`, JSON.stringify(check.result.value));
      }

      // Capture screenshot at 1280x720
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1280,
        height: 720,
        deviceScaleFactor: 1,
        mobile: false
      });
      await new Promise(r => setTimeout(r, 400));
      await send('Runtime.evaluate', {
        expression: `document.querySelector('#missions').scrollIntoView({ behavior: 'instant' });`
      });
      await new Promise(r => setTimeout(r, 300));
      const shot720 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(artifactDir, 'screenshot_missions_1280x720.png'), Buffer.from(shot720.data, 'base64'));
      console.log('SAVED screenshot_missions_1280x720.png');

      chrome.kill();
      process.exit(0);
    });
  } catch(e) {
    console.error('Error:', e);
    chrome.kill();
    process.exit(1);
  }
}, 1000);
