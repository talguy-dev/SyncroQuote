import { formidable } from 'formidable';
import { google } from 'googleapis';
import { createReadStream } from 'fs';

const PARENT_FOLDER_ID = '1QAtCYJcNSLE0wdIXdG-3s02QrCqnxYjr';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse multipart form (files saved to /tmp)
    const form = formidable({ multiples: true, maxFileSize: 50 * 1024 * 1024 });
    const [fields, files] = await form.parse(req);

    const folderName = fields.folderName?.[0] || 'Syncro_Upload';

    // Google Service Account auth
    const saJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!saJson) {
      return res.status(500).json({ error: 'Missing GOOGLE_SERVICE_ACCOUNT_JSON env var' });
    }
    const sa = JSON.parse(saJson);
    const auth = new google.auth.JWT({
      email: sa.client_email,
      key: sa.private_key.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    const drive = google.drive({ version: 'v3', auth });

    // Create new subfolder inside the parent folder
    const { data: { id: folderId } } = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [PARENT_FOLDER_ID],
      },
      fields: 'id',
    });

    // Upload all files (PDF + user attachments)
    const allFiles = Object.values(files).flat();
    await Promise.all(
      allFiles.map((f) =>
        drive.files.create({
          requestBody: {
            name: f.originalFilename || f.newFilename || 'file',
            parents: [folderId],
          },
          media: {
            mimeType: f.mimetype || 'application/octet-stream',
            body: createReadStream(f.filepath),
          },
        })
      )
    );

    res.status(200).json({ success: true, folderId });
  } catch (err) {
    console.error('[upload] error:', err);
    res.status(500).json({ error: err.message || 'Upload failed' });
  }
}
