// Fungsi untuk menampilkan konten berdasarkan menu yang dipilih
document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Sembunyikan semua konten
        document.querySelectorAll('.content').forEach(content => {
            content.classList.add('hidden');
        });
        
        // Tampilkan konten yang sesuai
        const target = this.getAttribute('data-target');
        document.getElementById(target).classList.remove('hidden');
        
        // Update status aktif menu
        document.querySelectorAll('.sidebar .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Fungsi untuk menghitung total debit dan kredit
function hitungTotal() {
    let totalDebit = 0;
    let totalKredit = 0;
    
    document.querySelectorAll('.debit-input').forEach(input => {
        totalDebit += parseFloat(input.value) || 0;
    });
    
    document.querySelectorAll('.kredit-input').forEach(input => {
        totalKredit += parseFloat(input.value) || 0;
    });
    
    document.getElementById('total-debit').textContent = totalDebit.toLocaleString('id-ID');
    document.getElementById('total-kredit').textContent = totalKredit.toLocaleString('id-ID');
}

// Tambah baris pada form input transaksi
document.getElementById('tambah-baris-btn').addEventListener('click', function() {
    const tableBody = document.querySelector('#detail-transaksi-table tbody');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td>
            <select class="form-select" required>
                <option value="" selected disabled>Pilih Akun</option>
                <option>Kas</option>
                <option>Piutang Usaha</option>
                <option>Pendapatan</option>
                <option>Beban</option>
                <option>Utang Usaha</option>
            </select>
        </td>
        <td><input type="number" class="form-control debit-input" placeholder="0" min="0"></td>
        <td><input type="number" class="form-control kredit-input" placeholder="0" min="0"></td>
        <td><button type="button" class="btn btn-danger btn-sm hapus-baris-btn"><i class="fas fa-trash"></i></button></td>
    `;
    
    tableBody.appendChild(newRow);
    
    // Tambahkan event listener untuk input baru
    newRow.querySelector('.debit-input').addEventListener('input', hitungTotal);
    newRow.querySelector('.kredit-input').addEventListener('input', hitungTotal);
    newRow.querySelector('.hapus-baris-btn').addEventListener('click', function() {
        newRow.remove();
        hitungTotal();
    });
});

// Hapus baris pada form input transaksi
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('hapus-baris-btn')) {
        e.target.closest('tr').remove();
        hitungTotal();
    }
});

// Event listener untuk input debit dan kredit
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('debit-input') || e.target.classList.contains('kredit-input')) {
        hitungTotal();
        
        // Jika debit diisi, kosongkan kredit dan sebaliknya
        if (e.target.classList.contains('debit-input') && e.target.value !== '') {
            e.target.closest('tr').querySelector('.kredit-input').value = '';
        } else if (e.target.classList.contains('kredit-input') && e.target.value !== '') {
            e.target.closest('tr').querySelector('.debit-input').value = '';
        }
    }
});

// Validasi form transaksi
document.getElementById('transaksi-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const totalDebit = parseFloat(document.getElementById('total-debit').textContent.replace(/\./g, '')) || 0;
    const totalKredit = parseFloat(document.getElementById('total-kredit').textContent.replace(/\./g, '')) || 0;
    
    if (totalDebit !== totalKredit) {
        alert('Total debit dan kredit harus sama! Silakan periksa kembali input Anda.');
        return;
    }
    
    alert('Transaksi berhasil disimpan!');
    this.reset();
    hitungTotal();
});

// Tombol lihat laporan
document.querySelectorAll('.lihat-laporan-btn').forEach(button => {
    button.addEventListener('click', function() {
        const jenisLaporan = this.getAttribute('data-laporan');
        const periodeAwal = document.getElementById('periode-awal').value;
        const periodeAkhir = document.getElementById('periode-akhir').value;
        
        if (!periodeAwal || !periodeAkhir) {
            alert('Silakan pilih periode laporan terlebih dahulu!');
            return;
        }
        
        alert(`Menampilkan laporan ${jenisLaporan} untuk periode ${periodeAwal} hingga ${periodeAkhir}`);
    });
});

// Inisialisasi tampilan awal
document.getElementById('home-content').classList.remove('hidden');

// Set tanggal default untuk input transaksi
document.getElementById('tanggal').valueAsDate = new Date();

// Set tanggal default untuk periode laporan
const today = new Date();
const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
document.getElementById('periode-awal').valueAsDate = firstDay;
document.getElementById('periode-akhir').valueAsDate = today;

// Inisialisasi hitung total
hitungTotal();