/* ================================================
   SĂN TIM MẬT MÃ CÔNG DÂN SỐ — script.js
   Game logic: random nhiệm vụ không lặp, 4 đáp án
   cho câu hỏi, animation, âm thanh Web Audio API
   ================================================ */

// ──────────────────────────────────────────────
// 1. DỮ LIỆU: 25 câu hỏi (có 4 đáp án) + 25 thử thách
// ──────────────────────────────────────────────
const MISSIONS = [

  // ── CÂU HỎI (25 câu) — có answers[] + correct (index 0-3) ──
  {
    type: "question", icon: "❓",
    content: "Công dân số (Digital Citizen) là người như thế nào?",
    answers: [
      "Người biết sử dụng công nghệ an toàn, có trách nhiệm và sáng tạo",
      "Người chỉ dùng điện thoại để chơi game mỗi ngày",
      "Người sống trong thành phố có nhiều máy tính",
      "Người không bao giờ dùng mạng xã hội"
    ],
    correct: 0
  },
  {
    type: "question", icon: "🌐",
    content: "Ứng dụng nào sau đây là ví dụ về 'lưu trữ đám mây' (Cloud Storage)?",
    answers: [
      "Minecraft",
      "Google Drive",
      "Paint",
      "Calculator"
    ],
    correct: 1
  },
  {
    type: "question", icon: "🔐",
    content: "Mật khẩu nào sau đây là AN TOÀN NHẤT?",
    answers: [
      "123456",
      "namcuaban",
      "Th@nk$2024#Secure!",
      "password"
    ],
    correct: 2
  },
  {
    type: "question", icon: "📧",
    content: "Phishing (tấn công lừa đảo) qua email thường có dấu hiệu nào?",
    answers: [
      "Email từ địa chỉ quen thuộc của bạn bè",
      "Email yêu cầu bấm link lạ để 'xác minh tài khoản' gấp",
      "Email có chữ ký điện tử chính thức",
      "Email được gửi từ tên miền .gov.vn"
    ],
    correct: 1
  },
  {
    type: "question", icon: "🤖",
    content: "AI (Trí tuệ nhân tạo) trong điện thoại giúp ích gì mỗi ngày?",
    answers: [
      "Tự động sạc pin điện thoại",
      "Làm cho màn hình sáng hơn",
      "Nhận diện khuôn mặt và gợi ý ảnh tương tự",
      "Tăng dung lượng bộ nhớ"
    ],
    correct: 2
  },
  {
    type: "question", icon: "📱",
    content: "QR code là viết tắt của cụm từ gì?",
    answers: [
      "Quick Response Code",
      "Quality Reading Code",
      "Queue Register Code",
      "Quantum Reality Code"
    ],
    correct: 0
  },
  {
    type: "question", icon: "🛡️",
    content: "Tại sao KHÔNG nên dùng chung một mật khẩu cho nhiều tài khoản?",
    answers: [
      "Vì máy tính sẽ bị nóng hơn",
      "Vì nếu 1 tài khoản bị hack, tất cả tài khoản khác cũng bị xâm phạm",
      "Vì mật khẩu giống nhau sẽ bị hệ thống tự xóa",
      "Vì quy định pháp luật bắt buộc"
    ],
    correct: 1
  },
  {
    type: "question", icon: "💾",
    content: "1 Gigabyte (GB) bằng bao nhiêu Megabyte (MB)?",
    answers: [
      "10 MB",
      "100 MB",
      "1000 MB",
      "1024 MB"
    ],
    correct: 3
  },
  {
    type: "question", icon: "🕵️",
    content: "Để kiểm tra một tin tức trên mạng có thật không, em nên làm gì?",
    answers: [
      "Chia sẻ ngay cho bạn bè để mọi người cùng biết",
      "Tin ngay vì có nhiều người like",
      "Kiểm tra từ nhiều nguồn uy tín khác nhau trước khi chia sẻ",
      "Chỉ đọc tiêu đề là đủ"
    ],
    correct: 2
  },
  {
    type: "question", icon: "🎮",
    content: "Khi chơi game online gặp người lạ muốn hẹn gặp ngoài đời, em nên làm gì?",
    answers: [
      "Đồng ý gặp ngay vì đã quen biết qua game",
      "Cho họ số điện thoại và địa chỉ nhà",
      "Từ chối và báo ngay cho ba mẹ hoặc người lớn tin cậy",
      "Nhắn tin thêm để tìm hiểu kỹ hơn"
    ],
    correct: 2
  },
  {
    type: "question", icon: "💳",
    content: "Ví điện tử (như MoMo, ZaloPay) hoạt động dựa trên điều gì?",
    answers: [
      "Tiền mặt được lưu trong điện thoại",
      "Kết nối với tài khoản ngân hàng và mã hóa giao dịch",
      "Chỉ dùng được khi có WiFi mạnh",
      "Do nhà nước in thêm tiền số"
    ],
    correct: 1
  },
  {
    type: "question", icon: "🌍",
    content: "Mạng xã hội nào có số người dùng nhiều nhất thế giới tính đến nay?",
    answers: [
      "TikTok",
      "Instagram",
      "Facebook (Meta)",
      "X (Twitter)"
    ],
    correct: 2
  },
  {
    type: "question", icon: "📷",
    content: "Trước khi đăng ảnh bạn bè lên mạng, em cần làm gì?",
    answers: [
      "Chỉnh filter cho thật đẹp rồi đăng luôn",
      "Hỏi xin phép người trong ảnh trước",
      "Đăng ngay để được nhiều like",
      "Tag tất cả bạn bè vào ảnh"
    ],
    correct: 1
  },
  {
    type: "question", icon: "🖥️",
    content: "CPU trong máy tính có chức năng gì?",
    answers: [
      "Lưu trữ dữ liệu lâu dài",
      "Hiển thị hình ảnh lên màn hình",
      "Xử lý và tính toán tất cả các lệnh của máy tính",
      "Kết nối internet không dây"
    ],
    correct: 2
  },
  {
    type: "question", icon: "🔗",
    content: "Tấn công mạng nào giả mạo website ngân hàng để lấy cắp thông tin?",
    answers: [
      "Spam",
      "Malware",
      "Phishing",
      "DDoS"
    ],
    correct: 2
  },
  {
    type: "question", icon: "📊",
    content: "Big Data (Dữ liệu lớn) được các công ty dùng để làm gì?",
    answers: [
      "Làm máy tính chạy nhanh hơn",
      "Phân tích hành vi người dùng để cải thiện dịch vụ và quảng cáo",
      "Lưu phim và nhạc miễn phí",
      "Tạo ra mật khẩu ngẫu nhiên"
    ],
    correct: 1
  },
  {
    type: "question", icon: "🤳",
    content: "Cyber-bullying (bắt nạt trực tuyến) bao gồm hành vi nào?",
    answers: [
      "Nhắn tin động viên bạn bè khi buồn",
      "Chia sẻ bài học hay lên nhóm lớp",
      "Cố ý đăng ảnh/tin nhắn xúc phạm, làm xấu hổ người khác online",
      "Tặng quà sinh nhật qua ứng dụng"
    ],
    correct: 2
  },
  {
    type: "question", icon: "🧠",
    content: "Machine Learning (Học máy) có nghĩa là gì?",
    answers: [
      "Con người học cách sửa máy tính",
      "Máy tính tự học từ dữ liệu để cải thiện mà không cần lập trình lại",
      "Máy tính dạy con người lập trình",
      "Học sinh học môn tin học ở trường"
    ],
    correct: 1
  },
  {
    type: "question", icon: "🔢",
    content: "Hệ nhị phân máy tính dùng chỉ gồm những số nào?",
    answers: [
      "0, 1, 2, 3",
      "1, 2, 3, 4, 5",
      "0 và 1",
      "Chỉ số 0"
    ],
    correct: 2
  },
  {
    type: "question", icon: "📡",
    content: "Công nghệ 5G khác 4G chủ yếu ở điểm nào?",
    answers: [
      "5G chỉ dùng được ở nông thôn",
      "5G tốc độ nhanh hơn, độ trễ thấp hơn nhiều so với 4G",
      "5G không cần ăng-ten phát sóng",
      "5G chỉ dành cho máy tính, không dùng được điện thoại"
    ],
    correct: 1
  },
  {
    type: "question", icon: "🎯",
    content: "Ngôn ngữ lập trình nào thân thiện nhất cho người mới bắt đầu?",
    answers: [
      "Assembly",
      "C++",
      "Python",
      "Fortran"
    ],
    correct: 2
  },
  {
    type: "question", icon: "🛒",
    content: "Dấu hiệu nào cho thấy website mua sắm online AN TOÀN?",
    answers: [
      "Website có nhiều quảng cáo nhấp nháy",
      "URL bắt đầu bằng 'https://' và có biểu tượng ổ khóa",
      "Giá sản phẩm rẻ hơn 90% so với thị trường",
      "Website yêu cầu tải app lạ để thanh toán"
    ],
    correct: 1
  },
  {
    type: "question", icon: "⚡",
    content: "Blockchain có đặc điểm nào đặc biệt?",
    answers: [
      "Dữ liệu có thể xóa và sửa dễ dàng bởi một người",
      "Chỉ lưu được dữ liệu văn bản",
      "Dữ liệu được lưu phân tán, minh bạch và rất khó giả mạo",
      "Chỉ dùng được để lưu trữ Bitcoin"
    ],
    correct: 2
  },
  {
    type: "question", icon: "🌱",
    content: "Trung tâm dữ liệu (Data Center) tiêu thụ rất nhiều điện. Giải pháp 'xanh' nào đang được áp dụng?",
    answers: [
      "Tắt server vào ban đêm",
      "Sử dụng năng lượng tái tạo như điện mặt trời, gió để vận hành",
      "Chỉ lưu dữ liệu quan trọng",
      "Giảm tốc độ xử lý để tiết kiệm điện"
    ],
    correct: 1
  },
  {
    type: "question", icon: "🏆",
    content: "Kỹ năng nào quan trọng nhất cho công dân số trong thế kỷ 21?",
    answers: [
      "Gõ bàn phím thật nhanh",
      "Biết nhiều mạng xã hội",
      "Tư duy phản biện, an toàn số và khả năng học công nghệ mới",
      "Có nhiều thiết bị điện tử"
    ],
    correct: 2
  },

  // ── THỬ THÁCH (25 thử thách) — không có answers ──────────
  {
    type: "challenge", icon: "🕺",
    content: "Cả đội cùng làm điệu nhảy robot (giả vờ như robot) trong 15 giây! Tất cả phải cùng nhảy."
  },
  {
    type: "challenge", icon: "🎤",
    content: "Một thành viên phải giải thích từ 'Internet' chỉ bằng cử chỉ tay (không dùng lời) trong 30 giây. Các thành viên khác phải đoán đúng!"
  },
  {
    type: "challenge", icon: "⏱️",
    content: "Cả đội xếp thành hàng theo thứ tự ABC của tên trong vòng 20 giây. Không được nói chuyện, chỉ dùng ngón tay ra hiệu!"
  },
  {
    type: "challenge", icon: "🎨",
    content: "Trong 45 giây, vẽ nhanh một chiếc robot bằng ngón tay lên không khí. Sau đó mô tả robot đó làm được gì!"
  },
  {
    type: "challenge", icon: "🔊",
    content: "Hát 4 nhịp bất kỳ bài hát nào bằng giọng robot (tiếng beep boop). Cả đội phải đồng thanh!"
  },
  {
    type: "challenge", icon: "🤸",
    content: "Cả đội đứng thành vòng tròn và chuyền một cú hi-five vòng quanh đúng 3 vòng trong 15 giây!"
  },
  {
    type: "challenge", icon: "🧩",
    content: "Cả đội đếm ngược từ 20 về 0 bằng tiếng Anh trong 10 giây — mỗi người đọc một số theo lượt, đúng thứ tự!"
  },
  {
    type: "challenge", icon: "📱",
    content: "Dùng điện thoại tìm ảnh một con vật ngộ nghĩnh trong vòng 20 giây và cho cả nhóm xem!"
  },
  {
    type: "challenge", icon: "🎭",
    content: "Một thành viên diễn kịch câm mô tả việc 'tải ứng dụng bị lag'. Các thành viên còn lại đoán trong 20 giây!"
  },
  {
    type: "challenge", icon: "🌟",
    content: "Cả đội đồng thanh hô to: 'Công dân số — Thông minh, An toàn, Sáng tạo!' 3 lần thật to và hào hứng!"
  },
  {
    type: "challenge", icon: "🧮",
    content: "Không dùng máy tính, cả đội phải tính: 7 × 8 + 15 - 3 = ? Ai nói đáp án đúng đầu tiên thì đội thắng!"
  },
  {
    type: "challenge", icon: "🔄",
    content: "Cả đội đứng thành 'mạng lưới': mỗi người là một 'thiết bị', nắm tay nối với 2 người khác. Giữ nguyên 10 giây!"
  },
  {
    type: "challenge", icon: "💬",
    content: "Trong 30 giây, cả đội liệt kê càng nhiều ứng dụng điện thoại càng tốt — mỗi người kể 1 cái, không được trùng!"
  },
  {
    type: "challenge", icon: "🚀",
    content: "Cả đội giả vờ là phi hành gia bay vào vũ trụ kỹ thuật số — mỗi người tạo một âm thanh 'phóng tên lửa' khác nhau, đồng thời trong 5 giây!"
  },
  {
    type: "challenge", icon: "🧠",
    content: "Thử thách trí nhớ: Người đầu nói 1 từ công nghệ. Người tiếp lặp lại rồi thêm từ mới. Tiếp tục cho đến khi ai đó quên!"
  },
  {
    type: "challenge", icon: "🎯",
    content: "Người đứng đầu tạo một 'tư thế công dân số' (pose ngầu tự chọn). Cả hàng copy đúng tư thế đó trong 5 giây!"
  },
  {
    type: "challenge", icon: "🌈",
    content: "Trong 20 giây, cả đội xếp theo màu sắc quần áo — từ màu sáng nhất đến màu tối nhất. Không được nói chuyện!"
  },
  {
    type: "challenge", icon: "💡",
    content: "Cả đội tạo thành hình một chiếc bóng đèn bằng cơ thể người. Trọng tài đánh giá sáng tạo nhất!"
  },
  {
    type: "challenge", icon: "🔐",
    content: "Mỗi người đặt tay lên vai người cạnh và cả đội cùng bước sang phải 3 bước rồi trái 3 bước — cùng lúc, không vấp. Đây là 'đồng bộ dữ liệu'!"
  },
  {
    type: "challenge", icon: "📡",
    content: "Cả đội giả vờ là sóng WiFi: 1 người đứng giữa là 'router', lan tỏa ra xung quanh — càng ngày càng xa trung tâm!"
  },
  {
    type: "challenge", icon: "⌨️",
    content: "Thử thách gõ phím: 1 người 'gõ' lên lưng người khác 1 chữ cái — người kia đoán xem đó là chữ gì. Đoán đúng 3 lần liên tiếp là thắng!"
  },
  {
    type: "challenge", icon: "🎵",
    content: "Cả đội tạo ra nhạc điệu cho game 'Săn Tim Mật Mã' bằng tay vỗ, chân dậm, miệng hát. Biểu diễn trong 15 giây!"
  },
  {
    type: "challenge", icon: "🤝",
    content: "Cả đội bắt tay kiểu 'cập nhật phần mềm': bắt tay thường → bắt ngón tay → đập nhẹ → chạm khuỷu → xong. Phải đồng bộ trong 10 giây!"
  },
  {
    type: "challenge", icon: "🏃",
    content: "Thử thách 'Download': Từng người chạy đến 1 điểm và về — tượng trưng cho việc tải dữ liệu. Người cuối về là 'hoàn tất'. Cả đội ăn mừng!"
  },
  {
    type: "challenge", icon: "🌐",
    content: "Cả đội tạo thành vòng tròn lớn (World Wide Web) và truyền một 'gói dữ liệu' (chụm tay) quanh vòng, không được rớt, trong 15 giây!"
  }
];

