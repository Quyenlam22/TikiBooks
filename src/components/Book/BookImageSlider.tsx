import React from 'react';
import iconMore from '../../assets/icons/icon-more.png';
import iconAi from '../../assets/icons/icon-ai.png';
import type { Book } from '../../../type/Book';

interface BookImageSliderProps {
  book: Book;
}

const BookImageSlider: React.FC<BookImageSliderProps> = ({ book }) => {
  const [selected, setSelected] = React.useState(0);
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null);

  const images = book.images?.map(img => img.large_url || img.base_url) || [];

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col w-100 rounded-lg gap-4 bg-white pt-4 pb-3">
        <div className="gap-2 bg-white flex flex-col px-4">
          <div className="w-[368px] h-[368px] bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500">
            Không có ảnh
          </div>
        </div>
      </div>
    );
  }

  const mainIdx = hoverIdx !== null ? hoverIdx : selected;

  return (
    <div className="flex flex-col w-100 rounded-lg gap-4 bg-white pt-4 pb-3">
      <div className="gap-2 bg-white flex flex-col px-4">
        <img
          src={images[mainIdx]}
          alt={`Ảnh sách ${mainIdx + 1}`}
          className="block w-[368px] h-[368px] object-contain rounded-lg border border-gray-200 cursor-pointer"
        />
        <div className="flex gap-2">
          {images.map((img, idx) => (
            <a
              key={idx}
              className={`relative inline-block w-[54px] h-[54px] p-1 rounded border overflow-hidden
                ${selected === idx ? 'border-2 border-blue-600 shadow' : 'border border-[#ebebf0]'}
                cursor-pointer bg-white`}
              onClick={() => setSelected(idx)}
              onMouseEnter={() => setHoverIdx(idx)}
              onMouseLeave={() => setHoverIdx(null)}
              tabIndex={0}
              role="button"
              aria-label={`Chọn ảnh ${idx + 1}`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover rounded"
                draggable={false}
              />
            </a>
          ))}
        </div>
      </div>
      <div className='flex justify-between items-center cursor-pointer border-t-[1px] border-gray-200 text-[14px] font-normal pt-3 px-4'>
        <div className='flex items-center'>
            <img src={iconAi} alt="icon-ai" className='w-6 mr-2'/>
            <span className='text-gray-500 pr-1'>Xem thêm</span>
            <span>Tóm tắt nội dung sách</span>
        </div>
        <img src={iconMore} alt="More" className='w-6 '/>
      </div>
    </div>
  );
};

export default BookImageSlider;
