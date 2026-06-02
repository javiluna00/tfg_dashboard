import React from "react";
import Image2 from "@/assets/images/all-img/widget-bg-2.png";
const ImageBlock2 = () => {
  return (
    <div
      className="bg-no-repeat bg-cover bg-center p-5 rounded-[6px] relative"
      style={{
        backgroundImage: `url(${Image2})`,
      }}
    >
      <div>
        <h4 className="text-xl font-medium text-white mb-2">
          <span className="block font-normal">Buenas tardes,</span>
          <span className="block">Lambda Beats</span>
        </h4>
        <p className="text-sm text-white font-normal">Bienvenido al panel de administrador</p>
      </div>
    </div>
  );
};

export default ImageBlock2;