// ──────────────────────────────────────────────
// 2. TRẠNG THÁI GAME
// ──────────────────────────────────────────────
let availableIndexes = [];  // Chỉ số nhiệm vụ chưa dùng
let usedCount = 0;          // Số nhiệm vụ đã hiện
let currentMission = null;  // Nhiệm vụ hiện tại
let answeredIndexes = [];   // Đáp án đã xáo trộn (lưu thứ tự đang hiển thị)

// Khởi tạo danh sách nhiệm vụ và xáo trộn
function initMissions() {
  availableIndexes = Array.from({ length: MISSIONS.length }, (_, i) => i);
  shuffleArray(availableIndexes);
  usedCount = 0;
}

// Fisher-Yates shuffle
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ──────────────────────────────────────────────
// 3. CHUYỂN MÀN HÌNH
// ──────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ──────────────────────────────────────────────
// 4. WEB AUDIO API — âm thanh không cần file
// ──────────────────────────────────────────────
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

// Beep scan QR
function playScanSound() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.3);
  } catch (e) {}
}

// Chime vui khi mở nhiệm vụ
function playMissionSound() {
  try {
    const ctx = getAudioCtx();
    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine'; osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.1;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.start(t); osc.stop(t + 0.4);
    });
  } catch (e) {}
}

// Âm thanh đúng — arpeggio vui
function playCorrectSound() {
  try {
    const ctx = getAudioCtx();
    [523, 659, 784, 1047, 1318].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine'; osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.08;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      osc.start(t); osc.stop(t + 0.5);
    });
  } catch (e) {}
}

