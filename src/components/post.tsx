import React, { FC } from "react";
import { Product, Section } from "types/product";
import { formatNumber } from "utils/utils";
import { Box, Text } from "zmp-ui";
import { useNavigate } from "react-router";

const SectionItem: FC<{ section: Section }> = ({ section }) => {
  if(section.type === "header") {
    return (
      <div className=" w-full flex flex-col items-center">
        {section.content?.map((data, i) => (
          <span className=" text-lg font-semibold text-slate-700" key={i}>
            {data}
          </span>
        ))}
      </div>
    )
  }
  if (section.type === "paragraph") {
    return (
      <div className=" flex flex-col ">
        {section.content?.map((data, i) => (
          <p className=" text-slate-700" key={i}>
            {data}
          </p>
        ))}
      </div>
    );
  }
  if (section.type === "subheader") {
    return (
      <div className=" flex flex-col ">
        {section.content?.map((data, i) => (
          <span className=" text-base font-semibold text-slate-800 " key={i}>
            {data}
          </span>
        ))}
      </div>
    );
  }
  if (section.type === "space") {
    return <div className=" w-full h-[4px]"></div>;
  }
  if (section.type === "image") {
    return (
      <div className=" flex flex-col space-y-2 py-4 ">
        {section.content?.map((data, i) => (
          <img className="max-w-full object-contain" src={data} alt={i.toString()} />
        ))}
      </div>
    );
  }
  if (section.type === "bulletList") {
    return (
      <ul className=" text-slate-800">
        {section.content?.map((data, i) => (
          <li key={i.toString()}>
            <strong>-</strong> {data}
          </li>
        ))}
      </ul>
    );
  }
  return <></>;
};

export const PostItem: FC<{ sections: Section[] }> = ({ sections }) => {
  return (
    <Box className="">
      {sections.map((section, i) => (
        <SectionItem key={i} section={section} />
      ))}
    </Box>
  );
};
