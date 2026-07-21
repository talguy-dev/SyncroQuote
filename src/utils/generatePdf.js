const OPT = {
  margin: 0,
  image:    { type: 'jpeg', quality: 0.98 },
  html2canvas: {
    scale:           2,
    useCORS:         true,
    letterRendering: true,
    logging:         false,
    scrollX:         0,
    scrollY:         0,
  },
  jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  pagebreak: { mode: ['css', 'legacy'] },
};

async function getHtml2pdf() {
  const mod = await import('html2pdf.js');
  return mod.default ?? mod;
}

export async function generatePdfBlob(element) {
  const html2pdf = await getHtml2pdf();
  return html2pdf().set(OPT).from(element).outputPdf('blob');
}

export async function generateQuotePdf(element, filename) {
  const html2pdf = await getHtml2pdf();
  return html2pdf().set({ ...OPT, filename }).from(element).save();
}