// Âm thanh sai — tiếng xuống tông buồn
function playWrongSound() {
  try {
    const ctx = getAudioCtx();
    [330, 277, 220].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sawtooth'; osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.15;
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.start(t); osc.stop(t + 0.4);
    });
  } catch (e) {}
}

// ──────────────────────────────────────────────
// 5. CẬP NHẬT COUNTER SPLASH
// ──────────────────────────────────────────────
function updateSplashCounter() {
  const remaining = MISSIONS.length - usedCount;
  document.getElementById('splash-remaining').textContent = remaining;
}

// ──────────────────────────────────────────────
// 6. BẮT ĐẦU SCAN
// ──────────────────────────────────────────────
function startScan() {
  playScanSound();
  showScreen('screen-scanning');
  runScanAnimation();
}

// ──────────────────────────────────────────────
// 7. ANIMATION SCANNING
// ──────────────────────────────────────────────
const FAKE_CODE_LINES = [
  '> connecting to QR_NODE_07...',
  '> AUTH_TOKEN validated ✓',
  '> loading mission_pool.json...',
  '> AI_ENGINE initializing...',
  '> scanning pattern matrix...',
  '> decrypting payload data...',
  '> MISSION_SELECT = random()',
  '> applying anti-repeat filter...',
  '> compiling mission output...',
  '> READY — launching mission!',
];

