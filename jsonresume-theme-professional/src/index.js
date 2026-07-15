import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Resume from './ui/Resume';

export const render = (resume) => {
  const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(<Resume resume={resume} />));
  const styles = sheet.getStyleTags();
  return `<!DOCTYPE html><head>
  <title>${resume.basics.name} - Resume</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <style media="print">
    @page {
      margin-top: 0.2in;
      margin-bottom: 0.2in;
      margin-left: 0.25in;
      margin-right: 0.25in;
    }

    /* Optional: Ensure body and html elements have no extra margins/padding */
    body, html {
      margin: 0;
      padding: 0;
    }
  </style>
  <style>
    @font-face {
      font-family: LatinModern;
      font-display: block;
      size-adjust: 100%;
      font-style: normal;
      font-weight: normal;
      src: url("/fonts/lmroman10-regular.otf") format("opentype");
    }

    @font-face {
      font-family: LatinModern;
      font-display: block;
      size-adjust: 100%;
      font-weight: bold;
      src: url("/fonts/lmroman10-bold.otf") format("opentype");
    }

    @font-face {
      font-family: LatinModern;
      font-display: block;
      size-adjust: 100%;
      font-style: italic;
      src: url("/fonts/lmroman10-italic.otf") format("opentype");
    }

     @font-face {
      font-family: LatinModernSans;
      font-display: block;
      size-adjust: 100%;
      font-style: normal;
      font-weight: normal;
      src: url("/fonts/lmsans10-regular.otf") format("opentype");
    }

    @font-face {
      font-family: LatinModernSans;
      font-display: block;
      size-adjust: 100%;
      font-weight: bold;
      src: url("/fonts/lmsans10-bold.otf") format("opentype");
    }

    @font-face {
      font-family: LatinModernSans;
      font-display: block;
      size-adjust: 100%;
      font-style: italic;
      src: url("/fonts/lmsans10-italic.otf") format("opentype");
    }

    html {
      font-family:LatinModern, "Courier New", monospace;
      background: #fff;
      font-size: 9px;
    }

    h2 {
      font-size: 1.65rem;
    }

    p {
      padding: 0;
      margin: 0;
    }

    p, li {
      font-size: 1.4rem;
      line-height: 1.5rem;
    }

    .secondary {
      color: #111;
    }

    a {
      text-decoration: none;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }



  </style>
  ${styles}</head><body>${html}<script>
    (function() {
      var pdfName = "${resume.basics.name}.pdf";
      window.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
          e.preventDefault();
          e.stopPropagation();
          var a = document.createElement('a');
          a.href = './' + pdfName;
          a.download = pdfName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      }, true);
    })();
  </script></body></html>`;
};

export { Resume };
