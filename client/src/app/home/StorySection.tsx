import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import image from '/public/images/story_section.png';
import { ALT } from '@/utils/const.util';

const StorySection = () => {
  return (
    <section className="overflow-hidden bg-[#FFF5EA]">
      <div className="container flex flex-col-reverse items-center gap-12 py-12 md:flex-row">
        <div className="flex-1">
          <h2 className="text-3xl font-bold">
            Câu chuyện về hương thơm & sự thư giãn
          </h2>
          <p className="pt-2 pb-4 text-xl">
            Chúng tôi tin rằng một giọt tinh dầu nhỏ có thể mang lại sự thay đổi
            lớn cho tâm trạng và sức khỏe của bạn. Mỗi sản phẩm đều được chiết
            xuất 100% từ thiên nhiên, không hóa chất, không độc hại – là món quà
            tinh túy từ đất mẹ dành cho cuộc sống hiện đại đầy áp lực. Từng chai
            tinh dầu là kết tinh của sự tỉ mỉ trong từng khâu chọn lọc nguyên
            liệu, chưng cất và bảo quản.
          </p>
          <div>
            <Button>Khám phá ngay</Button>
          </div>
        </div>
        <div className="flex-1">
          <Image
            src={image}
            alt={ALT}
            className="max-h-[480px] w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default StorySection;