function runScanAnimation() {
  const scanText = document.getElementById('scan-text');
  const decodePercent = document.getElementById('decode-percent');
  const decodeBarFill = document.getElementById('decode-bar-fill');
  const fakeCodeEl = document.getElementById('fake-code');

  decodeBarFill.style.width = '0%';
  decodePercent.textContent = '0%';
  fakeCodeEl.textContent = '';

  const steps = [
    { delay: 0,    text: 'Đang quét mã QR...',        percent: 0  },
    { delay: 400,  text: 'QR nhận dạng thành công ✓', percent: 25 },
    { delay: 800,  text: 'AI đang giải mã mật mã...', percent: 55 },
    { delay: 1300, text: 'Lọc nhiệm vụ không lặp...', percent: 80 },
    { delay: 1700, text: 'Hoàn tất! Mở nhiệm vụ...',  percent: 100 },
  ];

  steps.forEach(s => {
    setTimeout(() => {
      scanText.textContent = s.text;
      decodePercent.textContent = s.percent + '%';
      decodeBarFill.style.width = s.percent + '%';
    }, s.delay);
  });

  FAKE_CODE_LINES.forEach((line, i) => {
    setTimeout(() => { fakeCodeEl.textContent += line + '\n'; }, 150 + i * 170);
  });

  setTimeout(() => { showMission(); }, 2200);
}

