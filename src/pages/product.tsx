import { ProductItem } from "components/product/item";
import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import { productByIdState, productsByCategoryState } from "state";
import { Box, Header, Page, Tabs } from "zmp-ui";
import { useNavigate, useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { formatNumber } from "utils/utils";
import { PostItem } from "components/post";
import { Section } from "types/product";

const techCategories = [
  {
    id: "techSpec",
    label: "Đặc tính kỹ thuật",
  },
  {
    id: "techDrawing",
    label: "Bản vẽ kỹ thuật",
  },
  {
    id: "spec",
    label: "Thông số kỹ thuật",
  },
  {
    id: "power",
    label: "Nguồn điện",
  },
  {
    id: "shaft",
    label: "Chuẩn bị hố thang",
  },
  // {
  //   id: "images",
  //   label: "Hình ảnh thực tế",
  // },
  // {
  //   id: "videos",
  //   label: "Video",
  // },
];

const defaultTechSpec: { [key: string]: { [key: string]: Section[] } } = {
  thangTaiKhach: {
    techSpec: [
      {
        type: "subheader",
        content: ["Thang Máy Tải Khách"],
      },
      {
        type: "space",
      },
      {
        type: "paragraph",
        content: [
          "Tải trọng : từ 320 kg - 2.000 kg",
          "Tốc độ    : từ 30 m/ph - 150 m/ph",
          "Kiểu thang: CPM, KPM, phòng máy mini",
          "Sử dụng: văn phòng, khách sạn thấp tầng (từ 10 tầng trở xuống), chung cư,…",
        ],
      },
      {
        type: "space",
      },
      {
        type: "subheader",
        content: ["Ưu điểm của thang máy tải khách:"],
      },
      {
        type: "space",
      },
      {
        type: "paragraph",
        content: [
          "Thiết kế bền nhẹ, kiểu dáng đa dạng, sang trọng",
          "Tiết kiệm điện nhờ máy kéo không hộp số, hiệu suất cao",
          "Vận hành êm, an toàn khi sử dụng",
          "Cửa chống cháy, hệ thống giám sát nhóm thang máy",
        ],
      },
    ],
    techDrawing: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangTaiKhachBVKT.jpg",
        ],
      },
    ],
    spec: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangTaiKhachTSKT.jpg",
        ],
      },
    ],
    power: [
      {
        type: "paragraph",
        content: [
          "Cung cấp điện 3 pha 380VAC, 3KVA/1kw, nguồn điện bao gồm 5 dây: 3 dây pha, 1 dây trung tính và 1 dây tiếp đất (dây tiếp đất không dùng chung với dây chống sét của tòa nhà)",
        ],
      },
      {
        type: "space",
      },
      {
        type: "bulletList",
        content: [
          "Nguồn động lực: 3phases 380V-50 HZ",
          "Nguồn chiếu sáng: 1phases 220V-50 HZ",
          "Nguồn tín hiệu an toàn: 24VDC",
        ],
      },
    ],
    shaft: [
      {
        type: "paragraph",
        content: [
          "1.	Hố pit được chống thấm kho sạch, kích thước hố pit đủ đảm bảo kích thước yêu cầu theo thiết kế.",
          "2.	Khoảng chừa trống chiều ngang và chiều cao các cửa tầng đủ theo yêu cầu thiết kế để lắp đặt cửa.",
          "3.	Hệ thống đà chịu lực quanh hố thang đủ để đảm bảo bắt hệ thống ray đạt tiêu chuẩn.",
          "4.	Chiều cao tầng trên cùng (OH) đủ kích thước yêu cầu, đà chịu lực chính cho thang máy.",
          "5.	Khoảng lổ chừa máy kéo, các lổ thiết bị và lổ tín hiệu ở các tầng.",
          "6.	Móc treo palang (dùng khi thi công và sửa chữa)."
        ]
      },
    ],
    // images: [
    //   {
    //     type: "space",
    //   },
    // ],
    // videos: [
    //   {
    //     type: "space",
    //   },
    // ],
  },
  thangTaiHang: {
    techSpec: [
      {
        type: "paragraph",
        content: [
          "Thang máy tải hàng là phương tiện vận chuyển rất quan trọng trong các nhà máy, kho hàng trong cao ốc có nhiều tầng. Nói một cách khác, loại thang máy tải hàng khi hoạt động ổn định, tin cậy và an toàn sẽ giúp cho dây chuyền sản xuất của doanh nghiệp bạn hoạt động hiệu quả, giúp cho việc xuất - nhập hàng đúng kế hoạch.",
        ],
      },
      {
        type: "space",
      },
      {
        type: "paragraph",
        content: [
          "Tải trọng: từ 1.500 kg - 10.000 kg",
          "Tốc độ   : từ 30 m/ph - 60 m/ph",
        ],
      },
      {
        type: "space",
      },
      {
        type: "paragraph",
        content: [
          "Cửa: CO, 4CO, 6CO, 2S, 3S, 2U, 3U với các khoảng mở rộng đến 6m, cao 4.5m",
          "Kiểu thang: KPM, CPM và thang thủy lực, kiểu máy kéo đặt dưới PIT.",
        ],
      },
    ],
    techDrawing: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangTaiHangBVKT.jpg",
        ],
      },
    ],
    spec: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangTaiHangTSKT.jpg",
        ],
      },
    ],
    power: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangTaiHangNguonDien.jpg",
        ],
      },
    ],
    shaft: [
      {
        type: "subheader",
        content: ["I. PHÒNG MÁY"],
      },
      {
        type: "bulletList",
        content: [
          "1.    Xây dựng phòng máy theo bản vẽ cung cấp. Chống thấm tường và mái. Lắp đặt ổ khóa cho cửa ra vào.",
          "2.    Thực hiện các lỗ kỹ thuật dùng để kéo thiết bị và đi cáp. Dây điện giữa phòng máy và hố thang. Cung cấp  móc treo chịu tải.",
          "3.    Bố trí lối đi, thang lên phòng máy, thang leo phải có tay vịn, chiều ngang tối thiểu 700 mm.",
          "4.    Hệ thống thông gió: lắp đặt các lam thông gió, quạt thông gió, đảm bảo nhiệt độ trong phòng máy dưới 40°C. Độ ẩm tương đối trung bình hàng tháng dưới 90% và 95% trong ngày.",
          "5.    Hệ thống chiếu sáng: lắp đặt các cửa sổ lấy ánh sáng tự nhiên, đèn chiếu sáng và bảng công tắc đèn.",
          "6.    Cung cấp nguồn điện đến phòng máy: 01 bảng điện nguồn, bao gồm 03 dây pha (380V - 50Hz), 01 dây trung tính, 01 dây nối. Dao động điện áp cho phép: 5%.",
        ],
      },
      {
        type: "space",
      },
      {
        type: "subheader",
        content: ["II. HỐ THANG & CỬA TẦNG"],
      },
      {
        type: "bulletList",
        content: [
          "1.    Xây dựng và hoàn thiện (chiếu sáng, thông gió và chống thấm) hố thang với kích thước theo bản vẽ cung cấp. Sai lệch theo phương thẳng đứng +25mm.",
          "2.    Lắp đặt thang sắt xuống đáy hố.",
          "3.    Chừa thô lắp cửa tầng, hộp gọi tầng. Hoàn thiện xung quanh cửa tầng sau khi lắp đặt.",
          "4.    Lắp các đà và khung lưới giữa hố thang (đối với thang hoạt động theo nhóm).",
          "5.    Các ốâng nước, điện, cáp… không được lắp đặt bên trong hố thang.",
          "6.    Lắp đặt các đà giữa tầng đối với những tầng có độ cao tầng trên 2600mm.",
        ],
      },
      {
        type: "space",
      },
      {
        type: "subheader",
        content: ["III. LƯU Ý KHÁC"],
      },
      {
        type: "bulletList",
        content: [
          "1.    Cung cấp miễn phí điện nguồn để thi công và vận hành.",
          "2.    Cung cấp miễn phí mặt bằng chứa thiết bị và vật liệu trong thời gian thi công.",
        ],
      },
    ],
    // images: [
    //   {
    //     type: "space",
    //   },
    // ],
    // videos: [
    //   {
    //     type: "space",
    //   },
    // ],
  },
  thangTaiOTo: {
    techSpec: [
      {
        type: "subheader",
        content: ["Tải trọng:"],
      },
      {
        type: "paragraph",
        content: ["từ 2.500 kg - 4.000 kg"],
      },
      {
        type: "subheader",
        content: ["Tốc độ:"],
      },
      {
        type: "paragraph",
        content: ["từ 9 m/ph - 60 m/ph"],
      },
      {
        type: "subheader",
        content: ["Cửa:"],
      },
      {
        type: "paragraph",
        content: ["6CO, 3S, 2U và 3U, có cửa hoặc không có cửa trong"],
      },
      {
        type: "subheader",
        content: ["Kiểu thang:"],
      },
      {
        type: "paragraph",
        content: [
          "CPM, KPM, thang thủy lực",
          "Sử dụng trong các cao ốc thương mại, căn hộ cao cấp, nhà máy, showroom ô tô.",
        ],
      },
      {
        type: "subheader",
        content: ["Mâm xoay ô tô:"],
      },
      {
        type: "paragraph",
        content: [
          "Tải trọng: từ 2.500 kg - 4.000 kg",
          "Tốc độ   : xoay 1 vòng/ phút",
          "Đường kính mâm xoay từ 4m - 4.5m, dùng được cho ô tô 4 chỗ, 7 chỗ hoặc xe tải nhỏ",
          "Thiết kế kiểu PIT: 200 mm, 500 mm hoặc đặt trên sàn",
          "Sử dụng tại các bãi đỗ ô tô, khu căn hộ hoặc hộ gia đình",
        ],
      },
    ],
    techDrawing: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangTaiOToBVKT.jpg",
        ],
      },
    ],
    spec: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangTaiOToTSKT.jpg",
        ],
      },
    ],
    power: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangTaiOToNguonDien.jpg",
        ],
      },
    ],
    shaft: [
      {
        type: "subheader",
        content: ["I. PHÒNG MÁY"],
      },
      {
        type: "bulletList",
        content: [
          "1.    Xây dựng phòng máy theo bản vẽ cung cấp. Chống thấm tường và mái. Lắp đặt ổ khóa cho cửa ra vào.",
          "2.    Thực hiện các lỗ kỹ thuật dùng để kéo thiết bị và đi cáp. Dây điện giữa phòng máy và hố thang. Cung cấp  móc treo chịu tải.",
          "3.    Bố trí lối đi, thang lên phòng máy, thang leo phải có tay vịn, chiều ngang tối thiểu 700 mm.",
          "4.    Hệ thống thông gió: lắp đặt các lam thông gió, quạt thông gió, đảm bảo nhiệt độ trong phòng máy dưới 40°C. Độ ẩm tương đối trung bình hàng tháng dưới 90% và 95% trong ngày.",
          "5.    Hệ thống chiếu sáng: lắp đặt các cửa sổ lấy ánh sáng tự nhiên, đèn chiếu sáng và bảng công tắc đèn.",
          "6.    Cung cấp nguồn điện đến phòng máy: 01 bảng điện nguồn, bao gồm 03 dây pha (380V - 50Hz), 01 dây trung tính, 01 dây nối. Dao động điện áp cho phép: 5%.",
        ],
      },
      {
        type: "space",
      },
      {
        type: "subheader",
        content: ["II. HỐ THANG & CỬA TẦNG"],
      },
      {
        type: "bulletList",
        content: [
          "1.    Xây dựng và hoàn thiện (chiếu sáng, thông gió và chống thấm) hố thang với kích thước theo bản vẽ cung cấp. Sai lệch theo phương thẳng đứng +25mm.",
          "2.    Lắp đặt thang sắt xuống đáy hố.",
          "3.    Chừa thô lắp cửa tầng, hộp gọi tầng. Hoàn thiện xung quanh cửa tầng sau khi lắp đặt.",
          "4.    Lắp các đà và khung lưới giữa hố thang (đối với thang hoạt động theo nhóm).",
          "5.    Các ốâng nước, điện, cáp… không được lắp đặt bên trong hố thang.",
          "6.    Lắp đặt các đà giữa tầng đối với những tầng có độ cao tầng trên 2600mm.",
        ],
      },
      {
        type: "space",
      },
      {
        type: "subheader",
        content: ["III. LƯU Ý KHÁC"],
      },
      {
        type: "bulletList",
        content: [
          "1.    Cung cấp miễn phí điện nguồn để thi công và vận hành.",
          "2.    Cung cấp miễn phí mặt bằng chứa thiết bị và vật liệu trong thời gian thi công.",
        ],
      },
    ],
    // images: [
    //   {
    //     type: "space",
    //   },
    // ],
    // videos: [
    //   {
    //     type: "space",
    //   },
    // ],
  },
  thangThucPham: {
    techSpec: [
      {
        type: "paragraph",
        content: [
          "Thang máy tải hàng là phương tiện vận chuyển rất quan trọng trong các nhà máy, kho hàng trong cao ốc có nhiều tầng. Nói một cách khác, loại thang máy tải hàng khi hoạt động ổn định, tin cậy và an toàn sẽ giúp cho dây chuyền sản xuất của doanh nghiệp bạn hoạt động hiệu quả, giúp cho việc xuất - nhập hàng đúng kế hoạch.",
        ],
      },
      {
        type: "space",
      },
      {
        type: "paragraph",
        content: [
          "Tải trọng: từ 1.500 kg - 10.000 kg",
          "Tốc độ   : từ 30 m/ph - 60 m/ph",
        ],
      },
      {
        type: "space",
      },
      {
        type: "paragraph",
        content: [
          "Cửa: CO, 4CO, 6CO, 2S, 3S, 2U, 3U với các khoảng mở rộng đến 6m, cao 4.5m",
          "Kiểu thang: KPM, CPM và thang thủy lực, kiểu máy kéo đặt dưới PIT.",
        ],
      },
    ],
    techDrawing: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangTaiHangBVKT.jpg",
        ],
      },
    ],
    spec: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangTaiHangTSKT.jpg",
        ],
      },
    ],
    power: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangTaiHangNguonDien.jpg",
        ],
      },
    ],
    shaft: [
      {
        type: "subheader",
        content: ["I. PHÒNG MÁY"],
      },
      {
        type: "bulletList",
        content: [
          "1.    Xây dựng phòng máy theo bản vẽ cung cấp. Chống thấm tường và mái. Lắp đặt ổ khóa cho cửa ra vào.",
          "2.    Thực hiện các lỗ kỹ thuật dùng để kéo thiết bị và đi cáp. Dây điện giữa phòng máy và hố thang. Cung cấp  móc treo chịu tải.",
          "3.    Bố trí lối đi, thang lên phòng máy, thang leo phải có tay vịn, chiều ngang tối thiểu 700 mm.",
          "4.    Hệ thống thông gió: lắp đặt các lam thông gió, quạt thông gió, đảm bảo nhiệt độ trong phòng máy dưới 40°C. Độ ẩm tương đối trung bình hàng tháng dưới 90% và 95% trong ngày.",
          "5.    Hệ thống chiếu sáng: lắp đặt các cửa sổ lấy ánh sáng tự nhiên, đèn chiếu sáng và bảng công tắc đèn.",
          "6.    Cung cấp nguồn điện đến phòng máy: 01 bảng điện nguồn, bao gồm 03 dây pha (380V - 50Hz), 01 dây trung tính, 01 dây nối. Dao động điện áp cho phép: 5%.",
        ],
      },
      {
        type: "space",
      },
      {
        type: "subheader",
        content: ["II. HỐ THANG & CỬA TẦNG"],
      },
      {
        type: "bulletList",
        content: [
          "1.    Xây dựng và hoàn thiện (chiếu sáng, thông gió và chống thấm) hố thang với kích thước theo bản vẽ cung cấp. Sai lệch theo phương thẳng đứng +25mm.",
          "2.    Lắp đặt thang sắt xuống đáy hố.",
          "3.    Chừa thô lắp cửa tầng, hộp gọi tầng. Hoàn thiện xung quanh cửa tầng sau khi lắp đặt.",
          "4.    Lắp các đà và khung lưới giữa hố thang (đối với thang hoạt động theo nhóm).",
          "5.    Các ốâng nước, điện, cáp… không được lắp đặt bên trong hố thang.",
          "6.    Lắp đặt các đà giữa tầng đối với những tầng có độ cao tầng trên 2600mm.",
        ],
      },
      {
        type: "space",
      },
      {
        type: "subheader",
        content: ["III. LƯU Ý KHÁC"],
      },
      {
        type: "bulletList",
        content: [
          "1.    Cung cấp miễn phí điện nguồn để thi công và vận hành.",
          "2.    Cung cấp miễn phí mặt bằng chứa thiết bị và vật liệu trong thời gian thi công.",
        ],
      },
    ],
    // images: [
    //   {
    //     type: "space",
    //   },
    // ],
    // videos: [
    //   {
    //     type: "space",
    //   },
    // ],
  },
  thangQuanSat: {
    techSpec: [
      {
        type: "subheader",
        content: ["Thang Máy Tải Khách"],
      },
      {
        type: "space",
      },
      {
        type: "paragraph",
        content: [
          "Tải trọng : từ 320 kg - 2.000 kg",
          "Tốc độ    : từ 30 m/ph - 150 m/ph",
          "Kiểu thang: CPM, KPM, phòng máy mini",
          "Sử dụng: văn phòng, khách sạn thấp tầng (từ 10 tầng trở xuống), chung cư,…",
        ],
      },
      {
        type: "space",
      },
      {
        type: "subheader",
        content: ["Ưu điểm của thang máy tải khách:"],
      },
      {
        type: "space",
      },
      {
        type: "paragraph",
        content: [
          "Thiết kế bền nhẹ, kiểu dáng đa dạng, sang trọng",
          "Tiết kiệm điện nhờ máy kéo không hộp số, hiệu suất cao",
          "Vận hành êm, an toàn khi sử dụng",
          "Cửa chống cháy, hệ thống giám sát nhóm thang máy",
        ],
      },
    ],
    techDrawing: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangTaiKhachBVKT.jpg",
        ],
      },
    ],
    spec: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangTaiKhachTSKT.jpg",
        ],
      },
    ],
    power: [
      {
        type: "paragraph",
        content: [
          "Cung cấp điện 3 pha 380VAC, 3KVA/1kw, nguồn điện bao gồm 5 dây: 3 dây pha, 1 dây trung tính và 1 dây tiếp đất (dây tiếp đất không dùng chung với dây chống sét của tòa nhà)",
        ],
      },
      {
        type: "space",
      },
      {
        type: "bulletList",
        content: [
          "Nguồn động lực: 3phases 380V-50 HZ",
          "Nguồn chiếu sáng: 1phases 220V-50 HZ",
          "Nguồn tín hiệu an toàn: 24VDC",
        ],
      },
    ],
    shaft: [
      {
        type: "space",
      },
    ],
    // images: [
    //   {
    //     type: "space",
    //   },
    // ],
    // videos: [
    //   {
    //     type: "space",
    //   },
    // ],
  },
  thangTaiGiuongBenh: {
    techSpec: [
      {
        type: "subheader",
        content: ["THANG MÁY BỆNH VIỆN"],
      },
      {
        type: "space",
      },
      {
        type: "paragraph",
        content: [
          "Tải trọng: từ 320kg - 2,000kg",
          "Tốc độ: từ 30m/ph - 150m/ph",
          "Hành trình tối đa: lên đến 30 điểm dừng.",
          "Bao gồm các kiểu có phòng máy, phòng máy mini hoặc không có phòng máy.",
        ],
      },
      {
        type: "space",
      },
      {
        type: "subheader",
        content: ["Ưu điểm của thang máy bệnh viện: "],
      },
      {
        type: "space",
      },
      {
        type: "paragraph",
        content: [
          "Công nghệ biến đổi tần số tiên tiến và việc điều khiển thang được giám sát chặt chẽ qua hệ thống điều khiển máy tính đản bảo độ ổn định, êm ái trong quá trình thang di chuyển.",
          "Tay vịn trong buồng cabin sẽ thuận tiện, an toàn hơn đối với người già, trẻ em và các bệnh nhân.",
          "Bảng gọi tầng đặc biệt trong buồng cabin dành cho người ngồi xe lăn",
          "Phím gọi có chữ nổi dành cho người khiếm thị có hệ thống phát giọng nói báo tầng dành cho người khiếm thị, v.v…",
        ],
      },
    ],
    techDrawing: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangBenhVienBVKT.png",
        ],
      },
    ],
    spec: [
      {
        type: "image",
        content: [
          "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangBenhVienTSKT.png",
        ],
      },
    ],
    power: [
      {
        type: "bulletList",
        content: [
          "Cung cấp điện 3 pha 380VAC, 3KVA/1kw, nguồn điện bao gồm 5 dây: 3 dây pha, 1 dây trung tính và 1 dây tiếp đất (dây tiếp đất không dùng chung với dây chống sét của tòa nhà)",
          "Nguồn động lực: 3phases 380V-50 HZ",
          "Nguồn chiếu sáng: 1phases 220V-50 HZ",
          "Nguồn tín hiệu an toàn: 24VDC",
        ],
      },
    ],
    shaft: [
      {
        type: "subheader",
        content: ["I. PHÒNG MÁY"],
      },
      {
        type: "paragraph",
        content: [
          "1. Xây dựng phòng máy theo bản vẽ cung cấp. Chống thấm tường và mái. Lắp đặt ổ khóa cho cửa ra vào.",
          "2. Thực hiện các lỗ kỹ thuật dùng để kéo thiết bị và đi cáp. Dây điện giữa phòng máy và hố thang. Cung cấp  móc treo chịu tải,",
          "3. Bố trí lối đi, thang lên phòng máy, thang leo phải có tay vịn, chiều ngang tối thiểu 700 mm.",
          "4. Hệ thống thông gió: lắp đặt các lam thông gió, quạt thông gió, đảm bảo nhiệt độ trong phòng máy dưới 40°C. Độ ẩm tương đối trung bình hàng tháng dưới 90% và 95% trong ngày.",
          "5. Hệ thống chiếu sáng: lắp đặt các cửa sổ lấy ánh sáng tự nhiên, đèn chiếu sáng và bảng công tắc đèn.",
          "6. Cung cấp nguồn điện đến phòng máy: 01 bảng điện nguồn, bao gồm 03 dây pha (380V - 50Hz), 01 dây trung tính, 01 dây nối. Dao động điện áp cho phép: 5%.",
        ],
      },
      {
        type: "space",
      },
      {
        type: "subheader",
        content: ["II. HỐ THANG & CỬA TẦNG"],
      },
      {
        type: "paragraph",
        content: [
          "1. Xây dựng và hoàn thiện (chiếu sáng, thông gió và chống thấm) hố thang với kích thước theo bản vẽ cung cấp. Sai lệch theo phương thẳng đứng +25mm.",
          "2. Lắp đặt thang sắt xuống đáy hố.",
          "3. Chừa thô lắp cửa tầng, hộp gọi tầng. Hoàn thiện xung quanh cửa tầng sau khi lắp đặt.",
          "4. Lắp các đà và khung lưới giữa hố thang (đối với thang hoạt động theo nhóm).",
          "5. Các ốâng nước, điện, cáp… không được lắp đặt bên trong hố thang.",
          "6. Lắp đặt các đà giữa tầng đối với những tầng có độ cao tầng trên 2600mm.",
        ],
      },
      {
        type: "space",
      },
      {
        type: "subheader",
        content: ["III. LƯU Ý KHÁC"],
      },
      {
        type: "paragraph",
        content: [
          "1. Cung cấp miễn phí điện nguồn để thi công và vận hành.",
          "2. Cung cấp miễn phí mặt bằng chứa thiết bị và vật liệu trong thời gian thi công",
        ],
      },
    ],
    // images: [
    //   {
    //     type: "image",
    //     content: [
    //       "https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/thangBenhVienImage01.jpg",
    //     ],
    //   },
    // ],
    // videos: [
    //   {
    //     type: "space",
    //   },
    // ],
  },
};

