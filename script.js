// ── MODAL SYSTEM CONTROLLERS ──
function openGallery() {
  // หากต้องการทำระบบคลังภาพเพิ่มในอนาคต สามารถผูกตรงนี้ได้ครับ
  alert("Gallery system ready. Template optimized for high-res drone photography captures.");
}

function openAnalysis() {
  document.getElementById('analysisModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAnalysis() {
  document.getElementById('analysisModal').classList.remove('remove'); // fallback
  document.getElementById('analysisModal').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on background overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(el => {
      el.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});


// ── 🤖 CORE AI LAND ANALYSIS ENGINE ──
function generateLandAnalysisWithAI() {
  // 1. ดึงข้อมูลจาก UI Input Control Panel
  const landName = document.getElementById('landName').value || "Premium Vacant Plot";
  const location = document.getElementById('landLocation').value || "Thailand Hub";
  const rai = parseFloat(document.getElementById('landRai').value) || 1;
  const priceMB = parseFloat(document.getElementById('askingPrice').value) || 100;

  // 2. AI คำนวณคณิตศาสตร์อสังหาริมทรัพย์แบบอัตโนมัติ
  const totalSqMethres = rai * 1600; // 1 ไร่ = 1,600 ตารางเมตร
  const totalSqWah = rai * 400;      // 1 ไร่ = 400 ตารางวา
  
  const priceRaw = priceMB * 1000000;
  const pricePerRai = priceRaw / rai;
  const pricePerWa = priceRaw / totalSqWah;

  // 3. ปรับค่าการแสดงผลตัวเลขให้สวยงามแบบสากล (, คอมมาคั่น)
  const fmtSqM = totalSqMethres.toLocaleString(undefined, {maximumFractionDigits: 0});
  const fmtPriceTotal = priceRaw.toLocaleString('en-US');
  const fmtPerRai = pricePerRai.toLocaleString('en-US', {maximumFractionDigits: 0});
  const fmtPerWa = pricePerWa.toLocaleString('en-US', {maximumFractionDigits: 0});

  // 4. ทำระบบ Dynamic UI Updates (กระจายตัวเลขลงจุดต่างๆ หน้าบ้าน)
  document.getElementById('tickName').innerText = landName;
  document.getElementById('tickRai').innerText = `${rai} Rai`;
  document.getElementById('tickPrice').innerText = `THB ${fmtPriceTotal}`;
  
  document.getElementById('cardPrice').innerHTML = `฿${priceMB}M<span class="unit">THB</span>`;
  document.getElementById('cardTitle').innerHTML = `${landName}<br>${location}`;
  document.getElementById('cardSubtitle').innerHTML = `${rai} Rai · Prime Asset Opportunity`;

  // อัปเดตในกล่อง 4 Stats Grid
  document.getElementById('statRai').innerText = rai;
  document.getElementById('statSqM').innerText = fmtSqM;
  document.getElementById('statPerRai').innerText = pricePerRai >= 1000000 ? `${(pricePerRai/1000000).toFixed(2)}M` : fmtPerRai;
  document.getElementById('statPerWa').innerText = pricePerWa >= 1000000 ? `${(pricePerWa/1000000).toFixed(2)}M` : fmtPerWa;

  // อัปเดตข้อมูลตาราง Valuation Table
  document.getElementById('tableArea').innerText = `${rai} Rai (${fmtSqM} m²)`;
  document.getElementById('tableTotal').innerText = `THB ${fmtPriceTotal}`;
  document.getElementById('tablePerRai').innerText = `THB ${fmtPerRai}`;
  document.getElementById('tablePerWa').innerText = `THB ${fmtPerWa}`;

  // 5. ระบบคิดคำนวณและสร้างเนื้อหาบทวิเคราะห์เชิงกลยุทธ์ (AI Logic Text Output)
  let intensity = "Medium Density";
  let targetIRR = "14 - 18%";
  let overviewText = "";

  // จัดหมวดหมู่บทวิเคราะห์อัจฉริยะตามขนาดและมูลค่าดีลที่กรอกเข้ามา
  if (pricePerWa > 500000) {
    intensity = "Ultra-High Density";
    targetIRR = "20 - 24%";
    overviewText = `This site represents a premium, institutional-grade hyper-luxury acquisition located inside the core premium zone of ${location}. At a calculated pricing tier of THB ${fmtPerWa} per Sq.Wah, the investment strategy demands a high-efficiency landmark development such as branded residences, luxury hospitality, or a premium commercial mixed-use project to fully capture maximum land value appreciation.`;
  } else {
    intensity = "Low-to-Medium Density";
    targetIRR = "16 - 20%";
    overviewText = `A strategically positioned contiguous land holding of ${rai} Rai inside the emerging development strip of ${location}. Priced competitively at THB ${fmtPerRai} per Rai, this asset offers a strong capital buffer. It is structurally optimized for sub-division compounds, exclusive lifestyle wellness retreats, or premium horizontal residential estates taking advantage of rising demand in the periphery.`;
  }

  // ส่งบทวิเคราะห์เข้าไปฝังในแผงควบคุมหลัก
  document.getElementById('propertyDesc').innerText = overviewText;
  document.getElementById('aiRationale').innerText = overviewText;
  
  document.getElementById('aiConclusion').innerText = `At a macro valuation of THB ${fmtPriceTotal}, the transaction layout presents a defensible capital-preservation play. The cost index of THB ${fmtPerRai} per Rai establishes an attractive entry point compared to recent historical replacement costs in ${location}. Joe Collection recommends executing immediate soil-testing, local infrastructure confirmation, and title deed due diligence.`;

  document.getElementById('kpiDensity').innerText = intensity;
  document.getElementById('kpiTargetIRR').innerText = targetIRR;

  // ระบบแจ้งเตือนการประมวลผลสำเร็จ
  alert(`🤖 AI Analysis Engine Complete!\nคำนวณข้อมูลที่ดิน "${landName}" เสร็จสิ้น ระบบได้เปลี่ยนข้อมูลและบทวิเคราะห์ใน Investment Analysis เรียบร้อยแล้วครับ`);
}
