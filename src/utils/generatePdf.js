export async function generateQuotePdf(element, filename) {
  // Dynamic import keeps it out of the main bundle until needed
  const html2pdfModule = await import('html2pdf.js');
  const html2pdf = html2pdfModule.default ?? html2pdfModule;

  const opt = {
    margin:   0,
    filename,
    image:    { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale:           2,       // 2× for crisp text at high DPI
      useCORS:         true,
      letterRendering: true,
      logging:         false,
      scrollX:         0,
      scrollY:         0,
    },
    jsPDF: {
      unit:        'mm',
      format:      'a4',
      orientation: 'portrait',
    },
    pagebreak: { mode: ['css', 'legacy'] },
  };

  return html2pdf().set(opt).from(element).save();
}
