import { useRef } from "react";

interface PanoramaFormProps {
  onChange?: (file: File) => void;
  onReset?: () => void;
}

const PanoramaForm = ({ onChange, onReset }: PanoramaFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-row gap-3 mb-2">
      <label
        htmlFor="uploadFile1"
        className="flex bg-gray-800 hover:bg-gray-700 text-white text-base font-medium px-4 py-2.5 outline-none rounded w-max cursor-pointer "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 mr-2 fill-white inline"
          viewBox="0 0 32 32"
        >
          <path
            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
            data-original="#000000"
          />
          <path
            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
            data-original="#000000"
          />
        </svg>
        Upload
        <input
          ref={inputRef}
          type="file"
          accept=".png,.jpg,.jpeg,image/png"
          // accept="image/*"
          id="uploadFile1"
          onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files && event.target.files.length > 0) {
              const file = event.target.files[0];
              if (file) onChange?.(file);
            }
          }}
          hidden
        />
      </label>
      <button
        onClick={onReset}
        className="bg-gray-800 hover:bg-gray-700 text-white text-base font-medium px-4 py-2.5 outline-none rounded w-max cursor-pointer"
      >
        Reset
      </button>
    </div>
  );
};

export default PanoramaForm;