const ProductTemplate: FC<{ productId: string | undefined }> = ({
  productId,
}) => {
  const productById = useRecoilValue(productByIdState(productId));
  const productsByCategory = useRecoilValue(
    productsByCategoryState(productById.categoryId)
  );
  const navigate = useNavigate();

  const gotoProduct = (productId: string) => {
    const url = `/category/${productId}`;
    navigate(url);
  };
  if (productById) {
    return (
      <Box className="">
        <Box>
          <div>
            {productById.refImages ? (
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                }}
                autoplay
                loop
              >
                {productById.refImages.map((image, i) => (
                  <SwiperSlide key={i}>
                    <div className=" flex flex-col items-center py-2">
                      <img
                        className=" h-[300px]"
                        src={image}
                        alt={i.toString()}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <></>
            )}
          </div>
          <div className=" flex flex-col items-center space-y-1 py-2">
            <span className=" text-lg font-bold text-[#0074BC]">
              {productById.name}
            </span>
            {productById.sale?.type === "percent" ? (
              <div className=" flex items-center space-x-2">
                <span className=" text-base text-slate-900 line-through">
                  {formatNumber(productById.price)}đ
                </span>
                <span className=" bg-red-600 text-white text-sm font-semibold p-[2px] rounded-md">
                  -
                  {productById.sale?.type === "percent"
                    ? productById.sale.percent * 100
                    : ""}
                  %
                </span>
              </div>
            ) : (
              <></>
            )}
            {productById.sale?.type === "percent" ? (
              <span className=" font-semibold text-xl text-[#0074BC] ">
                {formatNumber(
                  productById.price * (1 - productById.sale.percent)
                )}
                đ
              </span>
            ) : (
              <span className=" text-[#0074BC] ">
                {productById.price > 0
                  ? `${formatNumber(productById.price)}}đ`
                  : "Liên hệ"}
              </span>
            )}
            <div className=" bg-[#0074BC] px-4 py-1 flex flex-col items-center rounded-md">
              <div
                onClick={() => navigate("/booking")}
                className=" text-sm text-white "
              >
                ĐẶT LỊCH TƯ VẤN
              </div>
            </div>
          </div>
        </Box>
        <Box className=" flex flex-col py-8 px-4 border-t-2 border-slate-400 mt-6 text-slate-700">
        { !!productById.id && (<div className=" flex items-start justify-start space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600 whitespace-nowrap">Mã sản phẩm</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {productById.id}
            </span>
          </div>)}
          { !!productById.info?.lobby && (<div className=" flex items-start justify-start space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600 whitespace-nowrap">Cửa tầng chính</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {productById.info?.lobby}
            </span>
          </div>)}
          { !!productById.info?.floors && (<div className=" flex items-start justify-start space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600 whitespace-nowrap">Cửa tầng khác</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {productById.info?.floors}
            </span>
          </div>)}
          { !!productById.info?.cabinDoor && (<div className=" flex items-start justify-start space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600 whitespace-nowrap">Cửa cabin</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {productById.info?.cabinDoor}
            </span>
          </div>)}
          { !!productById.info?.gfnf && (<div className=" flex items-start justify-start space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600 whitespace-nowrap">Bao che</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {productById.info?.gfnf}
            </span>
          </div>)}
          { !!productById.info?.ceiling && (<div className=" flex items-start justify-start space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600 whitespace-nowrap">Trần</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {productById.info?.ceiling}
            </span>
          </div>)}
          { !!productById.info?.cabinFloor && (<div className=" flex items-start justify-start space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600 whitespace-nowrap">Sàn cabin</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {productById.info?.cabinFloor}
            </span>
          </div>)}
          { !!productById.info?.frontWall && (<div className=" flex items-start justify-start space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600 whitespace-nowrap">Vách trước</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {productById.info?.frontWall}
            </span>
          </div>)}
          { !!productById.info?.backWall && ( <div className=" flex items-start justify-start space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600 whitespace-nowrap">Vách sau</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {productById.info?.backWall}
            </span>
          </div>)}
          { !!productById.info?.sideWall && (<div className=" flex items-start justify-start space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600 whitespace-nowrap">Vách hông</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {productById.info?.sideWall}
            </span>
          </div>)}
          { !!productById.info?.handrail && (<div className=" flex items-start justify-start space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600 whitespace-nowrap">Tay vịn</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {productById.info?.handrail}
            </span>
          </div>)}
          { !!productById.info?.protectionRail && (<div className=" flex items-start justify-start space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600 whitespace-nowrap">Nẹp bảo vệ</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {productById.info?.protectionRail}
            </span>
          </div>)}
          { !!productById.info?.bollard && (<div className=" flex items-start justify-start space-x-2 ">
            <div className=" flex items-center justify-between w-[100px] ">
              <span className=" text-sm text-slate-600 whitespace-nowrap">Trụ bảo vệ</span>
              <span>:</span>
            </div>
            <span className=" text-sm font-semibold text-[#0074BC] ">
              {productById.info?.bollard}
            </span>
          </div>)}
        </Box>
        <Box className="px-4">
        <Tabs scrollable className="category-tabs rounded-lg">
          {techCategories.map((category) => (
            <Tabs.Tab key={category.id} label={category.label}>
              <Suspense>
                <div className=" bg-slate-50 px-4 py-4 content-center min-h-[200px]">
                  {productById.techInfo?.techSpec ? (
                    <PostItem sections={productById.techInfo?.techSpec} />
                  ) : (
                    <PostItem
                      sections={
                        defaultTechSpec[productById.categoryId][category.id]
                      }
                    />
                  )}
                </div>
              </Suspense>
            </Tabs.Tab>
          ))}
        </Tabs>
        {/* <Box className=" bg-slate-50 py-6 px-4 flex flex-col items-center space-y-2">
          <span className=" font-semibold text-base text-[#0074BC]">
            Để được tư vấn thêm thông tin:
          </span>
          <div className=" bg-red-600 w-full max-w-[280px] flex flex-col items-center py-[6px] rounded-md">
            <a href="tel:+84982739788" className=" font-bold text-white ">
              TƯ VẤN MIỄN PHÍ
            </a>
          </div>
        </Box> */}
        </Box>
        <Box className=" py-6 space-y-4 ">
          <div className=" flex items-center justify-between px-4">
            <span className=" text-lg font-bold text-slate-700">
              SẢN PHẨM CÙNG DANH MỤC
            </span>
          </div>
          <Swiper slidesPerView={2.15} spaceBetween={8} className="px-4">
            {productsByCategory.filter((product) => product.id !== productById.id).map((product) => (
              <SwiperSlide key={product.id}>
                <Box className=" w-full ">
                  <div onClick={() => gotoProduct(product.id)} className=" relative w-full h-full  pb-2 flex flex-col items-center bg-white border-b border-r border-slate-300  rounded-lg  p-1 ">
                    <div
                      className="relative w-full aspect-[3/4] rounded-lg bg-cover bg-center bg-skeleton"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    <div className=" flex flex-col h-full items-center justify-center">
                      <span className=" mt-1 font-bold text-slate-700">
                        {product.name}
                      </span>
                      {product.sale?.type === "percent" ? (
                        <div className=" flex items-center space-x-2">
                          <span className=" text-sm text-slate-900 line-through">
                            {formatNumber(product.price)}đ
                          </span>
                          <span className=" bg-red-600 text-white text-sm font-semibold p-[2px] rounded-md">
                            -
                            {product.sale?.type === "percent"
                              ? product.sale.percent * 100
                              : ""}
                            %
                          </span>
                        </div>
                      ) : (
                        <div></div>
                      )}
                      {product.sale?.type === "percent" ? (
                        <span className=" text-sm font-bold text-[#0074BC] ">
                          {formatNumber(
                            product.price * (1 - product.sale.percent)
                          )}
                          đ
                        </span>
                      ) : (
                        <span className=" text-xs text-[#0074BC] ">
                          {product.price > 0
                            ? `${formatNumber(product.price)}}đ`
                            : "Liên hệ"}
                        </span>
                      )}

                      <div className=" ">
                        <span
                          
                          className=" text-xs underline underline-offset-2 text-[#0074BC]"
                        >
                          Xem chi tiết
                        </span>
                      </div>
                    </div>
                  </div>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    );
  }
  return <></>;
};

const ProductPage: FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  return (
    <Page className="flex flex-col ">
      <Header backgroundColor="#0068b2" textColor="white" title={productId} />
      <Suspense>
        <ProductTemplate productId={productId} />
      </Suspense>
    </Page>
  );
};

export default ProductPage;
