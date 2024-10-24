import React, { FC, useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "components/divider";

const BookingContext: FC = () => {
  const [valid, setValid] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    street: "",
    state: "",
    city: "",
    preferredService: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!!formData.name && !!formData.phoneNumber) {

      console.log("Form submitted:", formData);
      // You can add form submission logic here
      setValid(true)
    }
  };

  return (
    <Box className=" px-6 py-8 ">
      <div className=" flex flex-col items-center bg-white rounded-xl py-8 space-y-4  ">
        {valid ? (
          <>
            <div className=" flex flex-col items-center">
              <img className=" h-[60px] aspect-square" src="https://pub-4076f91e2c23424590fb9b7fe99e41b5.r2.dev/checkMark.png" alt="checkMark" />
              <span className=" text-base text-slate-800 font-semibold">ĐÃ GỬI THÀNH CÔNG</span>
            </div>
            <div className=" flex flex-col items-center">
              <span className=" text-sm font-semibold text-slate-700">CẢM ƠN QUÝ KHÁCH ĐÃ TIN TƯỞNG</span>
              <span className=" text-sm text-slate-500 italic">Việt Trí sẽ liên hệ trong thời gian sớm nhất.</span>
            </div>
          </>
        ) : (
          <>
          <span className=" text-lg font-semibold text-[#0074BC] ">
              ĐẶT LỊCH TƯ VẤN
            </span>
            <form
              className=" flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <div className=" flex flex-col space-y-1">
                <div className=" flex items-center ">
                  <label className="w-[130px] text-sm text-slate-700 whitespace-nowrap">
                    Họ & tên *
                  </label>
                  <div>
                    :{" "}
                    <input
                      className=" ring-0 outline-none px-2 border-b border-slate-400 "
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className=" flex items-center ">
                  <label className=" w-[130px] text-sm text-slate-700 whitespace-nowrap">
                    Số điện thoại *
                  </label>
                  <div>
                    :{" "}
                    <input
                      className="ring-0 outline-none px-2 border-b border-slate-400"
                      type="tel"
                      pattern="[0-9]{10}"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className=" py-1 flex space-x-1 items-start ">
                  <label className="w-[130px] text-sm text-slate-700 whitespace-nowrap">
                    Địa chỉ công trình{" "}
                  </label>
                  <div className=" flex flex-col space-y-1 justify-end">
                    <div>
                      :
                      <input
                        className="ring-0 outline-none px-2 border-b border-slate-400 placeholder:text-sm placeholder:italic placeholder:text-slate-300"
                        placeholder="Số nhà, tên đường, phường/xã"
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                      />
                    </div>
                    <input
                      className="ring-0 outline-none px-2 border-b border-slate-400 placeholder:text-sm placeholder:italic placeholder:text-slate-300"
                      placeholder="Quận/Huyện"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                    <input
                      className="ring-0 outline-none px-2 border-b border-slate-400 placeholder:text-sm placeholder:italic placeholder:text-slate-400"
                      placeholder="* Thành phố/Tỉnh"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className=" py-1 flex  items-start space-x-1">
                  <label className=" w-[130px] text-sm text-slate-700 whitespace-nowrap">
                    Dịch vụ quan tâm * :
                  </label>
                  <div className=" flex flex-col items-start">
                    <div className=" flex items-center space-x-1">
                      <input
                        type="radio"
                        name="preferredService"
                        value="lapDatThangMoi"
                        checked={formData.preferredService === "lapDatThangMoi"}
                        onChange={handleChange}
                      />
                      <label className=" text-sm text-slate-700 italic">
                        Thiết kế, sản xuất, lắp đặt thang mới
                      </label>
                    </div>
                    <div className=" flex items-center space-x-1">
                      <input
                        type="radio"
                        name="preferredService"
                        value="baoTri"
                        checked={formData.preferredService === "baoTri"}
                        onChange={handleChange}
                      />
                      <label className=" text-sm text-slate-700 italic">
                        Dịch vụ Bảo Trì
                      </label>
                    </div>
                    <div className=" flex items-center space-x-1">
                      <input
                        type="radio"
                        name="preferredService"
                        value="suaChua"
                        checked={formData.preferredService === "suaChua"}
                        onChange={handleChange}
                      />
                      <label className=" text-sm text-slate-700 italic">
                        Dịch vụ Sửa chữa
                      </label>
                    </div>
                    <div className=" flex items-center space-x-1">
                      <input
                        type="radio"
                        name="preferredService"
                        value="caiTaoThangMay"
                        checked={formData.preferredService === "caiTaoThangMay"}
                        onChange={handleChange}
                      />
                      <label className=" text-sm text-slate-700 italic">
                        Dịch vụ Cải tạo Thang Máy
                      </label>
                    </div>
                  </div>
                </div>
                <div className=" py-1 flex space-x-1 items-start ">
                  <label className="w-[130px] text-sm text-slate-700 whitespace-nowrap">
                    {" "}
                    Yêu cầu chi tiết
                  </label>
                  <div className=" justify-start flex">
                    :
                    <textarea
                      className=" ring-0 outline-none px-2 py-1 border-b border-slate-400 placeholder:text-slate-300 placeholder:italic"
                      placeholder="Nhập nội dung"
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              <button
                className=" mt-6 bg-[#0074BC] px-4 py-1 text-sm text-white rounded-xl"
                type="submit"
              >
                GỬI THÔNG TIN
              </button>
              <span className=" mt-2 text-sm text-slate-600 italic">
                Việt Trí cam kết bảo mật thông tin khách hàng.
              </span>
            </form>
          </>
        )}
      </div>
    </Box>
  );
};

const BookingPage: FC = () => {
  return (
    <Page>
      <Header
        title="TƯ VẤN"
        showBackIcon={false}
        textColor="white"
        backgroundColor="#0068b2"
      />
      <Divider />
      <BookingContext />
    </Page>
  );
};

export default BookingPage;
