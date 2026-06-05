// ── 📊 MODAL POPUP CONTROLLERS ──
function openGallery() {
  alert("Gallery system ready. Template optimized for high-res drone photography captures.");
}

function openAnalysis() {
  document.getElementById('analysisModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAnalysis() {
  document.getElementById('analysisModal').classList.remove('open');
  document.body.style.overflow = '';
}

// ผูกฟังก์ชันปิดหน้าต่างกรณีคลิกพื้นหลังสีดำรอบตัวการ์ด
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('analysisModal');
  if(overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAnalysis();
      }
    });
  }
});

// ผูกปุ่มกด Escape บนแป้นพิมพ์เพื่อปิดหน้าต่างรีพอร์ต
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAnalysis();
  }
});


// ── 🤖 CORE AI LAND ANALYSIS ENGINE ──
function generateLandAnalysisWithAI() {
  // 1. ดึงค่าตัวแปรจากหน้าแผงควบคุมหลัก
  const landName = document.getElementById('landName').value || "Premium Vacant Plot";
  const location = document.getElementById('landLocation').value || "Thailand Hub";
  const askingPriceMB = parseFloat(document.getElementById('askingPrice').value) || 0;

  const rai = parseFloat(document.getElementById('landRai').value) || 0;
  const ngan = parseFloat(document.getElementById('landNgan').value) || 0;
  const wah = parseFloat(document.getElementById('landWah').value) || 0;

  // 2. สูตรคณิตศาสตร์อสังหาฯ แปลงมาตราที่ดินไทยเสร็จสรรพ
  const totalSqWah = (rai * 400) + (ngan * 100) + wah;
  const totalSqMetres = totalSqWah * 4;
  const totalRaiCalculated = totalSqWah / 400;

  const priceRaw = askingPriceMB * 1000000;
  
  const pricePerRai = totalRaiCalculated > 0 ? (priceRaw / totalRaiCalculated) : 0;
  const pricePerWa = totalSqWah > 0 ? (priceRaw / totalSqWah) : 0;

  // เรียงลำดับสตริงแสดงผล ไร่-งาน-วา
  let areaTextDisplay = "";
  if (rai > 0) areaTextDisplay += `${rai} ไร่ `;
  if (ngan > 0) areaTextDisplay += `${ngan} งาน `;
  if (wah > 0) areaTextDisplay += `${wah} วา`;
  if (rai === 0 && ngan === 0 && wah === 0) areaTextDisplay = "0 ไร่";

  // ฟอร์แมตแต่งตัวเลขให้มี คอมมา (,) คั่นสวยงาม
  const fmtSqM = totalSqMetres.toLocaleString(undefined, {maximumFractionDigits: 0});
  const fmtPriceTotal = priceRaw.toLocaleString('en-US');
  const fmtPerRai = pricePerRai.toLocaleString('en-US', {maximumFractionDigits: 0});
  const fmtPerWa = pricePerWa.toLocaleString('en-US', {maximumFractionDigits: 0});

  // 3. เริ่มแผนป้อนข้อมูลกระจายลงจุดต่างๆ บนโครงสร้างหน้าเว็บ (Dynamic UI Update)
  document.getElementById('tickName').innerText = landName;
  document.getElementById('tickRai').innerText = areaTextDisplay;
  document.getElementById('tickPrice').innerText = `THB ${fmtPriceTotal}`;
  
  document.getElementById('cardPrice').innerHTML = `฿${askingPriceMB}M<span class="unit">THB</span>`;
  document.getElementById('cardTitle').innerHTML = `${landName}<br>${location}`;
  document.getElementById('cardSubtitle').innerHTML = `${areaTextDisplay} · Prime Asset Opportunity`;

  // อัปเดตข้อมูลกล่อง 4 Stats Grid
  document.getElementById('statRai').innerText = totalRaiCalculated.toFixed(2);
  document.getElementById('statSqM').innerText = fmtSqM;
  document.getElementById('statPerRai').innerText = pricePerRai >= 1000000 ? `${(pricePerRai/1000000).toFixed(2)}M` : fmtPerRai;
  document.getElementById('statPerWa').innerText = pricePerWa >= 1000000 ? `${(pricePerWa/1000000).toFixed(2)}M` : fmtPerWa;

  // อัปเดตตาราง Valuation Table ด้านล่างการ์ด
  document.getElementById('tableArea').innerText = `${areaTextDisplay} (${fmtSqM} m²)`;
  document.getElementById('tableTotal').innerText = `THB ${fmtPriceTotal}`;
  document.getElementById('tablePerRai').innerText = `THB ${fmtPerRai}`;
  document.getElementById('tablePerWa').innerText = `THB ${fmtPerWa}`;

  // 4. ให้ระบบอัจฉริยะวิเคราะห์ข้อความ Rationale อัตโนมัติตามระดับราคาต่อตารางวา
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

  // ส่งผลวิเคราะห์ฝังเข้าชุดกล่องหน้าต่าง Modal รายงานความลับ
  document.getElementById('propertyDesc').innerText = overviewText;
  document.getElementById('aiRationale').innerText = overviewText;
  
  document.getElementById('aiConclusion').innerText = `At a macro valuation of THB ${fmtPriceTotal}, the transaction layout presents a defensible capital-preservation play. The cost index of THB ${fmtPerRai} per Rai establishes an attractive entry point compared to recent historical replacement costs in ${location}. Joe Collection recommends executing immediate soil-testing, local infrastructure confirmation, and title deed due diligence.`;

  document.getElementById('kpiDensity').innerText = intensity;
  document.getElementById('kpiTargetIRR').innerText = targetIRR;

  // หน้าต่างเด้งตอบรับสถานะการทำงานสำเร็จ
  alert(`🤖 AI Land Engine คำนวณสำเร็จ!\nอัปเดตข้อมูลและบทวิเคราะห์ของดีล "${landName}" ลงบนแผงข้อมูลเรียบร้อยแล้วครับ`);
}
