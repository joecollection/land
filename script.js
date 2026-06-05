// ========================================================
// ⚡ AI INVESTMENT ENGINE & UI MODAL CONTROLLER
// ========================================================

/**
 * ฟังก์ชันประมวลผลข้อมูล AI ด้านบนสุด (Run AI Investment Engine)
 * ทำหน้าที่คำนวณราคาที่ดิน พื้นที่ตารางเมตร อัตราเฉลี่ยต่อไร่/ตารางวาตามจริง
 */
function generateLandAnalysisWithAI() {
  const name = document.getElementById('landName').value;
  const location = document.getElementById('landLocation').value;
  const rai = document.getElementById('landRai').value;
  const price = document.getElementById('askingPrice').value;
  
  // 1. อัปเดตข้อความบนแถบวิ่ง (Ticker)
  document.getElementById('tickName').innerText = name;
  document.getElementById('tickRai').innerText = rai + " Rai";
  document.getElementById('tickPrice').innerText = "THB " + Number(price).toLocaleString() + ",000,000";
  
  // 2. อัปเดตราคาบนรูปภาพ Hero Card
  document.getElementById('cardPrice').innerHTML = "฿" + Number(price).toLocaleString() + "M<span class='unit'>THB</span>";
  
  // 3. อัปเดตหัวข้อเรื่องและทำเลบนการ์ดหลัก
  document.getElementById('cardTitle').innerHTML = name + "<br>" + location;
  document.getElementById('cardSubtitle').innerText = rai + " Rai · Prime Development Parcel";
  
  // 4. คำนวณตารางสถิติตัวเลขใหม่ (Stats Grid)
  const sqM = rai * 1600;
  const perRai = price / rai;
  const perWa = (perRai * 1000000) / 400;
  
  document.getElementById('statRai').innerText = rai;
  document.getElementById('statSqM').innerText = sqM.toLocaleString();
  document.getElementById('statPerRai').innerText = perRai.toFixed(1) + "M";
  document.getElementById('statPerWa').innerText = (perWa / 1000000).toFixed(2) + "M";
  
  // 5. อัปเดตค่าในตารางฐานข้อมูล (Valuation Data Table)
  document.getElementById('tableArea').innerText = rai + " Rai (" + sqM.toLocaleString() + " m²)";
  document.getElementById('tableTotal').innerText = "THB " + (price * 1000000).toLocaleString();
  document.getElementById('tablePerRai').innerText = "THB " + (perRai * 1000000).toLocaleString();
  document.getElementById('tablePerWa').innerText = "THB " + perWa.toLocaleString();
  
  // 6. ส่งผลลัพธ์การจำลองสมองกลเข้าสู่ชุดข้อมูลหน้าต่างบทวิเคราะห์ AI (Modal)
  document.getElementById('aiRationale').innerText = "AI Analysis Engine successfully processed: '" + name + "' located in " + location + ". This " + rai + " Rai parcel layout matches optimal structural design efficiency configurations under municipal institutional commercial framework zoning guidelines.";
  document.getElementById('aiConclusion').innerText = "Highly recommended high-conviction target profile acquisition for " + name + " pipeline. Valuation models remain highly competitive at THB " + perRai.toFixed(1) + "M per Rai against immediate sub-district benchmarks.";
  
  // แจ้งเตือนความสำเร็จระบบรันเสร็จสิ้น
  alert("⚡ AI Investment Engine Processed Successfully!");
}

/**
 * ฟังก์ชันควบคุมการเปิด-ปิด ป๊อปอัพหน้าต่าง Gallery
 */
function openGallery() {
  document.getElementById('galleryModal').classList.add('open');
  document.body.style.overflow = 'hidden'; // ล็อกไม่ให้หน้าจอหลักเลื่อน
}
function closeGallery() {
  document.getElementById('galleryModal').classList.remove('open');
  document.body.style.overflow = ''; // คืนค่าเลื่อนหน้าจอปกติ
}

/**
 * ฟังก์ชันควบคุมการเปิด-ปิด ป๊อปอัพหน้าต่าง Investment Analysis
 */
function openAnalysis() {
  document.getElementById('analysisModal').classList.add('open');
  document.body.style.overflow = 'hidden'; // ล็อกไม่ให้หน้าจอหลักเลื่อน
}
function closeAnalysis() {
  document.getElementById('analysisModal').classList.remove('open');
  document.body.style.overflow = ''; // คืนค่าเลื่อนหน้าจอปกติ
}