// ──────────────────────────────────────────────
// 8. HIỆN NHIỆM VỤ NGẪU NHIÊN
// ──────────────────────────────────────────────
function showMission() {
  if (availableIndexes.length === 0) {
    showScreen('screen-end');
    return;
  }

  const idx = availableIndexes.pop();
  currentMission = MISSIONS[idx];
  usedCount++;

  const card       = document.getElementById('mission-card');
  const badge      = document.getElementById('mission-type-badge');
  const typeIcon   = document.getElementById('mission-type-icon');
  const typeLabel  = document.getElementById('mission-type-label');
  const missionNum = document.getElementById('mission-number');
  const missionContent = document.getElementById('mission-content');
  const missionsUsedEl = document.getElementById('missions-used');
  const answersWrap = document.getElementById('answers-wrap');
  const rewardEl   = document.getElementById('mission-reward');

  typeIcon.textContent = currentMission.icon;
  missionContent.textContent = currentMission.content;
  missionsUsedEl.textContent = usedCount;
  missionNum.textContent = String(usedCount).padStart(2, '0');

  if (currentMission.type === 'question') {
    badge.className = 'mission-type-badge type-question';
    typeLabel.textContent = 'CÂU HỎI';
    rewardEl.innerHTML = '<span>💙 Chọn đúng đáp án để thu thập QR!</span>';
    // Render đáp án (xáo trộn thứ tự)
    renderAnswers(currentMission.answers, currentMission.correct);
    answersWrap.style.display = 'flex';
  } else {
    badge.className = 'mission-type-badge type-challenge';
    typeLabel.textContent = 'THỬ THÁCH';
    rewardEl.innerHTML = '<span>💙 Hoàn thành → Giữ QR lại!</span>';
    answersWrap.style.display = 'none';
  }

  // Reset + chạy lại animation card
  card.className = 'mission-card';
  void card.offsetWidth;
  card.className = 'mission-card glow-active';

  updateSplashCounter();
  showScreen('screen-mission');
  playMissionSound();
}

