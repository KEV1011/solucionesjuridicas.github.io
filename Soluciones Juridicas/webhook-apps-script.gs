/**
 * ════════════════════════════════════════════════════════════════
 *  SOLUCIONES JURÍDICAS — Webhook de Captación de Leads
 *  Recibe formularios de las landings y los guarda en Google Sheet
 * ════════════════════════════════════════════════════════════════
 *
 *  CÓMO INSTALAR (5 minutos):
 *
 *  1. Ve a sheets.google.com → "Hoja en blanco"
 *  2. Renombra la hoja como: "Leads Soluciones Jurídicas 2026"
 *  3. En el menú: Extensiones → Apps Script
 *  4. Borra todo el código que aparece y pega ESTE archivo completo
 *  5. Guarda (Ctrl+S) — nombre del proyecto: "Webhook Leads"
 *  6. Clic en "Implementar" (arriba a la derecha) → "Nueva implementación"
 *  7. Tipo: "Aplicación web"
 *  8. Configuración:
 *       - Ejecutar como: "Yo"
 *       - Quién tiene acceso: "Cualquier usuario"
 *  9. Implementar → Autoriza permisos
 * 10. Copia la "URL de la aplicación web" — la pegarás en los 3 HTMLs
 *
 *  La URL se ve así:
 *  https://script.google.com/macros/s/AKfycb.../exec
 */

// ── Configuración ─────────────────────────────────────────────────
const SHEET_NAME = 'Leads'
const HEADERS    = [
  'Fecha',
  'Hora',
  'Landing',
  'Nombre',
  'Teléfono',
  'Email',
  'Mensaje',
  'UTM Source',
  'UTM Medium',
  'UTM Campaign',
  'UTM Content',
  'IP / User-Agent',
]

// ── Endpoint POST ─────────────────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const ss   = SpreadsheetApp.getActiveSpreadsheet()
    let sheet  = ss.getSheetByName(SHEET_NAME)

    // Crea la hoja si no existe
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME)
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#0A1F3D')
        .setFontColor('#FFFFFF')
      sheet.setFrozenRows(1)
    }

    const now    = new Date()
    const fecha  = Utilities.formatDate(now, 'America/Bogota', 'yyyy-MM-dd')
    const hora   = Utilities.formatDate(now, 'America/Bogota', 'HH:mm:ss')

    sheet.appendRow([
      fecha,
      hora,
      data.landing      || '',
      data.nombre       || data.name    || '',
      data.telefono     || data.phone   || '',
      data.email        || '',
      data.mensaje      || data.message || '',
      data.utm_source   || '',
      data.utm_medium   || '',
      data.utm_campaign || '',
      data.utm_content  || '',
      e.parameter.userAgent || '',
    ])

    // Notificación opcional por email — descomentar y poner email
    // MailApp.sendEmail({
    //   to: 'tu-email@gmail.com',
    //   subject: '🔔 Nuevo lead — ' + (data.landing || 'Web'),
    //   body: 'Nombre: ' + (data.nombre||'') +
    //         '\nTeléfono: ' + (data.telefono||'') +
    //         '\nEmail: ' + (data.email||'') +
    //         '\nLanding: ' + (data.landing||'') +
    //         '\nCampaña: ' + (data.utm_campaign||'directo')
    // })

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// ── GET de prueba ─────────────────────────────────────────────────
function doGet() {
  return ContentService
    .createTextOutput('Webhook Soluciones Jurídicas activo ✓')
    .setMimeType(ContentService.MimeType.TEXT)
}
