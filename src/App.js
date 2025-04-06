import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { 
  LayoutDashboard, 
  Users, 
  FileCheck, 
  Package, 
  BarChart3, 
  Calculator, 
  Settings,
  ShoppingBag,
  Truck,
  Palette,
  CreditCard,
  Calendar,
  MapPin,
  FileText
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Anasayfa bileşeni
const Anasayfa = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/images/logo-dark.png" alt="DEKORSAN BOYA" className="h-10" />
            <span className="ml-4 text-lg text-gray-400">DEKORSAN BOYA</span>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <div 
            className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer flex flex-col items-center"
            onClick={() => navigate('/muhasebe-ekrani')}
          >
            <Calculator size={64} className="text-blue-400 mb-4" />
            <h2 className="text-2xl font-semibold text-blue-400">Muhasebe Ekranı</h2>
            <p className="mt-2 text-gray-400 text-center">Finansal raporlar, cari hesaplar, çek & senet takibi ve envanter yönetimi</p>
          </div>
          
          <div 
            className="bg-gray-800 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer flex flex-col items-center"
            onClick={() => navigate('/yonetim-ekrani')}
          >
            <Settings size={64} className="text-green-400 mb-4" />
            <h2 className="text-2xl font-semibold text-green-400">Yönetim Ekranı</h2>
            <p className="mt-2 text-gray-400 text-center">Personel yönetimi, performans takibi ve şirket operasyonları</p>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 p-4 text-center text-gray-400 text-sm">
        © 2025 DEKORSAN BOYA. Tüm hakları saklıdır.
      </footer>
    </div>
  );
};