// ──────────────────────────────────────────────
// 9. RENDER ĐÁP ÁN (xáo trộn vị trí)
// ──────────────────────────────────────────────
function renderAnswers(answers, correctIndex) {
  const wrap = document.getElementById('answers-wrap');
  wrap.innerHTML = '';

  // Tạo mảng [{text, isCorrect}] rồi xáo trộn
  const items = answers.map((text, i) => ({ text, isCorrect: i === correctIndex }));
  shuffleArray(items);

  items.forEach((item, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.innerHTML = `<span class="answer-letter">${['A','B','C','D'][i]}</span><span class="answer-text">${item.text}</span>`;
    btn.dataset.correct = item.isCorrect ? '1' : '0';
    btn.onclick = () => handleAnswer(btn, item.isCorrect);
    wrap.appendChild(btn);
  });
}

// ──────────────────────────────────────────────
// 10. XỬ LÝ KHI CHỌN ĐÁP ÁN
// ──────────────────────────────────────────────
function handleAnswer(selectedBtn, isCorrect) {
  // Vô hiệu hóa tất cả nút đáp án sau khi chọn
  const allBtns = document.querySelectorAll('.answer-btn');
  allBtns.forEach(btn => {
    btn.disabled = true;
    btn.classList.add('disabled');
    // Hiện đáp án đúng bằng màu xanh
    if (btn.dataset.correct === '1') {
      btn.classList.add('correct-reveal');
    }
  });

  if (isCorrect) {
    selectedBtn.classList.add('answer-correct');
    playCorrectSound();
    showResult(true);
  } else {
    selectedBtn.classList.add('answer-wrong');
    playWrongSound();
    showResult(false);
  }
}

// ──────────────────────────────────────────────
// 11. HIỆN MÀN HÌNH KẾT QUẢ
// ──────────────────────────────────────────────
function showResult(isCorrect) {
  const overlay = document.getElementById('result-overlay');
  const resultIcon  = document.getElementById('result-icon');
  const resultTitle = document.getElementById('result-title');
  const resultMsg   = document.getElementById('result-msg');
  const resultBox   = document.getElementById('result-box');

  if (isCorrect) {
    resultBox.className = 'result-box result-correct';
    resultIcon.textContent = '🎉';
    resultTitle.textContent = 'Chính xác!';
    resultMsg.textContent = 'Bạn được phép thu thập mã QR này! 💙';
  } else {
    resultBox.className = 'result-box result-wrong';
    resultIcon.textContent = '😢';
    resultTitle.textContent = 'Không chính xác!';
    resultMsg.textContent = 'Hãy đặt QR lại vị trí cũ. Chúc bạn may mắn lần sau!';
  }

  // Hiện overlay với animation
  overlay.classList.add('active');
}

// Đóng result overlay (nút "Tiếp tục")
function closeResult() {
  const overlay = document.getElementById('result-overlay');
  overlay.classList.remove('active');
}

// ──────────────────────────────────────────────
// 12. NÚT "NHIỆM VỤ MỚI"
// ──────────────────────────────────────────────
function getNewMission() {
  // Đóng overlay nếu đang mở
  closeResult();
  if (availableIndexes.length === 0) {
    showScreen('screen-end');
    return;
  }
  playScanSound();
  showScreen('screen-scanning');
  runScanAnimation();
}

// ──────────────────────────────────────────────
// 13. NÚT "QUAY LẠI"
// ──────────────────────────────────────────────
function goBack() {
  closeResult();
  updateSplashCounter();
  showScreen('screen-splash');
}

// ──────────────────────────────────────────────
// 14. RESET GAME
// ──────────────────────────────────────────────
function resetGame() {
  initMissions();
  updateSplashCounter();
  showScreen('screen-splash');
}

// ──────────────────────────────────────────────
// 15. KHỞI ĐỘNG KHI TẢI TRANG
// ──────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initMissions();
  updateSplashCounter();
});
