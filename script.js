// ── 🤖 CORE AI LAND ANALYSIS ENGINE (เวอร์ชันคำนวณ ไร่-งาน-วา) ──
function generateLandAnalysisWithAI() {
  // 1. ดึงข้อมูลจาก UI Input Control Panel (รวมถึง งาน และ วา)
  const landName = document.getElementById('landName').value || "Premium Vacant Plot";
  const location = document.getElementById('landLocation').value || "Thailand Hub";
  const askingPriceMB = parseFloat(document.getElementById('askingPrice').value) || 0;

  const rai = parseFloat(document.getElementById('landRai').value) || 0;
  const ngan = parseFloat(document.getElementById('landNgan').value) || 0;
  const wah = parseFloat(document.getElementById('landWah').value) || 0;

  // 2. มาตราส่วนที่ดินไทยและการคำนวณพื้นที่รวมแบบคณิตศาสตร์อสังหาฯ
  // 1 ไร่ = 4 งาน = 400 ตารางวา | 1 ตารางวา = 4 ตารางเมตร
  const totalSqWah = (rai * 400) + (ngan * 100) + wah;
  const totalSqMetres = totalSqWah * 4;
  const totalRaiCalculated = totalSqWah / 400; // แปลงกลับเป็นหน่วยไร่รวมทศนิยมเพื่อใช้คิดราคาต่อไร่

  const priceRaw = askingPriceMB * 1,000,000;
  
  // คำนวณราคาเฉลี่ยต่อหน่วย ป้องกันกรณีหารด้วย 0
  const pricePerRai = totalRaiCalculated > 0 ? (priceRaw / totalRaiCalculated) : 0;
  const pricePerWa = totalSqWah > 0 ? (priceRaw / totalSqWah) : 0;

  // สร้างข้อความสตริงแสดงขนาดที่ดินในรูปแบบภาษาไทย/สากล
  let areaTextDisplay = "";
  if (rai > 0) areaTextDisplay += `${rai} ไร่ `;
  if (ngan > 0) areaTextDisplay += `${ngan} งาน `;
  if (wah > 0) areaTextDisplay += `${wah} วา`;
  if (rai === 0 && ngan === 0 && wah === 0) areaTextDisplay = "0 ไร่";

  // 3. จัดการฟอร์แมตตัวเลขแสดงผลบนหน้าจอ (, คอมมาคั่น)
  const fmtSqM = totalSqMetres.toLocaleString(undefined, {maximumFractionDigits: 0});
  const fmtPriceTotal = priceRaw.toLocaleString('en-US');
  const fmtPerRai = pricePerRai.toLocaleString('en-US', {maximumFractionDigits: 0});
  const fmtPerWa = pricePerWa.toLocaleString('en-US', {maximumFractionDigits: 0});

  // 4. อัปเดตข้อมูลไดนามิกลงไปที่จุดต่างๆ บนหน้าเว็บ
  document.getElementById('tickName').innerText = landName;
  document.getElementById('tickRai').innerText = areaTextDisplay;
  document.getElementById('tickPrice').innerText = `THB ${fmtPriceTotal}`;
  
  document.getElementById('cardPrice').innerHTML = `฿${askingPriceMB}M<span class="unit">THB</span>`;
  document.getElementById('cardTitle').innerHTML = `${landName}<br>${location}`;
  document.getElementById('cardSubtitle').innerHTML = `${areaTextDisplay} · Prime Asset Opportunity`;

  // อัปเดตในกล่อง 4 Stats Grid หลักด้านบน (แสดงค่าเป็น ไร่รวมทศนิยม เพื่อความสวยงามในกราฟิก)
  document.getElementById('statRai').innerText = totalRaiCalculated.toFixed(2);
  document.getElementById('statSqM').innerText = fmtSqM;
  document.getElementById('statPerRai').innerText = pricePerRai >= 1,000,000 ? `${(pricePerRai/1,000,000).toFixed(2)}M` : fmtPerRai;
  document.getElementById('statPerWa').innerText = pricePerWa >= 1,000,000 ? `${(pricePerWa/1,000,000).toFixed(2)}M` : fmtPerWa;

  // อัปเดตข้อมูลตารางสรุปด้านล่าง (Valuation Table)
  document.getElementById('tableArea').innerText = `${areaTextDisplay} (${fmtSqM} m²)`;
  document.getElementById('tableTotal').innerText = `THB ${fmtPriceTotal}`;
  document.getElementById('tablePerRai').innerText = `THB ${fmtPerRai}`;
  document.getElementById('tablePerWa').innerText = `THB ${fmtPerWa}`;

  // 5. ระบบ AI วิเคราะห์กลยุทธ์เชิงลึกตามราคาที่ดินต่อตารางวา
  let intensity = "Medium Density";
  let targetIRR = "14 - 18%";
  let overviewText = "";

  if (pricePerWa > 500000) {
    intensity = "Ultra-High Density";
    targetIRR = "20 - 24%";
    overviewText = `This site represents a premium, institutional-grade hyper-luxury acquisition located inside the core premium zone of ${location}. At a calculated pricing tier of THB ${fmtPerWa} per Sq.Wah, the investment strategy demands a high-efficiency landmark development such as branded residences, luxury hospitality, or a premium commercial mixed-use project to fully capture maximum land value appreciation.`;
  } else {
    intensity = "Low-to-Medium Density";
    targetIRR = "16 - 20%";
    overviewText = `A strategically positioned contiguous land holding of ${areaTextDisplay} inside the emerging development strip of ${location}. Priced competitively at THB ${fmtPerRai} per Rai, this asset offers a strong capital buffer. It is structurally optimized for sub-division compounds, exclusive lifestyle wellness retreats, or premium horizontal residential estates taking advantage of rising demand in the periphery.`;
  }

  // ส่งผลวิเคราะห์ไปบันทึกไว้ในระบบรายงานความลับ (Investment Analysis Modal)
  document.getElementById('propertyDesc').innerText = overviewText;
  document.getElementById('aiRationale').innerText = overviewText;
  
  document.getElementById('aiConclusion').innerText = `At a macro valuation of THB ${fmtPriceTotal}, the transaction layout presents a defensible capital-preservation play. The cost index of THB ${fmtPerRai} per Rai establishes an attractive entry point compared to recent historical replacement costs in ${location}. Joe Collection recommends executing immediate soil-testing, local infrastructure confirmation, and title deed due diligence.`;

  document.getElementById('kpiDensity').innerText = intensity;
  document.getElementById('kpiTargetIRR').innerText = targetIRR;

  // ระบบแจ้งเตือนผู้ใช้งานเมื่อคำนวณเรียบร้อย
  alert(`🤖 AI Land Engine คำนวณสำเร็จ!\nแปลงข้อมูล ${areaTextDisplay} เป็น ${fmtSqM} ตารางเมตร และคิดคำนวณต้นทุน/บทวิเคราะห์ของ "${landName" ให้ใหม่เรียบร้อยแล้วครับ`);
}
