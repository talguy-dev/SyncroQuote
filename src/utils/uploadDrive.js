export async function uploadToDrive(pdfBlob, userFiles, data) {
  const company = data.company?.trim() || 'Syncro';
  const date    = new Date().toLocaleDateString('he-IL').replace(/\//g, '-');
  const name    = `${company}_${date}`;

  const fd = new FormData();
  fd.append('folderName', name);
  fd.append('files', pdfBlob, `${name}.pdf`);
  for (const file of userFiles) {
    fd.append('files', file, file.name);
  }

  const res = await fetch('/api/upload', { method: 'POST', body: fd });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `שגיאת שרת ${res.status}`);
  }
  return res.json();
}