// Yönetim Ekranı bileşeni
const YonetimEkrani = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('perakendeSatis');
  const [selectedBayi, setSelectedBayi] = useState('filliCarsi');
  const [lastUpdateDate, setLastUpdateDate] = useState('01.03.2025');
  const [isUpdating, setIsUpdating] = useState(false);
  const [dateFilter, setDateFilter] = useState('buYil');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showCustomDateFilter, setShowCustomDateFilter] = useState(false);
  const [soforDateFilter, setSoforDateFilter] = useState('buYil');
  const [soforCustomStartDate, setSoforCustomStartDate] = useState('');
  const [soforCustomEndDate, setSoforCustomEndDate] = useState('');
  const [showSoforCustomDateFilter, setShowSoforCustomDateFilter] = useState(false);
  const [boyaDateFilter, setBoyaDateFilter] = useState('buYil');
  const [boyaCustomStartDate, setBoyaCustomStartDate] = useState('');
  const [boyaCustomEndDate, setBoyaCustomEndDate] = useState('');
  const [showBoyaCustomDateFilter, setShowBoyaCustomDateFilter] = useState(false);
  const [abonelikSearchTerm, setAbonelikSearchTerm] = useState('');
  const [selectedSorumlulukMerkezi, setSelectedSorumlulukMerkezi] = useState('tumu');
  const [selectedAbonelikTur, setSelectedAbonelikTur] = useState('tumu');
  
  // İzin Takibi için state'ler
  const [izinDateFilter, setIzinDateFilter] = useState('buYil');
  const [izinCustomStartDate, setIzinCustomStartDate] = useState('');
  const [izinCustomEndDate, setIzinCustomEndDate] = useState('');
  const [showIzinCustomDateFilter, setShowIzinCustomDateFilter] = useState(false);
  const [izinSearchTerm, setIzinSearchTerm] = useState('');
  const [selectedIzinSorumlulukMerkezi, setSelectedIzinSorumlulukMerkezi] = useState('tumu');

  // İzin verileri
  const izinYillikData = [
    {
      id: 1,
      calisanAdi: 'Ahmet Yılmaz',
      sorumlulukMerkezi: 'Fabrika',
      oncekiYilDevredenIzin: 5,
      yillikIzinYenilenmeTarihi: '01.01.2025',
      buYilKazanacagiIzin: 14,
      kalanYillikIzinHakki: 19
    },
    {
      id: 2,
      calisanAdi: 'Mehmet Demir',
      sorumlulukMerkezi: 'Sanayi',
      oncekiYilDevredenIzin: 3,
      yillikIzinYenilenmeTarihi: '15.03.2025',
      buYilKazanacagiIzin: 14,
      kalanYillikIzinHakki: 17
    },
    {
      id: 3,
      calisanAdi: 'Ayşe Kaya',
      sorumlulukMerkezi: 'Çarşı',
      oncekiYilDevredenIzin: 7,
      yillikIzinYenilenmeTarihi: '01.04.2025',
      buYilKazanacagiIzin: 14,
      kalanYillikIzinHakki: 21
    },
    {
      id: 4,
      calisanAdi: 'Fatma Yıldız',
      sorumlulukMerkezi: 'Fabrika',
      oncekiYilDevredenIzin: 8,
      yillikIzinYenilenmeTarihi: '01.02.2025',
      buYilKazanacagiIzin: 14,
      kalanYillikIzinHakki: 22
    },
    {
      id: 5,
      calisanAdi: 'Ali Öztürk',
      sorumlulukMerkezi: 'Sanayi',
      oncekiYilDevredenIzin: 2,
      yillikIzinYenilenmeTarihi: '01.03.2025',
      buYilKazanacagiIzin: 14,
      kalanYillikIzinHakki: 16
    },
    {
      id: 6,
      calisanAdi: 'Zeynep Aydın',
      sorumlulukMerkezi: 'Çarşı',
      oncekiYilDevredenIzin: 4,
      yillikIzinYenilenmeTarihi: '15.02.2025',
      buYilKazanacagiIzin: 14,
      kalanYillikIzinHakki: 18
    },
    {
      id: 7,
      calisanAdi: 'Mustafa Şahin',
      sorumlulukMerkezi: 'Fabrika',
      oncekiYilDevredenIzin: 6,
      yillikIzinYenilenmeTarihi: '01.01.2025',
      buYilKazanacagiIzin: 14,
      kalanYillikIzinHakki: 20
    },
    {
      id: 8,
      calisanAdi: 'Elif Çelik',
      sorumlulukMerkezi: 'Sanayi',
      oncekiYilDevredenIzin: 1,
      yillikIzinYenilenmeTarihi: '01.05.2025',
      buYilKazanacagiIzin: 14,
      kalanYillikIzinHakki: 15
    },
    {
      id: 9,
      calisanAdi: 'Hüseyin Arslan',
      sorumlulukMerkezi: 'Çarşı',
      oncekiYilDevredenIzin: 9,
      yillikIzinYenilenmeTarihi: '01.03.2025',
      buYilKazanacagiIzin: 14,
      kalanYillikIzinHakki: 23
    },
    {
      id: 10,
      calisanAdi: 'Aysel Korkmaz',
      sorumlulukMerkezi: 'Fabrika',
      oncekiYilDevredenIzin: 3,
      yillikIzinYenilenmeTarihi: '15.01.2025',
      buYilKazanacagiIzin: 14,
      kalanYillikIzinHakki: 17
    }
  ];

  const izinKullanimData = [
    {
      id: 1,
      calisanAdi: 'Ahmet Yılmaz',
      sorumlulukMerkezi: 'Fabrika',
      izinBaslangicTarihi: '15.01.2025',
      izinliGunSayisi: 5,
      izinTuru: 'Yıllık İzin'
    },
    {
      id: 2,
      calisanAdi: 'Mehmet Demir',
      sorumlulukMerkezi: 'Sanayi',
      izinBaslangicTarihi: '20.01.2025',
      izinliGunSayisi: 3,
      izinTuru: 'Sağlık Raporlu İzin'
    },
    {
      id: 3,
      calisanAdi: 'Ayşe Kaya',
      sorumlulukMerkezi: 'Çarşı',
      izinBaslangicTarihi: '01.02.2025',
      izinliGunSayisi: 7,
      izinTuru: 'Yıllık İzin'
    },
    {
      id: 4,
      calisanAdi: 'Fatma Yıldız',
      sorumlulukMerkezi: 'Fabrika',
      izinBaslangicTarihi: '05.02.2025',
      izinliGunSayisi: 4,
      izinTuru: 'Yıllık İzin'
    },
    {
      id: 5,
      calisanAdi: 'Ali Öztürk',
      sorumlulukMerkezi: 'Sanayi',
      izinBaslangicTarihi: '10.02.2025',
      izinliGunSayisi: 2,
      izinTuru: 'Ücretli İzin'
    },
    {
      id: 6,
      calisanAdi: 'Zeynep Aydın',
      sorumlulukMerkezi: 'Çarşı',
      izinBaslangicTarihi: '15.02.2025',
      izinliGunSayisi: 5,
      izinTuru: 'Yıllık İzin'
    },
    {
      id: 7,
      calisanAdi: 'Mustafa Şahin',
      sorumlulukMerkezi: 'Fabrika',
      izinBaslangicTarihi: '20.02.2025',
      izinliGunSayisi: 1,
      izinTuru: 'Sağlık Raporlu İzin'
    },
    {
      id: 8,
      calisanAdi: 'Elif Çelik',
      sorumlulukMerkezi: 'Sanayi',
      izinBaslangicTarihi: '01.03.2025',
      izinliGunSayisi: 3,
      izinTuru: 'Ücretsiz İzin'
    },
    {
      id: 9,
      calisanAdi: 'Hüseyin Arslan',
      sorumlulukMerkezi: 'Çarşı',
      izinBaslangicTarihi: '05.03.2025',
      izinliGunSayisi: 4,
      izinTuru: 'Yıllık İzin'
    },
    {
      id: 10,
      calisanAdi: 'Aysel Korkmaz',
      sorumlulukMerkezi: 'Fabrika',
      izinBaslangicTarihi: '10.03.2025',
      izinliGunSayisi: 2,
      izinTuru: 'Düzeltme İzni'
    },
    {
      id: 11,
      calisanAdi: 'Ahmet Yılmaz',
      sorumlulukMerkezi: 'Fabrika',
      izinBaslangicTarihi: '15.03.2025',
      izinliGunSayisi: 3,
      izinTuru: 'Yıllık İzin'
    },
    {
      id: 12,
      calisanAdi: 'Mehmet Demir',
      sorumlulukMerkezi: 'Sanayi',
      izinBaslangicTarihi: '20.03.2025',
      izinliGunSayisi: 5,
      izinTuru: 'Yıllık İzin'
    },
    {
      id: 13,
      calisanAdi: 'Ayşe Kaya',
      sorumlulukMerkezi: 'Çarşı',
      izinBaslangicTarihi: '01.04.2025',
      izinliGunSayisi: 2,
      izinTuru: 'Ücretli İzin'
    },
    {
      id: 14,
      calisanAdi: 'Fatma Yıldız',
      sorumlulukMerkezi: 'Fabrika',
      izinBaslangicTarihi: '05.04.2025',
      izinliGunSayisi: 6,
      izinTuru: 'Yıllık İzin'
    },
    {
      id: 15,
      calisanAdi: 'Zeynep Aydın',
      sorumlulukMerkezi: 'Çarşı',
      izinBaslangicTarihi: '10.04.2025',
      izinliGunSayisi: 4,
      izinTuru: 'Yıllık İzin'
    }
  ];

  const izinTurleri = [
    'Yıllık İzin',
    'Ücretli İzin',
    'Ücretsiz İzin',
    'Sağlık Raporlu İzin',
    'Düzeltme İzni'
  ];

  // Bu yıl kullanılan yıllık izin günlerini hesaplama fonksiyonu
  const calculateUsedAnnualLeave = (calisanAdi) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    return izinKullanimData
      .filter(izin => 
        izin.calisanAdi === calisanAdi && 
        izin.izinTuru === 'Yıllık İzin' &&
        parseInt(izin.izinBaslangicTarihi.split('.')[2]) === currentYear
      )
      .reduce((total, izin) => total + izin.izinliGunSayisi, 0);
  };

  // İzin verilerini tarih filtresine göre filtreleme
  const filterIzinDataByDate = () => {
    const today = new Date();
    let filteredData = [...izinKullanimData];
    
    switch (izinDateFilter) {
      case 'buHafta':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
        startOfWeek.setHours(0, 0, 0, 0);
        
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.izinBaslangicTarihi.split('.');
          const itemDate = new Date(`${year}-${month}-${day}`);
          return itemDate >= startOfWeek;
        });
        break;
        
      case 'buAy':
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.izinBaslangicTarihi.split('.');
          const itemDate = new Date(`${year}-${month}-${day}`);
          return itemDate.getMonth() === today.getMonth() && 
                 itemDate.getFullYear() === today.getFullYear();
        });
        break;
        
      case 'gecenAy':
        const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.izinBaslangicTarihi.split('.');
          const itemDate = new Date(`${year}-${month}-${day}`);
          return itemDate >= startOfLastMonth && itemDate <= endOfLastMonth;
        });
        break;
        
      case 'buYil':
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.izinBaslangicTarihi.split('.');
          return parseInt(year) === today.getFullYear();
        });
        break;
        
      case 'ozel':
        if (izinCustomStartDate && izinCustomEndDate) {
          const [startDay, startMonth, startYear] = izinCustomStartDate.split('.');
          const [endDay, endMonth, endYear] = izinCustomEndDate.split('.');
          
          const startDateObj = new Date(`${startYear}-${startMonth}-${startDay}`);
          const endDateObj = new Date(`${endYear}-${endMonth}-${endDay}`);
          
          filteredData = filteredData.filter(item => {
            const [day, month, year] = item.izinBaslangicTarihi.split('.');
            const itemDate = new Date(`${year}-${month}-${day}`);
            return itemDate >= startDateObj && itemDate <= endDateObj;
          });
        }
        break;
        
      default:
        break;
    }
    
    // Çalışan adına göre filtreleme
    if (izinSearchTerm) {
      filteredData = filteredData.filter(item =>
        item.calisanAdi.toLowerCase().includes(izinSearchTerm.toLowerCase())
      );
    }
    
    // Sorumluluk merkezine göre filtreleme
    if (selectedIzinSorumlulukMerkezi !== 'tumu') {
      filteredData = filteredData.filter(item =>
        item.sorumlulukMerkezi === selectedIzinSorumlulukMerkezi
      );
    }
    
    return filteredData;
  };

  // İzin tarih filtresini değiştirme işlemi
  const handleIzinDateFilterChange = (filter) => {
    setIzinDateFilter(filter);
    setShowIzinCustomDateFilter(filter === 'ozel');
  };
  
  // Günleri Türkçe olarak almak için yardımcı fonksiyon
  const getTurkishDay = (dateStr) => {
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const [day, month, year] = dateStr.split('.');
    const date = new Date(`${year}-${month}-${day}`);
    return days[date.getDay()];
  };
  
  // Tarihin Pazar günü olup olmadığını kontrol eden fonksiyon
  const isSunday = (dateStr) => {
    const [day, month, year] = dateStr.split('.');
    const date = new Date(`${year}-${month}-${day}`);
    return date.getDay() === 0; // 0: Pazar
  };
  
  // Örnek veri - Perakende Günlük Satış verileri (günleri eklenmiş hali)
  const tumPerakendeSatisVerileri = {
    filliCarsi: [
      { tarih: '01.01.2025', gun: 'Çarşamba', tutar: 12500 },
      { tarih: '02.01.2025', gun: 'Perşembe', tutar: 9800 },
      { tarih: '03.01.2025', gun: 'Cuma', tutar: 11200 },
      { tarih: '04.01.2025', gun: 'Cumartesi', tutar: 15600 },
      { tarih: '05.01.2025', gun: 'Pazar', tutar: 8900 },
      { tarih: '06.01.2025', gun: 'Pazartesi', tutar: 7500 },
      { tarih: '07.01.2025', gun: 'Salı', tutar: 13200 },
      { tarih: '08.01.2025', gun: 'Çarşamba', tutar: 14500 },
      { tarih: '09.01.2025', gun: 'Perşembe', tutar: 10800 },
      { tarih: '10.01.2025', gun: 'Cuma', tutar: 12300 },
      { tarih: '11.01.2025', gun: 'Cumartesi', tutar: 16700 },
      { tarih: '12.01.2025', gun: 'Pazar', tutar: 9200 },
      { tarih: '13.01.2025', gun: 'Pazartesi', tutar: 8100 },
      { tarih: '14.01.2025', gun: 'Salı', tutar: 14300 },
      { tarih: '15.02.2025', gun: 'Cumartesi', tutar: 17800 },
      { tarih: '16.02.2025', gun: 'Pazar', tutar: 9500 },
      { tarih: '17.02.2025', gun: 'Pazartesi', tutar: 8300 },
      { tarih: '18.02.2025', gun: 'Salı', tutar: 14800 },
      { tarih: '19.02.2025', gun: 'Çarşamba', tutar: 15900 },
      { tarih: '20.02.2025', gun: 'Perşembe', tutar: 11500 },
    ],
    dyoCarsi: [
      { tarih: '01.01.2025', gun: 'Çarşamba', tutar: 9200 },
      { tarih: '02.01.2025', gun: 'Perşembe', tutar: 8500 },
      { tarih: '03.01.2025', gun: 'Cuma', tutar: 10300 },
      { tarih: '04.01.2025', gun: 'Cumartesi', tutar: 12100 },
      { tarih: '05.01.2025', gun: 'Pazar', tutar: 7800 },
      { tarih: '06.01.2025', gun: 'Pazartesi', tutar: 6900 },
      { tarih: '07.01.2025', gun: 'Salı', tutar: 11500 },
      { tarih: '08.01.2025', gun: 'Çarşamba', tutar: 13200 },
      { tarih: '09.01.2025', gun: 'Perşembe', tutar: 9600 },
      { tarih: '10.01.2025', gun: 'Cuma', tutar: 10800 },
      { tarih: '11.01.2025', gun: 'Cumartesi', tutar: 13500 },
      { tarih: '12.01.2025', gun: 'Pazar', tutar: 8100 },
      { tarih: '13.01.2025', gun: 'Pazartesi', tutar: 7200 },
      { tarih: '14.01.2025', gun: 'Salı', tutar: 12400 },
      { tarih: '15.02.2025', gun: 'Cumartesi', tutar: 14200 },
      { tarih: '16.02.2025', gun: 'Pazar', tutar: 8400 },
      { tarih: '17.02.2025', gun: 'Pazartesi', tutar: 7500 },
      { tarih: '18.02.2025', gun: 'Salı', tutar: 12900 },
      { tarih: '19.02.2025', gun: 'Çarşamba', tutar: 13800 },
      { tarih: '20.02.2025', gun: 'Perşembe', tutar: 10200 },
    ],
    sanayi: [
      { tarih: '01.01.2025', gun: 'Çarşamba', tutar: 18500 },
      { tarih: '02.01.2025', gun: 'Perşembe', tutar: 16200 },
      { tarih: '03.01.2025', gun: 'Cuma', tutar: 19800 },
      { tarih: '04.01.2025', gun: 'Cumartesi', tutar: 22500 },
      { tarih: '05.01.2025', gun: 'Pazar', tutar: 15900 },
      { tarih: '06.01.2025', gun: 'Pazartesi', tutar: 14200 },
      { tarih: '07.01.2025', gun: 'Salı', tutar: 20100 },
      { tarih: '08.01.2025', gun: 'Çarşamba', tutar: 23400 },
      { tarih: '09.01.2025', gun: 'Perşembe', tutar: 17800 },
      { tarih: '10.01.2025', gun: 'Cuma', tutar: 21300 },
      { tarih: '11.01.2025', gun: 'Cumartesi', tutar: 24800 },
      { tarih: '12.01.2025', gun: 'Pazar', tutar: 16500 },
      { tarih: '13.01.2025', gun: 'Pazartesi', tutar: 15100 },
      { tarih: '14.01.2025', gun: 'Salı', tutar: 22300 },
      { tarih: '15.02.2025', gun: 'Cumartesi', tutar: 25600 },
      { tarih: '16.02.2025', gun: 'Pazar', tutar: 17200 },
      { tarih: '17.02.2025', gun: 'Pazartesi', tutar: 15800 },
      { tarih: '18.02.2025', gun: 'Salı', tutar: 23100 },
      { tarih: '19.02.2025', gun: 'Çarşamba', tutar: 24500 },
      { tarih: '20.02.2025', gun: 'Perşembe', tutar: 18900 },
    ]
  };
  
  // Tarih filtreleme fonksiyonu
  const filterDataByDate = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    let filteredData = tumPerakendeSatisVerileri[selectedBayi] || [];
    
    switch (dateFilter) {
      case 'buHafta':
        // Bu haftanın başlangıcını hesapla (Pazartesi)
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
        startOfWeek.setHours(0, 0, 0, 0);
        
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.tarih.split('.');
          const itemDate = new Date(`${year}-${month}-${day}`);
          return itemDate >= startOfWeek;
        });
        break;
        
      case 'buAy':
        // Bu ayın başlangıcı
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.tarih.split('.');
          const itemDate = new Date(`${year}-${month}-${day}`);
          return itemDate.getMonth() === today.getMonth() && 
                 itemDate.getFullYear() === today.getFullYear();
        });
        break;
        
      case 'gecenAy':
        // Geçen ayın başlangıcı ve bitişi
        const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.tarih.split('.');
          const itemDate = new Date(`${year}-${month}-${day}`);
          return itemDate >= startOfLastMonth && itemDate <= endOfLastMonth;
        });
        break;
        
      case 'buYil':
        // Bu yılın başlangıcı
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.tarih.split('.');
          return parseInt(year) === today.getFullYear();
        });
        break;
        
      case 'ozel':
        if (customStartDate && customEndDate) {
          const [startDay, startMonth, startYear] = customStartDate.split('.');
          const [endDay, endMonth, endYear] = customEndDate.split('.');
          
          const startDateObj = new Date(`${startYear}-${startMonth}-${startDay}`);
          const endDateObj = new Date(`${endYear}-${endMonth}-${endDay}`);
          
          filteredData = filteredData.filter(item => {
            const [day, month, year] = item.tarih.split('.');
            const itemDate = new Date(`${year}-${month}-${day}`);
            return itemDate >= startDateObj && itemDate <= endDateObj;
          });
        }
        break;
        
      default:
        // Varsayılan olarak tüm verileri göster
        break;
    }
    
    return filteredData;
  };
  
  // Mağazalar
  const bayiler = [
    { id: 'filliCarsi', label: 'Filli Çarşı' },
    { id: 'dyoCarsi', label: 'Dyo Çarşı' },
    { id: 'sanayi', label: 'Sanayi' }
  ];
  
  // Güncelleme işlemi
  const handleUpdate = () => {
    setIsUpdating(true);
    // Simüle edilmiş güncelleme işlemi
    setTimeout(() => {
      setIsUpdating(false);
      setLastUpdateDate(new Date().toLocaleDateString('tr-TR'));
    }, 1500);
  };
  
  // Tarih filtresini değiştirme işlemi
  const handleDateFilterChange = (filter) => {
    setDateFilter(filter);
    setShowCustomDateFilter(filter === 'ozel');
  };
  
  // Seçili bayinin filtrelenmiş satış verilerini al
  const filteredSatisVerileri = filterDataByDate();
  
  // Toplam satış tutarını hesapla
  const toplamSatisTutari = filteredSatisVerileri.reduce((toplam, satis) => toplam + satis.tutar, 0);
  
  // Şoför Günlük Sevkiyat verileri
  const soforSevkiyatVerileri = [
    { 
      tarih: '01.01.2025', 
      gun: 'Çarşamba',
      sevkiyatlar: {
        'Ahmet Yılmaz': 8,
        'Mehmet Demir': 6,
        'Ali Kaya': 7,
        'Hasan Şahin': 5
      }
    },
    { 
      tarih: '02.01.2025', 
      gun: 'Perşembe',
      sevkiyatlar: {
        'Ahmet Yılmaz': 7,
        'Mehmet Demir': 8,
        'Ali Kaya': 6,
        'Hasan Şahin': 7
      }
    },
    { 
      tarih: '03.01.2025', 
      gun: 'Cuma',
      sevkiyatlar: {
        'Ahmet Yılmaz': 9,
        'Mehmet Demir': 7,
        'Ali Kaya': 8,
        'Hasan Şahin': 6
      }
    },
    { 
      tarih: '04.01.2025', 
      gun: 'Cumartesi',
      sevkiyatlar: {
        'Ahmet Yılmaz': 5,
        'Mehmet Demir': 4,
        'Ali Kaya': 6,
        'Hasan Şahin': 3
      }
    },
    { 
      tarih: '05.01.2025', 
      gun: 'Pazar',
      sevkiyatlar: {
        'Ahmet Yılmaz': 0,
        'Mehmet Demir': 0,
        'Ali Kaya': 0,
        'Hasan Şahin': 0
      }
    },
    { 
      tarih: '06.01.2025', 
      gun: 'Pazartesi',
      sevkiyatlar: {
        'Ahmet Yılmaz': 8,
        'Mehmet Demir': 7,
        'Ali Kaya': 9,
        'Hasan Şahin': 6
      }
    },
    { 
      tarih: '07.01.2025', 
      gun: 'Salı',
      sevkiyatlar: {
        'Ahmet Yılmaz': 7,
        'Mehmet Demir': 8,
        'Ali Kaya': 7,
        'Hasan Şahin': 8
      }
    },
    { 
      tarih: '08.01.2025', 
      gun: 'Çarşamba',
      sevkiyatlar: {
        'Ahmet Yılmaz': 9,
        'Mehmet Demir': 6,
        'Ali Kaya': 8,
        'Hasan Şahin': 7
      }
    },
    { 
      tarih: '09.01.2025', 
      gun: 'Perşembe',
      sevkiyatlar: {
        'Ahmet Yılmaz': 8,
        'Mehmet Demir': 7,
        'Ali Kaya': 6,
        'Hasan Şahin': 8
      }
    },
    { 
      tarih: '15.02.2025', 
      gun: 'Cumartesi',
      sevkiyatlar: {
        'Ahmet Yılmaz': 6,
        'Mehmet Demir': 5,
        'Ali Kaya': 7,
        'Hasan Şahin': 4
      }
    },
    { 
      tarih: '16.02.2025', 
      gun: 'Pazar',
      sevkiyatlar: {
        'Ahmet Yılmaz': 0,
        'Mehmet Demir': 0,
        'Ali Kaya': 0,
        'Hasan Şahin': 0
      }
    },
    { 
      tarih: '17.02.2025', 
      gun: 'Pazartesi',
      sevkiyatlar: {
        'Ahmet Yılmaz': 8,
        'Mehmet Demir': 7,
        'Ali Kaya': 9,
        'Hasan Şahin': 7
      }
    },
    { 
      tarih: '18.02.2025', 
      gun: 'Salı',
      sevkiyatlar: {
        'Ahmet Yılmaz': 7,
        'Mehmet Demir': 8,
        'Ali Kaya': 8,
        'Hasan Şahin': 6
      }
    },
    { 
      tarih: '19.02.2025', 
      gun: 'Çarşamba',
      sevkiyatlar: {
        'Ahmet Yılmaz': 9,
        'Mehmet Demir': 7,
        'Ali Kaya': 8,
        'Hasan Şahin': 7
      }
    }
  ];
  
  // Şoför isimleri
  const soforler = Object.keys(soforSevkiyatVerileri[0].sevkiyatlar);
  
  // Şoför sevkiyat verilerini tarih filtresine göre filtreleme
  const filterSoforDataByDate = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    let filteredData = [...soforSevkiyatVerileri];
    
    switch (soforDateFilter) {
      case 'buHafta':
        // Bu haftanın başlangıcını hesapla (Pazartesi)
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
        startOfWeek.setHours(0, 0, 0, 0);
        
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.tarih.split('.');
          const itemDate = new Date(`${year}-${month}-${day}`);
          return itemDate >= startOfWeek;
        });
        break;
        
      case 'buAy':
        // Bu ayın başlangıcı
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.tarih.split('.');
          const itemDate = new Date(`${year}-${month}-${day}`);
          return itemDate.getMonth() === today.getMonth() && 
                 itemDate.getFullYear() === today.getFullYear();
        });
        break;
        
      case 'gecenAy':
        // Geçen ayın başlangıcı ve bitişi
        const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.tarih.split('.');
          const itemDate = new Date(`${year}-${month}-${day}`);
          return itemDate >= startOfLastMonth && itemDate <= endOfLastMonth;
        });
        break;
        
      case 'buYil':
        // Bu yılın başlangıcı
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.tarih.split('.');
          return parseInt(year) === today.getFullYear();
        });
        break;
        
      case 'ozel':
        if (soforCustomStartDate && soforCustomEndDate) {
          const [startDay, startMonth, startYear] = soforCustomStartDate.split('.');
          const [endDay, endMonth, endYear] = soforCustomEndDate.split('.');
          
          const startDateObj = new Date(`${startYear}-${startMonth}-${startDay}`);
          const endDateObj = new Date(`${endYear}-${endMonth}-${endDay}`);
          
          filteredData = filteredData.filter(item => {
            const [day, month, year] = item.tarih.split('.');
            const itemDate = new Date(`${year}-${month}-${day}`);
            return itemDate >= startDateObj && itemDate <= endDateObj;
          });
        }
        break;
        
      default:
        // Varsayılan olarak tüm verileri göster
        break;
    }
    
    return filteredData;
  };
  
  // Şoför tarih filtresini değiştirme işlemi
  const handleSoforDateFilterChange = (filter) => {
    setSoforDateFilter(filter);
    setShowSoforCustomDateFilter(filter === 'ozel');
  };
  
  // Filtrelenmiş şoför sevkiyat verileri
  const filteredSoforSevkiyatVerileri = filterSoforDataByDate();
  
  // Şoför başına toplam sevkiyat sayısını hesaplama
  const calculateTotalSevkiyat = () => {
    const totals = {};
    
    soforler.forEach(sofor => {
      totals[sofor] = filteredSoforSevkiyatVerileri.reduce((sum, item) => {
        return sum + item.sevkiyatlar[sofor];
      }, 0);
    });
    
    return totals;
  };
  
  // Şoför başına toplam sevkiyat sayıları
  const totalSevkiyatlar = calculateTotalSevkiyat();
  
  // Boya Renklendirme verileri
  const boyaRenklendirmeVerileri = [
    { 
      tarih: '01.01.2025', 
      gun: 'Çarşamba',
      renklendirmeler: {
        'Mustafa Aydın': 12,
        'Ayşe Demir': 15,
        'Fatma Yılmaz': 14,
        'Kemal Kaya': 13
      }
    },
    { 
      tarih: '02.01.2025', 
      gun: 'Perşembe',
      renklendirmeler: {
        'Mustafa Aydın': 14,
        'Ayşe Demir': 13,
        'Fatma Yılmaz': 16,
        'Kemal Kaya': 12
      }
    },
    { 
      tarih: '03.01.2025', 
      gun: 'Cuma',
      renklendirmeler: {
        'Mustafa Aydın': 15,
        'Ayşe Demir': 14,
        'Fatma Yılmaz': 13,
        'Kemal Kaya': 15
      }
    },
    { 
      tarih: '04.01.2025', 
      gun: 'Cumartesi',
      renklendirmeler: {
        'Mustafa Aydın': 8,
        'Ayşe Demir': 7,
        'Fatma Yılmaz': 9,
        'Kemal Kaya': 8
      }
    },
    { 
      tarih: '05.01.2025', 
      gun: 'Pazar',
      renklendirmeler: {
        'Mustafa Aydın': 0,
        'Ayşe Demir': 0,
        'Fatma Yılmaz': 0,
        'Kemal Kaya': 0
      }
    },
    { 
      tarih: '06.01.2025', 
      gun: 'Pazartesi',
      renklendirmeler: {
        'Mustafa Aydın': 16,
        'Ayşe Demir': 14,
        'Fatma Yılmaz': 15,
        'Kemal Kaya': 13
      }
    },
    { 
      tarih: '07.01.2025', 
      gun: 'Salı',
      renklendirmeler: {
        'Mustafa Aydın': 15,
        'Ayşe Demir': 16,
        'Fatma Yılmaz': 14,
        'Kemal Kaya': 15
      }
    },
    { 
      tarih: '08.01.2025', 
      gun: 'Çarşamba',
      renklendirmeler: {
        'Mustafa Aydın': 14,
        'Ayşe Demir': 15,
        'Fatma Yılmaz': 16,
        'Kemal Kaya': 14
      }
    },
    { 
      tarih: '09.01.2025', 
      gun: 'Perşembe',
      renklendirmeler: {
        'Mustafa Aydın': 13,
        'Ayşe Demir': 14,
        'Fatma Yılmaz': 15,
        'Kemal Kaya': 16
      }
    },
    { 
      tarih: '10.01.2025', 
      gun: 'Cuma',
      renklendirmeler: {
        'Mustafa Aydın': 15,
        'Ayşe Demir': 16,
        'Fatma Yılmaz': 14,
        'Kemal Kaya': 15
      }
    },
    { 
      tarih: '15.02.2025', 
      gun: 'Cumartesi',
      renklendirmeler: {
        'Mustafa Aydın': 9,
        'Ayşe Demir': 8,
        'Fatma Yılmaz': 7,
        'Kemal Kaya': 9
      }
    },
    { 
      tarih: '16.02.2025', 
      gun: 'Pazar',
      renklendirmeler: {
        'Mustafa Aydın': 0,
        'Ayşe Demir': 0,
        'Fatma Yılmaz': 0,
        'Kemal Kaya': 0
      }
    },
    { 
      tarih: '17.02.2025', 
      gun: 'Pazartesi',
      renklendirmeler: {
        'Mustafa Aydın': 16,
        'Ayşe Demir': 15,
        'Fatma Yılmaz': 14,
        'Kemal Kaya': 16
      }
    },
    { 
      tarih: '18.02.2025', 
      gun: 'Salı',
      renklendirmeler: {
        'Mustafa Aydın': 15,
        'Ayşe Demir': 16,
        'Fatma Yılmaz': 15,
        'Kemal Kaya': 14
      }
    },
    { 
      tarih: '19.02.2025', 
      gun: 'Çarşamba',
      renklendirmeler: {
        'Mustafa Aydın': 14,
        'Ayşe Demir': 15,
        'Fatma Yılmaz': 16,
        'Kemal Kaya': 15
      }
    }
  ];
  
  // Boyahane çalışanları
  const boyahaneCalisanlari = Object.keys(boyaRenklendirmeVerileri[0].renklendirmeler);
  
  // Boya renklendirme verilerini tarih filtresine göre filtreleme
  const filterBoyaDataByDate = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    let filteredData = [...boyaRenklendirmeVerileri];
    
    switch (boyaDateFilter) {
      case 'buHafta':
        // Bu haftanın başlangıcını hesapla (Pazartesi)
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
        startOfWeek.setHours(0, 0, 0, 0);
        
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.tarih.split('.');
          const itemDate = new Date(`${year}-${month}-${day}`);
          return itemDate >= startOfWeek;
        });
        break;
        
      case 'buAy':
        // Bu ayın başlangıcı
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.tarih.split('.');
          const itemDate = new Date(`${year}-${month}-${day}`);
          return itemDate.getMonth() === today.getMonth() && 
                 itemDate.getFullYear() === today.getFullYear();
        });
        break;
        
      case 'gecenAy':
        // Geçen ayın başlangıcı ve bitişi
        const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.tarih.split('.');
          const itemDate = new Date(`${year}-${month}-${day}`);
          return itemDate >= startOfLastMonth && itemDate <= endOfLastMonth;
        });
        break;
        
      case 'buYil':
        // Bu yılın başlangıcı
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        
        filteredData = filteredData.filter(item => {
          const [day, month, year] = item.tarih.split('.');
          return parseInt(year) === today.getFullYear();
        });
        break;
        
      case 'ozel':
        if (boyaCustomStartDate && boyaCustomEndDate) {
          const [startDay, startMonth, startYear] = boyaCustomStartDate.split('.');
          const [endDay, endMonth, endYear] = boyaCustomEndDate.split('.');
          
          const startDateObj = new Date(`${startYear}-${startMonth}-${startDay}`);
          const endDateObj = new Date(`${endYear}-${endMonth}-${endDay}`);
          
          filteredData = filteredData.filter(item => {
            const [day, month, year] = item.tarih.split('.');
            const itemDate = new Date(`${year}-${month}-${day}`);
            return itemDate >= startDateObj && itemDate <= endDateObj;
          });
        }
        break;
        
      default:
        // Varsayılan olarak tüm verileri göster
        break;
    }
    
    return filteredData;
  };
  
  // Boya tarih filtresini değiştirme işlemi
  const handleBoyaDateFilterChange = (filter) => {
    setBoyaDateFilter(filter);
    setShowBoyaCustomDateFilter(filter === 'ozel');
  };
  
  // Filtrelenmiş boya renklendirme verileri
  const filteredBoyaRenklendirmeVerileri = filterBoyaDataByDate();
  
  // Çalışan başına toplam renklendirme sayısını hesaplama
  const calculateTotalRenklendirme = () => {
    const totals = {};
    
    boyahaneCalisanlari.forEach(calisan => {
      totals[calisan] = filteredBoyaRenklendirmeVerileri.reduce((sum, item) => {
        return sum + item.renklendirmeler[calisan];
      }, 0);
    });
    
    return totals;
  };
  
  // Çalışan başına toplam renklendirme sayıları
  const totalRenklendirmeler = calculateTotalRenklendirme();
  
  // Abonelikler verileri
  const abonelikler = [
    {
      id: 1,
      tur: 'Sabit Telefon',
      aboneNo: '0224 123 45 67',
      firma: 'Türk Telekom',
      aciklama: 'Fabrika ana hat',
      sorumlulukMerkezi: 'Fabrika',
      bitisTarihi: '31.12.2025'
    },
    {
      id: 2,
      tur: 'İnternet',
      aboneNo: 'TT123456789',
      firma: 'Türk Telekom',
      aciklama: 'Fabrika 100 Mbps fiber',
      sorumlulukMerkezi: 'Fabrika',
      bitisTarihi: '31.12.2025'
    },
    {
      id: 3,
      tur: 'Statik IP',
      aboneNo: 'IP789012345',
      firma: 'Türk Telekom',
      aciklama: 'Fabrika sunucu erişimi',
      sorumlulukMerkezi: 'Fabrika',
      bitisTarihi: '31.12.2025'
    },
    {
      id: 4,
      tur: 'Doğalgaz',
      aboneNo: 'DG123456789',
      firma: 'İngaz',
      aciklama: 'Fabrika ısınma',
      sorumlulukMerkezi: 'Fabrika',
      bitisTarihi: ''
    },
    {
      id: 5,
      tur: 'Elektrik',
      aboneNo: 'EL123456789',
      firma: 'UEDAŞ',
      aciklama: 'Fabrika ana sayaç',
      sorumlulukMerkezi: 'Fabrika',
      bitisTarihi: ''
    },
    {
      id: 6,
      tur: 'Cep Telefonu',
      aboneNo: '0532 123 45 67',
      firma: 'Turkcell',
      aciklama: 'Genel Müdür hattı',
      sorumlulukMerkezi: 'Sanayi',
      bitisTarihi: '15.06.2025'
    },
    {
      id: 7,
      tur: 'Cep Telefonu',
      aboneNo: '0532 234 56 78',
      firma: 'Turkcell',
      aciklama: 'Satış Müdürü hattı',
      sorumlulukMerkezi: 'Sanayi',
      bitisTarihi: '15.06.2025'
    },
    {
      id: 8,
      tur: 'Cep Telefonu',
      aboneNo: '0532 345 67 89',
      firma: 'Turkcell',
      aciklama: 'Üretim Müdürü hattı',
      sorumlulukMerkezi: 'Fabrika',
      bitisTarihi: '15.06.2025'
    },
    {
      id: 9,
      tur: 'Sabit Telefon',
      aboneNo: '0224 234 56 78',
      firma: 'Türk Telekom',
      aciklama: 'Çarşı mağaza hattı',
      sorumlulukMerkezi: 'Çarşı',
      bitisTarihi: '31.12.2025'
    },
    {
      id: 10,
      tur: 'İnternet',
      aboneNo: 'TT234567890',
      firma: 'Türk Telekom',
      aciklama: 'Çarşı mağaza 50 Mbps fiber',
      sorumlulukMerkezi: 'Çarşı',
      bitisTarihi: '31.12.2025'
    },
    {
      id: 11,
      tur: 'Elektrik',
      aboneNo: 'EL234567890',
      firma: 'UEDAŞ',
      aciklama: 'Çarşı mağaza sayacı',
      sorumlulukMerkezi: 'Çarşı',
      bitisTarihi: ''
    },
    {
      id: 12,
      tur: 'Su',
      aboneNo: 'SU123456789',
      firma: 'BUSKİ',
      aciklama: 'Fabrika su aboneliği',
      sorumlulukMerkezi: 'Fabrika',
      bitisTarihi: ''
    },
    {
      id: 13,
      tur: 'Su',
      aboneNo: 'SU234567890',
      firma: 'BUSKİ',
      aciklama: 'Çarşı mağaza su aboneliği',
      sorumlulukMerkezi: 'Çarşı',
      bitisTarihi: ''
    },
    {
      id: 14,
      tur: 'Elektrik',
      aboneNo: 'EL345678901',
      firma: 'UEDAŞ',
      aciklama: 'İnşaat şantiye elektrik',
      sorumlulukMerkezi: 'İnşaat',
      bitisTarihi: ''
    },
    {
      id: 15,
      tur: 'Su',
      aboneNo: 'SU345678901',
      firma: 'BUSKİ',
      aciklama: 'İnşaat şantiye su',
      sorumlulukMerkezi: 'İnşaat',
      bitisTarihi: ''
    }
  ];
  
  // Abonelik türleri
  const abonelikTurleri = ['tumu', ...new Set(abonelikler.map(abone => abone.tur))];
  
  // Sorumluluk merkezleri
  const sorumlulukMerkezleri = ['tumu', ...new Set(abonelikler.map(abone => abone.sorumlulukMerkezi))];
  
  // Abonelikleri filtreleme
  const filteredAbonelikler = abonelikler.filter(abone => {
    // Arama terimine göre filtreleme
    const searchMatch = abonelikSearchTerm === '' || 
      abone.aboneNo.toLowerCase().includes(abonelikSearchTerm.toLowerCase()) ||
      abone.aciklama.toLowerCase().includes(abonelikSearchTerm.toLowerCase()) ||
      abone.sorumlulukMerkezi.toLowerCase().includes(abonelikSearchTerm.toLowerCase()) ||
      abone.firma.toLowerCase().includes(abonelikSearchTerm.toLowerCase()) ||
      abone.tur.toLowerCase().includes(abonelikSearchTerm.toLowerCase());
    
    // Sorumluluk merkezine göre filtreleme
    const sorumlulukMatch = selectedSorumlulukMerkezi === 'tumu' || 
      abone.sorumlulukMerkezi === selectedSorumlulukMerkezi;
    
    // Abonelik türüne göre filtreleme
    const turMatch = selectedAbonelikTur === 'tumu' || 
      abone.tur === selectedAbonelikTur;
    
    return searchMatch && sorumlulukMatch && turMatch;
  });
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
      
      {/* Header */}
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/images/logo-dark.png" 
              alt="DEKORSAN BOYA" 
              className="h-10 cursor-pointer" 
              onClick={() => navigate('/')}
              title="Anasayfaya Dön"
            />
            <span className="ml-4 text-lg text-gray-400">Yönetim Ekranı</span>
            
            {/* Navigation Tabs */}
            <div className="flex space-x-2 ml-6">
              <button 
                className={`px-3 py-1 rounded flex items-center ${activeTab === 'perakendeSatis' ? 'bg-green-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                onClick={() => setActiveTab('perakendeSatis')}
              >
                <ShoppingBag size={16} className="mr-1" />
                Perakende Günlük Satış
              </button>
              <button
                className={`px-3 py-1 rounded flex items-center ${activeTab === 'soforSevkiyat' ? 'bg-green-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                onClick={() => setActiveTab('soforSevkiyat')}
              >
                <Truck size={16} className="mr-1" />
                Şoför Günlük Sevkiyat
              </button>
              <button
                className={`px-3 py-1 rounded flex items-center ${activeTab === 'boyaRenklendirme' ? 'bg-green-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                onClick={() => setActiveTab('boyaRenklendirme')}
              >
                <Palette size={16} className="mr-1" />
                Boya Renklendirme
              </button>
              <button
                className={`px-3 py-1 rounded flex items-center ${activeTab === 'abonelikler' ? 'bg-green-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                onClick={() => setActiveTab('abonelikler')}
              >
                <FileText size={16} className="mr-1" />
                Abonelikler
              </button>
              <button
                className={`px-3 py-1 rounded flex items-center ${activeTab === 'izinTakibi' ? 'bg-green-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                onClick={() => setActiveTab('izinTakibi')}
              >
                <Calendar size={16} className="mr-1" />
                İzin Takibi
              </button>
              <button
                className={`px-3 py-1 rounded flex items-center ${activeTab === 'aracTakip' ? 'bg-green-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                onClick={() => setActiveTab('aracTakip')}
              >
                <MapPin size={16} className="mr-1" />
                Araç Takip
              </button>
            </div>
          </div>
          
          {/* Güncelleme butonu */}
          <button 
            onClick={() => handleUpdate()} 
            className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
            disabled={isUpdating}
            title="Verileri Güncelle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
              <path d="M3 22v-6h6"></path>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        {/* Perakende Günlük Satış */}
        {activeTab === 'perakendeSatis' && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-400">Perakende Günlük Satış</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Son Güncelleme Tarihi: {lastUpdateDate}</span>
                <button 
                  onClick={() => handleUpdate()} 
                  className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
                  disabled={isUpdating}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                    <path d="M21 2v6h-6"></path>
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                    <path d="M3 22v-6h6"></path>
                    <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Mağaza Seçim Butonları */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-300 mr-2 self-center">Mağazalar:</span>
                {bayiler.map((bayi) => (
                  <button
                    key={bayi.id}
                    className={`text-sm px-3 py-1 rounded-md border ${
                      selectedBayi === bayi.id 
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedBayi(bayi.id)}
                  >
                    {bayi.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tarih Filtreleme */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-300 mr-2 self-center">Tarih:</span>
                <button
                  className={`text-sm px-3 py-1 rounded-md border ${
                    dateFilter === 'buHafta' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => handleDateFilterChange('buHafta')}
                >
                  Bu Hafta
                </button>
                <button
                  className={`text-sm px-3 py-1 rounded-md border ${
                    dateFilter === 'buAy' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => handleDateFilterChange('buAy')}
                >
                  Bu Ay
                </button>
                <button
                  className={`text-sm px-3 py-1 rounded-md border ${
                    dateFilter === 'gecenAy' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => handleDateFilterChange('gecenAy')}
                >
                  Geçen Ay
                </button>
                <button
                  className={`text-sm px-3 py-1 rounded-md border ${
                    dateFilter === 'buYil' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => handleDateFilterChange('buYil')}
                >
                  Bu Yıl
                </button>
                <button
                  className={`text-sm px-3 py-1 rounded-md border ${
                    dateFilter === 'ozel' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => handleDateFilterChange('ozel')}
                >
                  Özel
                </button>
              </div>
              
              {/* Özel Tarih Filtreleme */}
              {showCustomDateFilter && (
                <div className="mt-3 flex flex-wrap gap-3 items-center">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-300 mr-2">İlk Tarih:</span>
                    <input 
                      type="text" 
                      placeholder="GG.AA.YYYY" 
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="bg-gray-700 text-white text-sm rounded-md px-3 py-1 border border-gray-600 w-32"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-300 mr-2">Son Tarih:</span>
                    <input 
                      type="text" 
                      placeholder="GG.AA.YYYY" 
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="bg-gray-700 text-white text-sm rounded-md px-3 py-1 border border-gray-600 w-32"
                    />
                  </div>
                  <button
                    className="text-sm px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
                    onClick={() => setDateFilter('ozel')}
                  >
                    Uygula
                  </button>
                </div>
              )}
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-900 rounded-lg">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tarih</th>
                    <th className="p-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Satış Tutarı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredSatisVerileri.map((satis, index) => (
                    <tr 
                      key={index} 
                      className={`hover:bg-gray-800 ${satis.gun === 'Pazar' ? 'bg-gray-800 bg-opacity-50' : ''}`}
                    >
                      <td className="p-3 text-sm">{satis.tarih} {satis.gun}</td>
                      <td className="p-3 text-sm text-right">{new Intl.NumberFormat('tr-TR').format(satis.tutar)} ₺</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-700">
                    <td className="p-3 text-sm font-bold">TOPLAM</td>
                    <td className="p-3 text-sm font-bold text-right">
                      {new Intl.NumberFormat('tr-TR').format(toplamSatisTutari)} ₺
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Şoför Günlük Sevkiyat */}
        {activeTab === 'soforSevkiyat' && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-400">Çalışan Şoför Günlük Sevkiyat</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Son Güncelleme Tarihi: {lastUpdateDate}</span>
                <button 
                  onClick={() => handleUpdate()} 
                  className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
                  disabled={isUpdating}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                    <path d="M21 2v6h-6"></path>
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                    <path d="M3 22v-6h6"></path>
                    <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Tarih Filtreleme */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-300 mr-2 self-center">Tarih:</span>
                <button
                  className={`text-sm px-3 py-1 rounded-md border ${
                    soforDateFilter === 'buHafta' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => handleSoforDateFilterChange('buHafta')}
                >
                  Bu Hafta
                </button>
                <button
                  className={`text-sm px-3 py-1 rounded-md border ${
                    soforDateFilter === 'buAy' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => handleSoforDateFilterChange('buAy')}
                >
                  Bu Ay
                </button>
                <button
                  className={`text-sm px-3 py-1 rounded-md border ${
                    soforDateFilter === 'gecenAy' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => handleSoforDateFilterChange('gecenAy')}
                >
                  Geçen Ay
                </button>
                <button
                  className={`text-sm px-3 py-1 rounded-md border ${
                    soforDateFilter === 'buYil' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => handleSoforDateFilterChange('buYil')}
                >
                  Bu Yıl
                </button>
                <button
                  className={`text-sm px-3 py-1 rounded-md border ${
                    soforDateFilter === 'ozel' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => handleSoforDateFilterChange('ozel')}
                >
                  Özel
                </button>
              </div>
              
              {/* Özel Tarih Filtreleme */}
              {showSoforCustomDateFilter && (
                <div className="mt-3 flex flex-wrap gap-3 items-center">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-300 mr-2">İlk Tarih:</span>
                    <input 
                      type="text" 
                      placeholder="GG.AA.YYYY" 
                      value={soforCustomStartDate}
                      onChange={(e) => setSoforCustomStartDate(e.target.value)}
                      className="bg-gray-700 text-white text-sm rounded-md px-3 py-1 border border-gray-600 w-32"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-300 mr-2">Son Tarih:</span>
                    <input 
                      type="text" 
                      placeholder="GG.AA.YYYY" 
                      value={soforCustomEndDate}
                      onChange={(e) => setSoforCustomEndDate(e.target.value)}
                      className="bg-gray-700 text-white text-sm rounded-md px-3 py-1 border border-gray-600 w-32"
                    />
                  </div>
                  <button
                    className="text-sm px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
                    onClick={() => setSoforDateFilter('ozel')}
                  >
                    Uygula
                  </button>
                </div>
              )}
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-900 rounded-lg">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tarih</th>
                    {soforler.map((sofor, index) => (
                      <th key={index} className="p-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                        {sofor}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredSoforSevkiyatVerileri.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`hover:bg-gray-800 ${item.gun === 'Pazar' ? 'bg-gray-800 bg-opacity-50' : ''}`}
                    >
                      <td className="p-3 text-sm">{item.tarih} {item.gun}</td>
                      {soforler.map((sofor, soforIndex) => (
                        <td key={soforIndex} className="p-3 text-sm text-center">
                          {item.sevkiyatlar[sofor]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-gray-700">
                    <td className="p-3 text-sm font-bold">TOPLAM</td>
                    {soforler.map((sofor, soforIndex) => (
                      <td key={soforIndex} className="p-3 text-sm font-bold text-center">
                        {totalSevkiyatlar[sofor]}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Boya Renklendirme */}
        {activeTab === 'boyaRenklendirme' && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-400">Günlük Boya Renklendirme Performans Raporu</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Son Güncelleme Tarihi: {lastUpdateDate}</span>
                <button 
                  onClick={() => handleUpdate()} 
                  className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
                  disabled={isUpdating}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                    <path d="M21 2v6h-6"></path>
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                    <path d="M3 22v-6h6"></path>
                    <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Tarih Filtreleme */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-300 mr-2 self-center">Tarih:</span>
                <button
                  className={`text-sm px-3 py-1 rounded-md border ${
                    boyaDateFilter === 'buHafta' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => handleBoyaDateFilterChange('buHafta')}
                >
                  Bu Hafta
                </button>
                <button
                  className={`text-sm px-3 py-1 rounded-md border ${
                    boyaDateFilter === 'buAy' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => handleBoyaDateFilterChange('buAy')}
                >
                  Bu Ay
                </button>
                <button
                  className={`text-sm px-3 py-1 rounded-md border ${
                    boyaDateFilter === 'gecenAy' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => handleBoyaDateFilterChange('gecenAy')}
                >
                  Geçen Ay
                </button>
                <button
                  className={`text-sm px-3 py-1 rounded-md border ${
                    boyaDateFilter === 'buYil' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => handleBoyaDateFilterChange('buYil')}
                >
                  Bu Yıl
                </button>
                <button
                  className={`text-sm px-3 py-1 rounded-md border ${
                    boyaDateFilter === 'ozel' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                  onClick={() => handleBoyaDateFilterChange('ozel')}
                >
                  Özel
                </button>
              </div>
              
              {/* Özel Tarih Filtreleme */}
              {showBoyaCustomDateFilter && (
                <div className="mt-3 flex flex-wrap gap-3 items-center">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-300 mr-2">İlk Tarih:</span>
                    <input 
                      type="text" 
                      placeholder="GG.AA.YYYY" 
                      value={boyaCustomStartDate}
                      onChange={(e) => setBoyaCustomStartDate(e.target.value)}
                      className="bg-gray-700 text-white text-sm rounded-md px-3 py-1 border border-gray-600 w-32"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-300 mr-2">Son Tarih:</span>
                    <input 
                      type="text" 
                      placeholder="GG.AA.YYYY" 
                      value={boyaCustomEndDate}
                      onChange={(e) => setBoyaCustomEndDate(e.target.value)}
                      className="bg-gray-700 text-white text-sm rounded-md px-3 py-1 border border-gray-600 w-32"
                    />
                  </div>
                  <button
                    className="text-sm px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
                    onClick={() => setBoyaDateFilter('ozel')}
                  >
                    Uygula
                  </button>
                </div>
              )}
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-900 rounded-lg">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tarih</th>
                    {boyahaneCalisanlari.map((calisan, index) => (
                      <th key={index} className="p-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                        {calisan}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredBoyaRenklendirmeVerileri.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`hover:bg-gray-800 ${item.gun === 'Pazar' ? 'bg-gray-800 bg-opacity-50' : ''}`}
                    >
                      <td className="p-3 text-sm">{item.tarih} {item.gun}</td>
                      {boyahaneCalisanlari.map((calisan, calisanIndex) => (
                        <td key={calisanIndex} className="p-3 text-sm text-center">
                          {item.renklendirmeler[calisan]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-gray-700">
                    <td className="p-3 text-sm font-bold">TOPLAM</td>
                    {boyahaneCalisanlari.map((calisan, calisanIndex) => (
                      <td key={calisanIndex} className="p-3 text-sm font-bold text-center">
                        {totalRenklendirmeler[calisan]}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Abonelikler */}
        {activeTab === 'abonelikler' && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-400">Abonelikler</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Son Güncelleme Tarihi: {lastUpdateDate}</span>
                <button 
                  onClick={() => handleUpdate()} 
                  className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
                  disabled={isUpdating}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                    <path d="M21 2v6h-6"></path>
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                    <path d="M3 22v-6h6"></path>
                    <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Filtreleme ve Arama */}
            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Arama */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Arama</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Abone No, Açıklama, Firma, Tür ara..."
                    value={abonelikSearchTerm}
                    onChange={(e) => setAbonelikSearchTerm(e.target.value)}
                    className="bg-gray-700 text-white text-sm rounded-md px-3 py-2 border border-gray-600 w-full pl-10"
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Sorumluluk Merkezi Filtresi */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Sorumluluk Merkezi</label>
                <select
                  value={selectedSorumlulukMerkezi}
                  onChange={(e) => setSelectedSorumlulukMerkezi(e.target.value)}
                  className="bg-gray-700 text-white text-sm rounded-md px-3 py-2 border border-gray-600 w-full"
                >
                  {sorumlulukMerkezleri.map((merkez, index) => (
                    <option key={index} value={merkez}>
                      {merkez === 'tumu' ? 'Tüm Merkezler' : merkez}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Abonelik Türü Filtresi */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Abonelik Türü</label>
                <select
                  value={selectedAbonelikTur}
                  onChange={(e) => setSelectedAbonelikTur(e.target.value)}
                  className="bg-gray-700 text-white text-sm rounded-md px-3 py-2 border border-gray-600 w-full"
                >
                  {abonelikTurleri.map((tur, index) => (
                    <option key={index} value={tur}>
                      {tur === 'tumu' ? 'Tüm Türler' : tur}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-900 rounded-lg">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tür</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Abone No</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Firma</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Açıklama</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sorumluluk Merkezi</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Abone Bitiş Tarihi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredAbonelikler.map((abone) => (
                    <tr key={abone.id} className="hover:bg-gray-800">
                      <td className="p-3 text-sm">{abone.tur}</td>
                      <td className="p-3 text-sm">{abone.aboneNo}</td>
                      <td className="p-3 text-sm">{abone.firma}</td>
                      <td className="p-3 text-sm">{abone.aciklama}</td>
                      <td className="p-3 text-sm">{abone.sorumlulukMerkezi}</td>
                      <td className="p-3 text-sm">{abone.bitisTarihi || '-'}</td>
                    </tr>
                  ))}
                  {filteredAbonelikler.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-3 text-sm text-center text-gray-400">
                        Arama kriterlerine uygun abonelik bulunamadı.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-sm text-gray-400">
              Toplam {filteredAbonelikler.length} abonelik listeleniyor.
            </div>
          </div>
        )}
        
        {/* İzin Takibi Content */}
        {activeTab === 'izinTakibi' && (
          <div className="p-4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-200 mb-4">Yıllık İzin Durumu</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Çalışan Adı Soyadı</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Sorumluluk Merkezi</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Önceki Yıl Devir Eden Yıllık İzin</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Bu Yıl Yıllık İzin Yenilenme Tarihi</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Bu Yıl Kazanacağı Yıllık İzin</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Bu Yıl Kullanılan Yıllık İzin Hakkı</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Kalan Yıllık İzin Hakkı</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {izinYillikData.map((calisan) => (
                      <tr key={calisan.id} className="hover:bg-gray-700">
                        <td className="px-4 py-3 text-sm text-gray-300">{calisan.calisanAdi}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{calisan.sorumlulukMerkezi}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{calisan.oncekiYilDevredenIzin}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{calisan.yillikIzinYenilenmeTarihi}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{calisan.buYilKazanacagiIzin}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{calculateUsedAnnualLeave(calisan.calisanAdi)}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{calisan.kalanYillikIzinHakki}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-200 mb-4">İzin Kullanım Detayları</h2>
              
              {/* Filtreler */}
              <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Çalışan Adı Arama */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Çalışan Ara</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Çalışan adı ara..."
                      value={izinSearchTerm}
                      onChange={(e) => setIzinSearchTerm(e.target.value)}
                      className="bg-gray-700 text-white text-sm rounded-md px-3 py-2 border border-gray-600 w-full pl-10"
                    />
                    <div className="absolute left-3 top-2.5 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Sorumluluk Merkezi Filtresi */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Sorumluluk Merkezi</label>
                  <select
                    value={selectedIzinSorumlulukMerkezi}
                    onChange={(e) => setSelectedIzinSorumlulukMerkezi(e.target.value)}
                    className="bg-gray-700 text-white text-sm rounded-md px-3 py-2 border border-gray-600 w-full"
                  >
                    {sorumlulukMerkezleri.map((merkez, index) => (
                      <option key={index} value={merkez}>
                        {merkez === 'tumu' ? 'Tüm Merkezler' : merkez}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tarih Filtresi */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Tarih Filtresi</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={`text-sm px-3 py-1 rounded-md border ${
                        izinDateFilter === 'buHafta' 
                          ? 'bg-green-600 text-white border-green-600' 
                          : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                      }`}
                      onClick={() => handleIzinDateFilterChange('buHafta')}
                    >
                      Bu Hafta
                    </button>
                    <button
                      className={`text-sm px-3 py-1 rounded-md border ${
                        izinDateFilter === 'buAy' 
                          ? 'bg-green-600 text-white border-green-600' 
                          : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                      }`}
                      onClick={() => handleIzinDateFilterChange('buAy')}
                    >
                      Bu Ay
                    </button>
                    <button
                      className={`text-sm px-3 py-1 rounded-md border ${
                        izinDateFilter === 'gecenAy' 
                          ? 'bg-green-600 text-white border-green-600' 
                          : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                      }`}
                      onClick={() => handleIzinDateFilterChange('gecenAy')}
                    >
                      Geçen Ay
                    </button>
                    <button
                      className={`text-sm px-3 py-1 rounded-md border ${
                        izinDateFilter === 'buYil' 
                          ? 'bg-green-600 text-white border-green-600' 
                          : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                      }`}
                      onClick={() => handleIzinDateFilterChange('buYil')}
                    >
                      Bu Yıl
                    </button>
                    <button
                      className={`text-sm px-3 py-1 rounded-md border ${
                        izinDateFilter === 'ozel' 
                          ? 'bg-green-600 text-white border-green-600' 
                          : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                      }`}
                      onClick={() => handleIzinDateFilterChange('ozel')}
                    >
                      Özel
                    </button>
                  </div>
                </div>
              </div>

              {/* Özel Tarih Seçimi */}
              {showIzinCustomDateFilter && (
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Başlangıç Tarihi</label>
                    <input
                      type="text"
                      placeholder="GG.AA.YYYY"
                      value={izinCustomStartDate}
                      onChange={(e) => setIzinCustomStartDate(e.target.value)}
                      className="bg-gray-700 text-white text-sm rounded-md px-3 py-2 border border-gray-600 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Bitiş Tarihi</label>
                    <input
                      type="text"
                      placeholder="GG.AA.YYYY"
                      value={izinCustomEndDate}
                      onChange={(e) => setIzinCustomEndDate(e.target.value)}
                      className="bg-gray-700 text-white text-sm rounded-md px-3 py-2 border border-gray-600 w-full"
                    />
                  </div>
                </div>
              )}

              {/* İzin Kullanım Tablosu */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Çalışan Adı Soyadı</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Sorumluluk Merkezi</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">İzin Başlangıç Tarihi</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">İzinli Gün Sayısı</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">İzin Türü</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filterIzinDataByDate().map((izin) => (
                      <tr key={izin.id} className="hover:bg-gray-700">
                        <td className="px-4 py-3 text-sm text-gray-300">{izin.calisanAdi}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{izin.sorumlulukMerkezi}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{izin.izinBaslangicTarihi}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{izin.izinliGunSayisi}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{izin.izinTuru}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Diğer sekmelerin içeriği buraya eklenecek */}
        {activeTab !== 'perakendeSatis' && activeTab !== 'soforSevkiyat' && activeTab !== 'boyaRenklendirme' && activeTab !== 'abonelikler' && activeTab !== 'izinTakibi' && (
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-green-400 mb-4">Bu bölüm henüz hazır değil</h2>
            <p className="text-gray-400">Seçtiğiniz sekme için içerik yakında eklenecektir.</p>
          </div>
        )}
      </main>
    </div>
  );
};

const MuhasebeEkrani = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ozet');
  const [selectedMerkez, setSelectedMerkez] = useState('tumu');
  const [selectedStokMerkez, setSelectedStokMerkez] = useState('01');
  const [lastUpdateDate, setLastUpdateDate] = useState('01.03.2025');
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockSearchTerm, setStockSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showStockSearch, setShowStockSearch] = useState(false);
  const [sortField, setSortField] = useState('kod');
  const [sortDirection, setSortDirection] = useState('asc');
  const [stockSortField, setStockSortField] = useState('stokKodu');
  const [stockSortDirection, setStockSortDirection] = useState('asc');
  const [portfolyoType, setPortfolyoType] = useState('cek');
  const [portfolyoSortField, setPortfolyoSortField] = useState('cariIsim');
  const [portfolyoSortDirection, setPortfolyoSortDirection] = useState('asc');
  const [ciroType, setCiroType] = useState('cek');
  const [ciroSortField, setCiroSortField] = useState('cariIsim');
  const [ciroSortDirection, setCiroSortDirection] = useState('asc');
  const [tahsilType, setTahsilType] = useState('cek');
  const [tahsilSortField, setTahsilSortField] = useState('cariIsim');
  const [tahsilSortDirection, setTahsilSortDirection] = useState('asc');
  
  // Sorumluluk Merkezleri
  const merkezler = [
    { id: 'tumu', label: 'Tümü' },
    { id: '01', label: '01-Sanayi' },
    { id: '02', label: '02-Fabrika' },
    { id: '03', label: '03-Dyo Şube' },
    { id: '04', label: '04-Filli Şube' },
    { id: '05', label: '05-İnşaat' }
  ];
  
  // Örnek veri - gerçek uygulamada API'den gelecektir
  const cariBakiyeler = [
    { kod: 'CR001', isim: 'Ahmet Yılmaz İnşaat Ltd.', borc: 45000, alacak: 12000, merkez: '05' },
    { kod: 'CR002', isim: 'Mehmet Demir Mimarlık', borc: 28500, alacak: 35000, merkez: '01' },
    { kod: 'CR003', isim: 'Ayşe Kaya Dekorasyon', borc: 18750, alacak: 5200, merkez: '03' },
    { kod: 'CR004', isim: 'Can Yapı Market', borc: 62000, alacak: 24500, merkez: '02' },
    { kod: 'CR005', isim: 'Öztürk İnşaat', borc: 37250, alacak: 41000, merkez: '04' },
    { kod: 'CR006', isim: 'Yılmaz Boya Malzemeleri', borc: 24500, alacak: 12000, merkez: '01' },
    { kod: 'CR007', isim: 'Arslantürk Yapı Ltd.', borc: 53000, alacak: 35000, merkez: '05' },
    { kod: 'CR008', isim: 'Güneş İç Dekorasyon', borc: 15500, alacak: 22000, merkez: '03' },
    { kod: 'CR009', isim: 'İpek Taahhüt A.Ş.', borc: 78000, alacak: 42000, merkez: '02' },
    { kod: 'CR010', isim: 'Teknik Yapı Malzemeleri', borc: 32000, alacak: 8500, merkez: '04' },
  ];

  // Portföydeki Çekler
  const portfoyCekleri = [
    { cariIsim: 'ABC Mobilya Ltd. Şti.', vadeTarihi: '15.04.2025', tutar: 45000 },
    { cariIsim: 'XYZ İnşaat A.Ş.', vadeTarihi: '22.04.2025', tutar: 78500 },
    { cariIsim: 'Mega Yapı Malzemeleri', vadeTarihi: '30.04.2025', tutar: 32000 },
    { cariIsim: 'Star Dekorasyon', vadeTarihi: '05.05.2025', tutar: 21750 },
    { cariIsim: 'Lüks Mobilya San. Tic.', vadeTarihi: '12.05.2025', tutar: 54200 },
  ];

  // Portföydeki Senetler
  const portfoySenetleri = [
    { cariIsim: 'Delta Mimarlık Ltd. Şti.', vadeTarihi: '10.04.2025', tutar: 38500 },
    { cariIsim: 'Yıldız Yapı Market', vadeTarihi: '18.04.2025', tutar: 62000 },
    { cariIsim: 'Öztürk İnşaat', vadeTarihi: '25.04.2025', tutar: 43750 },
    { cariIsim: 'Anadolu Dekorasyon', vadeTarihi: '08.05.2025', tutar: 29800 },
    { cariIsim: 'Kaya Mobilya', vadeTarihi: '15.05.2025', tutar: 51200 },
  ];
  
  // Ciro Edilen Çekler
  const ciroCekleri = [
    { cariIsim: 'Demir Yapı Market', vadeTarihi: '20.04.2025', tutar: 35000, ciroEdilen: 'Aydın Boya Ltd. Şti.' },
    { cariIsim: 'Yılmaz İnşaat', vadeTarihi: '28.04.2025', tutar: 42500, ciroEdilen: 'Merkez Kimya A.Ş.' },
    { cariIsim: 'Güven Dekorasyon', vadeTarihi: '05.05.2025', tutar: 18750, ciroEdilen: 'Doğa Yapı Malzemeleri' },
    { cariIsim: 'Aslan Mobilya', vadeTarihi: '15.05.2025', tutar: 27300, ciroEdilen: 'Teknik Boya San. Tic.' },
  ];
  
  // Ciro Edilen Senetler
  const ciroSenetleri = [
    { cariIsim: 'Kartal Mimarlık', vadeTarihi: '12.04.2025', tutar: 31200, ciroEdilen: 'Yeni Kimya Ltd. Şti.' },
    { cariIsim: 'Mavi Yapı', vadeTarihi: '22.04.2025', tutar: 48700, ciroEdilen: 'Akdeniz Boya A.Ş.' },
    { cariIsim: 'Çelik İnşaat', vadeTarihi: '02.05.2025', tutar: 23500, ciroEdilen: 'Batı Yapı Malzemeleri' },
    { cariIsim: 'Doğan Dekorasyon', vadeTarihi: '10.05.2025', tutar: 39800, ciroEdilen: 'Ege Kimya San. Tic.' },
  ];

  const ciroEdilenler = [
    { cariIsim: 'Atlas Boya San. Tic.', vadeTarihi: '10.04.2025', tutar: 28000 },
    { cariIsim: 'Kaplan Hammadde A.Ş.', vadeTarihi: '22.04.2025', tutar: 35500 },
    { cariIsim: 'Yıldız Kimya Ltd.', vadeTarihi: '15.05.2025', tutar: 17800 },
  ];

  const tahsildekiCekler = [
    { vadeTarihi: '12.04.2025', banka: 'İş Bankası', alinanCari: 'Ahmet Yılmaz İnşaat Ltd.', tutar: 18000 },
    { vadeTarihi: '25.04.2025', banka: 'Ziraat Bankası', alinanCari: 'Mehmet Demir Mimarlık', tutar: 9500 },
    { vadeTarihi: '07.05.2025', banka: 'Garanti Bankası', alinanCari: 'Can Yapı Market', tutar: 24000 },
    { vadeTarihi: '15.05.2025', banka: 'Yapı Kredi', alinanCari: 'Öztürk İnşaat', tutar: 15750 },
  ];

  const envanterRaporu = [
    { merkezAdi: '01-Sanayi', tutar: 425000 },
    { merkezAdi: '02-Fabrika', tutar: 183000 },
    { merkezAdi: '03-Çarşı Dyo', tutar: 256000 },
    { merkezAdi: '04-Çarşı Filli', tutar: 98000 },
  ];

  // Stok Verileri (Sorumluluk Merkezlerine göre gruplandırılmış)
  const stokVerileriMap = {
    '01': [ // 01-Sanayi
      { stokKodu: 'ST001', stokAdi: 'Su Bazlı Plastik Boya 20KG', mevcutMiktar: 125, birimDeger: 450, birim: 'Kova' },
      { stokKodu: 'ST002', stokAdi: 'Tavan Boyası 10KG', mevcutMiktar: 80, birimDeger: 350, birim: 'Kova' },
      { stokKodu: 'ST003', stokAdi: 'İç Cephe Boyası Premium 20KG', mevcutMiktar: 65, birimDeger: 750, birim: 'Kova' },
    ],
    '02': [ // 02-Fabrika
      { stokKodu: 'ST004', stokAdi: 'Dış Cephe Boyası 20KG', mevcutMiktar: 45, birimDeger: 950, birim: 'Kova' },
      { stokKodu: 'ST005', stokAdi: 'Astar 10KG', mevcutMiktar: 95, birimDeger: 280, birim: 'Kova' },
      { stokKodu: 'ST006', stokAdi: 'Alçı 30KG', mevcutMiktar: 120, birimDeger: 180, birim: 'Torba' },
    ],
    '03': [ // 03-Çarşı Dyo
      { stokKodu: 'ST007', stokAdi: 'Saten Alçı 20KG', mevcutMiktar: 85, birimDeger: 220, birim: 'Torba' },
      { stokKodu: 'ST008', stokAdi: 'Fırça Seti', mevcutMiktar: 50, birimDeger: 150, birim: 'Set' },
      { stokKodu: 'ST009', stokAdi: 'Rulo Seti', mevcutMiktar: 75, birimDeger: 120, birim: 'Set' },
    ],
    '04': [ // 04-Çarşı Filli
      { stokKodu: 'ST010', stokAdi: 'Boya Tabancası', mevcutMiktar: 25, birimDeger: 1200, birim: 'Adet' },
      { stokKodu: 'ST011', stokAdi: 'Silikon 310ml', mevcutMiktar: 180, birimDeger: 90, birim: 'Adet' },
      { stokKodu: 'ST012', stokAdi: 'Macun 5KG', mevcutMiktar: 65, birimDeger: 150, birim: 'Kutu' },
    ]
  };

  const bankaBakiyeleri = [
    { bankaAdi: 'İş Bankası', hesapNo: '1234567890', aciklama: 'Ana Hesap', tutar: 128500 },
    { bankaAdi: 'Garanti Bankası', hesapNo: '0987654321', aciklama: 'Operasyonel', tutar: 75200 },
    { bankaAdi: 'Ziraat Bankası', hesapNo: '5678901234', aciklama: 'Tedarikçi Ödemeleri', tutar: 96700 },
    { bankaAdi: 'Yapı Kredi', hesapNo: '4321098765', aciklama: 'Personel Maaş', tutar: 45800 },
  ];

  const krediKartiBakiyeleri = [
    { banka: 'İş Bankası', kartNo: '4567', bakiye: 25600 },
    { banka: 'Garanti Bankası', kartNo: '8901', bakiye: 18200 },
    { banka: 'Yapı Kredi', kartNo: '2345', bakiye: 12800 },
  ];

  const kasaDurumu = [
    { hesapAdi: 'Ana Kasa', dovizCinsi: 'TRY', tutar: 32500 },
    { hesapAdi: 'Ana Kasa', dovizCinsi: 'USD', tutar: 4200 },
    { hesapAdi: 'Ana Kasa', dovizCinsi: 'EUR', tutar: 3500 },
    { hesapAdi: 'Şube Kasa 1', dovizCinsi: 'TRY', tutar: 15800 },
  ];

  // Günceleme fonksiyonu
  const handleUpdate = () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    
    setTimeout(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('tr-TR');
      setLastUpdateDate(formattedDate);
      setIsUpdating(false);
    }, 5000);
  };
  
  // Sıralama fonksiyonu
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Stok sıralama
  const handleStockSort = (field) => {
    if (stockSortField === field) {
      setStockSortDirection(stockSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setStockSortField(field);
      setStockSortDirection('asc');
    }
  };
  
  // Arama açma/kapama
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchTerm('');
    }
  };
  
  // Stok arama açma/kapama
  const toggleStockSearch = () => {
    setShowStockSearch(!showStockSearch);
      setStockSearchTerm('');
  };
  
  // Yazdırma fonksiyonu - Stok Detaylı Envanter
  const handleStockPrint = () => {
    // Yazdırma işlevi
    const printContent = document.createElement('div');
    printContent.innerHTML = `
      <html>
        <head>
          <title>Dekorsan Boya - Stok Detaylı Envanter</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .text-right { text-align: right; }
            .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .title { font-size: 18px; font-weight: bold; }
            .date { font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">DEKORSAN BOYA - Stok Detaylı Envanter</div>
            <div class="date">Yazdırma Tarihi: ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}</div>
          </div>
          <div class="filters">
            <strong>Sorumluluk Merkezi:</strong> ${envanterRaporu.find(m => m.merkezAdi.startsWith(selectedStokMerkez))?.merkezAdi || ''}
            ${stockSearchTerm ? `<br><strong>Arama:</strong> "${stockSearchTerm}"` : ''}
          </div>
          <table>
            <thead>
              <tr>
                <th>Stok Kodu</th>
                <th>Stok Adı</th>
                <th class="text-right">Mevcut Miktar</th>
                <th class="text-right">Birim Değer</th>
                <th class="text-right">Toplam Değer</th>
              </tr>
            </thead>
            <tbody>
              ${filteredStoks.map(stok => `
                <tr>
                  <td>${stok.stokKodu}</td>
                  <td>${stok.stokAdi}</td>
                  <td class="text-right">${stok.mevcutMiktar} ${stok.birim}</td>
                  <td class="text-right">${new Intl.NumberFormat('tr-TR').format(stok.birimDeger)} ₺</td>
                  <td class="text-right">${new Intl.NumberFormat('tr-TR').format(stok.mevcutMiktar * stok.birimDeger)} ₺</td>
                </tr>
              `).join('')}
              <tr style="font-weight: bold; background-color: #f2f2f2;">
                <td colspan="4">TOPLAM ENVANTER DEĞERİ</td>
                <td class="text-right">
                  ${new Intl.NumberFormat('tr-TR').format(totalStokDeger)} ₺
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    
    // Sayfanın yüklenmesini bekleyip yazdır
    printWindow.onload = function() {
      printWindow.print();
      // Yazdırma işlemi tamamlandığında pencereyi kapat
      printWindow.onafterprint = function() {
        printWindow.close();
      };
    };
  };
  const handlePrint = () => {
    // Yazdırma işlevi
    const printContent = document.createElement('div');
    printContent.innerHTML = `
      <html>
        <head>
          <title>Dekorsan Boya - Cari Bakiyeler</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .text-right { text-align: right; }
            .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .title { font-size: 18px; font-weight: bold; }
            .date { font-size: 12px; color: #666; }
            .red { color: #e53e3e; }
            .green { color: #38a169; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">DEKORSAN BOYA - Cari Bakiyeler</div>
            <div class="date">Yazdırma Tarihi: ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}</div>
          </div>
          <div class="filters">
            <strong>Sorumluluk Merkezi:</strong> ${merkezler.find(m => m.id === selectedMerkez)?.label || 'Tümü'}
            ${searchTerm ? `<br><strong>Arama:</strong> "${searchTerm}"` : ''}
          </div>
          <table>
            <thead>
              <tr>
                <th>Cari Kodu</th>
                <th>Cari İsmi</th>
                <th class="text-right">Borç</th>
                <th class="text-right">Alacak</th>
                <th class="text-right">Bakiye</th>
              </tr>
            </thead>
            <tbody>
              ${filteredCaris.map(cari => `
                <tr>
                  <td>${cari.kod}</td>
                  <td>${cari.isim}</td>
                  <td class="text-right">${new Intl.NumberFormat('tr-TR').format(cari.borc)} ₺</td>
                  <td class="text-right">${new Intl.NumberFormat('tr-TR').format(cari.alacak)} ₺</td>
                  <td class="text-right ${cari.borc > cari.alacak ? 'red' : 'green'}">
                    ${new Intl.NumberFormat('tr-TR').format(Math.abs(cari.borc - cari.alacak))} ₺
                    ${cari.borc > cari.alacak ? '(B)' : '(A)'}
                  </td>
                </tr>
              `).join('')}
              <tr style="font-weight: bold; background-color: #f2f2f2;">
                <td colspan="2">TOPLAM BAKİYE</td>
                <td class="text-right">${new Intl.NumberFormat('tr-TR').format(totalBorc)} ₺</td>
                <td class="text-right">${new Intl.NumberFormat('tr-TR').format(totalAlacak)} ₺</td>
                <td class="text-right ${totalBakiye > 0 ? 'red' : 'green'}">
                  ${new Intl.NumberFormat('tr-TR').format(Math.abs(totalBakiye))} ₺
                  ${totalBakiye > 0 ? '(B)' : '(A)'}
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    
    // Sayfanın yüklenmesini bekleyip yazdır
    printWindow.onload = function() {
      printWindow.print();
      // Yazdırma işlemi tamamlandığında pencereyi kapat
      printWindow.onafterprint = function() {
        printWindow.close();
      };
    };
  };

  // Grafik verileri
  const envanterGrafikVeri = envanterRaporu.map(item => ({
    name: item.merkezAdi,
    value: item.tutar
  }));

  const bankaToplam = bankaBakiyeleri.reduce((sum, item) => sum + item.tutar, 0);
  const kartToplam = krediKartiBakiyeleri.reduce((sum, item) => sum + item.bakiye, 0);
  const kasaToplam = kasaDurumu.reduce((sum, item) => sum + item.tutar, 0);

  const likiditeGrafikVeri = [
    { name: 'Banka', value: bankaToplam },
    { name: 'Kredi Kartı', value: kartToplam },
    { name: 'Kasa', value: kasaToplam }
  ];

  // Filtrelenmiş ve sıralanmış cari hesapları hesaplama
  let filteredCaris = cariBakiyeler
    .filter(cari => selectedMerkez === 'tumu' || cari.merkez === selectedMerkez)
    .filter(cari => cari.isim.toLowerCase().includes(searchTerm.toLowerCase()) || cari.kod.toLowerCase().includes(searchTerm.toLowerCase()));
  
  // Sıralama
  filteredCaris = [...filteredCaris].sort((a, b) => {
    let compareResult = 0;
    
    if (sortField === 'kod') {
      compareResult = a.kod.localeCompare(b.kod);
    } else if (sortField === 'isim') {
      compareResult = a.isim.localeCompare(b.isim);
    } else if (sortField === 'bakiye') {
      const bakiyeA = a.borc - a.alacak;
      const bakiyeB = b.borc - b.alacak;
      compareResult = bakiyeA - bakiyeB;
    }
    
    return sortDirection === 'asc' ? compareResult : -compareResult;
  });
  
  const totalBorc = filteredCaris.reduce((sum, cari) => sum + cari.borc, 0);
  const totalAlacak = filteredCaris.reduce((sum, cari) => sum + cari.alacak, 0);
  const totalBakiye = totalBorc - totalAlacak;

  // Filtrelenmiş ve sıralanmış stok verilerini hesaplama
  // Seçilen merkezdeki stok verileri
  const stokVerileri = stokVerileriMap[selectedStokMerkez] || [];
  
  let filteredStoks = stokVerileri
    .filter(stok => stok.stokAdi.toLowerCase().includes(stockSearchTerm.toLowerCase()) || 
                    stok.stokKodu.toLowerCase().includes(stockSearchTerm.toLowerCase()));
  
  // Stok sıralama
  filteredStoks = [...filteredStoks].sort((a, b) => {
    let compareResult = 0;
    
    if (stockSortField === 'stokKodu') {
      compareResult = a.stokKodu.localeCompare(b.stokKodu);
    } else if (stockSortField === 'stokAdi') {
      compareResult = a.stokAdi.localeCompare(b.stokAdi);
    } else if (stockSortField === 'birimDeger') {
      compareResult = a.birimDeger - b.birimDeger;
    } else if (stockSortField === 'toplamDeger') {
      const toplamA = a.mevcutMiktar * a.birimDeger;
      const toplamB = b.mevcutMiktar * b.birimDeger;
      compareResult = toplamA - toplamB;
    }
    
    return stockSortDirection === 'asc' ? compareResult : -compareResult;
  });
  
  const totalStokDeger = filteredStoks.reduce((sum, stok) => sum + (stok.mevcutMiktar * stok.birimDeger), 0);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#8dd1e1'];

  // Portföydeki Çek ve Senetleri filtreleme ve sıralama fonksiyonu
  const filteredPortfolyo = portfolyoType === 'cek' 
    ? [...portfoyCekleri] 
    : [...portfoySenetleri];
    
  // Sıralama işlemi
  filteredPortfolyo.sort((a, b) => {
    if (portfolyoSortField === 'tutar') {
      return portfolyoSortDirection === 'asc' 
        ? a.tutar - b.tutar 
        : b.tutar - a.tutar;
    } else {
      const valueA = a[portfolyoSortField].toUpperCase();
      const valueB = b[portfolyoSortField].toUpperCase();
      
      if (valueA < valueB) {
        return portfolyoSortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return portfolyoSortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    }
  });
  
  // Ciro Edilen Çek ve Senetleri filtreleme ve sıralama fonksiyonu
  const filteredCiro = ciroType === 'cek' 
    ? [...ciroCekleri] 
    : [...ciroSenetleri];
    
  // Sıralama işlemi
  filteredCiro.sort((a, b) => {
    if (ciroSortField === 'tutar') {
      return ciroSortDirection === 'asc' 
        ? a.tutar - b.tutar 
        : b.tutar - a.tutar;
    } else {
      const valueA = a[ciroSortField].toUpperCase();
      const valueB = b[ciroSortField].toUpperCase();
      
      if (valueA < valueB) {
        return ciroSortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return ciroSortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    }
  });
  
  const handlePortfolyoSort = (field) => {
    if (portfolyoSortField === field) {
      setPortfolyoSortDirection(portfolyoSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setPortfolyoSortField(field);
      setPortfolyoSortDirection('asc');
    }
  };
  
  const handleCiroSort = (field) => {
    if (ciroSortField === field) {
      setCiroSortDirection(ciroSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setCiroSortField(field);
      setCiroSortDirection('asc');
    }
  };
  
  const handleTahsilSort = (field) => {
    if (tahsilSortField === field) {
      setTahsilSortDirection(tahsilSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setTahsilSortField(field);
      setTahsilSortDirection('asc');
    }
  };

  // Tahsildeki Çekler
  const tahsilCekleri = [
    { cariIsim: 'Yıldız Mobilya', vadeTarihi: '18.04.2025', tutar: 28500, banka: 'Garanti Bankası' },
    { cariIsim: 'Aydın İnşaat', vadeTarihi: '25.04.2025', tutar: 36700, banka: 'İş Bankası' },
    { cariIsim: 'Kaya Dekorasyon', vadeTarihi: '03.05.2025', tutar: 19800, banka: 'Ziraat Bankası' },
    { cariIsim: 'Deniz Yapı Market', vadeTarihi: '12.05.2025', tutar: 42300, banka: 'Yapı Kredi' },
  ];
  
  // Tahsildeki Senetler
  const tahsilSenetleri = [
    { cariIsim: 'Güneş Mimarlık', vadeTarihi: '15.04.2025', tutar: 25600, banka: 'Akbank' },
    { cariIsim: 'Tepe İnşaat', vadeTarihi: '23.04.2025', tutar: 33900, banka: 'Halkbank' },
    { cariIsim: 'Orman Dekorasyon', vadeTarihi: '05.05.2025', tutar: 17500, banka: 'Vakıfbank' },
    { cariIsim: 'Dağ Yapı Market', vadeTarihi: '14.05.2025', tutar: 29800, banka: 'TEB' },
  ];

  // Tahsildeki Çek ve Senetleri filtreleme ve sıralama fonksiyonu
  const filteredTahsil = tahsilType === 'cek' 
    ? [...tahsilCekleri] 
    : [...tahsilSenetleri];
    
  // Sıralama işlemi
  filteredTahsil.sort((a, b) => {
    if (tahsilSortField === 'tutar') {
      return tahsilSortDirection === 'asc' 
        ? a.tutar - b.tutar 
        : b.tutar - a.tutar;
    } else {
      const valueA = a[tahsilSortField].toUpperCase();
      const valueB = b[tahsilSortField].toUpperCase();
      
      if (valueA < valueB) {
        return tahsilSortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return tahsilSortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
      
      {/* Header */}
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/images/logo-dark.png" 
              alt="DEKORSAN BOYA" 
              className="h-10 cursor-pointer" 
              onClick={() => navigate('/')}
              title="Anasayfaya Dön"
            />
            <span className="ml-4 text-lg text-gray-400">Muhasebe Ekranı</span>
            
            {/* Navigation Tabs - Moved here from below */}
            <div className="flex space-x-2 ml-6">
          <button
                className={`px-3 py-1 rounded flex items-center ${activeTab === 'ozet' ? 'bg-blue-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('ozet')}
          >
                <LayoutDashboard size={16} className="mr-1" />
            Özet
          </button>
          <button
                className={`px-3 py-1 rounded flex items-center ${activeTab === 'cariHesaplar' ? 'bg-blue-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('cariHesaplar')}
          >
                <Users size={16} className="mr-1" />
            Cari Hesaplar
          </button>
          <button
                className={`px-3 py-1 rounded flex items-center ${activeTab === 'cekSenet' ? 'bg-blue-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('cekSenet')}
          >
                <FileCheck size={16} className="mr-1" />
            Çek & Senet
          </button>
          <button
                className={`px-3 py-1 rounded flex items-center ${activeTab === 'envanter' ? 'bg-blue-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('envanter')}
          >
                <Package size={16} className="mr-1" />
            Envanter
          </button>
          <button
                className={`px-3 py-1 rounded flex items-center ${activeTab === 'finansalDurum' ? 'bg-blue-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('finansalDurum')}
          >
                <BarChart3 size={16} className="mr-1" />
            Finansal Durum
          </button>
        </div>
          </div>
          
          {/* Removed date and update time */}
          <button 
            onClick={() => handleUpdate()} 
            className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
            disabled={isUpdating}
            title="Verileri Güncelle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
              <path d="M3 22v-6h6"></path>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        {/* Özet Sayfası - Tüm bilgiler tek ekranda */}
        {activeTab === 'ozet' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Üst sıra - Küçük özet kartları - REMOVED */}

            {/* İlk blok satırı - Cari ve Envanter */}
            <div className="bg-gray-800 p-3 rounded-lg shadow-lg lg:col-span-2">
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-blue-400">Cari Bakiyeler</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Son Güncelleme Tarihi: {lastUpdateDate}</span>
                    <button 
                      onClick={() => handleUpdate()} 
                      className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
                      disabled={isUpdating}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                        <path d="M21 2v6h-6"></path>
                        <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                        <path d="M3 22v-6h6"></path>
                        <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-medium text-gray-300 mr-2">Sorumluluk Merkezi:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {merkezler.map((merkez) => (
                          <button
                            key={merkez.id}
                            className={`text-xs px-2 py-1 rounded-md border ${
                              selectedMerkez === merkez.id 
                                ? 'bg-blue-600 text-white border-blue-600' 
                                : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                            }`}
                            onClick={() => setSelectedMerkez(merkez.id)}
                          >
                            {merkez.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    {showSearch && (
                      <div className="mt-1 relative">
                        <input
                          type="text"
                          placeholder="Cari ara..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-gray-700 text-white text-xs rounded-md px-2 py-1 border border-gray-600 w-36"
                        />
                        <button 
                          onClick={() => toggleSearch()} 
                          className="absolute right-2 top-1 text-gray-400 hover:text-white"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    )}
                    {!showSearch && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toggleSearch()} 
                          className="text-gray-400 hover:text-white bg-gray-700 p-1 rounded-md"
                          title="Cari Ara"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        </button>
                        <button 
                          onClick={() => handlePrint()} 
                          className="text-gray-400 hover:text-white bg-gray-700 p-1 rounded-md"
                          title="Yazdır"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 6 2 18 2 18 9"></polyline>
                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                            <rect x="6" y="14" width="12" height="8"></rect>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto" style={{maxHeight: "140px"}}>
                <table className="min-w-full bg-gray-900 rounded-lg">
                  <thead className="bg-gray-700">
                    <tr>
                      <th 
                        className="p-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handleSort('kod')}
                      >
                        <div className="flex items-center">
                          Kod
                          {sortField === 'kod' && (
                            <span className="ml-1">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handleSort('isim')}
                      >
                        <div className="flex items-center">
                          Cari İsmi
                          {sortField === 'isim' && (
                            <span className="ml-1">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="p-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sorumluluk Merkezi</th>
                      <th 
                        className="p-2 text-right text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handleSort('bakiye')}
                      >
                        <div className="flex items-center justify-end">
                          Bakiye
                          {sortField === 'bakiye' && (
                            <span className="ml-1">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredCaris.map((cari, index) => (
                      <tr key={index} className="hover:bg-gray-800">
                        <td className="p-2 text-xs">{cari.kod}</td>
                        <td className="p-2 text-xs">{cari.isim}</td>
                        <td className="p-2 text-xs">{merkezler.find(m => m.id === cari.merkez)?.label.split('-')[1] || ''}</td>
                        <td className={`p-2 text-xs text-right ${cari.borc > cari.alacak ? 'text-red-400' : 'text-green-400'}`}>
                          {new Intl.NumberFormat('tr-TR').format(Math.abs(cari.borc - cari.alacak))} ₺
                          {cari.borc > cari.alacak ? ' (B)' : ' (A)'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-2 p-2 bg-gray-700 rounded-b-lg flex justify-between items-center">
                <div className="text-xs font-bold text-white">TOPLAM BAKİYE</div>
                <div className={`text-xs font-bold text-right ${totalBakiye > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {new Intl.NumberFormat('tr-TR').format(Math.abs(totalBakiye))} ₺
                  {totalBakiye > 0 ? ' (B)' : ' (A)'}
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-3 rounded-lg shadow-lg lg:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-blue-400">Envanter Raporu</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Son Güncelleme Tarihi: {lastUpdateDate}</span>
                  <button 
                    onClick={() => handleUpdate()} 
                    className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
                    disabled={isUpdating}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M21 2v6h-6"></path>
                      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                      <path d="M3 22v-6h6"></path>
                      <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto" style={{maxHeight: "160px"}}>
                <table className="min-w-full bg-gray-900 rounded-lg">
                  <thead className="bg-gray-700 sticky top-0">
                    <tr>
                      <th className="p-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sorumluluk Merkezi</th>
                      <th className="p-2 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Tutar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {envanterRaporu.map((merkez, index) => (
                      <tr key={index} className="hover:bg-gray-800">
                        <td className="p-2 text-xs">{merkez.merkezAdi}</td>
                        <td className="p-2 text-xs text-right">{new Intl.NumberFormat('tr-TR').format(merkez.tutar)} ₺</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-700">
                      <td className="p-2 text-xs font-bold">TOPLAM</td>
                      <td className="p-2 text-xs font-bold text-right">
                        {new Intl.NumberFormat('tr-TR').format(envanterRaporu.reduce((sum, item) => sum + item.tutar, 0))} ₺
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* İkinci blok satırı - Çekler */}
            <div className="bg-gray-800 p-3 rounded-lg shadow-lg lg:col-span-2">
              <h2 className="text-lg font-semibold mb-2 text-blue-400">Portföydeki Müşteri Çekleri</h2>
              <div className="overflow-x-auto" style={{maxHeight: "160px"}}>
                <table className="min-w-full bg-gray-900 rounded-lg">
                  <thead className="bg-gray-700 sticky top-0">
                    <tr>
                      <th 
                        className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handlePortfolyoSort('cariIsim')}
                      >
                        <div className="flex items-center">
                          Cari İsmi
                          {portfolyoSortField === 'cariIsim' && (
                            <span className="ml-1">
                              {portfolyoSortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handlePortfolyoSort('vadeTarihi')}
                      >
                        <div className="flex items-center">
                          Vade Tarihi
                          {portfolyoSortField === 'vadeTarihi' && (
                            <span className="ml-1">
                              {portfolyoSortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handlePortfolyoSort('tutar')}
                      >
                        <div className="flex items-center justify-end">
                          Tutar
                          {portfolyoSortField === 'tutar' && (
                            <span className="ml-1">
                              {portfolyoSortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredPortfolyo.map((cek, index) => (
                      <tr key={index} className="hover:bg-gray-800">
                        <td className="p-3 text-xs">{cek.cariIsim}</td>
                        <td className="p-3 text-xs">{cek.vadeTarihi}</td>
                        <td className="p-3 text-xs text-right">{new Intl.NumberFormat('tr-TR').format(cek.tutar)} ₺</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-700">
                      <td colSpan="2" className="p-3 text-xs font-bold">TOPLAM</td>
                      <td className="p-3 text-xs font-bold text-right">
                        {new Intl.NumberFormat('tr-TR').format(filteredPortfolyo.reduce((sum, item) => sum + item.tutar, 0))} ₺
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-800 p-3 rounded-lg shadow-lg lg:col-span-2">
              <h2 className="text-lg font-semibold mb-2 text-blue-400">Ciro Edilen + Tahsildeki Çekler</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="overflow-x-auto" style={{maxHeight: "160px"}}>
                  <table className="min-w-full bg-gray-900 rounded-lg">
                    <thead className="bg-gray-700 sticky top-0">
                      <tr>
                        <th className="p-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cari İsmi</th>
                        <th className="p-2 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Tutar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredCiro.map((ciro, index) => (
                        <tr key={index} className="hover:bg-gray-800">
                          <td className="p-2 text-xs">{ciro.cariIsim}</td>
                          <td className="p-2 text-xs text-right">{new Intl.NumberFormat('tr-TR').format(ciro.tutar)} ₺</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-700">
                        <td className="p-2 text-xs font-bold">TOPLAM</td>
                        <td className="p-2 text-xs font-bold text-right">
                          {new Intl.NumberFormat('tr-TR').format(filteredCiro.reduce((sum, item) => sum + item.tutar, 0))} ₺
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="overflow-x-auto" style={{maxHeight: "160px"}}>
                  <table className="min-w-full bg-gray-900 rounded-lg">
                    <thead className="bg-gray-700 sticky top-0">
                      <tr>
                        <th className="p-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vade</th>
                        <th className="p-2 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Tutar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredTahsil.map((cek, index) => (
                        <tr key={index} className="hover:bg-gray-800">
                          <td className="p-2 text-xs">{cek.vadeTarihi}</td>
                          <td className="p-2 text-xs text-right">{new Intl.NumberFormat('tr-TR').format(cek.tutar)} ₺</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-700">
                        <td className="p-2 text-xs font-bold">TOPLAM</td>
                        <td className="p-2 text-xs font-bold text-right">
                          {new Intl.NumberFormat('tr-TR').format(filteredTahsil.reduce((sum, item) => sum + item.tutar, 0))} ₺
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Üçüncü blok satırı - Finansal Durum */}
            <div className="bg-gray-800 p-3 rounded-lg shadow-lg lg:col-span-2">
              <h2 className="text-lg font-semibold mb-2 text-blue-400">Banka ve Kredi Kartı Bakiyeleri</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="overflow-x-auto" style={{maxHeight: "160px"}}>
                  <table className="min-w-full bg-gray-900 rounded-lg">
                    <thead className="bg-gray-700 sticky top-0">
                      <tr>
                        <th className="p-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Banka</th>
                        <th className="p-2 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Tutar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {bankaBakiyeleri.map((banka, index) => (
                        <tr key={index} className="hover:bg-gray-800">
                          <td className="p-2 text-xs">{banka.bankaAdi}</td>
                          <td className="p-2 text-xs text-right">{new Intl.NumberFormat('tr-TR').format(banka.tutar)} ₺</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-700">
                        <td className="p-2 text-xs font-bold">TOPLAM</td>
                        <td className="p-2 text-xs font-bold text-right">
                          {new Intl.NumberFormat('tr-TR').format(bankaBakiyeleri.reduce((sum, item) => sum + item.tutar, 0))} ₺
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="overflow-x-auto" style={{maxHeight: "160px"}}>
                  <table className="min-w-full bg-gray-900 rounded-lg">
                    <thead className="bg-gray-700 sticky top-0">
                      <tr>
                        <th className="p-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">K. Kartı</th>
                        <th className="p-2 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Bakiye</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {krediKartiBakiyeleri.map((kart, index) => (
                        <tr key={index} className="hover:bg-gray-800">
                          <td className="p-2 text-xs">{kart.banka} *{kart.kartNo}</td>
                          <td className="p-2 text-xs text-right">{new Intl.NumberFormat('tr-TR').format(kart.bakiye)} ₺</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-700">
                        <td className="p-2 text-xs font-bold">TOPLAM</td>
                        <td className="p-2 text-xs font-bold text-right">
                          {new Intl.NumberFormat('tr-TR').format(krediKartiBakiyeleri.reduce((sum, item) => sum + item.bakiye, 0))} ₺
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-3 rounded-lg shadow-lg lg:col-span-2">
              <h2 className="text-lg font-semibold mb-2 text-blue-400">Nakit Kasa Durumu</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="overflow-x-auto" style={{maxHeight: "160px"}}>
                  <table className="min-w-full bg-gray-900 rounded-lg">
                    <thead className="bg-gray-700 sticky top-0">
                      <tr>
                        <th className="p-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Kasa/Döviz</th>
                        <th className="p-2 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Tutar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {kasaDurumu.map((kasa, index) => (
                        <tr key={index} className="hover:bg-gray-800">
                          <td className="p-2 text-xs">{kasa.hesapAdi} ({kasa.dovizCinsi})</td>
                          <td className="p-2 text-xs text-right">
                            {new Intl.NumberFormat('tr-TR').format(kasa.tutar)} 
                            {kasa.dovizCinsi === 'TRY' ? ' ₺' : kasa.dovizCinsi === 'USD' ? ' $' : ' €'}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-700">
                        <td className="p-2 text-xs font-bold">TOPLAM</td>
                        <td className="p-2 text-xs font-bold text-right">
                          {new Intl.NumberFormat('tr-TR').format(kasaDurumu.reduce((sum, item) => sum + item.tutar, 0))} ₺
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={likiditeGrafikVeri}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={50}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {likiditeGrafikVeri.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cari Hesaplar Sayfası */}
        {activeTab === 'cariHesaplar' && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-400">Cari Bakiyeler</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Son Güncelleme Tarihi: {lastUpdateDate}</span>
                  <button 
                    onClick={() => handleUpdate()} 
                    className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
                    disabled={isUpdating}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M21 2v6h-6"></path>
                      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                      <path d="M3 22v-6h6"></path>
                      <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-300 mr-2">Sorumluluk Merkezi:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {merkezler.map((merkez) => (
                        <button
                          key={merkez.id}
                          className={`text-sm px-3 py-1 rounded-md border ${
                            selectedMerkez === merkez.id 
                              ? 'bg-blue-600 text-white border-blue-600' 
                              : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                          }`}
                          onClick={() => setSelectedMerkez(merkez.id)}
                        >
                          {merkez.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {showSearch && (
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Cari ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-700 text-white text-sm rounded-md px-3 py-1 border border-gray-600 w-48"
                      />
                      <button 
                        onClick={() => toggleSearch()} 
                        className="absolute right-3 top-1.5 text-gray-400 hover:text-white"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  )}
                  {!showSearch && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => toggleSearch()} 
                        className="text-gray-400 hover:text-white bg-gray-700 p-2 rounded-md"
                        title="Cari Ara"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </button>
                      <button 
                        onClick={() => handlePrint()} 
                        className="text-gray-400 hover:text-white bg-gray-700 p-2 rounded-md"
                        title="Yazdır"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 6 2 18 2 18 9"></polyline>
                          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                          <rect x="6" y="14" width="12" height="8"></rect>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-900 rounded-lg">
                <thead className="bg-gray-700">
                  <tr>
                    <th 
                      className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                      onClick={() => handleSort('kod')}
                    >
                      <div className="flex items-center">
                        Cari Kodu
                        {sortField === 'kod' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                      onClick={() => handleSort('isim')}
                    >
                      <div className="flex items-center">
                        Cari İsmi
                        {sortField === 'isim' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Merkez</th>
                    <th className="p-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Borç</th>
                    <th className="p-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Alacak</th>
                    <th 
                      className="p-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                      onClick={() => handleSort('bakiye')}
                    >
                      <div className="flex items-center justify-end">
                        Bakiye
                        {sortField === 'bakiye' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredCaris.map((cari, index) => (
                    <tr key={index} className="hover:bg-gray-800">
                      <td className="p-3 text-sm">{cari.kod}</td>
                      <td className="p-3 text-sm">{cari.isim}</td>
                      <td className="p-3 text-sm">{merkezler.find(m => m.id === cari.merkez)?.label || ''}</td>
                      <td className="p-3 text-sm text-right">{new Intl.NumberFormat('tr-TR').format(cari.borc)} ₺</td>
                      <td className="p-3 text-sm text-right">{new Intl.NumberFormat('tr-TR').format(cari.alacak)} ₺</td>
                      <td className={`p-3 text-sm text-right ${cari.borc > cari.alacak ? 'text-red-400' : 'text-green-400'}`}>
                        {new Intl.NumberFormat('tr-TR').format(Math.abs(cari.borc - cari.alacak))} ₺
                        {cari.borc > cari.alacak ? ' (B)' : ' (A)'}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-700 font-bold">
                    <td colSpan="3" className="p-3 text-sm">TOPLAM BAKİYE</td>
                    <td className="p-3 text-sm text-right">{new Intl.NumberFormat('tr-TR').format(totalBorc)} ₺</td>
                    <td className="p-3 text-sm text-right">{new Intl.NumberFormat('tr-TR').format(totalAlacak)} ₺</td>
                    <td className={`p-3 text-sm text-right ${totalBakiye > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {new Intl.NumberFormat('tr-TR').format(Math.abs(totalBakiye))} ₺
                      {totalBakiye > 0 ? ' (B)' : ' (A)'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Çek & Senet Sayfası */}
        {activeTab === 'cekSenet' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-400">Portföydeki Müşteri Çekleri ve Senetleri</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Son Güncelleme Tarihi: {lastUpdateDate}</span>
                  <button 
                    onClick={() => handleUpdate()} 
                    className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
                    disabled={isUpdating}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M21 2v6h-6"></path>
                      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                      <path d="M3 22v-6h6"></path>
                      <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                    </svg>
                  </button>
          </div>
    </div>
              
              {/* Çek/Senet Seçim Butonları */}
              <div className="flex space-x-2 mb-4">
                <button
                  className={`px-2 py-0.5 text-xs rounded ${portfolyoType === 'cek' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => setPortfolyoType('cek')}
                >
                  Çek
                </button>
                <button
                  className={`px-2 py-0.5 text-xs rounded ${portfolyoType === 'senet' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => setPortfolyoType('senet')}
                >
                  Senet
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-900 rounded-lg">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cari İsmi</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vade Tarihi</th>
                      <th className="p-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Tutar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredPortfolyo.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-800">
                        <td className="p-3 text-sm">{item.cariIsim}</td>
                        <td className="p-3 text-sm">{item.vadeTarihi}</td>
                        <td className="p-3 text-sm text-right">{new Intl.NumberFormat('tr-TR').format(item.tutar)} ₺</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-700">
                      <td colSpan="2" className="p-3 text-sm font-bold">TOPLAM</td>
                      <td className="p-3 text-sm font-bold text-right">
                        {new Intl.NumberFormat('tr-TR').format(filteredPortfolyo.reduce((sum, item) => sum + item.tutar, 0))} ₺
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-400">Ciro Edilen Müşteri Çek ve Senetleri</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Son Güncelleme Tarihi: {lastUpdateDate}</span>
                  <button 
                    onClick={() => handleUpdate()} 
                    className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
                    disabled={isUpdating}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M21 2v6h-6"></path>
                      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                      <path d="M3 22v-6h6"></path>
                      <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Çek/Senet Seçim Butonları */}
              <div className="flex space-x-2 mb-4">
                <button
                  className={`px-2 py-0.5 text-xs rounded ${ciroType === 'cek' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => setCiroType('cek')}
                >
                  Çek
                </button>
                <button
                  className={`px-2 py-0.5 text-xs rounded ${ciroType === 'senet' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => setCiroType('senet')}
                >
                  Senet
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-900 rounded-lg">
                  <thead className="bg-gray-700">
                    <tr>
                      <th 
                        className="p-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handleCiroSort('cariIsim')}
                      >
                        <div className="flex items-center">
                          Cari İsmi
                          {ciroSortField === 'cariIsim' && (
                            <span className="ml-1">
                              {ciroSortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handleCiroSort('vadeTarihi')}
                      >
                        <div className="flex items-center">
                          Vade Tarihi
                          {ciroSortField === 'vadeTarihi' && (
                            <span className="ml-1">
                              {ciroSortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handleCiroSort('ciroEdilen')}
                      >
                        <div className="flex items-center">
                          Ciro Edilen
                          {ciroSortField === 'ciroEdilen' && (
                            <span className="ml-1">
                              {ciroSortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-2 text-right text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handleCiroSort('tutar')}
                      >
                        <div className="flex items-center justify-end">
                          Tutar
                          {ciroSortField === 'tutar' && (
                            <span className="ml-1">
                              {ciroSortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredCiro.map((ciro, index) => (
                      <tr key={index} className="hover:bg-gray-800">
                        <td className="p-2 text-xs">{ciro.cariIsim}</td>
                        <td className="p-2 text-xs">{ciro.vadeTarihi}</td>
                        <td className="p-2 text-xs">{ciro.ciroEdilen}</td>
                        <td className="p-2 text-xs text-right">{new Intl.NumberFormat('tr-TR').format(ciro.tutar)} ₺</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-700">
                      <td colSpan="3" className="p-2 text-xs font-bold">TOPLAM</td>
                      <td className="p-2 text-xs font-bold text-right">
                        {new Intl.NumberFormat('tr-TR').format(filteredCiro.reduce((sum, item) => sum + item.tutar, 0))} ₺
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-400">Tahsildeki Müşteri Çek ve Senetleri</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Son Güncelleme Tarihi: {lastUpdateDate}</span>
                  <button 
                    onClick={() => handleUpdate()} 
                    className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
                    disabled={isUpdating}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M21 2v6h-6"></path>
                      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                      <path d="M3 22v-6h6"></path>
                      <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Çek/Senet Seçim Butonları */}
              <div className="flex space-x-2 mb-4">
                <button
                  className={`px-2 py-0.5 text-xs rounded ${tahsilType === 'cek' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => setTahsilType('cek')}
                >
                  Çek
                </button>
                <button
                  className={`px-2 py-0.5 text-xs rounded ${tahsilType === 'senet' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => setTahsilType('senet')}
                >
                  Senet
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-900 rounded-lg">
                  <thead className="bg-gray-700">
                    <tr>
                      <th 
                        className="p-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handleTahsilSort('vadeTarihi')}
                      >
                        <div className="flex items-center">
                          Vade Tarihi
                          {tahsilSortField === 'vadeTarihi' && (
                            <span className="ml-1">
                              {tahsilSortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handleTahsilSort('cariIsim')}
                      >
                        <div className="flex items-center">
                          Cari İsmi
                          {tahsilSortField === 'cariIsim' && (
                            <span className="ml-1">
                              {tahsilSortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handleTahsilSort('banka')}
                      >
                        <div className="flex items-center">
                          Banka
                          {tahsilSortField === 'banka' && (
                            <span className="ml-1">
                              {tahsilSortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-2 text-right text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handleTahsilSort('tutar')}
                      >
                        <div className="flex items-center justify-end">
                          Tutar
                          {tahsilSortField === 'tutar' && (
                            <span className="ml-1">
                              {tahsilSortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredTahsil.map((cek, index) => (
                      <tr key={index} className="hover:bg-gray-800">
                        <td className="p-2 text-xs">{cek.vadeTarihi}</td>
                        <td className="p-2 text-xs">{cek.cariIsim}</td>
                        <td className="p-2 text-xs">{cek.banka}</td>
                        <td className="p-2 text-xs text-right">{new Intl.NumberFormat('tr-TR').format(cek.tutar)} ₺</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-700">
                      <td colSpan="3" className="p-2 text-xs font-bold">TOPLAM</td>
                      <td className="p-2 text-xs font-bold text-right">
                        {new Intl.NumberFormat('tr-TR').format(filteredTahsil.reduce((sum, item) => sum + item.tutar, 0))} ₺
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Envanter Sayfası */}
        {activeTab === 'envanter' && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-400">Envanter Raporu</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Son Güncelleme Tarihi: {lastUpdateDate}</span>
                <button 
                  onClick={() => handleUpdate()} 
                  className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
                  disabled={isUpdating}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <path d="M21 2v6h-6"></path>
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                    <path d="M3 22v-6h6"></path>
                    <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-900 rounded-lg">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sorumluluk Merkezi</th>
                    <th className="p-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Tutar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {envanterRaporu.map((merkez, index) => (
                    <tr key={index} className="hover:bg-gray-800">
                      <td className="p-3 text-sm">{merkez.merkezAdi}</td>
                      <td className="p-3 text-sm text-right">{new Intl.NumberFormat('tr-TR').format(merkez.tutar)} ₺</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-700">
                    <td className="p-3 text-sm font-bold">TOPLAM</td>
                    <td className="p-3 text-sm font-bold text-right">
                      {new Intl.NumberFormat('tr-TR').format(envanterRaporu.reduce((sum, item) => sum + item.tutar, 0))} ₺
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Stok Detaylı Envanter */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-blue-400">Stok Detaylı Envanter</h3>
                <div className="flex items-center gap-2">
                  {showStockSearch && (
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Stok ara..."
                        value={stockSearchTerm}
                        onChange={(e) => setStockSearchTerm(e.target.value)}
                        className="bg-gray-700 text-white text-sm rounded-md px-3 py-1 border border-gray-600 w-48"
                      />
                      <button 
                        onClick={() => toggleStockSearch()} 
                        className="absolute right-3 top-1.5 text-gray-400 hover:text-white"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  )}
                  {!showStockSearch && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => toggleStockSearch()} 
                        className="text-gray-400 hover:text-white bg-gray-700 p-2 rounded-md"
                        title="Stok Ara"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleStockPrint()} 
                        className="text-gray-400 hover:text-white bg-gray-700 p-2 rounded-md"
                        title="Yazdır"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 6 2 18 2 18 9"></polyline>
                          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                          <rect x="6" y="14" width="12" height="8"></rect>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-300 mr-2">Sorumluluk Merkezi:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {envanterRaporu.map((merkez) => {
                    const merkzId = merkez.merkezAdi.split('-')[0];
                    return (
                      <button
                        key={merkez.merkezAdi}
                        className={`text-sm px-3 py-1 rounded-md border ${
                          selectedStokMerkez === merkzId 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                        }`}
                        onClick={() => setSelectedStokMerkez(merkzId)}
                      >
                        {merkez.merkezAdi}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-900 rounded-lg">
                  <thead className="bg-gray-700">
                    <tr>
                      <th 
                        className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handleStockSort('stokKodu')}
                      >
                        <div className="flex items-center">
                          Stok Kodu
                          {stockSortField === 'stokKodu' && (
                            <span className="ml-1">
                              {stockSortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handleStockSort('stokAdi')}
                      >
                        <div className="flex items-center">
                          Stok Adı
                          {stockSortField === 'stokAdi' && (
                            <span className="ml-1">
                              {stockSortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="p-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Mevcut Miktar
                      </th>
                      <th 
                        className="p-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handleStockSort('birimDeger')}
                      >
                        <div className="flex items-center justify-end">
                          Birim Değer
                          {stockSortField === 'birimDeger' && (
                            <span className="ml-1">
                              {stockSortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                        onClick={() => handleStockSort('toplamDeger')}
                      >
                        <div className="flex items-center justify-end">
                          Toplam Değer
                          {stockSortField === 'toplamDeger' && (
                            <span className="ml-1">
                              {stockSortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredStoks.map((stok, index) => (
                      <tr key={index} className="hover:bg-gray-800">
                        <td className="p-3 text-sm">{stok.stokKodu}</td>
                        <td className="p-3 text-sm">{stok.stokAdi}</td>
                        <td className="p-3 text-sm text-right">{stok.mevcutMiktar} {stok.birim}</td>
                        <td className="p-3 text-sm text-right">{new Intl.NumberFormat('tr-TR').format(stok.birimDeger)} ₺</td>
                        <td className="p-3 text-sm text-right">{new Intl.NumberFormat('tr-TR').format(stok.mevcutMiktar * stok.birimDeger)} ₺</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-700">
                      <td colSpan="4" className="p-3 text-sm font-bold">TOPLAM ENVANTER DEĞERİ</td>
                      <td className="p-3 text-sm font-bold text-right">
                        {new Intl.NumberFormat('tr-TR').format(totalStokDeger)} ₺
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Finansal Durum Sayfası */}
        {activeTab === 'finansalDurum' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-400">Banka Bakiye Durumu</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Son Güncelleme Tarihi: {lastUpdateDate}</span>
                  <button 
                    onClick={() => handleUpdate()} 
                    className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
                    disabled={isUpdating}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M21 2v6h-6"></path>
                      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                      <path d="M3 22v-6h6"></path>
                      <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-900 rounded-lg">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Banka Adı</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hesap Numarası</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Açıklama</th>
                      <th className="p-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Tutar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {bankaBakiyeleri.map((banka, index) => (
                      <tr key={index} className="hover:bg-gray-800">
                        <td className="p-3 text-sm">{banka.bankaAdi}</td>
                        <td className="p-3 text-sm">{banka.hesapNo}</td>
                        <td className="p-3 text-sm">{banka.aciklama}</td>
                        <td className="p-3 text-sm text-right">{new Intl.NumberFormat('tr-TR').format(banka.tutar)} ₺</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-700">
                      <td colSpan="3" className="p-3 text-sm font-bold">TOPLAM</td>
                      <td className="p-3 text-sm font-bold text-right">
                        {new Intl.NumberFormat('tr-TR').format(bankaBakiyeleri.reduce((sum, item) => sum + item.tutar, 0))} ₺
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-400">Firma Kredi Kartı Bakiye</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Son Güncelleme Tarihi: {lastUpdateDate}</span>
                  <button 
                    onClick={() => handleUpdate()} 
                    className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
                    disabled={isUpdating}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M21 2v6h-6"></path>
                      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                      <path d="M3 22v-6h6"></path>
                      <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                    </svg>
                  </button>
          </div>
          </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-900 rounded-lg">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Banka</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Kart No (Son Dört Hanesi)</th>
                      <th className="p-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Bakiye</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {krediKartiBakiyeleri.map((kart, index) => (
                      <tr key={index} className="hover:bg-gray-800">
                        <td className="p-3 text-sm">{kart.banka}</td>
                        <td className="p-3 text-sm">**** **** **** {kart.kartNo}</td>
                        <td className="p-3 text-sm text-right">{new Intl.NumberFormat('tr-TR').format(kart.bakiye)} ₺</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-700">
                      <td colSpan="2" className="p-3 text-sm font-bold">TOPLAM</td>
                      <td className="p-3 text-sm font-bold text-right">
                        {new Intl.NumberFormat('tr-TR').format(krediKartiBakiyeleri.reduce((sum, item) => sum + item.bakiye, 0))} ₺
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-400">Nakit Kasa Durumu</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Son Güncelleme Tarihi: {lastUpdateDate}</span>
                  <button 
                    onClick={() => handleUpdate()} 
                    className={`p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${isUpdating ? 'animate-spin' : ''}`}
                    disabled={isUpdating}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M21 2v6h-6"></path>
                      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                      <path d="M3 22v-6h6"></path>
                      <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-900 rounded-lg">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hesap Adı</th>
                      <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Döviz Cinsi</th>
                      <th className="p-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Tutar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {kasaDurumu.map((kasa, index) => (
                      <tr key={index} className="hover:bg-gray-800">
                        <td className="p-3 text-sm">{kasa.hesapAdi}</td>
                        <td className="p-3 text-sm">{kasa.dovizCinsi}</td>
                        <td className="p-3 text-sm text-right">
                          {new Intl.NumberFormat('tr-TR').format(kasa.tutar)} 
                          {kasa.dovizCinsi === 'TRY' ? ' ₺' : kasa.dovizCinsi === 'USD' ? ' $' : ' €'}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-700">
                      <td colSpan="2" className="p-3 text-sm font-bold">TOPLAM (TRY)</td>
                      <td className="p-3 text-sm font-bold text-right">
                        {new Intl.NumberFormat('tr-TR').format(kasaDurumu.reduce((sum, item) => sum + item.tutar, 0))} ₺
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Ana uygulama bileşeni
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/muhasebe-ekrani" element={<MuhasebeEkrani />} />
        <Route path="/yonetim-ekrani" element={<YonetimEkrani />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;